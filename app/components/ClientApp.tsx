"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PaperCanvas from "./Paper/PaperCanvas";
import SaveButtons from "./Footer/SaveButtons";
import { useFontLoader } from "../hooks/useFontLoader";
import { useExport } from "../hooks/useExport";
import type { EditorState, FontOption } from "../types";

// ─── Default state ──────────────────────────────────────────────────────────
const DEFAULT_STATE: EditorState = {
    text: "",
    fontSize: 24,
    inkColor: "#0f0f0f",
    showLines: true,
    showMargin: true,
    selectedFont: "handwriting1",
    customFontName: null,
    customFontBase64: null,
};

const LINE_HEIGHT_MULTIPLIER = 1.9;

// ─── Dark mode ───────────────────────────────────────────────────────────────
function useDarkMode() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setDark(mq.matches);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return { dark, toggle: () => setDark((d) => !d) };
}

// ─── Client app ──────────────────────────────────────────────────────────────
export default function ClientApp() {
    const [state, setState] = useState<EditorState>(DEFAULT_STATE);
    const { dark, toggle: toggleDark } = useDarkMode();
    const { ensureBuiltInFont, loadCustomFont } = useFontLoader();
    const { exportPNG, exportPDF, isExporting } = useExport();

    const pageEls = useRef<HTMLDivElement[]>([]);
    const [pageCount, setPageCount] = useState(1);

    const fontFamily =
        state.selectedFont === "custom" && state.customFontName ? state.customFontName : state.selectedFont;

    useEffect(() => {
        if (state.selectedFont !== "custom") {
            ensureBuiltInFont(state.selectedFont);
        }
    }, [state.selectedFont, ensureBuiltInFont]);

    const handleChange = useCallback(<K extends keyof EditorState>(key: K, value: EditorState[K]) => {
        setState((prev) => ({ ...prev, [key]: value }));
    }, []);

    const handleCustomFontUpload = useCallback(
        async (file: File) => {
            const { fontName, base64 } = await loadCustomFont(file);
            setState((prev) => ({
                ...prev,
                customFontName: fontName,
                customFontBase64: base64,
                selectedFont: "custom" as FontOption,
            }));
        },
        [loadCustomFont],
    );

    const handlePagesReady = useCallback((pages: HTMLDivElement[]) => {
        pageEls.current = pages;
        setPageCount(pages.length);
    }, []);

    const handleSavePNG = async () => {
        const pages = pageEls.current;
        if (!pages.length) return;
        if (pages.length === 1) {
            await exportPNG(pages[0]);
        } else {
            for (let i = 0; i < pages.length; i++) {
                await exportPNG(pages[i], `handwriting-page-${i + 1}.png`);
            }
        }
    };

    const handleSavePDF = async () => {
        const pages = pageEls.current;
        if (!pages.length) return;
        await exportPDF(pages);
    };

    const handleReset = () => {
        setState(DEFAULT_STATE);
    };

    return (
        <div
            style={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-page)",
                paddingBottom: 64,
            }}>
            <Header darkMode={dark} onToggleDark={toggleDark} />

            <main
                style={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "1fr 320px",
                    gap: 0,
                    maxWidth: 1400,
                    width: "100%",
                    margin: "0 auto",
                    padding: "24px 20px",
                    boxSizing: "border-box",
                    alignItems: "start",
                }}
                className="main-layout">
                <div style={{ minWidth: 0, paddingRight: 20 }}>
                    <PaperCanvas
                        text={state.text}
                        fontFamily={fontFamily}
                        fontSize={state.fontSize}
                        lineHeightMultiplier={LINE_HEIGHT_MULTIPLIER}
                        inkColor={state.inkColor}
                        showLines={state.showLines}
                        showMargin={state.showMargin}
                        onPagesReady={handlePagesReady}
                    />
                </div>

                <div
                    style={{
                        position: "sticky",
                        top: 56,
                        height: "calc(100vh - 56px - 64px)",
                        overflowY: "auto",
                        paddingBottom: 12,
                    }}>
                    <Sidebar
                        state={state}
                        onChange={handleChange}
                        onCustomFontUpload={handleCustomFontUpload}
                        pageCount={pageCount}
                    />
                </div>
            </main>

            <SaveButtons
                isExporting={isExporting}
                pageCount={pageCount}
                onSavePNG={handleSavePNG}
                onSavePDF={handleSavePDF}
                onReset={handleReset}
            />

            <style>{`
        @media (max-width: 768px) {
          .main-layout {
            grid-template-columns: 1fr !important;
            padding: 16px 12px !important;
          }
          .main-layout > div:first-child {
            padding-right: 0 !important;
          }
          .main-layout > div:last-child {
            position: static !important;
            height: auto !important;
            overflow-y: visible !important;
          }
        }
      `}</style>
        </div>
    );
}
