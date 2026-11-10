import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function getGitLastMod(sourceFile) {
  try {
    const fullPath = path.resolve(rootDir, sourceFile);
    if (!fs.existsSync(fullPath)) return null;
    const output = execSync(`git log -1 --format=%cs -- "${sourceFile}"`, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(output)) {
      return output;
    }
  } catch {
    // If git is not available or fails, omit lastmod
  }
  return null;
}

function buildMetaHtml(meta) {
  const lines = [];
  lines.push(`    <meta name="robots" content="${escapeXml(meta.robots)}" />`);
  lines.push(`    <title>${escapeXml(meta.title)}</title>`);
  lines.push(`    <meta name="description" content="${escapeXml(meta.description)}" />`);

  if (meta.canonicalUrl && meta.canonicalUrl.trim().length > 0) {
    lines.push(`    <link rel="canonical" href="${escapeXml(meta.canonicalUrl)}" />`);
  }

  // Open Graph
  lines.push(`    <meta property="og:type" content="website" />`);
  lines.push(`    <meta property="og:site_name" content="AarogyaDamu" />`);
  lines.push(`    <meta property="og:locale" content="en_IN" />`);
  lines.push(`    <meta property="og:url" content="${escapeXml(meta.canonicalUrl || 'https://www.aarogyadamu.com')}" />`);
  lines.push(`    <meta property="og:title" content="${escapeXml(meta.title)}" />`);
  lines.push(`    <meta property="og:description" content="${escapeXml(meta.description)}" />`);
  lines.push(`    <meta property="og:image" content="${escapeXml(meta.ogImage)}" />`);
  lines.push(`    <meta property="og:image:secure_url" content="${escapeXml(meta.ogImage)}" />`);
  lines.push(`    <meta property="og:image:type" content="image/png" />`);
  lines.push(`    <meta property="og:image:width" content="1200" />`);
  lines.push(`    <meta property="og:image:height" content="630" />`);
  lines.push(`    <meta property="og:image:alt" content="AarogyaDamu — Personal Health Intelligence" />`);

  // Twitter
  lines.push(`    <meta name="twitter:card" content="summary_large_image" />`);
  lines.push(`    <meta name="twitter:title" content="${escapeXml(meta.title)}" />`);
  lines.push(`    <meta name="twitter:description" content="${escapeXml(meta.description)}" />`);
  lines.push(`    <meta name="twitter:image" content="${escapeXml(meta.ogImage)}" />`);
  lines.push(`    <meta name="twitter:image:alt" content="AarogyaDamu — Personal Health Intelligence" />`);

  // JSON-LD
  if (meta.schemaJson) {
    lines.push(`    <script type="application/ld+json" id="jsonld-schema">${JSON.stringify(meta.schemaJson)}</script>`);
  }

  return lines.join('\n');
}

async function run() {
  console.log('[Prerender] Building SSR bundle with Vite into dist-ssr...');

  await build({
    root: rootDir,
    logLevel: 'warn',
    build: {
      ssr: 'src/prerender.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'prerender.js',
          format: 'esm',
        },
      },
    },
  });

  const ssrEntryPath = path.resolve(distSsrDir, 'prerender.js');
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`[Prerender] SSR bundle not found at ${ssrEntryPath}`);
  }

  const { prerender, ROUTES_METADATA, PRERENDER_ROUTES, CANONICAL_ROUTES } = await import(
    `file://${ssrEntryPath.replace(/\\/g, '/')}`
  );

  const indexHtmlPath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`[Prerender] Client index.html template not found at ${indexHtmlPath}`);
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf8');

  const metaMarkerStart = '<!-- METADATA_START -->';
  const metaMarkerEnd = '<!-- METADATA_END -->';
  const contentMarker = '<!-- APP_ROOT_CONTENT -->';

  if (!template.includes(metaMarkerStart) || !template.includes(metaMarkerEnd)) {
    throw new Error('[Prerender] Missing <!-- METADATA_START --> / <!-- METADATA_END --> markers in index.html');
  }

  if (!template.includes(contentMarker)) {
    throw new Error('[Prerender] Missing <!-- APP_ROOT_CONTENT --> marker in index.html');
  }

  // Ensure dist/404 directory does not exist (dist/404.html is the sole custom error page)
  const legacyDir404 = path.resolve(distDir, '404');
  if (fs.existsSync(legacyDir404)) {
    fs.rmSync(legacyDir404, { recursive: true, force: true });
  }

  console.log(`[Prerender] Prerendering ${PRERENDER_ROUTES.length} routes...`);

  for (const route of PRERENDER_ROUTES) {
    console.log(`[Prerender] Processing route: ${route}`);
    const { html, metadata } = await prerender(route);

    const metaBlock = buildMetaHtml(metadata);

    // Replace metadata block between markers
    const beforeMeta = template.substring(0, template.indexOf(metaMarkerStart) + metaMarkerStart.length);
    const afterMeta = template.substring(template.indexOf(metaMarkerEnd));
    let pageHtml = `${beforeMeta}\n${metaBlock}\n    ${afterMeta}`;

    // Replace app root content and mark as prerendered
    if (!pageHtml.includes('data-prerendered="false"')) {
      throw new Error('[Prerender] Expected data-prerendered="false" on root element in template');
    }
    pageHtml = pageHtml.replace('data-prerendered="false"', 'data-prerendered="true"');
    pageHtml = pageHtml.replace(contentMarker, html);

    // Determine output file path
    let outPath;
    if (route === '/') {
      outPath = path.resolve(distDir, 'index.html');
    } else if (route === '/404') {
      // Vercel static error page convention: dist/404.html
      outPath = path.resolve(distDir, '404.html');
    } else {
      const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
      fs.mkdirSync(routeDir, { recursive: true });
      outPath = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(outPath, pageHtml, 'utf8');
    console.log(`[Prerender] Saved: ${path.relative(rootDir, outPath)} (${pageHtml.length} bytes)`);
  }

  // Generate automated sitemap.xml
  console.log('[Prerender] Generating automated sitemap.xml for canonical routes...');
  const sitemapLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const route of CANONICAL_ROUTES) {
    const meta = ROUTES_METADATA[route];
    const loc = meta.canonicalUrl;
    const lastmod = getGitLastMod(meta.sourceFile);

    sitemapLines.push('  <url>');
    sitemapLines.push(`    <loc>${escapeXml(loc)}</loc>`);
    if (lastmod) {
      sitemapLines.push(`    <lastmod>${lastmod}</lastmod>`);
    }
    sitemapLines.push('  </url>');
  }

  sitemapLines.push('</urlset>');
  const sitemapXml = sitemapLines.join('\n') + '\n';

  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`[Prerender] dist/sitemap.xml generated with ${CANONICAL_ROUTES.length} canonical routes.`);

  // Clean up dist-ssr
  console.log('[Prerender] Cleaning up temporary dist-ssr directory...');
  fs.rmSync(distSsrDir, { recursive: true, force: true });

  console.log('[Prerender] Prerendering and sitemap generation complete!');
}

run().catch((err) => {
  console.error('[Prerender] Fatal error during prerendering:', err);
  process.exit(1);
});

