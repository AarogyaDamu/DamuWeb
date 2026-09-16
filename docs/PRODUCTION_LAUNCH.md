# AarogyaDamu Production Launch & Operations Guide

This document provides the production setup and verification instructions for the AarogyaDamu public website, including Vercel deployment, environment variables, Google Analytics 4, consent management, API security, Supabase, Resend, DNS, and post-launch verification.

---

## 1. Local Setup & Verification

Run these commands from the project root:

```bash
# Install dependencies
npm install

# TypeScript validation
npm run typecheck

# Lint the codebase
npm run lint

# Create production build
npm run build

# Preview production build locally
npm run preview
```

Before deployment, all applicable checks should complete successfully.

---

## 2. Production Environment Variables

Configure production environment variables in:

**Vercel → Project → Settings → Environment Variables**

### Public client-side variables

These variables may be included in the browser bundle.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_PUBLIC_SITE_URL` | Canonical website URL | `https://aarogyadamu.com` |
| `VITE_PUBLIC_ANALYTICS_ENABLED` | Enables frontend analytics after consent | `false` initially |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `VITE_SUPABASE_URL` | Supabase project URL | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable client key | `<publishable-key>` |

### Server-only variables

These variables must never be exposed to browser code or committed to GitHub.

| Variable | Description |
| :--- | :--- |
| `SUPABASE_SECRET_KEY` | Supabase server-side secret key |
| `RESEND_API_KEY` | Resend API key for server-side email delivery |
| `CONTACT_NOTIFICATION_EMAIL` | Email address receiving website inquiries |
| `UPSTASH_REDIS_REST_URL` | Upstash REST endpoint, only when rate limiting is enabled |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST token, only when rate limiting is enabled |

### Security rules

Never:
- Commit `.env` files.
- Put server secrets in `VITE_*` variables.
- Put `SUPABASE_SECRET_KEY` in frontend code.
- Put `RESEND_API_KEY` in frontend code.
- Put `UPSTASH_REDIS_REST_TOKEN` in frontend code.
- Store real credentials in documentation.
- Paste production secrets into GitHub issues, pull requests, or public repositories.

`VITE_*` values can be exposed to the browser. Treat them as public configuration, not secrets.

---

## 3. Local Environment File

For local development, create `.env.local`:

```env
VITE_PUBLIC_SITE_URL=https://aarogyadamu.com
VITE_PUBLIC_ANALYTICS_ENABLED=false
VITE_GA_MEASUREMENT_ID=

VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY

SUPABASE_SECRET_KEY=YOUR_SERVER_SECRET
RESEND_API_KEY=YOUR_RESEND_API_KEY
CONTACT_NOTIFICATION_EMAIL=aarogyadamu@gmail.com
```

Do not commit `.env.local`.

Recommended `.gitignore` entries:
```gitignore
.env
.env.local
.env.production
.env.development
.env.*.local
```

---

## 4. Vercel Deployment

### Repository

The production website is deployed from:

**GitHub → AarogyaDamu/DamuWeb**

### Vercel project

Use the Hobby plan where permitted.

For the Vite application:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Use the repository root as the Root Directory unless the project structure changes.

### Deployment procedure
1. Push the latest production code to GitHub.
2. Import `AarogyaDamu/DamuWeb` into Vercel.
3. Configure production environment variables.
4. Deploy.
5. Test the generated `.vercel.app` URL.
6. Add `aarogyadamu.com` under **Vercel Project → Domains**.
7. Use the exact DNS records shown by Vercel for the domain.
8. Verify HTTPS and redirects.
9. Perform the production test checklist.

---

## 5. Google Analytics 4

Google Analytics should only be enabled after the consent implementation has been verified.

### Setup
1. Create a GA4 property.
2. Create a Web Data Stream.
3. Use: `https://aarogyadamu.com`
4. Copy the Measurement ID: `G-XXXXXXXXXX`
5. Add it to Vercel as: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
6. Set: `VITE_PUBLIC_ANALYTICS_ENABLED=true`

Only enable this after consent behavior has been tested.

---

## 6. Consent Management

AarogyaDamu uses opt-in analytics consent.

### Initial state
On a first visit:
`analytics consent = denied`
Analytics must not be initialized before the user has provided the required consent.

### Accepted
After the user accepts analytics:
`analytics consent = granted`
The application may then initialize GA4 and send permitted analytics events.

