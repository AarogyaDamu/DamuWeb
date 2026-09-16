# AarogyaDamu Production Launch & Operations Guide

This document provides complete instructions for local development, production configuration, Google Analytics 4 integration, Consent Mode v2 compliance, API security hardening, Supabase database setup, Resend email dispatch, Upstash rate limiting, DNS management, and post-launch verification.

---

## 1. Local Setup & Verification Commands

```bash
# 1. Install dependencies
npm install

# 2. Typecheck TypeScript across application and serverless functions
npm run typecheck

# 3. Lint codebase
npm run lint

# 4. Create production build bundle
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 2. Environment Variables Specification

Configure the following variables in **Vercel Project Settings → Environment Variables**:

### Public Client-Side Variables (Bundled into Browser JS)
| Variable | Description | Example / Value |
| :--- | :--- | :--- |
| `VITE_PUBLIC_SITE_URL` | Canonical origin for website SEO & social previews | `https://aarogyadamu.com` |
| `VITE_PUBLIC_ANALYTICS_ENABLED` | Enable/disable frontend telemetry sending | `true` (production) or `false` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement Stream ID | `G-XXXXXXXXXX` |
| `SUPABASE_URL` | Supabase REST API endpoint (Public) | `https://xyz.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase Anonymous Client Key (Public) | `eyJhbGci...` |

> [!WARNING]
> Never prefix private keys with `VITE_`. Any variable starting with `VITE_` is exposed in public client bundles.

### Private Server-Only Variables (Vercel Serverless Function Context Only)
| Variable | Description | Notes |
| :--- | :--- | :--- |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (Server Only) | Bypasses RLS to insert leads into `early_access_leads` & `contact_messages`. Never expose to client! |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST API URL | Serverless rate limiting endpoint. |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST API Bearer Token | Private secret token for Upstash Redis. |
| `RESEND_API_KEY` | Resend API Key for Email Delivery | Used by `api/contact.ts` to email contact inquiries. |
| `CONTACT_NOTIFICATION_EMAIL` | Destination email for website inquiries | Default: `aarogyadamu@gmail.com` |

---

## 3. Google Analytics 4 (GA4) Setup Guide

1. Go to [Google Analytics Console](https://analytics.google.com/).
2. Create a new GA4 Property named **AarogyaDamu Web**.
3. Create a **Web Data Stream** with URL `https://aarogyadamu.com`.
4. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).
5. In **Stream Settings → Enhanced Measurement**, keep pageviews and interactions enabled.
6. Copy `G-XXXXXXXXXX` to Vercel Environment Variables as `VITE_GA_MEASUREMENT_ID` and set `VITE_PUBLIC_ANALYTICS_ENABLED=true`.

---

## 4. Google Consent Mode v2 Architecture

AarogyaDamu enforces opt-in consent before telemetry transmission.

```
Initial Page Load
      │
      ▼
Consent Manager Initialization
      │
      ▼
Set Google Consent Mode Default = DENIED
(analytics_storage, ad_storage, ad_user_data, ad_personalization)
      │
      ├─── Consent = ACCEPTED (or stored 'accepted') ──► Update Consent Mode (analytics_storage: GRANTED) ──► Load GA4 Script & Track Telemetry
      │
      └─── Consent = REJECTED (or stored 'rejected') ──► Analytics Storage Remains DENIED ──► Block Telemetry Transmission
```

### Consent Storage Structure
Consent choices are stored locally in `localStorage` under `aarogyadamu_consent_v1`:
```json
{
  "version": "1.0",
  "state": "accepted",
  "necessary": true,
  "analytics": true,
  "updatedAt": "2026-09-16T12:00:00.000Z"
}
```

---

## 5. Analytics Event Taxonomy Map

