import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Text to Handwriting — Convert Your Text to Realistic Handwriting",
    description:
        "Free online tool to convert typed text into realistic handwriting. Choose from multiple handwriting styles, customize ink color, font size, and export as PNG or PDF.",
    keywords: ["text to handwriting", "handwriting generator", "convert text to handwriting", "handwriting font"],
    openGraph: {
        title: "Text to Handwriting",
        description: "Convert your typed text into realistic handwriting. Free, fast, no signup.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
