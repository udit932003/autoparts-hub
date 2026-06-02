// Generates clean, branded SVG placeholder images for every product and
// category, so the storefront always has consistent, relevant artwork
// (no broken/irrelevant stock photos). SVGs are vector → scale crisply.
import { writeFileSync, mkdirSync } from "fs";
import path from "path";
import { categories, products, slugify } from "./seed-data";

const CENTER = 300;
const CY = 232;

function icon(slug: string, c2: string): string {
  const W = "#ffffff";
  switch (slug) {
    case "brakes": {
      let holes = "";
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        holes += `<circle cx="${(CENTER + 72 * Math.cos(a)).toFixed(1)}" cy="${(CY + 72 * Math.sin(a)).toFixed(1)}" r="11" fill="${W}"/>`;
      }
      return `<circle cx="${CENTER}" cy="${CY}" r="108" fill="none" stroke="${W}" stroke-width="14"/>${holes}<circle cx="${CENTER}" cy="${CY}" r="34" fill="${W}"/>`;
    }
    case "engine": {
      let teeth = "";
      for (let i = 0; i < 8; i++)
        teeth += `<rect x="288" y="116" width="24" height="36" rx="4" fill="${W}" transform="rotate(${i * 45} ${CENTER} ${CY})"/>`;
      return `${teeth}<circle cx="${CENTER}" cy="${CY}" r="70" fill="none" stroke="${W}" stroke-width="16"/><circle cx="${CENTER}" cy="${CY}" r="22" fill="${W}"/>`;
    }
    case "suspension": {
      let coils = "";
      for (let i = 0; i < 6; i++)
        coils += `<ellipse cx="${CENTER}" cy="${148 + i * 34}" rx="80" ry="20" fill="none" stroke="${W}" stroke-width="12"/>`;
      return coils;
    }
    case "lighting":
      return `<circle cx="${CENTER}" cy="208" r="66" fill="none" stroke="${W}" stroke-width="14"/>
        <rect x="276" y="268" width="48" height="34" rx="6" fill="${W}"/>
        <rect x="282" y="302" width="36" height="14" rx="4" fill="${W}"/>
        <path d="M286 200 l14 18 l14 -28" fill="none" stroke="${W}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <g stroke="${W}" stroke-width="10" stroke-linecap="round"><line x1="300" y1="96" x2="300" y2="122"/><line x1="392" y1="134" x2="374" y2="152"/><line x1="208" y1="134" x2="226" y2="152"/></g>`;
    case "tyres-wheels": {
      let spokes = "";
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        spokes += `<line x1="${CENTER}" y1="${CY}" x2="${(CENTER + 52 * Math.cos(a)).toFixed(1)}" y2="${(CY + 52 * Math.sin(a)).toFixed(1)}" stroke="${W}" stroke-width="12" stroke-linecap="round"/>`;
      }
      return `<circle cx="${CENTER}" cy="${CY}" r="110" fill="none" stroke="${W}" stroke-width="40" stroke-opacity="0.4"/><circle cx="${CENTER}" cy="${CY}" r="58" fill="none" stroke="${W}" stroke-width="12"/>${spokes}<circle cx="${CENTER}" cy="${CY}" r="16" fill="${W}"/>`;
    }
    case "batteries":
      return `<rect x="194" y="178" width="212" height="132" rx="14" fill="none" stroke="${W}" stroke-width="14"/>
        <rect x="222" y="158" width="38" height="24" rx="5" fill="${W}"/>
        <rect x="340" y="158" width="38" height="24" rx="5" fill="${W}"/>
        <g stroke="${W}" stroke-width="11" stroke-linecap="round"><line x1="244" y1="244" x2="286" y2="244"/><line x1="265" y1="223" x2="265" y2="265"/><line x1="316" y1="244" x2="358" y2="244"/></g>`;
    case "sensors":
      return `<rect x="206" y="248" width="150" height="72" rx="16" fill="${W}"/>
        <circle cx="246" cy="284" r="13" fill="${c2}"/>
        <g fill="none" stroke="${W}" stroke-width="12" stroke-linecap="round"><path d="M372 250 a58 58 0 0 1 0 68"/><path d="M404 232 a92 92 0 0 1 0 104"/><path d="M436 214 a126 126 0 0 1 0 140"/></g>`;
    case "audio":
      return `<circle cx="${CENTER}" cy="${CY}" r="102" fill="none" stroke="${W}" stroke-width="12"/>
        <circle cx="${CENTER}" cy="${CY}" r="48" fill="${W}"/>
        <circle cx="${CENTER}" cy="${CY}" r="16" fill="${c2}"/>
        <circle cx="${CENTER}" cy="148" r="9" fill="${W}"/>`;
    case "accessories":
      return `<g transform="rotate(45 ${CENTER} ${CY})">
        <rect x="284" y="200" width="32" height="150" rx="11" fill="${W}"/>
        <circle cx="${CENTER}" cy="172" r="42" fill="${W}"/>
        <circle cx="${CENTER}" cy="160" r="19" fill="${c2}"/>
      </g>`;
    default:
      return `<circle cx="${CENTER}" cy="${CY}" r="80" fill="none" stroke="${W}" stroke-width="16"/>`;
  }
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function frame(slug: string, colors: [string, string], lines: { brand?: string; title: string }) {
  const [c1, c2] = colors;
  const bottom = lines.brand
    ? `<text x="40" y="500" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#ffffff" fill-opacity="0.85">${esc(lines.brand.toUpperCase())}</text>
       <text x="40" y="544" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#ffffff">${esc(lines.title)}</text>`
    : `<text x="300" y="430" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">${esc(lines.title)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.5" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.45"/></linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <g opacity="0.92">${icon(slug, c2)}</g>
  <rect width="600" height="600" fill="url(#shade)"/>
  ${bottom}
</svg>`;
}

function main() {
  const root = process.cwd();
  const prodDir = path.join(root, "public", "products");
  const catDir = path.join(root, "public", "categories");
  mkdirSync(prodDir, { recursive: true });
  mkdirSync(catDir, { recursive: true });

  const catColors = new Map(categories.map((c) => [c.slug, c.colors]));

  for (const c of categories) {
    writeFileSync(path.join(catDir, `${c.slug}.svg`), frame(c.slug, c.colors, { title: c.name }));
  }

  // Map a clean short label per product for the tile (use the brand prominently)
  for (const p of products) {
    const colors = catColors.get(p.category) ?? ["#475569", "#0f172a"];
    const shortTitle = p.name.replace(/\s*\([^)]*\)/g, "").slice(0, 22);
    writeFileSync(
      path.join(prodDir, `${slugify(p.name)}.svg`),
      frame(p.category, colors as [string, string], { brand: p.brand, title: shortTitle })
    );
  }

  console.log(`✅ Generated ${categories.length} category + ${products.length} product images`);
}

main();