| Event Name | Purpose | Trigger | Non-Sensitive Parameters | Health / PII Allowed? |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | SPA route tracking | Route change | `page_path`, `page_title`, `page_location` | ❌ NO |
| `nav_link_click` | Main navigation interaction | Nav link click | `link_name`, `destination` | ❌ NO |
| `primary_cta_click` | Primary CTA interaction | "Get in Touch" click | `cta_name`, `location` | ❌ NO |
| `secondary_cta_click` | Secondary CTA interaction | "Explore" / "Meet Damu" click | `cta_name`, `location` | ❌ NO |
| `early_access_form_view` | Early access modal view | Modal open | `form: "early_access"` | ❌ NO |
| `early_access_submit` | Early access submission attempt | Form submit | `form: "early_access"` | ❌ NO |
| `early_access_success` | Early access submission success | Server success response | `form: "early_access"` | ❌ NO |
| `early_access_error` | Early access submission error | Server or validation error | `form: "early_access"`, `error_type` | ❌ NO |
| `contact_form_view` | Contact page form view | Contact page load | `form: "contact"` | ❌ NO |
| `contact_submit` | Contact form submission attempt | Form submit | `form: "contact"` | ❌ NO |
| `contact_success` | Contact form submission success | Server success response | `form: "contact"` | ❌ NO |
| `contact_error` | Contact form submission error | Server or validation error | `form: "contact"`, `error_type` | ❌ NO |
| `faq_open` | FAQ accordion interaction | Accordion open | `question_id`, `question_title` | ❌ NO |
| `outbound_link_click` | External link / email link click | Email link click | `link_text`, `destination`, `source` | ❌ NO |
| `social_link_click` | Social channel link click | Social icon click | `platform`, `url` | ❌ NO |
| `privacy_settings_open` | Preferences modal view | Footer "Privacy Settings" click | None | ❌ NO |
| `privacy_consent_accept` | Analytics consent granted | "Accept analytics" click | None | ❌ NO |
| `privacy_consent_reject` | Analytics consent denied | "Reject analytics" click | None | ❌ NO |
| `privacy_preferences_save` | Custom preferences saved | "Save Preferences" click | `analytics_enabled` | ❌ NO |
| `page_not_found` | 404 page render | Unknown route render | `path` | ❌ NO |

---

## 6. Consent Verification Matrix

| Test Case | Scenario | User Action | Expected System Behavior |
| :--- | :--- | :--- | :--- |
| **Case A** | Fresh Browser | Initial Visit | Banner displayed. Google Consent Mode set to `denied`. GA script sends no events. |
| **Case B** | Accept Analytics | Click "Accept analytics" | Consent mode updated to `granted`. GA script loads, fires `page_view` and business events. |
| **Case C** | Reject Analytics | Click "Reject analytics" | Banner closes. Consent mode remains `denied`. Telemetry events are suppressed. |
| **Case D** | Revoke Consent | Click "Privacy Settings" → Toggle OFF → Save | Consent mode updated to `denied`. Future telemetry events immediately stopped. |
| **Case E** | Enable Consent Later | Click "Privacy Settings" → Toggle ON → Save | Consent mode updated to `granted`. Analytics telemetry resumes. |
| **Case F** | Page Refresh (Accepted) | Reload page | Stored consent restored (`analytics: true`). Telemetry operates automatically. |
| **Case G** | Page Refresh (Rejected) | Reload page | Stored consent restored (`analytics: false`). Telemetry remains disabled. |

---

## 7. Database SQL Setup & Security

Execute the following SQL in the Supabase SQL Editor:

```sql
-- 1. Create Early Access Signup Leads Table
create table if not exists early_access_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  message text,
  source text,
  consent_version text,
  created_at timestamptz not null default now()
);

-- 2. Create Contact Messages Table
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- 3. Enable Row Level Security (RLS) on both tables
alter table early_access_leads enable row level security;
alter table contact_messages enable row level security;

-- Do NOT add public anon policies. Serverless API functions connect using
-- SUPABASE_SERVICE_ROLE_KEY which safely bypasses RLS on the server.
```

---

## 8. DNS & Domain Checklist

- **Apex Domain**: `aarogyadamu.com` → `A` record to Vercel Anycast IP or `ALIAS` to `cname.vercel-dns.com`.
- **Subdomain**: `www.aarogyadamu.com` → `CNAME` to `cname.vercel-dns.com`.
- **HTTPS & HSTS**: Enforced via `vercel.json` headers (`max-age=63072000; includeSubDomains; preload`).

---

## 9. Rollback Procedures

1. **Instant Vercel Rollback**: Navigate to Vercel Dashboard → Deployments → Select previous stable build → Click **Promote to Production**.
2. **Emergency Analytics Kill-Switch**: In Vercel Environment Variables, set `VITE_PUBLIC_ANALYTICS_ENABLED=false` and trigger a redeployment.
