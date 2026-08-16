import type { Metadata } from "next";
import "./globals.css";
import { faqs } from "./content/faqs";

const BASE_URL = "https://texttoownhandwriting.netlify.app";
// The site is served at the root, so every self-reference uses the trailing-slash
// form. Canonical and sitemap must agree or Google picks one for us.
const CANONICAL_URL = `${BASE_URL}/`;

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
        canonical: CANONICAL_URL,
    },
    openGraph: {
        title: "Text to Handwriting Converter — Convert Typed Text to Your Own Handwriting Free",
        description:
            "Free online tool to convert text to handwriting instantly. Multiple styles, custom fonts, export as PNG or PDF. No signup, no watermark.",
        url: CANONICAL_URL,
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
                            "@graph": [
                                {
                                    "@type": "WebApplication",
                                    "@id": `${CANONICAL_URL}#app`,
                                    name: "Text to Handwriting Converter",
                                    url: CANONICAL_URL,
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
                                },
                                {
                                    "@type": "FAQPage",
                                    "@id": `${CANONICAL_URL}#faq`,
                                    mainEntity: faqs.map(({ q, a }) => ({
                                        "@type": "Question",
                                        name: q,
                                        acceptedAnswer: { "@type": "Answer", text: a },
                                    })),
                                },
                            ],
                        }),
                    }}
                />
                {children}
            </body>
        </html>
    );
}
