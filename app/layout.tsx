import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://texttohandwriting.asmitphuyal.com.np";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Text to Own Handwriting Converter | Free Online Tool",
        template: "%s | Text to Own Handwriting",
    },
    description:
        "Free online tool to convert typed text into realistic handwriting. Choose from multiple handwriting styles, customize ink color and font size, and export as PNG or PDF. No signup required.",
    keywords: [
        "text to handwriting",
        "text to own handwriting",
        "text to handwriting converter",
        "text to human handwriting",
        "convert text to handwriting",
        "text to handwriting online",
        "handwriting generator",
        "text to handwriting ai",
        "handwriting font converter",
        "typed text to handwriting",
    ],
    authors: [{ name: "Asmit Phuyal", url: "https://asmitphuyal.com.np" }],
    creator: "Asmit Phuyal",
    alternates: {
        canonical: BASE_URL,
    },
    openGraph: {
        title: "Text to Own Handwriting — Convert Text to Realistic Handwriting Online",
        description:
            "Free online tool to convert your typed text into realistic handwriting. Multiple styles, custom fonts, export as PNG or PDF. No signup required.",
        url: BASE_URL,
        siteName: "Text to Own Handwriting",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Text to Own Handwriting — Convert Text to Realistic Handwriting",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Text to Own Handwriting",
        description: "Convert your typed text into realistic handwriting. Free, no signup, export as PNG or PDF.",
        images: ["/opengraph-image"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
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
