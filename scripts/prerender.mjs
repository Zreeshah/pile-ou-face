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

const routes = [
  "/",
  "/comment-lancer-piece-en-ligne",
  "/a-propos",
  "/contact",
];

// Strip head tags that Helmet will manage, to avoid duplicates.
function stripManagedHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']title["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']keywords["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']twitter:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, "");
}

for (const url of routes) {
  const { html, helmet } = render(url);

  let page = stripManagedHeadTags(template);

  const headInject = [
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  page = page.replace("</head>", `    ${headInject}\n  </head>`);
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  const outDir =
    url === "/" ? distDir : path.join(distDir, url.replace(/^\//, ""));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  console.log("Prerendered", url);
}

// Cleanup SSR bundle from publish dir
fs.rmSync(serverDir, { recursive: true, force: true });
console.log("Done.");
