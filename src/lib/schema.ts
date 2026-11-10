import { FAQ_DATA } from '../components/sections/FaqSection';

export const CANONICAL_ORIGIN = 'https://www.aarogyadamu.com';
export const ORG_ID = `${CANONICAL_ORIGIN}/#organization`;
export const WEBSITE_ID = `${CANONICAL_ORIGIN}/#website`;

export interface BreadcrumbEntry {
  name: string;
  path?: string;
}

export interface SchemaGraphOptions {
  path: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbEntry[];
}

export function buildSchemaGraph({
  path,
  title,
  description,
  breadcrumbs,
}: SchemaGraphOptions): object {
  const pageUrl = path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
  const pageId = `${pageUrl}#webpage`;

  const organization = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'AarogyaDamu',
    url: CANONICAL_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      '@id': `${CANONICAL_ORIGIN}/#logo`,
      url: `${CANONICAL_ORIGIN}/android-chrome-512x512.png`,
      caption: 'AarogyaDamu Logo',
    },
    email: 'contact@aarogyadamu.com',
    description:
      'Personal Health Intelligence - connecting your healthcare life into continuously useful health context.',
  };

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: CANONICAL_ORIGIN,
    name: 'AarogyaDamu',
    description:
      'Personal Health Intelligence — your health, understood over time.',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': pageId,
    url: pageUrl,
    name: title,
    description: description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };

  const graphNodes: unknown[] = [organization, website, webPage];

  // Homepage-specific SoftwareApplication entity
  if (path === '/') {
    graphNodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${CANONICAL_ORIGIN}/#software`,
      name: 'AarogyaDamu',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      publisher: { '@id': ORG_ID },
    });
  }

  // About page entity type
  if (path === '/about') {
    webPage['@type'] = 'AboutPage';
  }

  // Contact page entity
  if (path === '/contact') {
    webPage['@type'] = 'ContactPage';
    webPage['mainEntity'] = { '@id': ORG_ID };
  }

  // FAQ page entity
  if (path === '/faq') {
    graphNodes.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      isPartOf: { '@id': pageId },
      mainEntity: FAQ_DATA.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a.replace(/\*/g, ''),
        },
      })),
    });
  }

  // BreadcrumbList entity if breadcrumbs exist
  if (breadcrumbs && breadcrumbs.length > 0) {
    const listItems: Array<{ '@type': string; position: number; name: string; item?: string }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${CANONICAL_ORIGIN}/`,
      },
    ];

    breadcrumbs.forEach((item, idx) => {
      listItems.push({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.name,
        ...(item.path ? { item: `${CANONICAL_ORIGIN}${item.path}` } : {}),
      });
    });

    graphNodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: listItems,
    });
    webPage['breadcrumb'] = { '@id': `${pageUrl}#breadcrumb` };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };
}
