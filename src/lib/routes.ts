import { buildSchemaGraph, CANONICAL_ORIGIN, type BreadcrumbEntry } from './schema';

export interface RouteMetadata {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogImage: string;
  breadcrumbs?: BreadcrumbEntry[];
  isCanonicalIndexable: boolean;
  sourceFile: string;
  schemaJson: object;
}

export const ROUTES_METADATA: Record<string, RouteMetadata> = {
  '/': {
    path: '/',
    title: 'AarogyaDamu — Your health, understood over time.',
    description:
      'AarogyaDamu connects fragmented health records, measurements, medications and care into one continuously useful personal health context. Medical understanding, not medical advice.',
    canonicalUrl: `${CANONICAL_ORIGIN}/`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/HomePage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/',
      title: 'AarogyaDamu — Your health, understood over time.',
      description:
        'AarogyaDamu connects fragmented health records, measurements, medications and care into one continuously useful personal health context. Medical understanding, not medical advice.',
    }),
  },
  '/about': {
    path: '/about',
    title: 'About Us - AarogyaDamu Personal Health Intelligence',
    description:
      'Learn how AarogyaDamu turns fragmented lab results, wearable measurements, and doctor notes into continuously useful longitudinal health context.',
    canonicalUrl: `${CANONICAL_ORIGIN}/about`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'About' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/AboutPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/about',
      title: 'About Us - AarogyaDamu Personal Health Intelligence',
      description:
        'Learn how AarogyaDamu turns fragmented lab results, wearable measurements, and doctor notes into continuously useful longitudinal health context.',
      breadcrumbs: [{ name: 'About' }],
    }),
  },
  '/faq': {
    path: '/faq',
    title: 'Frequently Asked Questions (FAQ) - AarogyaDamu',
    description:
      'Find answers to common questions about AarogyaDamu, personal health intelligence, privacy, doctor sharing, and Damu agent.',
    canonicalUrl: `${CANONICAL_ORIGIN}/faq`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'FAQ' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/FaqPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/faq',
      title: 'Frequently Asked Questions (FAQ) - AarogyaDamu',
      description:
        'Find answers to common questions about AarogyaDamu, personal health intelligence, privacy, doctor sharing, and Damu agent.',
      breadcrumbs: [{ name: 'FAQ' }],
    }),
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us - AarogyaDamu',
    description:
      'Reach out to AarogyaDamu for questions about personal health intelligence, privacy practices, enterprise integrations, or early access.',
    canonicalUrl: `${CANONICAL_ORIGIN}/contact`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'Contact' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/ContactPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/contact',
      title: 'Contact Us - AarogyaDamu',
      description:
        'Reach out to AarogyaDamu for questions about personal health intelligence, privacy practices, enterprise integrations, or early access.',
      breadcrumbs: [{ name: 'Contact' }],
    }),
  },
  '/security': {
    path: '/security',
    title: 'Security Architecture & Trust - AarogyaDamu',
    description:
      "Learn about AarogyaDamu's security architecture: end-to-end encryption in transit and at rest, scoped physician sharing, and DPDP India compliance.",
    canonicalUrl: `${CANONICAL_ORIGIN}/security`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'Security' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/SecurityPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/security',
      title: 'Security Architecture & Trust - AarogyaDamu',
      description:
        "Learn about AarogyaDamu's security architecture: end-to-end encryption in transit and at rest, scoped physician sharing, and DPDP India compliance.",
      breadcrumbs: [{ name: 'Security' }],
    }),
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy & Data Sovereignty - AarogyaDamu',
    description:
      'Understand how AarogyaDamu protects your personal health information with Mumbai-region data residency and DPDP compliance.',
    canonicalUrl: `${CANONICAL_ORIGIN}/privacy`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'Privacy' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/PrivacyPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/privacy',
      title: 'Privacy Policy & Data Sovereignty - AarogyaDamu',
      description:
        'Understand how AarogyaDamu protects your personal health information with Mumbai-region data residency and DPDP compliance.',
      breadcrumbs: [{ name: 'Privacy' }],
    }),
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service & Clinical Disclaimer - AarogyaDamu',
    description:
      'Review terms of service, patient responsibilities, and medical boundary disclaimers for AarogyaDamu.',
    canonicalUrl: `${CANONICAL_ORIGIN}/terms`,
    robots: 'index, follow, max-image-preview:large',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    breadcrumbs: [{ name: 'Terms' }],
    isCanonicalIndexable: true,
    sourceFile: 'src/pages/TermsPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/terms',
      title: 'Terms of Service & Clinical Disclaimer - AarogyaDamu',
      description:
        'Review terms of service, patient responsibilities, and medical boundary disclaimers for AarogyaDamu.',
      breadcrumbs: [{ name: 'Terms' }],
    }),
  },
  '/thank-you': {
    path: '/thank-you',
    title: 'Message Received - AarogyaDamu',
    description:
      'Thank you for contacting AarogyaDamu. We have received your message and will respond as soon as possible.',
    canonicalUrl: '',
    robots: 'noindex, follow',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    isCanonicalIndexable: false,
    sourceFile: 'src/pages/ThankYouPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/thank-you',
      title: 'Message Received - AarogyaDamu',
      description:
        'Thank you for contacting AarogyaDamu. We have received your message and will respond as soon as possible.',
    }),
  },
  '/404': {
    path: '/404',
    title: 'Page Not Found (404) - AarogyaDamu',
    description:
      'The requested page could not be found. Return to AarogyaDamu homepage or explore our product suite.',
    canonicalUrl: '',
    robots: 'noindex, follow',
    ogImage: `${CANONICAL_ORIGIN}/og-image.png`,
    isCanonicalIndexable: false,
    sourceFile: 'src/pages/NotFoundPage.tsx',
    schemaJson: buildSchemaGraph({
      path: '/404',
      title: 'Page Not Found (404) - AarogyaDamu',
      description:
        'The requested page could not be found. Return to AarogyaDamu homepage or explore our product suite.',
    }),
  },
};

export const PRERENDER_ROUTES = Object.keys(ROUTES_METADATA);

export const CANONICAL_ROUTES = PRERENDER_ROUTES.filter(
  (route) => ROUTES_METADATA[route].isCanonicalIndexable
);

