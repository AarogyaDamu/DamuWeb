import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error(`[FAIL] ${message}`);
  } else {
    console.log(`[PASS] ${message}`);
  }
}

console.log('=== 1. 404 & SOFT-404 VERIFICATION ===');
const has404Root = fs.existsSync(path.join(distDir, '404.html'));
const has404Dir = fs.existsSync(path.join(distDir, '404', 'index.html'));
assert(has404Root, 'dist/404.html exists as custom Vercel error page');
assert(!has404Dir, 'dist/404/index.html does NOT exist');

if (has404Root) {
  const html404 = fs.readFileSync(path.join(distDir, '404.html'), 'utf8');
  assert(!html404.includes('rel="canonical"'), '404 has NO canonical tag');
  assert(html404.includes('content="noindex, follow"'), '404 robots directive is "noindex, follow"');
  assert(html404.includes('AarogyaDamu'), '404 has AarogyaDamu branding');
  assert(html404.includes('href="/"'), '404 has Home navigation link');
  assert(html404.includes('Error 404') || html404.includes('Page Not Found'), '404 has rendered 404 content');
  assert(html404.includes('data-prerendered="true"'), '404 root has data-prerendered="true"');
  assert(!html404.includes('aria-busy="true"'), '404 does not contain Suspense fallback');
}

console.log('\n=== 2. SITEMAP VALIDATION ===');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const hasSitemap = fs.existsSync(sitemapPath);
assert(hasSitemap, 'dist/sitemap.xml exists');

if (hasSitemap) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert(locMatches.length === 7, `Sitemap has exactly 7 URLs (found ${locMatches.length})`);

  const expectedUrls = [
    'https://www.aarogyadamu.com/',
    'https://www.aarogyadamu.com/about',
    'https://www.aarogyadamu.com/faq',
    'https://www.aarogyadamu.com/contact',
    'https://www.aarogyadamu.com/security',
    'https://www.aarogyadamu.com/privacy',
    'https://www.aarogyadamu.com/terms',
  ];

  for (const expected of expectedUrls) {
    assert(locMatches.includes(expected), `Sitemap includes ${expected}`);
  }

  assert(!sitemap.includes('/404'), 'Sitemap does NOT contain /404');
  assert(!sitemap.includes('/thank-you'), 'Sitemap does NOT contain /thank-you');
  assert(!sitemap.includes('https://aarogyadamu.com/'), 'Sitemap does NOT contain non-www domain');
  assert(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap has valid XML header');
  assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'Sitemap has standard sitemap namespace');
}

