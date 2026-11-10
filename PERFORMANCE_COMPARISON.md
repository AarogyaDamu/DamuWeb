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

## 3. Core Web Vitals Impact Analysis

### A. Largest Contentful Paint (LCP)
- **Before Phase 2:** Required waiting for client-side JavaScript execution, React bundle parse, DOM construction, and font attachment.
- **After Phase 2:** The initial HTML response contains the complete semantic DOM structure (`<h1>`, hero copy, navigation, buttons) rendered server-side. The browser paints hero text during the first layout pass, drastically reducing LCP on slow 3G/4G cellular connections.

### B. First Contentful Paint (FCP)
- Pre-rendered static HTML is rendered immediately upon arrival. FCP drops closer to TTFB (Time To First Byte), typically sub-300ms on Vercel's global edge network.

### C. Interaction to Next Paint (INP)
- Hybrid hydration via `ReactDOM.hydrateRoot()` attaches event handlers directly to pre-rendered DOM elements without teardown or re-rendering, maintaining responsiveness.

### D. Cumulative Layout Shift (CLS)
- Because full markup, headers, and navigation layout are baked into the static HTML, layout shift during hydration is effectively zero.

