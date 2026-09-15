# AarogyaDamu — Personal Health Intelligence

AarogyaDamu connects fragmented health records, measurements, prescriptions, and everyday health information into a continuously useful personal health model.

## Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion (respecting `prefers-reduced-motion`)
- **Serverless API**: Vercel Serverless Functions (`/api/early-access`, `/api/contact`)
- **Deployment**: Vercel SPA + HSTS Security Headers

---

## Local Development Setup

```bash
# Clone the repository
git clone https://github.com/aarogyadamu/damuweb.git
cd damuweb

# Install dependencies
npm install

# Copy environment example
cp .env.example .env.local

# Run development server
npm run dev
```

---

## Build & Quality Commands

```bash
# Typecheck TypeScript files
npx tsc --noEmit

# Run Linter
npm run lint

# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## Architecture & Security Principles

1. **No Sensitive Health Data Collection**: The public marketing website is an informational platform. It does not collect or process medical records, lab reports, prescriptions, or clinical diagnoses.
2. **Serverless API Isolation**: Form submissions (`/api/early-access` and `/api/contact`) execute server-side. Private API keys and database credentials are strictly isolated from client-side JavaScript bundles.
3. **Defensive Analytics Privacy**: Analytics tracking is disabled by default until explicit cookie consent is granted. No PII (emails, names, phone numbers) is transmitted to analytics.
4. **Vercel Production SPA Routing**: `vercel.json` ensures direct route refreshes on all pages (`/about`, `/faq`, `/contact`, `/security`, `/privacy`, `/terms`) work cleanly without breaking API endpoints.

---

## Contact & Support

- **General Inquiries**: [aarogyadamu@gmail.com](mailto:aarogyadamu@gmail.com)
- **Deployment Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
