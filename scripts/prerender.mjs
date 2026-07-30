import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");

const entryPath = path.join(serverDir, "entry-server.js");
const { render, probabiliteRoutes } = await import(pathToFileURL(entryPath).href);

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
  { path: "/", title: "Pile ou Face en Ligne – Simulateur Gratuit de Lancer de Pièce", description: "Lancez une pièce en ligne gratuitement et obtenez pile ou face instantanément. Simulateur 50/50, sans inscription, sur mobile et ordinateur." },
  { path: "/comment-lancer-piece-en-ligne", title: "Comment Lancer une Pièce en Ligne | Pile ou Face", description: "Découvrez comment utiliser notre simulateur pile ou face en ligne. Guide simple pour lancer une pièce virtuelle." },
  { path: "/a-propos", title: "À Propos | Pile ou Face", description: "Découvrez l\'histoire de pile-ouface.fr, le simulateur de pile ou face en ligne gratuit." },
  { path: "/contact", title: "Contact | Pile ou Face", description: "Contactez l\'équipe de pile-ouface.fr. Questions, suggestions ou partenariats." },
  { path: "/pile-ou-face-plusieurs-lancers", title: "Probabilité Pile ou Face – Simulation Lancer de Pièce (10, 100, 1000 fois)", description: "Simulez 10, 100 ou 1000 lancers de pièce. Statistiques en direct, série la plus longue, loi des grands nombres. Idéal pour les cours de probabilité." },
  { path: "/tirage-au-sort", title: "Tirage au Sort de Noms en Ligne – Générateur Aléatoire Gratuit", description: "Tirez un ou plusieurs noms au hasard parmi votre liste. Générateur de noms aléatoires gratuit, équitable et transparent." },
  { path: "/de-en-ligne", title: "Dé en Ligne – Lancez un Dé Virtuel Gratuit (1 à 6)", description: "Lancez un dé en ligne gratuitement. Résultat aléatoire de 1 à 6, animation réaliste, historique des lancers." },
  { path: "/nombre-aleatoire", title: "Générateur de Nombre Aléatoire en Ligne – Tirer un Nombre au Hasard", description: "Tirez un ou plusieurs nombres au hasard entre un minimum et un maximum. Générateur de nombre aléatoire gratuit, équitable et instantané, sans inscription." },
  { path: "/blog", title: "Blog Pile ou Face – Articles, Guides et Probabilités", description: "Découvrez tous nos articles sur le pile ou face : histoire, probabilités, sophisme du joueur, méthodes de décision." },
  { path: "/blog/histoire-pile-ou-face", title: "Histoire du pile ou face : 5 faits surprenants", description: "Découvrez l\'histoire fascinante du pile ou face, de la Rome antique au Super Bowl. 5 anecdotes historiques." },
  { path: "/blog/probabilite-pile-ou-face", title: "Probabilité pile ou face : le calcul expliqué simplement", description: "Comprendre la probabilité pile ou face en 5 minutes. Calcul simple des chances, séries de lancers, loi des grands nombres." },
  { path: "/blog/pile-ou-face-50-50", title: "Pile ou face 50/50 : la vérité que la science révèle", description: "L\'étude Diaconis et 350 757 lancers révèlent un biais insoupçonné. Le pile ou face est-il vraiment 50/50 ?" },
  { path: "/blog/pile-ou-face-football-rugby", title: "Pile ou face au football et au rugby : le règlement", description: "Loi 8 FIFA, protocole rugby, toss NFL et cricket. Tout savoir sur le tirage au sort dans le sport." },
  { path: "/blog/pile-ou-face-google", title: "Pile ou face Google : comment ça marche", description: "Découvrez comment fonctionne le simulateur de Google, ses limites et pourquoi un outil dédié offre plus." },
  { path: "/blog/comment-decider-quand-on-hesite", title: "Comment décider quand on hésite : 7 méthodes", description: "Pile ou face, matrice d\'Eisenhower, règle des 10-10-10 : 7 techniques pour prendre une décision sans stress." },
  { path: "/blog/sophisme-du-joueur", title: "Le sophisme du joueur expliqué simplement", description: "Pourquoi croire que le hasard a de la mémoire est une erreur. De Monte Carlo 1913 à la psychologie cognitive." },
];

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
    .replace(/<meta\s+property=["']twitter:description["'][^>]*>\s*/gi, "");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const allRoutes = [...routes, ...presetRoutes, ...probabiliteRoutes];

for (const route of allRoutes) {
  const { html, head } = render(route.path);
  const canonical = route.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${route.path}/`;

  // Use Helmet output from SSR, falling back to hardcoded metadata
  const helmetHead = head || "";

  // Preset pages have no hardcoded title: their <SEO> is fully data-driven,
  // so trust the SSR Helmet head verbatim (title/desc/canonical/og/twitter all present).
  const headInject = !route.title
    ? helmetHead
    : [
    `<title>${route.title}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="fr-fr" href="${canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    helmetHead,
  ].filter(Boolean).join("\n    ");

  let page = stripManagedHeadTags(template);
  page = page.replace("</head>", `    ${headInject}\n  </head>`);
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  const outDir =
    route.path === "/" ? distDir : path.join(distDir, route.path.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  console.log("Prerendered", route.path);
}

// Sitemap generated from the exact set of prerendered routes — one source of truth,
// so it can never list a page that wasn't built or miss one that was.
const SITE_LASTMOD = "2026-07-30";
function priorityFor(p) {
  if (p === "/") return "1.0";
  if (["/a-propos", "/contact"].includes(p)) return "0.6";
  if (p.startsWith("/nombre-aleatoire/") || p.startsWith("/probabilite-pile-ou-face/") || p.startsWith("/blog/")) return "0.7";
  return "0.9"; // top-level tools, hubs, blog index, comment-lancer
}
const sitemapUrls = allRoutes.map((r) => {
  const loc = r.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${r.path}/`;
  return `  <url><loc>${loc}</loc><lastmod>${SITE_LASTMOD}</lastmod><priority>${priorityFor(r.path)}</priority></url>`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log("Wrote sitemap.xml with", allRoutes.length, "urls");

fs.rmSync(serverDir, { recursive: true, force: true });
console.log("Done.");
