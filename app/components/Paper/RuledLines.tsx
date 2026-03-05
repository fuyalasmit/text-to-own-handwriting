"use client";

import React from "react";

interface RuledLinesProps {
    /** Total height of the paper in px (e.g. 1123) */
    paperHeight: number;
    /** The gap between lines in px — should match text line-height exactly */
    lineGap: number;
    /** Vertical offset from the top before first line starts (matches text padding-top) */
    offsetTop: number;
}

/**
 * Renders horizontal ruled lines across the paper.
 * Lines are calculated dynamically so they always align with text.
 * No manual adjustment needed — lineGap is derived from fontSize × lineHeightMultiplier.
 */
export default function RuledLines({ paperHeight, lineGap, offsetTop }: RuledLinesProps) {
    if (lineGap <= 0) return null;

    const lines: number[] = [];
    let y = offsetTop;
    while (y <= paperHeight) {
        lines.push(y);
        y += lineGap;
    }

    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
            }}>
            {lines.map((y) => (
                <div
                    key={y}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: y,
                        height: 1,
                        backgroundColor: "var(--paper-line)",
                    }}
                />
            ))}
        </div>
    );
}
