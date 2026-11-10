# HTTP 404 & Routing Precedence Verification — AarogyaDamu
**Eradication of Soft-404 Vulnerabilities on Vercel**

---

## 1. Problem Definition: The Soft-404 Vulnerability

Prior to Phase 2, `vercel.json` specified a universal SPA catch-all rewrite:
```json
{
  "source": "/(.*)",
  "destination": "/"
}
```

### The Soft-404 Threat
Under this rule, any request to a nonexistent URL (e.g. `https://www.aarogyadamu.com/nonexistent-route-xyz` or a spider scanning an outdated link) was internally rewritten to `/` (`dist/index.html`).
- The Vercel edge returned an **HTTP 200 OK** status code.
- Client-side React mounted and rendered the `NotFoundPage` component.
- Search engines (Googlebot, Bingbot) received an HTTP 200 on an error page, misclassifying the URL as a "Soft 404". This diluted domain authority and created crawl waste.

---

## 2. Vercel Routing & Filesystem Precedence Solution

Vercel employs a deterministic routing evaluation order:
1. **Security & Custom Headers:** Applied first.
2. **Redirects:** Host 308 redirect from `aarogyadamu.com` to `https://www.aarogyadamu.com/$1`.
3. **Static Files on Disk (`dist/`):** Matches any static file before evaluating rewrites.
4. **Rewrites:** Only evaluated if no static file matches.
5. **Vercel Default Error Handlers:** If no static file matches and no rewrite applies, Vercel searches for `dist/404.html`. If found, it is served with an authentic **HTTP 404 Not Found** status.

### Updated `vercel.json`
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://*.supabase.co https://*.upstash.io https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com; frame-ancestors 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; manifest-src 'self'; worker-src 'self';" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/(.*)",
      "has": [
        { "type": "host", "value": "aarogyadamu.com" }
      ],
      "destination": "https://www.aarogyadamu.com/$1",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

The catch-all `{ "source": "/(.*)", "destination": "/" }` was removed.

---

## 3. `dist/404.html` Generation Safeguards

To prevent subtle Vercel directory routing issues, the prerenderer explicitly emits:
- `dist/404.html` (**Generated**)
- `dist/404/index.html` (**Strictly Forbidden / Not Generated**)

### Content Attributes of `dist/404.html`:
- **Robots Directive:** `<meta name="robots" content="noindex, follow" />`
- **Canonical Tag:** None (`<link rel="canonical">` completely omitted)
- **Branding:** Full AarogyaDamu header, navigation links, and error alert
- **Body HTML:** Complete semantic structure rendered inside `<div id="root">`
- **Size:** 12,971 bytes

---

## 4. Empirical HTTP Status Code Verification

A local loopback HTTP server (`scripts/test-http.mjs`) tested all route combinations using `fetch()`:

```
[HTTP Test] Test server running on http://127.0.0.1:65278
[PASS] /                             -> HTTP 200 (Matches "AarogyaDamu")
[PASS] /about                        -> HTTP 200 (Matches "Building the Intelligence Layer")
[PASS] /faq                          -> HTTP 200 (Matches "Frequently Asked Questions")
[PASS] /contact                      -> HTTP 200 (Matches "Contact AarogyaDamu")
[PASS] /security                     -> HTTP 200 (Matches "Security Practices")
[PASS] /privacy                      -> HTTP 200 (Matches "Privacy Policy")
[PASS] /terms                        -> HTTP 200 (Matches "Terms of Service")
[PASS] /thank-you                    -> HTTP 200 (Matches "Message Received")
[PASS] /sitemap.xml                  -> HTTP 200 (Matches "http://www.sitemaps.org/schemas/sitemap/0.9")
[PASS] /nonexistent-route-xyz        -> HTTP 404 (Matches "Page Not Found")
[PASS] /random/nested/missing-page   -> HTTP 404 (Matches "Page Not Found")
[HTTP Test] Complete. All passed: true
```

### Result
- All 8 registered public and utility pages return **HTTP 200**.
- All random, missing, or typo URLs return **HTTP 404** while rendering the custom, branded 404 document.
- Zero soft-404 conditions exist.

---

## 5. API Endpoint Route Preservation

The API rewrite rule in `vercel.json`:
```json
{
  "source": "/api/:path*",
  "destination": "/api/:path*"
}
```
ensures that Vercel invokes serverless handlers in `api/`:
- `api/contact.ts` $\to$ `/api/contact`
- `api/early-access.ts` $\to$ `/api/early-access`

Both functions maintain their strict rate-limiting (Upstash Redis fallback), honeypot spam protection, and input sanitization contracts without interference from static prerendering.

