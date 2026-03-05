"use client";

import React from "react";

interface MarginLineProps {
    /** Distance from left edge in px */
    left: number;
}

/**
 * Renders the red vertical margin line on the left side of the paper.
 */
export default function MarginLine({ left }: MarginLineProps) {
    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: left,
                width: 1.5,
                backgroundColor: "var(--paper-margin)",
                zIndex: 1,
                pointerEvents: "none",
            }}
        />
    );
}
