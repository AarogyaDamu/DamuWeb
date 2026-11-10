# XML Sitemap Validation Report — AarogyaDamu
**Automated Build-Time Sitemap Generation & Verification**

---

## 1. Overview

In Phase 2, sitemap generation is automated directly inside `scripts/prerender.mjs`.

Whenever `npm run build` executes, the sitemap is deterministically compiled and written to:
- `dist/sitemap.xml` (Served to production crawlers)

`public/sitemap.xml` remains locked at its committed baseline so that routine builds do not pollute the git working directory.

---

## 2. Inclusion & Exclusion Rules

| Criterion | Rule | Status |
| :--- | :--- | :--- |
| **Canonical Public Routes** | Only indexable pages with `isCanonicalIndexable: true` | **Included** (7 routes) |
| **Domain Origin** | Must strictly use `https://www.aarogyadamu.com` | **Enforced** |
| **404 Page** | `/404` must never be listed in sitemaps | **Excluded** |
| **Confirmation Pages** | `/thank-you` must never be listed in sitemaps | **Excluded** |
| **Draft Routes** | `/services`, `/blog`, `/case-studies` unlinked drafts | **Excluded** |
| **Authenticated Routes** | Private application or user data paths | **Excluded** |
| **`lastmod` Timestamp** | Derived from real git commit history (`git log -1 --format=%cs -- <file>`) | **Verified** |
| **Fallback for `lastmod`** | If git history is unavailable or invalid, omit tag | **Verified** |

---

## 3. Verified Sitemap Content (`dist/sitemap.xml`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.aarogyadamu.com/</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/about</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/faq</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/contact</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/security</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/privacy</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
  <url>
    <loc>https://www.aarogyadamu.com/terms</loc>
    <lastmod>2026-11-10</lastmod>
  </url>
</urlset>
```

---

## 4. Syntax & Schema Validation Checks

1. **XML Declaration:** Valid `<?xml version="1.0" encoding="UTF-8"?>`.
2. **Namespace:** Standard `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`.
3. **URL Count:** Exactly 7 `<url>` elements.
4. **Clean Dates:** Standard W3C Datetime format `YYYY-MM-DD`.
5. **No Trailing/Inconsistent Slashes:** Only the root URL contains a trailing slash (`https://www.aarogyadamu.com/`), while subpages follow the strict canonical scheme (`/about`, `/faq`, `/contact`, `/security`, `/privacy`, `/terms`).
6. **Robots.txt Reference:** Matches `Sitemap: https://www.aarogyadamu.com/sitemap.xml` in `public/robots.txt`.

