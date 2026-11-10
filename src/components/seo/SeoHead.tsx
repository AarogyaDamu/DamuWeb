import { useEffect } from 'react';

export interface SeoProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaJson?: object | object[];
  robots?: string;
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.aarogyadamu.com/og-image.png',
  schemaJson,
  robots = 'index, follow, max-image-preview:large',
}: SeoProps) {
  // If canonicalUrl is explicitly provided as empty string, do not assign a fallback
  const fullCanonical = canonicalUrl !== undefined
    ? canonicalUrl
    : (typeof window !== 'undefined' ? window.location.href : 'https://www.aarogyadamu.com');

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Robots Directive (ensure exactly one meta robots tag exists)
    const metaRobotsList = document.querySelectorAll('meta[name="robots"]');
    if (metaRobotsList.length === 0) {
      const metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', robots);
      document.head.appendChild(metaRobots);
    } else {
      metaRobotsList[0].setAttribute('content', robots);
      for (let i = 1; i < metaRobotsList.length; i++) {
        metaRobotsList[i].remove();
      }
    }

    // 4. Update Canonical Tag (only if a valid non-empty canonical URL is set)
    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    if (fullCanonical && fullCanonical.trim().length > 0) {
      if (canonicalLinks.length === 0) {
        const canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', fullCanonical);
        document.head.appendChild(canonicalLink);
      } else {
        canonicalLinks[0].setAttribute('href', fullCanonical);
        for (let i = 1; i < canonicalLinks.length; i++) {
          canonicalLinks[i].remove();
        }
      }
    } else {
      // Completely remove all canonical tags if page explicitly omits or blanks canonical (e.g. 404 / thank-you)
      canonicalLinks.forEach((el) => el.remove());
    }

    // 5. Update OpenGraph Tags
    const setOgMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOgMeta('og:title', title);
    setOgMeta('og:description', description);
    setOgMeta('og:url', fullCanonical || 'https://www.aarogyadamu.com');
    setOgMeta('og:image', ogImage);

    // 6. Update Twitter Tags
    const setTwitterMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setTwitterMeta('twitter:card', 'summary_large_image');
    setTwitterMeta('twitter:title', title);
    setTwitterMeta('twitter:description', description);
    setTwitterMeta('twitter:image', ogImage);

    // 7. Update Schema JSON-LD Script
    const existingScript = document.getElementById('jsonld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (schemaJson) {
      const script = document.createElement('script');
      script.id = 'jsonld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }
  }, [title, description, fullCanonical, ogImage, schemaJson, robots]);

  return null;
}
