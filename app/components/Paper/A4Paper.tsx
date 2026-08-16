"use client";

import React, { forwardRef } from "react";
import RuledLines from "./RuledLines";
import MarginLine from "./MarginLine";
import { A4_WIDTH_PX, A4_HEIGHT_PX } from "../../types";

interface A4PaperProps {
    /** The text content to render */
    text: string;
    /** Active CSS font-family name */
    fontFamily: string;
    /** Font size in px */
    fontSize: number;
    /** Line height multiplier (e.g. 1.8) */
    lineHeightMultiplier: number;
    /** Ink / text color */
    inkColor: string;
    /** Show ruled lines */
    showLines: boolean;
    /** Show left margin line */
    showMargin: boolean;
    /**
     * Padding around text area in px.
     * [top, right, bottom, left]
     */
    padding?: [number, number, number, number];
    /**
     * Render the intro/how-to hint on the blank page.
     * Only the first page should set this, and only while the editor is empty.
     */
    showPlaceholder?: boolean;
}

/**
 * Shown on the empty page so the first thing a visitor sees explains the tool.
 * Written as discrete lines because the text area is `pre-wrap` — each entry
 * lands on its own ruled line. Keep this at 9 lines or fewer so it still fits
 * the page at larger font sizes.
 */
const PLACEHOLDER_LINES = [
    "Text to Handwriting Converter",
    "Turn typed text into real handwriting.",
    "Free. No signup, no watermark.",
    "",
    "How to use",
    "1. Type or paste your text in the panel.",
    "2. Pick a handwriting style.",
    "3. Set the size, ink colour and lines.",
    "4. Save as PNG or PDF.",
];

/**
 * A4 Paper component.
 *
 * Always rendered at 794×1123 px (A4 at 96 dpi).
 * The parent is responsible for scaling it to fit the viewport
 * using CSS transform: scale().
 *
 * forwardRef is used so the parent can pass the element to html-to-image for export.
 */
const A4Paper = forwardRef<HTMLDivElement, A4PaperProps>(function A4Paper(
    {
        text,
        fontFamily,
        fontSize,
        lineHeightMultiplier,
        inkColor,
        showLines,
        showMargin,
        padding = [48, 24, 48, 80],
        showPlaceholder = false,
    },
    ref,
) {
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;

    // The line gap in px — used by both text line-height and RuledLines
    const lineGap = Math.round(fontSize * lineHeightMultiplier);

    // When margin line is off, shrink left padding so text uses more of the page
    const effectivePaddingLeft = showMargin ? paddingLeft : 60;

    // Margin line position sits 8px inside the left padding
    const marginLineLeft = paddingLeft - 8;

    // Offset for ruled lines: nudge factor brings lines tight under the text baseline.
    const ruledLineOffset = paddingTop + lineGap - Math.round(fontSize * 0.55);

    // When lines are off, no need for the extra lineGap offset at the top
    const effectivePaddingTop = showLines ? paddingTop + lineGap : paddingTop;

    return (
        <div
            ref={ref}
            className="paper-texture"
            style={{
                position: "relative",
                width: A4_WIDTH_PX,
                height: A4_HEIGHT_PX,
                backgroundColor: "var(--paper-bg)",
                boxShadow: "0 4px 32px var(--paper-shadow)",
                borderRadius: 2,
                overflow: "hidden",
                flexShrink: 0,
            }}>
            {/* Ruled lines — rendered behind text */}
            {showLines && (
                <RuledLines paperHeight={A4_HEIGHT_PX} lineGap={lineGap} offsetTop={ruledLineOffset} />
            )}

            {/* Margin line */}
            {showMargin && <MarginLine left={marginLineLeft} />}

            {/* Text area */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    paddingTop: effectivePaddingTop,
                    paddingRight,
                    paddingBottom,
                    paddingLeft: effectivePaddingLeft,
                    fontFamily: `"${fontFamily}", cursive`,
                    fontSize,
                    lineHeight: `${lineGap}px`,
                    color: inkColor,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    zIndex: 2,
                    // Prevent text selection highlight from showing on export
                    userSelect: "none",
                    WebkitUserSelect: "none",
                }}>
                {text || null}

                {/* Hint on the blank page. data-export-ignore keeps it out of PNG/PDF captures. */}
                {showPlaceholder && (
                    <span data-export-ignore="true" style={{ opacity: 0.4 }}>
                        {PLACEHOLDER_LINES.join("\n")}
                    </span>
                )}
            </div>
        </div>
    );
});

export default A4Paper;
