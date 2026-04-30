import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://texttoownhandwriting.netlify.app";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Text to Handwriting Converter — Convert Text to Your Own Handwriting Free",
        template: "%s | Text to Handwriting Converter",
    },
    description:
        "Free online tool to convert typed text into your own handwriting. Upload your custom font, choose ink color, export as PNG or PDF. No signup, no watermark.",
    keywords: [
        "text to own handwriting converter",
        "text to handwriting converter",
        "convert text to human handwriting",
        "text to my handwriting converter",
        "text to my handwriting",
        "text to human handwriting converter",
        "text to handwriting converter",
        "text to human handwriting",
        "text to handwriting",
        "human handwriting ai",
    ],
    authors: [{ name: "Asmit Phuyal", url: "https://asmitphuyal.com.np" }],
    creator: "Asmit Phuyal",
    alternates: {
        canonical: BASE_URL,
    },
    openGraph: {
        title: "Text to Handwriting Converter — Convert Typed Text to Your Own Handwriting Free",
        description:
            "Free online tool to convert text to handwriting instantly. Multiple styles, custom fonts, export as PNG or PDF. No signup, no watermark.",
        url: BASE_URL,
        siteName: "Text to Handwriting Converter",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Text to Handwriting Converter — Convert text to realistic handwriting online free",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Text to Handwriting Converter — Free Online Tool",
        description:
            "Convert any text to handwriting instantly. Free, no signup, no watermark — export as PNG or PDF.",
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
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            name: "Text to Handwriting Converter",
                            url: BASE_URL,
                            description:
                                "Free online tool to convert text to handwriting instantly. Choose your style, customize ink color and font size, export as PNG or PDF. No signup, no watermark.",
                            applicationCategory: "UtilitiesApplication",
                            operatingSystem: "Web",
                            browserRequirements: "Requires JavaScript",
                            offers: {
                                "@type": "Offer",
                                price: "0",
                                priceCurrency: "USD",
                            },
                            author: {
                                "@type": "Person",
                                name: "Asmit Phuyal",
                                url: "https://asmitphuyal.com.np",
                            },
                            featureList: [
                                "Multiple handwriting font styles",
                                "Custom font upload (.ttf)",
                                "Adjustable font size",
                                "Custom ink color",
                                "Ruled lines and margin",
                                "Export as PNG",
                                "Export as PDF",
                                "Multi-page support",
                                "No signup required",
                                "No watermark",
                            ],
                        }),
                    }}
                />
                {children}
            </body>
        </html>
    );
}
