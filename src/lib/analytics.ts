export interface ConsentRecord {
  version: string;
  state: 'unknown' | 'accepted' | 'rejected' | 'customized';
  necessary: boolean;
  analytics: boolean;
  updatedAt: string;
}

export type AnalyticsEvent =
  | 'nav_link_click'
  | 'primary_cta_click'
  | 'secondary_cta_click'
  | 'early_access_form_view'
  | 'early_access_submit'
  | 'early_access_success'
  | 'early_access_error'
  | 'contact_form_view'
  | 'contact_submit'
  | 'contact_success'
  | 'contact_error'
  | 'faq_open'
  | 'outbound_link_click'
  | 'social_link_click'
  | 'privacy_settings_open'
  | 'privacy_consent_accept'
  | 'privacy_consent_reject'
  | 'privacy_preferences_save'
  | 'page_not_found'
  // Legacy backward-compatibility event names
  | 'CTA_CLICKED'
  | 'CONTACT_FORM_STARTED'
  | 'CONTACT_FORM_SUBMITTED'
  | 'DEMO_CTA_CLICKED'
  | 'EMAIL_CTA_CLICKED'
  | 'SERVICE_PAGE_CTA_CLICKED'
  | 'BLOG_CTA_CLICKED';

const STORAGE_KEY = 'aarogyadamu_consent_v1';
const LEGACY_STORAGE_KEY = 'aarogyadamu_cookie_consent';
const CURRENT_VERSION = '1.0';

// Strict denylist of sensitive keys to sanitize defensively before sending any analytics payload
const SENSITIVE_KEYS = [
  'email',
  'name',
  'phone',
  'message',
  'subject',
  'healthdata',
  'medicalrecords',
  'prescriptions',
  'labresults',
  'diagnoses',
  'symptoms',
  'conditions',
  'abha',
  'uin',
  'doctor',
  'patientid',
  'query',
  'token',
  'password',
  'ssn',
  'auth',
];

/**
 * Returns true if analytics environment flag is enabled (or true by default if not set to false)
 * and a valid measurement ID is present.
 */
export function isAnalyticsEnabled(): boolean {
  const envFlag = import.meta.env.VITE_PUBLIC_ANALYTICS_ENABLED;
  if (envFlag === 'false' || envFlag === false) {
    return false;
  }
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  return typeof measurementId === 'string' && measurementId.trim().length > 0;
}

/**
 * Reads stored consent record from localStorage, migrating legacy keys if present.
 */
export function getConsentRecord(): ConsentRecord {
  if (typeof window === 'undefined') {
    return {
      version: CURRENT_VERSION,
      state: 'unknown',
      necessary: true,
      analytics: false,
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if (parsed && parsed.version === CURRENT_VERSION) {
        return parsed;
      }
    }

    // Migrate from legacy single-string key if available
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy === 'granted') {
      const migrated: ConsentRecord = {
        version: CURRENT_VERSION,
        state: 'accepted',
        necessary: true,
        analytics: true,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    } else if (legacy === 'denied') {
      const migrated: ConsentRecord = {
        version: CURRENT_VERSION,
        state: 'rejected',
        necessary: true,
        analytics: false,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    // Return default unknown record if JSON parse fails
  }

  return {
    version: CURRENT_VERSION,
    state: 'unknown',
    necessary: true,
    analytics: false,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Updates stored consent record and applies Google Consent Mode update.
 */
export function setConsentRecord(analytics: boolean, state: 'accepted' | 'rejected' | 'customized' = analytics ? 'accepted' : 'rejected'): ConsentRecord {
  const record: ConsentRecord = {
    version: CURRENT_VERSION,
    state,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      // Update legacy key for backward compatibility if code reads it
      localStorage.setItem(LEGACY_STORAGE_KEY, analytics ? 'granted' : 'denied');
    } catch {
      // Storage unavailable or quota exceeded
    }

    // Update Google Consent Mode state dynamically
    updateAnalyticsConsent(analytics);
  }

  return record;
}

/**
 * Applies Google Consent Mode update via gtag.
 */
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window === 'undefined') return;

  // Ensure dataLayer exists
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }

  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

let isInitialized = false;

/**
 * Initializes Google Analytics 4 with Google Consent Mode v2 defaults.
 * Call this function early during application initialization.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || isInitialized) return;

  const consentRecord = getConsentRecord();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  // Setup dataLayer and baseline gtag helper function
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  // 1. Establish conservative Google Consent Mode defaults BEFORE loading GA script
  gtag('consent', 'default', {
    analytics_storage: consentRecord.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  if (!isAnalyticsEnabled() || !measurementId) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] GA4 measurement ID not configured or analytics disabled.');
    }
    return;
  }

  // 2. Inject Google Tag script dynamically if not already present
  const scriptId = 'ga4-gtag-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }

  // 3. Configure GA4 without sending automatic pageviews (SPA route changes tracked explicitly)
  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });

  isInitialized = true;
}

let lastTrackedPath: string | null = null;

/**
 * Tracks a route pageview explicitly for SPA navigations.
 * Sends event only if analytics is enabled and consent is granted.
 */
export function trackPageView(path: string, title?: string) {
  const consent = getConsentRecord();
  if (!consent.analytics || !isAnalyticsEnabled()) return;

  // Prevent duplicate consecutive pageviews
  if (lastTrackedPath === path) return;
  lastTrackedPath = path;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path,
      send_to: measurementId,
    });
  } else if (import.meta.env.DEV) {
    console.log(`[Analytics PageView] ${path}`);
  }
}

/**
 * Tracks custom business analytics events.
 * Sanitizes payload defensively against health data and PII before dispatch.
 */
export function trackEvent(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  const consent = getConsentRecord();
  if (!consent.analytics || !isAnalyticsEnabled()) return;

  // Sanitize payload defensively to strip any accidental PII or health data
  const cleanPayload: Record<string, unknown> = {};
  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (!SENSITIVE_KEYS.includes(key.toLowerCase())) {
        cleanPayload[key] = value;
      }
    }
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, cleanPayload);
  } else if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${event}`, cleanPayload);
  }
}

