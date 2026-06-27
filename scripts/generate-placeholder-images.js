/**
 * Generates on-brand placeholder SVG images for every image slot referenced
 * in the codebase. These are NOT meant to be the final production images —
 * they exist so the site never ships with a broken <img> tag.
 *
 * Real photography should replace these before going live. See
 * docs/IMAGE_REPLACEMENT_GUIDE.md for exact recommended stock photo
 * searches and licensing notes for each slot.
 *
 * Run with: node scripts/generate-placeholder-images.js
 */
const fs = require("fs");
const path = require("path");

const FOREST = "#0B2E1F";
const LEAF = "#1E9E5A";
const AMBER = "#F2B229";
const SAND = "#F6F8F5";

function panelGrid(x, y, w, h, rows, cols) {
  const cellW = w / cols;
  const cellH = h / rows;
  let lines = "";
  for (let r = 0; r <= rows; r++) {
    lines += `<line x1="${x}" y1="${y + r * cellH}" x2="${x + w}" y2="${y + r * cellH}" stroke="#0B2E1F" stroke-opacity="0.35" stroke-width="1.5" />`;
  }
  for (let c = 0; c <= cols; c++) {
    lines += `<line x1="${x + c * cellW}" y1="${y}" x2="${x + c * cellW}" y2="${y + h}" stroke="#0B2E1F" stroke-opacity="0.35" stroke-width="1.5" />`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#173a28" rx="6" />${lines}`;
}

function buildSvg({ width, height, label, sublabel }) {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#cfe8f7"/>
      <stop offset="100%" stop-color="${SAND}"/>
    </linearGradient>
    <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1f3d2c"/>
      <stop offset="100%" stop-color="${FOREST}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <circle cx="${width * 0.84}" cy="${height * 0.18}" r="${Math.min(width, height) * 0.07}" fill="${AMBER}" opacity="0.9"/>
  <polygon points="${width * 0.05},${height * 0.62} ${width * 0.5},${height * 0.34} ${width * 0.95},${height * 0.62} ${width * 0.95},${height * 0.95} ${width * 0.05},${height * 0.95}" fill="url(#roof)"/>
  <polygon points="${width * 0.05},${height * 0.62} ${width * 0.5},${height * 0.34} ${width * 0.95},${height * 0.62}" fill="#0d2c1d"/>
  ${panelGrid(width * 0.18, height * 0.46, width * 0.64, height * 0.18, 2, 8)}
  <rect x="0" y="${height * 0.95}" width="${width}" height="${height * 0.05}" fill="${FOREST}"/>
  <g>
    <rect x="${width / 2 - 170}" y="${height - 70}" width="340" height="48" rx="10" fill="white" opacity="0.92"/>
    <text x="${width / 2}" y="${height - 42}" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="${FOREST}">${label}</text>
  </g>
  ${sublabel ? `<text x="${width / 2}" y="${height * 0.12}" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="600" fill="${FOREST}" opacity="0.55">${sublabel}</text>` : ""}
</svg>`;
}

const images = [
  { file: "hero/rooftop-installation.svg", w: 720, h: 560, label: "Rooftop Solar Installation", sub: "PLACEHOLDER — replace with real photo" },
  { file: "solutions/homes.svg", w: 640, h: 420, label: "Homes", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/housing-societies.svg", w: 640, h: 420, label: "Housing Societies", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/commercial.svg", w: 640, h: 420, label: "Commercial Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/homes-hero.svg", w: 640, h: 480, label: "Homes", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/rooftop-hero.svg", w: 640, h: 480, label: "Rooftop Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/on-grid-hero.svg", w: 640, h: 480, label: "On-Grid Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/off-grid-hero.svg", w: 640, h: 480, label: "Off-Grid Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/hybrid-hero.svg", w: 640, h: 480, label: "Hybrid Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/commercial-hero.svg", w: 640, h: 480, label: "Commercial Solar", sub: "PLACEHOLDER IMAGE" },
  { file: "solutions/housing-societies-hero.svg", w: 640, h: 480, label: "Housing Societies", sub: "PLACEHOLDER IMAGE" },
  { file: "testimonials/installation-team.svg", w: 640, h: 420, label: "Installation Team", sub: "PLACEHOLDER IMAGE" },
  { file: "og-cover.svg", w: 1200, h: 630, label: "Prakhar Green Energy Solutions", sub: "PLACEHOLDER OG IMAGE" },
];

const outDir = path.join(__dirname, "..", "public", "images");

for (const img of images) {
  const fullPath = path.join(outDir, img.file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  const svg = buildSvg({ width: img.w, height: img.h, label: img.label, sublabel: img.sub });
  fs.writeFileSync(fullPath, svg, "utf-8");
  console.log(`Generated ${fullPath}`);
}

console.log("\nDone. Remember: these are placeholders. See docs/IMAGE_REPLACEMENT_GUIDE.md.");
