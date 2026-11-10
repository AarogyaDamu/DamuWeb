import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const distDir = path.resolve('dist');

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
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
    const contentType =
      ext === '.html'
        ? 'text/html; charset=UTF-8'
        : ext === '.js'
        ? 'application/javascript; charset=UTF-8'
        : ext === '.css'
        ? 'text/css; charset=UTF-8'
        : ext === '.json' || ext === '.webmanifest'
        ? 'application/json; charset=UTF-8'
        : ext === '.png'
        ? 'image/png'
        : ext === '.webp'
        ? 'image/webp'
        : ext === '.svg'
        ? 'image/svg+xml'
        : ext === '.ico'
        ? 'image/x-icon'
        : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
    return;
  }

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
  console.log(`[Browser Test Server] Listening on http://127.0.0.1:${port}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const executablePath = fs.existsSync(chromePath) ? chromePath : edgePath;

  console.log(`[Browser Test] Launching browser at: ${executablePath}`);
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const routes = [
    '/',
    '/about',
    '/faq',
    '/contact',
    '/security',
    '/privacy',
    '/terms',
    '/thank-you',
  ];

  let totalErrors = 0;

  for (const route of routes) {
    console.log(`\n========================================`);
    console.log(`[Testing Route] ${route}`);
    console.log(`========================================`);

    const page = await browser.newPage();
    const errors = [];
    const logs = [];

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      logs.push(`[Console ${type}] ${text}`);
      if (type === 'error' || text.includes('HYDRATION') || text.includes('Error #418')) {
        errors.push(`[Console ${type}] ${text}`);
      }
    });

    page.on('pageerror', (err) => {
      errors.push(`[Page Error] ${err.toString()}`);
    });

    try {
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
      // Wait a moment for any deferred hydration/effects
      await new Promise((r) => setTimeout(r, 1000));

      // Test refresh
      await page.reload({ waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise((r) => setTimeout(r, 1000));

      if (errors.length > 0) {
        console.error(`❌ Errors on route ${route}:`);
        errors.forEach((e) => console.error('  ', e));
        totalErrors += errors.length;
      } else {
        console.log(`✅ Route ${route} hydrated cleanly on initial load & reload!`);
      }
    } catch (err) {
      console.error(`❌ Navigation failed for ${route}:`, err.message);
      totalErrors++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close(() => {
    console.log(`\n========================================`);
    console.log(`[Browser Test Complete] Total errors: ${totalErrors}`);
    console.log(`========================================`);
    process.exit(totalErrors > 0 ? 1 : 0);
  });
});
