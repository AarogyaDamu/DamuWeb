import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

console.log('=== LOCAL HTTP TEST: Static Server Simulation ===');
console.log('NOTE: This is a local static-server simulation test, not Vercel deployment verification.');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    failures++;
    console.error(`[FAIL] ${message}`);
  } else {
    console.log(`[PASS] ${message}`);
  }
}

if (!fs.existsSync(distDir)) {
  console.error('[FAIL] dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Try static file or directory index
  let filePath = path.join(distDir, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html; charset=UTF-8' : ext === '.xml' ? 'application/xml; charset=UTF-8' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
    return;
  }

  // Not found: serve 404.html with genuine HTTP 404
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(notFoundPath)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(fs.readFileSync(notFoundPath));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  console.log(`[Local Server] Listening on http://127.0.0.1:${port}`);

  const testUrls = [
    { url: '/', expectStatus: 200, expectText: 'AarogyaDamu' },
    { url: '/about', expectStatus: 200, expectText: 'Building the Intelligence Layer' },
    { url: '/faq', expectStatus: 200, expectText: 'Frequently Asked Questions' },
    { url: '/contact', expectStatus: 200, expectText: 'Contact AarogyaDamu' },
    { url: '/security', expectStatus: 200, expectText: 'Security Practices' },
    { url: '/privacy', expectStatus: 200, expectText: 'Privacy Policy' },
    { url: '/terms', expectStatus: 200, expectText: 'Terms of Service' },
    { url: '/thank-you', expectStatus: 200, expectText: 'Message Received' },
    { url: '/sitemap.xml', expectStatus: 200, expectText: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' },
    { url: '/nonexistent-route-xyz', expectStatus: 404, expectText: 'Page Not Found' },
    { url: '/random/nested/missing-page', expectStatus: 404, expectText: 'Page Not Found' },
  ];

  for (const t of testUrls) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}${t.url}`);
      const text = await response.text();
      const statusOk = response.status === t.expectStatus;
      const textOk = text.includes(t.expectText);

      assert(statusOk, `${t.url} returned HTTP ${response.status} (expected ${t.expectStatus})`);
      assert(textOk, `${t.url} body contains expected substring "${t.expectText}"`);
    } catch (err) {
      assert(false, `${t.url} request failed with network error: ${err.message}`);
    }
  }

  server.close(() => {
    console.log('\n=== LOCAL HTTP TEST SUMMARY ===');
    if (failures > 0) {
      console.error(`❌ Local HTTP tests FAILED with ${failures} assertion failure(s).`);
      process.exit(1);
    } else {
      console.log('✅ All local HTTP tests PASSED successfully.');
      process.exit(0);
    }
  });
});
