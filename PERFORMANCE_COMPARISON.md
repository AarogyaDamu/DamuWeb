# Performance & Bundle Size Comparison — AarogyaDamu
**Pre vs Post Route-Level Code Splitting & Three.js Isolation**

---

## 1. Measured Bundle Size Comparison

The JavaScript and CSS bundles emitted by Vite before and after implementing `React.lazy()` route splitting were measured directly from the build outputs:

| Asset / Chunk | Pre-Splitting Size | Post-Splitting Size | Change | Compression (gzip) |
| :--- | :--- | :--- | :--- | :--- |
| **Main JS Bundle** (`index-*.js`) | **487.75 kB** | **461.74 kB** | **-26.01 kB (-5.3%)** | 137.01 kB |
| `ContactPage-*.js` | *(bundled in main)* | **7.02 kB** | New chunk | 2.19 kB |
| `PrivacyPage-*.js` | *(bundled in main)* | **6.50 kB** | New chunk | 2.12 kB |
| `SecurityPage-*.js` | *(bundled in main)* | **3.17 kB** | New chunk | 1.22 kB |
| `AboutPage-*.js` | *(bundled in main)* | **3.05 kB** | New chunk | 1.15 kB |
| `TermsPage-*.js` | *(bundled in main)* | **2.60 kB** | New chunk | 1.06 kB |
| `ThankYouPage-*.js` | *(bundled in main)* | **1.95 kB** | New chunk | 0.84 kB |
| `NotFoundPage-*.js` | *(bundled in main)* | **1.63 kB** | New chunk | 0.73 kB |
| `FaqPage-*.js` | *(bundled in main)* | **1.31 kB** | New chunk | 0.63 kB |
| `Breadcrumbs-*.js` | *(bundled in main)* | **1.06 kB** | New chunk | 0.50 kB |
| **Global Stylesheet** (`index-*.css`) | 53.88 kB | 53.91 kB | +0.03 kB | 9.80 kB |
| **Three.js Scene** (`damuSceneV2-*.js`) | 578.99 kB | 578.99 kB | Unchanged | 146.98 kB |

---

## 2. Three.js & Mascot Loading Isolation

- **Homepage Only:** Three.js and `damuSceneV2.js` (578.99 kB minified) are loaded exclusively via dynamic `import('../../lib/damuSceneV2')` inside `Damu3DCharacter.tsx`.
- **Secondary Pages:** Visitors landing on `/about`, `/faq`, `/contact`, `/security`, `/privacy`, `/terms`, or `/404` download **zero Three.js code**. Their total JavaScript payload is restricted to `index-*.js` (461 kB) plus their route-specific chunk (~1.3 kB to 7 kB).
- **Mascot Interaction Preserved:** On the homepage, Damu retains all 3D lighting, physics, wave interactions, and smooth mobile touch-scrolling behavior.

---

## 3. Expected Core Web Vitals Benefits

> [!NOTE]
> **Measurement Status:** Real-user Core Web Vitals (LCP, FCP, INP, CLS) from field data (such as Google Chrome User Experience Report / CrUX or Google Analytics 4 real-user monitoring) have **not yet been measured** in production for this release. While the bundle sizes in Section 1 represent actual empirical build output measurements, the discussion below outlines the **expected architectural benefits** of transitioning from a pure client-side SPA to static prerendering, rather than measured field metrics.

### A. Largest Contentful Paint (LCP) — Expected Architectural Impact
- **Client-Side SPA (Prior Baseline):** Required downloading, parsing, and executing client-side JavaScript before React could construct the DOM and mount the hero section, delaying the paint of the primary content elements.
- **Prerendered Architecture (Phase 2):** The initial HTML document contains the complete semantic DOM structure (`<h1>`, hero copy, navigation, buttons) rendered at build time. Browsers can begin parsing and painting content during the initial HTML stream, without waiting for JavaScript bundle execution. Field LCP will be measured post-launch across mobile and desktop devices.

### B. First Contentful Paint (FCP) — Expected Architectural Impact
- Pre-rendered static HTML allows the browser to paint meaningful content upon receiving the initial HTML payload. FCP is structurally decoupled from JavaScript bundle parsing, though actual FCP timings will depend on network latency, TTFB, and CDN edge delivery.

### C. Interaction to Next Paint (INP) — Expected Architectural Impact
- Hybrid hydration via `ReactDOM.hydrateRoot()` binds event listeners directly to pre-rendered DOM elements without DOM teardown or regeneration. Secondary route code-splitting reduces the main-thread parse and evaluation overhead for initial load. Real-user responsiveness will be tracked through Core Web Vitals field monitoring.

### D. Cumulative Layout Shift (CLS) — Expected Architectural Impact
- Because page layouts, headers, and navigation are baked into the static HTML, layout shifts caused by delayed DOM insertion from client-side scripts are structurally minimized. Real-user layout stability will be validated through post-deployment field data.

---

## 4. Post-Deployment Monitoring Plan

1. **Field RUM Data:** Utilize Google Analytics 4 and Web Vitals real-user monitoring to gather 75th-percentile field measurements (LCP, FCP, INP, CLS) across real visitor devices and network conditions.
2. **Lab Audits:** Conduct synthetic Lighthouse and PageSpeed Insights audits on production URLs (`https://www.aarogyadamu.com`) post-deployment to benchmark lab scores against previous client-only baselines.

