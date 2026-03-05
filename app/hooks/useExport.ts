"use client";

import { useCallback, useState } from "react";

/**
 * Handles exporting the paper page(s) as PNG or PDF.
 * Uses dynamic imports for html-to-image and jsPDF to avoid SSR issues
 * and to keep initial bundle size small.
 *
 * Usage:
 *   const { exportPNG, exportPDF, isExporting } = useExport();
 *   exportPNG(containerRef.current);
 *   exportPDF(containerRef.current);
 */
export function useExport() {
    const [isExporting, setIsExporting] = useState(false);

    /**
     * Captures a single DOM node as a PNG and triggers download.
     */
    const exportPNG = useCallback(async (pageEl: HTMLElement, fileName = "handwriting.png") => {
        setIsExporting(true);
        try {
            const { toPng } = await import("html-to-image");
            const dataUrl = await toPng(pageEl, {
                pixelRatio: 2, // 2× for crisp output
                cacheBust: true,
            });
            triggerDownload(dataUrl, fileName);
        } catch (err) {
            console.error("PNG export failed:", err);
        } finally {
            setIsExporting(false);
        }
    }, []);

    /**
     * Captures multiple page DOM nodes, compiles them into a single PDF,
     * and triggers download.
     */
    const exportPDF = useCallback(async (pageEls: HTMLElement[], fileName = "handwriting.pdf") => {
        setIsExporting(true);
        try {
            const { toPng } = await import("html-to-image");
            const { jsPDF } = await import("jspdf");

            // A4 dimensions in mm
            const A4_W = 210;
            const A4_H = 297;

            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            for (let i = 0; i < pageEls.length; i++) {
                const dataUrl = await toPng(pageEls[i], { pixelRatio: 2, cacheBust: true });

                if (i > 0) pdf.addPage();
                pdf.addImage(dataUrl, "PNG", 0, 0, A4_W, A4_H);
            }

            pdf.save(fileName);
        } catch (err) {
            console.error("PDF export failed:", err);
        } finally {
            setIsExporting(false);
        }
    }, []);

    return { exportPNG, exportPDF, isExporting };
}

// ─── Helper ────────────────────────────────────────────────────────────────
function triggerDownload(dataUrl: string, fileName: string) {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    link.click();
}