console.log('\n=== 3. STRUCTURED DATA @GRAPH VALIDATION ===');
const checkSchema = (pageName, filePath, expectedTypes, disallowProps = {}) => {
  if (!fs.existsSync(filePath)) {
    assert(false, `${pageName} exists for schema validation (${filePath})`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/<script type="application\/ld\+json" id="jsonld-schema">([\s\S]*?)<\/script>/);
  assert(Boolean(match), `${pageName} contains #jsonld-schema script`);
  if (!match) return;

  let parsed;
  try {
    parsed = JSON.parse(match[1]);
    assert(true, `${pageName} JSON-LD parses as valid JSON`);
  } catch (err) {
    assert(false, `${pageName} JSON-LD failed to parse: ${err.message}`);
    return;
  }

  assert(parsed['@context'] === 'https://schema.org', `${pageName} context is https://schema.org`);
  const graph = parsed['@graph'] || [];
  assert(Array.isArray(graph) && graph.length > 0, `${pageName} @graph is a non-empty array`);

  const typesFound = graph.map(n => n['@type']);
  for (const expectedType of expectedTypes) {
    assert(typesFound.includes(expectedType), `${pageName} schema graph contains ${expectedType}`);
  }

  // Check disallowed properties for compliance with search engine guidelines
  if (disallowProps.organization) {
    const orgNode = graph.find(n => n['@type'] === 'Organization');
    if (orgNode) {
      for (const prop of disallowProps.organization) {
        assert(orgNode[prop] === undefined, `${pageName} Organization does NOT contain unpublished "${prop}"`);
      }
    }
  }

  if (disallowProps.software) {
    const softNode = graph.find(n => n['@type'] === 'SoftwareApplication');
    if (softNode) {
      for (const prop of disallowProps.software) {
        assert(softNode[prop] === undefined, `${pageName} SoftwareApplication does NOT contain "${prop}"`);
      }
      if (disallowProps.softwareOs) {
        assert(softNode.operatingSystem === disallowProps.softwareOs, `${pageName} SoftwareApplication operatingSystem is "${disallowProps.softwareOs}"`);
      }
    }
  }
};

checkSchema('Homepage', path.join(distDir, 'index.html'), ['Organization', 'WebSite', 'WebPage', 'SoftwareApplication'], {
  organization: ['address'],
  software: ['offers'],
  softwareOs: 'Web',
});
checkSchema('FAQ Page', path.join(distDir, 'faq', 'index.html'), ['Organization', 'WebSite', 'WebPage', 'FAQPage', 'BreadcrumbList']);
checkSchema('Contact Page', path.join(distDir, 'contact', 'index.html'), ['Organization', 'WebSite', 'ContactPage', 'BreadcrumbList']);
checkSchema('About Page', path.join(distDir, 'about', 'index.html'), ['Organization', 'WebSite', 'AboutPage', 'BreadcrumbList']);

console.log('\n=== 4. CANONICAL ROUTES PRE-RENDER CONTENT CHECK ===');
const publicRoutes = [
  { path: '', name: 'Home', canonical: 'https://www.aarogyadamu.com/', robots: 'index, follow, max-image-preview:large' },
  { path: 'about', name: 'About', canonical: 'https://www.aarogyadamu.com/about', robots: 'index, follow, max-image-preview:large' },
  { path: 'faq', name: 'FAQ', canonical: 'https://www.aarogyadamu.com/faq', robots: 'index, follow, max-image-preview:large' },
  { path: 'contact', name: 'Contact', canonical: 'https://www.aarogyadamu.com/contact', robots: 'index, follow, max-image-preview:large' },
  { path: 'security', name: 'Security', canonical: 'https://www.aarogyadamu.com/security', robots: 'index, follow, max-image-preview:large' },
  { path: 'privacy', name: 'Privacy', canonical: 'https://www.aarogyadamu.com/privacy', robots: 'index, follow, max-image-preview:large' },
  { path: 'terms', name: 'Terms', canonical: 'https://www.aarogyadamu.com/terms', robots: 'index, follow, max-image-preview:large' },
  { path: 'thank-you', name: 'Thank You', canonical: null, robots: 'noindex, follow' },
];

for (const r of publicRoutes) {
  const filePath = r.path === '' ? path.join(distDir, 'index.html') : path.join(distDir, r.path, 'index.html');
  const exists = fs.existsSync(filePath);
  assert(exists, `Route /${r.path} exists at ${filePath}`);
  if (!exists) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.length > 1000, `Route /${r.path} output size is substantial (${content.length} bytes)`);
  assert(content.includes('data-prerendered="true"'), `Route /${r.path} has data-prerendered="true"`);
  assert(!content.includes('aria-busy="true"'), `Route /${r.path} rendered full content without Suspense fallback`);

  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  assert(Boolean(titleMatch && titleMatch[1].trim().length > 0), `Route /${r.path} has valid title: "${titleMatch?.[1]?.substring(0, 30)}..."`);

  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
  assert(Boolean(descMatch && descMatch[1].trim().length > 0), `Route /${r.path} has non-empty description`);

  const robotsMatch = content.match(/<meta name="robots" content="([^"]+)"/);
  assert(robotsMatch?.[1] === r.robots, `Route /${r.path} robots is "${r.robots}" (got "${robotsMatch?.[1]}")`);

  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (r.canonical) {
    assert(canonicalMatch?.[1] === r.canonical, `Route /${r.path} has canonical "${r.canonical}" (got "${canonicalMatch?.[1]}")`);
  } else {
    assert(!canonicalMatch, `Route /${r.path} has NO canonical tag (noindex page)`);
  }
}

console.log('\n=== 5. CHECK DUPLICATE METADATA TAGS ===');
const checkDuplicates = (pageName, filePath, expectCanonical = true) => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const titles = (content.match(/<title>/g) || []).length;
  const canonicals = (content.match(/<link rel="canonical"/g) || []).length;
  const robots = (content.match(/<meta name="robots"/g) || []).length;
  const descriptions = (content.match(/<meta name="description"/g) || []).length;

  assert(titles === 1, `${pageName} has exactly 1 <title> (found ${titles})`);
  assert(descriptions === 1, `${pageName} has exactly 1 <meta name="description"> (found ${descriptions})`);
  assert(robots === 1, `${pageName} has exactly 1 <meta name="robots"> (found ${robots})`);
  assert(canonicals === (expectCanonical ? 1 : 0), `${pageName} has exactly ${expectCanonical ? 1 : 0} canonical tag (found ${canonicals})`);
};

checkDuplicates('Homepage', path.join(distDir, 'index.html'), true);
checkDuplicates('About', path.join(distDir, 'about', 'index.html'), true);
checkDuplicates('FAQ', path.join(distDir, 'faq', 'index.html'), true);
checkDuplicates('Contact', path.join(distDir, 'contact', 'index.html'), true);
checkDuplicates('Thank You', path.join(distDir, 'thank-you', 'index.html'), false);
checkDuplicates('404', path.join(distDir, '404.html'), false);

console.log('\n=== VERIFICATION SUMMARY ===');
if (failures > 0) {
  console.error(`❌ Verification FAILED with ${failures} assertion failure(s).`);
  process.exit(1);
} else {
  console.log('✅ All dist verification checks PASSED successfully!');
  process.exit(0);
}
