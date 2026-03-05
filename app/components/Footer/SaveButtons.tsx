"use client";

import React from "react";

interface SaveButtonsProps {
    isExporting: boolean;
    pageCount: number;
    onSavePNG: () => void;
    onSavePDF: () => void;
    onReset: () => void;
}

export default function SaveButtons({ isExporting, pageCount, onSavePNG, onSavePDF, onReset }: SaveButtonsProps) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-surface)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 40,
            }}>
            <Btn
                onClick={onSavePNG}
                disabled={isExporting}
                variant="primary"
                label={isExporting ? "Exporting..." : pageCount > 1 ? `Save PNGs (${pageCount})` : "Save PNG"}
            />
            <Btn
                onClick={onSavePDF}
                disabled={isExporting}
                variant="secondary"
                label={isExporting ? "Exporting..." : "Save PDF"}
            />
            <Btn onClick={onReset} disabled={isExporting} variant="ghost" label="Reset" />
        </div>
    );
}

function Btn({
    onClick,
    disabled,
    variant,
    label,
}: {
    onClick: () => void;
    disabled: boolean;
    variant: "primary" | "secondary" | "ghost";
    label: string;
}) {
    const styles: Record<string, React.CSSProperties> = {
        primary: {
            background: "var(--accent)",
            color: "#fff",
            border: "none",
        },
        secondary: {
            background: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
        },
        ghost: {
            background: "transparent",
            color: "var(--text-muted)",
            border: "none",
        },
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
                transition: "opacity 0.15s, transform 0.1s",
                ...styles[variant],
            }}
            onMouseEnter={(e) => {
                if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
                if (!disabled) (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}>
            {label}
        </button>
    );
}
