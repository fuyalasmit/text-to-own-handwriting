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

                {/* Right side actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {/* GitHub link */}
                    <a
                        href="https://github.com/fuyalasmit/text-to-own-handwriting"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
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
                            color: "var(--text-secondary)",
                            textDecoration: "none",
                            transition: "background 0.2s, border-color 0.2s",
                        }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                    </a>

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
            </div>
        </header>
    );
}
