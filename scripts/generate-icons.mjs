import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// 1024x1024 SVG matching the uploaded logo exactly
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#62C8FF"/>
      <stop offset="100%" stop-color="#1A72E8"/>
    </linearGradient>
  </defs>

  <!-- Background rounded square (iOS icon corner radius ~22%) -->
  <rect width="1024" height="1024" rx="220" ry="220" fill="url(#bg)"/>

  <!-- Clock outer ring -->
  <circle cx="512" cy="512" r="385" fill="none" stroke="white" stroke-width="42"/>

  <!-- 12 tick marks -->
  <g stroke="white" stroke-linecap="round">
    <!-- 12 (major) --> <line x1="512" y1="141" x2="512" y2="200" stroke-width="30"/>
    <!-- 1  (minor) --> <line x1="704" y1="191" x2="677" y2="238" stroke-width="22"/>
    <!-- 2  (minor) --> <line x1="845" y1="326" x2="800" y2="353" stroke-width="22"/>
    <!-- 3  (major) --> <line x1="883" y1="512" x2="824" y2="512" stroke-width="30"/>
    <!-- 4  (minor) --> <line x1="845" y1="698" x2="800" y2="671" stroke-width="22"/>
    <!-- 5  (minor) --> <line x1="704" y1="833" x2="677" y2="786" stroke-width="22"/>
    <!-- 6  (major) --> <line x1="512" y1="883" x2="512" y2="824" stroke-width="30"/>
    <!-- 7  (minor) --> <line x1="320" y1="833" x2="347" y2="786" stroke-width="22"/>
    <!-- 8  (minor) --> <line x1="179" y1="698" x2="224" y2="671" stroke-width="22"/>
    <!-- 9  (major) --> <line x1="141" y1="512" x2="200" y2="512" stroke-width="30"/>
    <!-- 10 (minor) --> <line x1="179" y1="326" x2="224" y2="353" stroke-width="22"/>
    <!-- 11 (minor) --> <line x1="320" y1="191" x2="347" y2="238" stroke-width="22"/>
  </g>

  <!-- Dollar sign — large, centred in clock face -->
  <text
    x="512" y="640"
    text-anchor="middle"
    font-family="'SF Pro Display','Helvetica Neue',Arial,sans-serif"
    font-weight="800"
    font-size="430"
    fill="white"
  >$</text>

  <!-- Hour hand  ~10 o'clock: tip at (310, 355) -->
  <line x1="512" y1="512" x2="310" y2="355"
        stroke="white" stroke-width="40" stroke-linecap="round"/>

  <!-- Minute hand ~2 o'clock: tip at (690, 265) -->
  <line x1="512" y1="512" x2="690" y2="265"
        stroke="white" stroke-width="30" stroke-linecap="round"/>

  <!-- Centre cap -->
  <circle cx="512" cy="512" r="24" fill="white"/>
</svg>`;

mkdirSync(join(root, 'public', 'icons'), { recursive: true });

const svgBuffer = Buffer.from(svg);

// Sizes needed
const sizes = [
  { size: 1024, name: 'icon-1024.png' },   // master / App Store
  { size: 512,  name: 'icon-512.png' },
  { size: 192,  name: 'icon-192.png' },
  { size: 180,  name: 'apple-touch-icon.png' },
  { size: 167,  name: 'apple-touch-icon-167.png' },
  { size: 152,  name: 'apple-touch-icon-152.png' },
  { size: 120,  name: 'apple-touch-icon-120.png' },
  { size: 32,   name: 'favicon-32.png' },
  { size: 16,   name: 'favicon-16.png' },
];

for (const { size, name } of sizes) {
  // flatten alpha onto the blue background so iOS gets a fully opaque PNG
  await sharp(svgBuffer)
    .resize(size, size)
    .flatten({ background: { r: 26, g: 114, b: 232 } })
    .png()
    .toFile(join(root, 'public', 'icons', name));
  console.log(`Generated icons/${name} (${size}x${size})`);
}

// Root-level apple-touch-icon (iOS looks here without reading HTML first)
await sharp(svgBuffer)
  .resize(180, 180)
  .flatten({ background: { r: 26, g: 114, b: 232 } })
  .png()
  .toFile(join(root, 'public', 'apple-touch-icon.png'));

console.log('Done.');
