export type AnalyticsEvent =
  | 'CTA_CLICKED'
  | 'CONTACT_FORM_STARTED'
  | 'CONTACT_FORM_SUBMITTED'
  | 'DEMO_CTA_CLICKED'
  | 'EMAIL_CTA_CLICKED'
  | 'SERVICE_PAGE_CTA_CLICKED'
  | 'BLOG_CTA_CLICKED';

// Denylist of sensitive keys to strictly sanitize defensively before sending
const PII_KEYS = [
  'email',
  'name',
  'phone',
  'healthData',
  'medicalRecords',
  'prescriptions',
  'labResults',
  'diagnoses',
  'abha',
  'uin',
  'doctor',
];

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  // Respect environment variable switch
  const enabled = import.meta.env.VITE_PUBLIC_ANALYTICS_ENABLED;
  if (enabled === 'false' || enabled === false) {
    return;
  }

  // Respect cookie consent
  const consent = localStorage.getItem('aarogyadamu_cookie_consent');
  if (consent !== 'granted') {
    return;
  }

  // Sanitize payload to strip any accidental PII
  const cleanPayload: Record<string, unknown> = {};
  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (!PII_KEYS.includes(key.toLowerCase())) {
        cleanPayload[key] = value;
      }
    }
  }

  // Event logging abstraction (Ready for Google Analytics / GTM)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, cleanPayload);
  } else if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${event}`, cleanPayload);
  }
}
