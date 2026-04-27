import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5BC3FA;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1A72E8;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background rounded square -->
  <rect width="1024" height="1024" rx="224" ry="224" fill="url(#bg)"/>

  <!-- Outer clock ring -->
  <circle cx="512" cy="512" r="390" fill="none" stroke="white" stroke-width="38"/>

  <!-- Clock tick marks: 12 ticks, each at 30deg intervals -->
  <g stroke="white" stroke-linecap="round">
    <!-- 12 o'clock -->
    <line x1="512" y1="144" x2="512" y2="196" stroke-width="28"/>
    <!-- 1 -->
    <line x1="707" y1="194" x2="681" y2="239" stroke-width="20"/>
    <!-- 2 -->
    <line x1="846" y1="329" x2="801" y2="354" stroke-width="20"/>
    <!-- 3 o'clock -->
    <line x1="880" y1="512" x2="828" y2="512" stroke-width="28"/>
    <!-- 4 -->
    <line x1="846" y1="695" x2="801" y2="670" stroke-width="20"/>
    <!-- 5 -->
    <line x1="707" y1="830" x2="681" y2="785" stroke-width="20"/>
    <!-- 6 o'clock -->
    <line x1="512" y1="868" x2="512" y2="828" stroke-width="28"/>
    <!-- 7 -->
    <line x1="317" y1="830" x2="343" y2="785" stroke-width="20"/>
    <!-- 8 -->
    <line x1="178" y1="695" x2="223" y2="670" stroke-width="20"/>
    <!-- 9 o'clock -->
    <line x1="144" y1="512" x2="196" y2="512" stroke-width="28"/>
    <!-- 10 -->
    <line x1="178" y1="329" x2="223" y2="354" stroke-width="20"/>
    <!-- 11 -->
    <line x1="317" y1="194" x2="343" y2="239" stroke-width="20"/>
  </g>

  <!-- Hour hand pointing ~10 (upper-left) -->
  <line x1="512" y1="512" x2="330" y2="330" stroke="white" stroke-width="36" stroke-linecap="round"/>
  <!-- Minute hand pointing ~2 (upper-right) -->
  <line x1="512" y1="512" x2="680" y2="260" stroke="white" stroke-width="28" stroke-linecap="round"/>

  <!-- Center dot -->
  <circle cx="512" cy="512" r="22" fill="white"/>

  <!-- Dollar sign -->
  <text
    x="512"
    y="720"
    text-anchor="middle"
    font-family="'Helvetica Neue', Arial, sans-serif"
    font-weight="700"
    font-size="320"
    fill="white"
    opacity="0.95"
  >$</text>
</svg>`;

mkdirSync(join(root, 'public', 'icons'), { recursive: true });

const svgBuffer = Buffer.from(svg);

const sizes = [
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
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(join(root, 'public', 'icons', name));
  console.log(`Generated ${name} (${size}x${size})`);
}

// Copy apple-touch-icon to public root (iOS looks there by convention)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(join(root, 'public', 'apple-touch-icon.png'));
console.log('Copied apple-touch-icon.png to public root');

console.log('All icons generated successfully.');