### Rejected
After the user rejects analytics:
`analytics consent = denied`
Analytics events must remain suppressed.

### Consent storage
The website stores the user's consent preference locally using:
`aarogyadamu_consent_v1`

Example structure:
```json
{
  "version": "1.0",
  "state": "accepted",
  "necessary": true,
  "analytics": true,
  "updatedAt": "2026-09-16T12:00:00.000Z"
}
```

Do not store health information or sensitive personal information in analytics consent storage.

---

## 7. Analytics Event Taxonomy

Analytics events must contain only non-sensitive website interaction data.

| Event | Purpose | Example parameters |
| :--- | :--- | :--- |
| `page_view` | SPA page tracking | `page_path`, `page_title` |
| `nav_link_click` | Navigation interaction | `link_name`, `destination` |
| `primary_cta_click` | Primary CTA | `cta_name`, `location` |
| `secondary_cta_click` | Secondary CTA | `cta_name`, `location` |
| `early_access_form_view` | Early-access modal view | `form` |
| `early_access_submit` | Early-access submission | `form` |
| `early_access_success` | Successful submission | `form` |
| `early_access_error` | Submission error | `form`, `error_type` |
| `contact_form_view` | Contact form view | `form` |
| `contact_submit` | Contact submission | `form` |
| `contact_success` | Successful contact submission | `form` |
| `contact_error` | Contact submission error | `form`, `error_type` |
| `faq_open` | FAQ interaction | `question_id` |
| `outbound_link_click` | External navigation | `destination` |
| `social_link_click` | Social link interaction | `platform` |
| `privacy_settings_open` | Privacy settings opened | *none* |
| `privacy_consent_accept` | Analytics accepted | *none* |
| `privacy_consent_reject` | Analytics rejected | *none* |
| `privacy_preferences_save` | Preferences saved | `analytics_enabled` |
| `page_not_found` | 404 page | `path` |

Never send health information, medical records, diagnoses, prescription data, laboratory values, symptoms, patient identifiers, or other sensitive personal data to Google Analytics.

---

## 8. Consent Verification

### Case A — Fresh browser
**Expected**:
- Consent banner appears
- Analytics remains disabled
- No analytics initialization before consent

### Case B — Accept analytics
**Expected**:
- Consent changes to granted
- Analytics initializes
- Permitted website events can be sent

### Case C — Reject analytics
**Expected**:
- Consent remains denied
- Analytics remains disabled
- Telemetry events are suppressed

### Case D — Revoke consent
**Expected**:
- Privacy Settings → analytics disabled → future analytics events suppressed

### Case E — Enable later
**Expected**:
- Privacy Settings → analytics enabled → analytics resumes

### Case F — Refresh after acceptance
**Expected**:
- Stored consent restored
- Analytics initializes according to the stored preference

### Case G — Refresh after rejection
**Expected**:
- Stored rejection restored
- Analytics remains disabled

---

## 9. Supabase Database

The website uses Supabase for server-side persistence where required.

Example tables:

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

Enable Row Level Security:

```sql
alter table early_access_leads enable row level security;
alter table contact_messages enable row level security;
```

Do not create unrestricted public policies.

Server-side functions should use the Supabase server secret where privileged database operations are required. The server secret must never be exposed to the browser.

---

## 10. Resend Email Delivery

Resend is used for server-side delivery of website inquiries.

- **Required variable**: `RESEND_API_KEY=YOUR_RESEND_API_KEY`
- **Notification destination**: `CONTACT_NOTIFICATION_EMAIL=aarogyadamu@gmail.com`

### Domain verification

The sending domain should be verified in Resend. For `aarogyadamu.com`, add the DNS records supplied by Resend in the GoDaddy DNS panel. Do not invent or modify Resend's generated DKIM/CNAME values.

Typical records include:
```text
TXT    resend._domainkey    <value supplied by Resend>
CNAME  rsend                <value supplied by Resend>
CNAME  send                 <value supplied by Resend>
```

The exact values shown in the Resend dashboard are authoritative.

---

## 11. Upstash Rate Limiting

Upstash Redis is optional until durable server-side rate limiting is enabled.

When enabled, configure:
```env
UPSTASH_REDIS_REST_URL=YOUR_REST_URL
UPSTASH_REDIS_REST_TOKEN=YOUR_REST_TOKEN
```

Never place the token in browser code.

