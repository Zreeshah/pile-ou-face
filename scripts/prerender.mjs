import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");

const entryPath = path.join(serverDir, "entry-server.js");
const { render, probabiliteRoutes, deRoutes } = await import(pathToFileURL(entryPath).href);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const BASE_URL = "https://pile-ouface.fr";

// Preset random-number pages. URL pattern mirrors src/lib/random.ts slugFor().
// title/description come from the SSR Helmet head (single source: <SEO> in the page),
// so these entries carry no title — the loop below falls back to helmet output.
const presets = JSON.parse(
  fs.readFileSync(path.join(root, "src/data/randomPresets.json"), "utf-8"),
);
const presetRoutes = presets.map((p) => ({
  path: `/nombre-aleatoire/${p.draws}-tirage/minimum-${p.min}/maximum-${p.max}`,
}));

const routes = [
  "/",
  "/comment-lancer-piece-en-ligne",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/pile-ou-face-plusieurs-lancers",
  "/tirage-au-sort",
  "/de-en-ligne",
  "/nombre-aleatoire",
  "/blog",
  "/blog/histoire-pile-ou-face",
  "/blog/probabilite-pile-ou-face",
  "/blog/pile-ou-face-50-50",
  "/blog/pile-ou-face-football-rugby",
  "/blog/pile-ou-face-google",
  "/blog/comment-decider-quand-on-hesite",
  "/blog/sophisme-du-joueur",
].map((routePath) => ({ path: routePath }));

function stripManagedHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name=["']title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']alternate["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:url["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "");
}

const allRoutes = [...routes, ...presetRoutes, ...probabiliteRoutes, ...deRoutes];
const sitemapRoutes = [...routes, ...probabiliteRoutes, ...deRoutes];

function renderPage(url) {
  const { html, head } = render(url);
  let page = stripManagedHeadTags(template);
  page = page.replace("</head>", `    ${head}\n  </head>`);
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );
  return page;
}

for (const route of allRoutes) {
  const page = renderPage(route.path);
  const outDir =
    route.path === "/" ? distDir : path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  console.log("Prerendered", route.path);
}

// Netlify serves this file with an actual 404 response for every unknown URL.
fs.writeFileSync(path.join(distDir, "404.html"), renderPage("/404"));
console.log("Wrote custom 404.html");

// Low-value random-number presets remain available to users but are intentionally
// noindex and therefore excluded from the sitemap until they gain unique content.
const sitemapUrls = sitemapRoutes.map((r) => {
  const loc = r.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${r.path}/`;
  return `  <url><loc>${loc}</loc></url>`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log("Wrote sitemap.xml with", sitemapRoutes.length, "indexable urls");

fs.rmSync(serverDir, { recursive: true, force: true });
console.log("Done.");
