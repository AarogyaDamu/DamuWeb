# Structured Data Audit & Schema.org Specification — AarogyaDamu
**Unified Interconnected @graph Architecture**

---

## 1. Overview of Changes

Prior to Phase 2, JSON-LD schema definitions were fragmented across individual layout components:
- `Footer.tsx` rendered an isolated `Organization` script on every page.
- `Breadcrumbs.tsx` rendered an independent `BreadcrumbList` script on subpages.
- `HomePage.tsx` lacked structured data altogether.

Phase 2 replaces this fragmented approach with a centralized schema builder (`src/lib/schema.ts`) that outputs a single, interconnected **Schema.org `@graph`** using stable URI fragment identifiers (`@id`).

---

## 2. Entity Hierarchy & Stable Identifiers

```mermaid
classDiagram
    class Organization {
        +@id "https://www.aarogyadamu.com/#organization"
        +name "AarogyaDamu"
        +url "https://www.aarogyadamu.com"
        +logo "https://www.aarogyadamu.com/android-chrome-512x512.png"
        +email "contact@aarogyadamu.com"
    }

    class WebSite {
        +@id "https://www.aarogyadamu.com/#website"
        +url "https://www.aarogyadamu.com"
        +name "AarogyaDamu"
        +publisher -> Organization
        +inLanguage "en-IN"
    }

    class WebPage {
        +@id "https://www.aarogyadamu.com/{path}#webpage"
        +url "https://www.aarogyadamu.com/{path}"
        +isPartOf -> WebSite
        +about -> Organization
        +breadcrumb -> BreadcrumbList
    }

    class SoftwareApplication {
        +@id "https://www.aarogyadamu.com/#software"
        +name "AarogyaDamu"
        +applicationCategory "HealthApplication"
        +operatingSystem "Web"
        +publisher -> Organization
    }

    class BreadcrumbList {
        +@id "https://www.aarogyadamu.com/{path}#breadcrumb"
        +itemListElement ListItem[]
    }

    class FAQPage {
        +@id "https://www.aarogyadamu.com/faq#faq"
        +isPartOf -> WebPage
        +mainEntity Question[]
    }

    Organization <-- WebSite : publisher
    WebSite <-- WebPage : isPartOf
    Organization <-- WebPage : about
    Organization <-- SoftwareApplication : publisher
    BreadcrumbList <-- WebPage : breadcrumb
    WebPage <-- FAQPage : isPartOf
```

---

## 3. Verified Graph Payloads by Route

### A. Homepage (`/`)
Includes 4 connected nodes:
1. `Organization` (`https://www.aarogyadamu.com/#organization`)
2. `WebSite` (`https://www.aarogyadamu.com/#website`)
3. `WebPage` (`https://www.aarogyadamu.com/#webpage`)
4. `SoftwareApplication` (`https://www.aarogyadamu.com/#software`):
   - Category: `HealthApplication`
   - OS: `Web`
   - Strict guideline compliance: no fabricated address or pricing offers

### B. FAQ Page (`/faq`)
Includes 5 connected nodes:
1. `Organization` (`#organization`)
2. `WebSite` (`#website`)
3. `WebPage` (`https://www.aarogyadamu.com/faq#webpage`)
4. `FAQPage` (`https://www.aarogyadamu.com/faq#faq`):
   - 6 Verified Q&A items mapped from `FAQ_DATA`
5. `BreadcrumbList` (`https://www.aarogyadamu.com/faq#breadcrumb`):
   - Position 1: Home (`https://www.aarogyadamu.com/`)
   - Position 2: FAQ (`https://www.aarogyadamu.com/faq`)

### C. Contact Page (`/contact`)
Includes 4 connected nodes:
1. `Organization` (`#organization`)
2. `WebSite` (`#website`)
3. `ContactPage` (`https://www.aarogyadamu.com/contact#webpage`):
   - `mainEntity`: Reference to `#organization`
4. `BreadcrumbList` (`https://www.aarogyadamu.com/contact#breadcrumb`)

### D. About Page (`/about`)
Includes 4 connected nodes:
1. `Organization` (`#organization`)
2. `WebSite` (`#website`)
3. `AboutPage` (`https://www.aarogyadamu.com/about#webpage`)
4. `BreadcrumbList` (`https://www.aarogyadamu.com/about#breadcrumb`)

---

## 4. Medical & Ethical Guardrails

In compliance with healthcare communication standards and search guidelines:
- **Zero Fabricated Credentials:** No fake medical certifications, fictitious physician endorsements, artificial reviews, or fabricated awards.
- **Accurate Clinical Boundary:** Schema and descriptions state clearly: *"Personal Health Intelligence — connecting health records into continuously useful context. Medical understanding, not medical advice."*
- **No Overpromising:** We do not assert guaranteed rich snippets or Google Knowledge Graph placements.