If Upstash has not been provisioned, do not insert fake credentials into production configuration. Any server code that requires Upstash must either be provisioned correctly or be changed to operate without it.

---

## 12. DNS and Custom Domain

- **Domain**: `aarogyadamu.com`
- **DNS Provider**: GoDaddy

### Vercel

Add `aarogyadamu.com` and `www.aarogyadamu.com` to **Vercel → Project → Settings → Domains**.

Use the exact DNS records displayed by Vercel. Do not manually guess the required IP or CNAME values.

### Resend

Keep the Resend-specific DNS records separate from the website records. Do not delete unrelated `NS`, `SOA`, `DMARC`, `_acme-challenge`, or `_domainconnect` records unless the relevant service specifically requires a change.

### HTTPS

Production traffic must use `https://aarogyadamu.com`. Verify that HTTP requests redirect to HTTPS.

---

## 13. Production Security Checklist

Before launch:
- [ ] `.env` is not committed.
- [ ] `.env.local` is not committed.
- [ ] Production secrets are stored only in Vercel/server-side configuration.
- [ ] No Supabase secret key appears in frontend code.
- [ ] No Resend API key appears in frontend code.
- [ ] No Upstash token appears in frontend code.
- [ ] No real credentials appear in public documentation.
- [ ] Supabase RLS is enabled where required.
- [ ] Public database write access is not accidentally enabled.
- [ ] Server API endpoints validate input.
- [ ] Contact and early-access endpoints have abuse protection.
- [ ] Error responses do not expose secrets.
- [ ] CORS and allowed origins are reviewed where applicable.
- [ ] HTTPS is enabled.

---

## 14. Production Verification

### Website
- Homepage loads.
- HTTPS works.
- `aarogyadamu.com` resolves correctly.
- `www.aarogyadamu.com` behaves as configured.
- Navigation works.
- Contact page works.
- Privacy page works.
- 404 page works.
- Mobile layout works.
- Desktop layout works.
- Images load.
- No broken links.
- Metadata and social preview tags are correct.

### Forms
- Valid contact submission works.
- Invalid email is rejected.
- Empty required fields are rejected.
- Oversized input is rejected.
- Server-side validation works.
- Successful submission reaches Supabase where configured.
- Contact notification reaches the configured email through Resend.
- API errors do not reveal secrets.

### Analytics
- Fresh browser starts with analytics denied.
- Consent banner works.
- Accepting analytics enables analytics.
- Rejecting analytics suppresses analytics.
- Revoking consent suppresses future telemetry.
- No health or PII data is sent to GA4.

### Security
- No secret values exist in GitHub.
- No secrets appear in browser bundles.
- Vercel environment variables are configured correctly.
- Database RLS is enabled.
- Production API routes are server-side.
- Rate limiting is enabled only where configured.

---

## 15. Rollback

### Vercel rollback
**Vercel → Deployments → select previous stable deployment → Promote to Production**

### Analytics kill switch
Set `VITE_PUBLIC_ANALYTICS_ENABLED=false`, then redeploy.

### Emergency credential rotation
If a server credential is exposed:
1. Revoke or rotate the credential in its provider dashboard.
2. Update the new value in Vercel.
3. Redeploy.
4. Check Git history and public source for remaining copies.
5. Review provider logs where available.

---

## 16. Production Launch Sequence

1. Run `npm install`
2. Run `npm run typecheck`
3. Run `npm run lint`
4. Run `npm run build`
5. Verify environment variables
6. Verify Supabase configuration
7. Verify Resend domain
8. Verify consent behavior
9. Push code to GitHub
10. Deploy to Vercel
11. Test Vercel deployment URL
12. Add `aarogyadamu.com` to Vercel
13. Update GoDaddy DNS using Vercel's exact records
14. Verify HTTPS
15. Test contact and early-access forms
16. Test analytics consent
17. Perform final security check
18. Promote the verified deployment to production

---

## 17. Source-Control Safety

Before every public GitHub push, run:
```bash
git status
git ls-files | findstr /R "^\.env"
```

The repository may contain `.env.example`, but must not contain real `.env`, `.env.local`, `.env.production`, or `.env.development`.

Use placeholders in documentation: `YOUR_PUBLISHABLE_KEY`, `YOUR_SERVER_SECRET`, `YOUR_RESEND_API_KEY`, `YOUR_REST_TOKEN`. Never place actual production credentials in this document.
