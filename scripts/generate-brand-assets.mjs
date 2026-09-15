// One-off brand-asset generator for AarogyaDamu.
// Produces a full-bleed 1200x630 social/OG image and the app-icon set
// (apple-touch-icon + PWA manifest icons + PNG favicons) from the brand system.
// Run with: node scripts/generate-brand-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

// Brand tokens (mirrors tailwind.config.js / index.css)
const INK = '#0F1012';
const INK_CARD = '#181A1E';
const PAPER = '#F7F6F3';
const CREAM = '#FAF8F5';
const ACCENT = '#C8533A';
const MUTED = '#9A9CA5';

// Chakra-seal brand mark, sized to a viewBox of `s` x `s`.
function sealMark(s, { ring = CREAM, dot = ACCENT, tick = CREAM } = {}) {
  const c = s / 2;
  const rOuter = s * 0.36;
  const rInner = s * 0.16;
  const tickInner = s * 0.20;
  const tickOuter = s * 0.34;
  return `
    <circle cx="${c}" cy="${c}" r="${rOuter}" fill="none" stroke="${ring}" stroke-width="${s * 0.045}" stroke-dasharray="${s * 0.11} ${s * 0.055}" opacity="0.85"/>
    <circle cx="${c}" cy="${c}" r="${rInner}" fill="${dot}"/>
    <path d="M${c} ${c - tickOuter}V${c - tickInner} M${c} ${c + tickInner}V${c + tickOuter} M${c - tickOuter} ${c}H${c - tickInner} M${c + tickInner} ${c}H${c + tickOuter}" stroke="${tick}" stroke-width="${s * 0.045}" stroke-linecap="round"/>
  `;
}

// ---- OG / social image: 1200 x 630 ----
function ogSvg() {
  const W = 1200, H = 630;
  // Right-side hub-and-spoke motif echoing the hero diagram.
  const hubX = 960, hubY = 315, R = 150;
  const spokes = 10;
  let motif = '';
  for (let i = 0; i < spokes; i++) {
    const a = (-90 + i * (360 / spokes)) * Math.PI / 180;
    const x = hubX + R * Math.cos(a);
    const y = hubY + R * Math.sin(a);
    motif += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${hubX}" y2="${hubY}" stroke="${ACCENT}" stroke-width="1" stroke-dasharray="3 4" opacity="0.28"/>`;
    motif += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${INK_CARD}" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="72%" cy="50%" r="55%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- hub/spoke motif -->
  <g>${motif}
    <circle cx="${hubX}" cy="${hubY}" r="46" fill="${INK}" stroke="${ACCENT}" stroke-width="1.5" opacity="0.9"/>
    <text x="${hubX}" y="${hubY - 4}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="12" letter-spacing="2" font-weight="700" fill="rgba(255,255,255,0.55)">YOUR</text>
    <text x="${hubX}" y="${hubY + 13}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="15" letter-spacing="2" font-weight="700" fill="${CREAM}">HEALTH</text>
  </g>

  <!-- brand seal -->
  <g transform="translate(96, 92)">${sealMark(56)}</g>

  <!-- eyebrow -->
  <text x="170" y="128" font-family="DejaVu Sans, sans-serif" font-size="20" letter-spacing="4" font-weight="600" fill="${MUTED}">PERSONAL HEALTH INTELLIGENCE</text>

  <!-- wordmark -->
  <text x="94" y="330" font-family="Caladea, 'DejaVu Serif', serif" font-size="104" font-weight="700" fill="${CREAM}">Aarogya<tspan fill="${ACCENT}">Damu</tspan></text>

  <!-- tagline -->
  <text x="98" y="398" font-family="Caladea, 'DejaVu Serif', serif" font-size="40" font-style="italic" fill="rgba(250,248,245,0.82)">Your health, understood over time.</text>

  <!-- footer boundary line -->
  <line x1="98" y1="540" x2="1104" y2="540" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
  <circle cx="104" cy="566" r="4" fill="${ACCENT}"/>
  <text x="120" y="571" font-family="DejaVu Sans, sans-serif" font-size="19" fill="rgba(255,255,255,0.45)">Medical understanding, not medical advice · aarogyadamu.com</text>
</svg>`;
}

// ---- App icon (solid, for apple-touch + PWA + PNG favicons) ----
function appIconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${INK}"/>
    <g>${sealMark(size)}</g>
  </svg>`;
}

async function run() {
  await sharp(Buffer.from(ogSvg())).png().toFile(resolve(PUBLIC, 'og-image.png'));
  console.log('✓ og-image.png (1200x630)');

  const iconTargets = [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
    ['favicon-32.png', 32],
    ['favicon-16.png', 16],
  ];
  for (const [name, size] of iconTargets) {
    await sharp(Buffer.from(appIconSvg(size))).png().toFile(resolve(PUBLIC, name));
    console.log(`✓ ${name} (${size}x${size})`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
