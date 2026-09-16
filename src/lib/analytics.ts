export interface ConsentRecord {
  version: string;
  state: 'unknown' | 'accepted' | 'rejected' | 'customized';
  necessary: boolean;
  analytics: boolean;
  updatedAt: string;
}

export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'waitlist_view'
  | 'waitlist_submit'
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
 * Returns the configured GA4 Measurement ID from environment variables.
 * Priority: NEXT_PUBLIC_GA_MEASUREMENT_ID, fallback to VITE_GA_MEASUREMENT_ID.
 */
export function getMeasurementId(): string | undefined {
  const id = import.meta.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || import.meta.env.VITE_GA_MEASUREMENT_ID;
  return typeof id === 'string' && id.trim().length > 0 ? id.trim() : undefined;
}

/**
 * Returns true if analytics environment flag is enabled and a valid measurement ID is present.
 */
export function isAnalyticsEnabled(): boolean {
  const envFlag = import.meta.env.VITE_PUBLIC_ANALYTICS_ENABLED;
  if (envFlag === 'false' || envFlag === false) {
    return false;
  }
  const measurementId = getMeasurementId();
  return Boolean(measurementId);
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

let isScriptLoaded = false;
let isGAConfigured = false;

/**
 * Dynamically injects Google Analytics tag script into document head if not already loaded.
 */
export function loadGAScript(measurementId: string): boolean {
  if (typeof window === 'undefined') return false;

  const scriptId = 'ga4-gtag-script';
  if (document.getElementById(scriptId)) {
    isScriptLoaded = true;
    return true;
  }

  try {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    isScriptLoaded = true;
    return true;
  } catch {
    return false;
  }
}

/**
 * Configures GA4 config settings via gtag if not already configured.
 */
function configureGA4(measurementId: string) {
  if (typeof window === 'undefined' || isGAConfigured) return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });

  isGAConfigured = true;
}

/**
 * Applies Google Consent Mode update via gtag and initializes script if consent was newly granted.
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

  if (granted && isAnalyticsEnabled()) {
    const measurementId = getMeasurementId();
    if (measurementId) {
      loadGAScript(measurementId);
      configureGA4(measurementId);
      // Flush current route pageview if not already tracked
      if (lastTrackedPath) {
        const currentPath = lastTrackedPath;
        lastTrackedPath = null;
        trackPageView(currentPath);
      }
    }
  }
}

/**
 * Updates stored consent record and applies Google Consent Mode update.
 */
export function setConsentRecord(
  analytics: boolean,
  state: 'accepted' | 'rejected' | 'customized' = analytics ? 'accepted' : 'rejected'
): ConsentRecord {
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

let isInitialized = false;

/**
 * Initializes Google Analytics 4 with Google Consent Mode v2 defaults.
 * Call this function early during application initialization.
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || isInitialized) return;

  const consentRecord = getConsentRecord();
  const measurementId = getMeasurementId();

  // 1. Setup dataLayer and baseline gtag helper function
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  // 2. Establish conservative Google Consent Mode defaults BEFORE loading GA script
  gtag('consent', 'default', {
    analytics_storage: consentRecord.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  isInitialized = true;

  if (!isAnalyticsEnabled() || !measurementId) {
    if (import.meta.env.DEV) {
      console.log('[Analytics] GA4 measurement ID not configured or analytics disabled.');
    }
    return;
  }

  // 3. Inject GA script AND configure GA4 ONLY IF user has explicitly granted analytics consent
  if (consentRecord.analytics) {
    loadGAScript(measurementId);
    configureGA4(measurementId);
  }
}

let lastTrackedPath: string | null = null;

/**
 * Tracks a route pageview explicitly for SPA navigations.
 * Sends event only if analytics is enabled and consent is granted.
 */
export function trackPageView(path: string, title?: string) {
  const consent = getConsentRecord();
  if (!consent.analytics || !isAnalyticsEnabled()) {
    lastTrackedPath = path;
    return;
  }

  // Prevent duplicate consecutive pageviews
  if (lastTrackedPath === path && isGAConfigured) return;
  lastTrackedPath = path;

  const measurementId = getMeasurementId();
  if (!measurementId) return;

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
 * Helper function to defensively test if a string value looks like an email or phone number.
 */
function isPossiblePII(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  // Simple check for email format
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true;
  // Simple check for phone number format (digits with optional +, -, (), spaces)
  if (/^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value.trim())) return true;
  return false;
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
      if (!SENSITIVE_KEYS.includes(key.toLowerCase()) && !isPossiblePII(value)) {
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


