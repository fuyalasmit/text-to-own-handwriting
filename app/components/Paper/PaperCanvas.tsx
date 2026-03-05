"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import A4Paper from "./A4Paper";
import { A4_WIDTH_PX, A4_HEIGHT_PX } from "../../types";

interface PaperCanvasProps {
    text: string;
    fontFamily: string;
    fontSize: number;
    lineHeightMultiplier: number;
    inkColor: string;
    showLines: boolean;
    showMargin: boolean;
    padding?: [number, number, number, number];
    /** Called with array of page DOM elements (for export) */
    onPagesReady?: (pages: HTMLDivElement[]) => void;
}

/**
 * PaperCanvas:
 * - Splits text into pages automatically based on available text area height
 * - Scales all pages to fit the container width using CSS transform
 * - Exposes page DOM refs for export
 */
export default function PaperCanvas({
    text,
    fontFamily,
    fontSize,
    lineHeightMultiplier,
    inkColor,
    showLines,
    showMargin,
    padding = [48, 48, 80, 80],
    onPagesReady,
}: PaperCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;

    // ── Scale calculation ───────────────────────────────────────────────────
    const updateScale = useCallback(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        const newScale = Math.min(1, containerWidth / A4_WIDTH_PX);
        setScale(newScale);
    }, []);

    useEffect(() => {
        updateScale();
        const ro = new ResizeObserver(updateScale);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [updateScale]);

    // ── Text → pages split ──────────────────────────────────────────────────
    const lineGap = Math.round(fontSize * lineHeightMultiplier);
    // A4Paper adds one extra lineGap to paddingTop, so subtract it here too
    // to keep linesPerPage in sync with what actually fits on the paper.
    const usableHeight = A4_HEIGHT_PX - (paddingTop + lineGap) - paddingBottom;
    const linesPerPage = Math.max(1, Math.floor(usableHeight / lineGap));
    const usableWidth = A4_WIDTH_PX - paddingLeft - paddingRight;

    // We split by newlines first, then wrap long lines
    const pages = splitTextIntoPages(text, linesPerPage, fontSize, usableWidth);

    // ── Expose page refs to parent ──────────────────────────────────────────
    useEffect(() => {
        if (!onPagesReady) return;
        const els = pageRefs.current.filter((el): el is HTMLDivElement => el !== null);
        onPagesReady(els);
    });

    const scaledHeight = A4_HEIGHT_PX * scale;

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: scaledHeight > 100 ? 24 * scale : 12,
            }}>
            {pages.map((pageText, i) => (
                <div
                    key={i}
                    style={{
                        width: A4_WIDTH_PX * scale,
                        height: scaledHeight,
                        flexShrink: 0,
                    }}>
                    {/* Inner wrapper at natural size, scaled from top-left */}
                    <div
                        style={{
                            transformOrigin: "top left",
                            transform: `scale(${scale})`,
                            width: A4_WIDTH_PX,
                            height: A4_HEIGHT_PX,
                        }}>
                        <A4Paper
                            ref={(el) => {
                                pageRefs.current[i] = el;
                            }}
                            text={pageText}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                            lineHeightMultiplier={lineHeightMultiplier}
                            inkColor={inkColor}
                            showLines={showLines}
                            showMargin={showMargin}
                            padding={padding}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Text splitting ─────────────────────────────────────────────────────────
/**
 * Splits text into page chunks based on linesPerPage.
 * Preserves manual newlines and wraps long lines using an approximation
 * (canvas measureText would be more accurate but requires DOM access).
 */
function splitTextIntoPages(text: string, linesPerPage: number, fontSize: number, usableWidth: number): string[] {
    if (!text.trim()) return [""];

    const avgCharWidth = fontSize * 0.38;
    const charsPerLine = Math.max(10, Math.floor(usableWidth / avgCharWidth));

    const rawLines = text.split("\n");

    // Each slot is either a real text string or null (phantom line for wrapped height)
    const allSlots: (string | null)[] = [];

    for (const line of rawLines) {
        if (line.length === 0) {
            allSlots.push(""); // real blank line (user pressed Enter)
            continue;
        }
        const estimatedLines = Math.ceil(line.length / charsPerLine);
        allSlots.push(line); // real line — CSS will wrap it on the paper
        for (let i = 1; i < estimatedLines; i++) {
            allSlots.push(null); // phantom slot: just height budget, no text output
        }
    }

    // Chunk slots into pages, then build page text from real slots only
    const pages: string[] = [];
    for (let i = 0; i < allSlots.length; i += linesPerPage) {
        const chunk = allSlots.slice(i, i + linesPerPage);
        const pageText = chunk.filter((s): s is string => s !== null).join("\n");
        pages.push(pageText);
    }

    return pages.length > 0 ? pages : [""];
}
