"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import A4Paper from "./A4Paper";
import { A4_WIDTH_PX, A4_HEIGHT_PX, MAX_PAGES, NO_MARGIN_PADDING_LEFT } from "../../types";
import { splitTextIntoPages } from "./paginate";

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

    // ── Font readiness ──────────────────────────────────────────────────────
    // Wrapping is measured against the active font. Until that font has loaded
    // the browser measures with a fallback face and breaks lines in the wrong
    // places, so re-run the split once it is ready.
    const [fontRevision, setFontRevision] = useState(0);

    useEffect(() => {
        if (typeof document === "undefined" || !document.fonts) return;
        let cancelled = false;
        document.fonts
            .load(`${fontSize}px "${fontFamily}"`)
            .catch(() => undefined)
            .then(() => {
                if (!cancelled) setFontRevision((r) => r + 1);
            });
        return () => {
            cancelled = true;
        };
    }, [fontFamily, fontSize]);

    // ── Text → pages split ──────────────────────────────────────────────────
    const lineGap = Math.round(fontSize * lineHeightMultiplier);
    // Mirror A4Paper's geometry exactly. If these drift, text wraps against one
    // width and renders at another, which is how pages end up over/underfilled.
    const effectivePaddingTop = showLines ? paddingTop + lineGap : paddingTop;
    const effectivePaddingLeft = showMargin ? paddingLeft : NO_MARGIN_PADDING_LEFT;
    const usableHeight = A4_HEIGHT_PX - effectivePaddingTop - paddingBottom;
    const linesPerPage = Math.max(1, Math.floor(usableHeight / lineGap));
    const usableWidth = A4_WIDTH_PX - effectivePaddingLeft - paddingRight;

    const { pages, truncated } = useMemo(
        () => splitTextIntoPages(text, { linesPerPage, usableWidth, fontFamily, fontSize }),
        // fontRevision is deliberate: it re-measures once the webfont has loaded.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [text, linesPerPage, usableWidth, fontFamily, fontSize, fontRevision],
    );

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
                            showPlaceholder={i === 0 && !text.trim()}
                        />
                    </div>
                </div>
            ))}

            {truncated && (
                <p
                    style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        textAlign: "center",
                        margin: "4px 16px 0",
                        lineHeight: 1.6,
                    }}>
                    Showing the first {MAX_PAGES} pages. Shorten your text or reduce the font size to fit the
                    rest.
                </p>
            )}
        </div>
    );
}
