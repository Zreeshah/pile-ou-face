import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(distDir, "server");

const entryPath = path.join(serverDir, "entry-server.js");
const { render } = await import(pathToFileURL(entryPath).href);

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

const BASE_URL = "https://pile-ou-face.org";

/**
 * Per-route head metadata. Keep titles/descriptions consistent with
 * what the <SEO> component would render on the client after hydration.
 */
const routes = [
  {
    path: "/",
    title:
      "Pile ou Face en Ligne – Jeu Gratuit de Lancer une Pièce | Pile ou Face - Simulateur en ligne",
    description:
      "Jouez à pile ou face en ligne, le jeu simple et rapide de lancer une pièce. Essayez gratuitement pile face en ligne et obtenez un résultat instantané !",
  },
  {
    path: "/comment-lancer-piece-en-ligne",
    title:
      "Comment Lancer une Pièce en Ligne | Pile ou Face - Simulateur en ligne",
    description:
      "Découvrez comment utiliser notre simulateur pile ou face en ligne. Guide simple en 4 étapes pour lancer une pièce virtuelle et obtenir un résultat instantané.",
  },
  {
    path: "/a-propos",
    title:
      "À Propos - Qui Sommes-Nous | Pile ou Face - Simulateur en ligne",
    description:
      "Découvrez l'histoire de pile-ou-face.org, le simulateur de pile ou face en ligne gratuit. Notre mission : vous aider à prendre des décisions simplement.",
  },
  {
    path: "/contact",
    title:
      "Contact - Nous Contacter | Pile ou Face - Simulateur en ligne",
    description:
      "Contactez l'équipe de pile-ou-face.org. Questions, suggestions ou partenariats, nous sommes à votre écoute.",
  },
];

// Strip head tags that we will re-inject per-route, to avoid duplicates.
function stripManagedHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name=["']title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:url["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:url["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>\s*/gi, "");
}

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

for (const route of routes) {
  const { html } = render(route.path);
  const canonical = `${BASE_URL}${route.path === "/" ? "/" : route.path}`;

  const headInject = [
    `<title>${route.title}</title>`,
    `<meta name="title" content="${escapeAttr(route.title)}" />`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
  ].join("\n    ");

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

// Cleanup SSR bundle from publish dir
fs.rmSync(serverDir, { recursive: true, force: true });
console.log("Done.");
