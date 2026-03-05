"use client";

import React from "react";

interface HeaderProps {
    darkMode: boolean;
    onToggleDark: () => void;
}

export default function Header({ darkMode, onToggleDark }: HeaderProps) {
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                borderBottom: "1px solid var(--border)",
                background: "var(--bg-surface)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
            }}>
            <div
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    padding: "0 20px",
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div>
                        <div
                            style={{
                                fontWeight: 700,
                                fontSize: 16,
                                color: "var(--text-primary)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}>
                            Text to Handwriting
                        </div>
                        <div
                            style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                                lineHeight: 1.3,
                            }}>
                            Convert your text into realistic handwriting — download as PNG or PDF
                        </div>
                    </div>
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={onToggleDark}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: "1px solid var(--border)",
                        background: "var(--bg-glass)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.2s, border-color 0.2s",
                        color: "var(--text-secondary)",
                    }}>
                    {darkMode ? (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}
