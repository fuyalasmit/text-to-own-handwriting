import type { MetadataRoute } from "next";

const BASE_URL = "https://texttoownhandwriting.netlify.app";

// Bump this only when the page content actually changes. A lastmod that moves on
// every build is noise, and Google learns to ignore it.
const LAST_CONTENT_UPDATE = new Date("2026-08-16");

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            // No trailing slash, matching the canonical Next emits for the root.
            url: BASE_URL,
            lastModified: LAST_CONTENT_UPDATE,
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}
