# AarogyaDamu Website Deployment Guide

This document outlines the operational instructions for local development, production verification, Vercel deployment, environment variable configuration, rate limiting, and rollback procedures.

---

## 0. Pre-Launch Configuration — REQUIRED

The forms are wired to real backends but **do nothing until you configure them**. As of this build, the API **no longer returns a fake "success"** when it has nowhere to store data — it returns an honest error asking the user to email directly, and logs a diagnostic. So you must complete the following before launch, or the early-access and contact forms will visibly tell users the system is being set up.

1. **Create a Supabase project** (or reuse one) and create two tables:

   ```sql
   create table if not exists early_access_leads (
     id uuid primary key default gen_random_uuid(),
     email text not null,
     name text,
     message text,
     source text,
     consent_version text,
     created_at timestamptz not null default now()
   );

   create table if not exists contact_messages (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     subject text,
     message text not null,
     created_at timestamptz not null default now()
   );
   ```

2. **Enable Row Level Security** on both tables and add **no public policies**. The serverless functions use the `SUPABASE_SERVICE_ROLE_KEY`, which bypasses RLS. With RLS on and no anon policies, the public anon key cannot read or write these tables. Verify the anon key returns zero rows.

3. **(Recommended) Email delivery via Resend**: set `RESEND_API_KEY` and verify the `aarogyadamu.com` sending domain in Resend (SPF/DKIM DNS records). Until the domain is verified, mail from `noreply@aarogyadamu.com` will fail. If `RESEND_API_KEY` is set, contact messages are emailed; if not, they are stored in Supabase instead.

4. **(Recommended) Durable rate limiting via Upstash Redis**: set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Without these, rate limiting is disabled (fail-open) and the forms are open to spam/abuse.

5. **Analytics is intentionally not wired.** `window.gtag` is never loaded, so no analytics fires regardless of consent. To add Google Analytics later you must (a) add the GA script, (b) set `VITE_PUBLIC_ANALYTICS_ENABLED=true`, and (c) extend the CSP `script-src`/`connect-src` in `vercel.json` to allow the Google domains.

---

## 1. Local Development

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

---

## 2. Production Verification Checklist

Before pushing changes to production, execute all validation commands from a clean environment:

```bash
# 1. Type Check
npx tsc --noEmit

# 2. Linting
npm run lint

# 3. Production Bundle Build
npm run build

# 4. Preview Production Build Locally
npm run preview
```

---

## 3. Vercel Deployment Configuration

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x or 22.x (Vite 8 + React 19 require Node ≥ 20.19; enforced via `engines` in `package.json`)

### Routing & Security Headers (`vercel.json`)
The application includes a production `vercel.json` configured with:
- **SPA Rewrites**: `/((?!api/).*)` redirects to `/index.html` (allowing direct route refreshes on `/about`, `/faq`, `/contact`, `/security`, `/privacy`, `/terms`, `/thank-you`).
- **Serverless API Protection**: `/api/*` requests route directly to Vercel Serverless Functions (`api/early-access.ts` and `api/contact.ts`) without being swallowed by the SPA rewrite.
- **Security Headers**: HSTS (`max-age=63072000`), CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy`.

---

## 4. Environment Variables

Configure the following environment variables in the **Vercel Project Settings → Environment Variables**:

### Client-Side (Exposed to Browser)
- `VITE_PUBLIC_SITE_URL`: `https://aarogyadamu.com`
- `VITE_PUBLIC_ANALYTICS_ENABLED`: `false` (Set to `true` only when Google Analytics / GTM container is active and consented)
- `SUPABASE_URL`: `https://your-project.supabase.co`
- `SUPABASE_ANON_KEY`: `your-anon-key`

### Server-Side ONLY (Never Exposed to Frontend / VITE_*)
- `SUPABASE_SERVICE_ROLE_KEY`: `your-supabase-service-role-key` (Used by serverless functions to store leads in `early_access_leads` and messages in `contact_messages`)
- `UPSTASH_REDIS_REST_URL`: `https://your-instance.upstash.io` (Used for durable IP rate limiting across serverless function instances)
- `UPSTASH_REDIS_REST_TOKEN`: `your-upstash-rest-token`
- `RESEND_API_KEY`: `re_...` (Optional: used by `api/contact.ts` for email notification dispatch)
- `CONTACT_NOTIFICATION_EMAIL`: `aarogyadamu@gmail.com`

---

## 5. Rate Limiting Architecture

Production rate limiting for `/api/early-access` and `/api/contact` uses **Upstash Redis REST API**:
- **Mechanism**: Atomic `INCR` and `EXPIRE` operations based on client IP (`x-forwarded-for`).
- **Throttling**: 5 requests/hour per IP for early access signup; 3 requests/hour per IP for contact messages.
- **Durability**: Survives cold starts and isolated serverless execution contexts across Vercel regions.

---

## 6. Rollback & Recovery Procedures

If a production incident occurs post-deployment:
1. **Vercel Immediate Instant Rollback**: Navigate to Vercel Dashboard → **Deployments** → Select previous working deployment → Click **Promote to Production**.
2. **Git Revert**: Execute `git revert HEAD` and push to main branch to trigger a clean deployment build.
3. **Environment Secrets Rotation**: If any key is compromised, update the variable in Vercel settings and trigger a redeploy (`vercel --prod`).

---

## 7. Domain & DNS Readiness

The site is coded to run at `https://aarogyadamu.com` (canonical URLs, sitemap, `og:image`, `llms.txt`, and `robots.txt` all reference this origin). To bring the domain live on Vercel:

1. In **Vercel → Project → Settings → Domains**, add both `aarogyadamu.com` and `www.aarogyadamu.com`, then choose one as primary (a 308 redirect is created automatically to the other — recommended primary: the apex `aarogyadamu.com`).
2. At your DNS registrar, add the records Vercel shows — typically:
   - Apex `aarogyadamu.com` → `A` record to Vercel's anycast IP (Vercel displays the exact value), **or** an `ALIAS`/`ANAME` to `cname.vercel-dns.com` if your registrar supports it.
   - `www` → `CNAME` to `cname.vercel-dns.com`.
3. Vercel provisions the TLS certificate automatically once DNS resolves. HTTPS + HSTS are already enforced via `vercel.json`, and HTTP→HTTPS redirect is automatic on Vercel.
4. After DNS propagates, verify: `https://aarogyadamu.com/robots.txt`, `https://aarogyadamu.com/sitemap.xml`, and the favicon/OG image load on the production domain.
5. If you change the production domain, update the hard-coded `https://aarogyadamu.com` origin in: `index.html`, `src/components/seo/SeoHead.tsx`, `src/pages/*` canonical URLs, `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt`.

> DNS is **not** something this codebase can configure. These are the exact records to set at your registrar/Vercel — apply them manually.

---

## 8. Brand & Social Assets

The following assets live in `public/` and are referenced by `index.html` / `site.webmanifest`:

- `favicon.svg`, `favicon-32.png`, `favicon-16.png` — browser tab icons.
- `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` — iOS home screen + PWA icons.
- `og-image.png` (1200×630) — social preview for LinkedIn, WhatsApp, X, Facebook, Slack, iMessage.
- `site.webmanifest` — PWA metadata.

To regenerate all of them from the brand system, run `node scripts/generate-brand-assets.mjs` (requires `sharp`: `npm i -D sharp`). Edit `scripts/generate-brand-assets.mjs` to change the wordmark, colors, or layout.

After changing any social image, re-scrape the preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), Facebook Sharing Debugger, and X Card Validator so caches update.
