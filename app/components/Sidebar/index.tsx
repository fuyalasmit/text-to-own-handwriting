"use client";

import React, { useRef } from "react";
import { BUILT_IN_FONTS, type EditorState, type FontOption } from "../../types";

interface SidebarProps {
    state: EditorState;
    onChange: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
    onCustomFontUpload: (file: File) => Promise<void>;
    pageCount: number;
}

// ─── Ink colour presets ─────────────────────────────────────────────────────
const INK_PRESETS = [
    { label: "Black", value: "#0f0f0f" },
    { label: "Dark Blue", value: "#1a237e" },
    { label: "Navy", value: "#0d2137" },
    { label: "Dark Green", value: "#1b5e20" },
    { label: "Burgundy", value: "#4a0010" },
];

export default function Sidebar({ state, onChange, onCustomFontUpload, pageCount }: SidebarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await onCustomFontUpload(file);
        // Reset so same file can be re-uploaded
        e.target.value = "";
    };

    return (
        <aside
            className="glass"
            style={{
                width: "100%",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                height: "fit-content",
            }}>
            {/* ── Text Input ──────────────────────────────── */}
            <Section title="Your Text">
                <textarea
                    value={state.text}
                    onChange={(e) => onChange("text", e.target.value)}
                    placeholder="Type or paste your text here…"
                    rows={8}
                    style={{
                        width: "100%",
                        resize: "vertical",
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--bg-glass)",
                        color: "var(--text-primary)",
                        fontSize: 14,
                        padding: "10px 12px",
                        lineHeight: 1.6,
                        outline: "none",
                        transition: "border-color 0.2s",
                        fontFamily: "inherit",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                <div
                    style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        textAlign: "right",
                        marginTop: 4,
                    }}>
                    {state.text.length} chars · {pageCount} {pageCount === 1 ? "page" : "pages"}
                </div>
            </Section>

            {/* ── Font ────────────────────────────────────── */}
            <Section title="Handwriting Style">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {BUILT_IN_FONTS.map((font) => (
                        <FontOption
                            key={font.id}
                            fontId={font.id}
                            label={font.label}
                            selected={state.selectedFont === font.id}
                            onSelect={() => onChange("selectedFont", font.id)}
                        />
                    ))}

                    {/* Custom font option */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 10px",
                            borderRadius: 8,
                            border: `1px solid ${state.selectedFont === "custom" ? "var(--accent)" : "var(--border)"}`,
                            background: state.selectedFont === "custom" ? "rgba(82,183,136,0.08)" : "transparent",
                            cursor: "pointer",
                            transition: "all 0.15s",
                        }}
                        onClick={() => {
                            if (state.customFontName) {
                                onChange("selectedFont", "custom");
                            } else {
                                fileInputRef.current?.click();
                            }
                        }}>
                        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>+</span>
                        <span
                            style={{
                                fontSize: 13,
                                color: state.selectedFont === "custom" ? "var(--accent)" : "var(--text-secondary)",
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                            {state.customFontName ?? "Upload your font (.ttf)"}
                        </span>
                        {state.customFontName && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                }}
                                style={{
                                    fontSize: 11,
                                    color: "var(--accent)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: 0,
                                }}>
                                Change
                            </button>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".ttf,.otf,.woff,.woff2"
                        style={{ display: "none" }}
                        onChange={handleFontUpload}
                    />
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
                        Make your own font at{" "}
                        <a
                            href="https://www.calligraphr.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--accent)", textDecoration: "underline" }}>
                            calligraphr.com
                        </a>
                    </p>
                </div>
            </Section>

            {/* ── Font Size ───────────────────────────────── */}
            <Section title="Font Size">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                        type="range"
                        min={14}
                        max={48}
                        value={state.fontSize}
                        onChange={(e) => onChange("fontSize", Number(e.target.value))}
                        style={{ flex: 1, accentColor: "var(--accent)" }}
                    />
                    <div
                        style={{
                            minWidth: 44,
                            textAlign: "center",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                            padding: "3px 6px",
                        }}>
                        {state.fontSize}px
                    </div>
                </div>
            </Section>

            {/* ── Ink Color ───────────────────────────────── */}
            <Section title="Ink Color">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                    {INK_PRESETS.map((preset) => (
                        <button
                            key={preset.value}
                            title={preset.label}
                            onClick={() => onChange("inkColor", preset.value)}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: preset.value,
                                border:
                                    state.inkColor === preset.value
                                        ? "3px solid var(--accent)"
                                        : "2px solid var(--border)",
                                cursor: "pointer",
                                transition: "transform 0.15s, border-color 0.15s",
                                transform: state.inkColor === preset.value ? "scale(1.15)" : "scale(1)",
                            }}
                        />
                    ))}
                    {/* Custom color picker */}
                    <label
                        title="Custom color"
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            border: "2px dashed var(--border)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            overflow: "hidden",
                            position: "relative",
                        }}>
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>+</span>
                        <input
                            type="color"
                            value={state.inkColor}
                            onChange={(e) => onChange("inkColor", e.target.value)}
                            style={{
                                position: "absolute",
                                opacity: 0,
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                            }}
                        />
                    </label>
                </div>
            </Section>

            {/* ── Paper Options ────────────────────────────── */}
            <Section title="Paper Options">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Toggle
                        label="Ruled lines"
                        description="Show horizontal lines"
                        checked={state.showLines}
                        onChange={(v) => onChange("showLines", v)}
                    />
                    <Toggle
                        label="Margin line"
                        description="Show left margin"
                        checked={state.showMargin}
                        onChange={(v) => onChange("showMargin", v)}
                    />
                </div>
            </Section>
        </aside>
    );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <div
                style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: 8,
                }}>
                {title}
            </div>
            {children}
        </div>
    );
}

function FontOption({
    fontId,
    label,
    selected,
    onSelect,
}: {
    fontId: string;
    label: string;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            onClick={onSelect}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 10px",
                borderRadius: 8,
                border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                background: selected ? "rgba(82,183,136,0.08)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                width: "100%",
            }}>
            <span
                style={{
                    fontFamily: `"${fontId}", cursive`,
                    fontSize: 18,
                    color: selected ? "var(--accent)" : "var(--text-primary)",
                }}>
                {label}
            </span>
        </button>
    );
}

function Toggle({
    label,
    description,
    checked,
    onChange,
}: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
            }}>
            <div>
                <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{description}</div>
            </div>
            <button
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                style={{
                    width: 40,
                    height: 22,
                    borderRadius: 11,
                    background: checked ? "var(--accent)" : "var(--border)",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                }}>
                <span
                    style={{
                        position: "absolute",
                        top: 2,
                        left: checked ? 20 : 2,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.2s",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }}
                />
            </button>
        </div>
    );
}
