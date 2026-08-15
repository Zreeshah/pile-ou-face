import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Netlify exposes CONTEXT=production for the production deploy only. Preview and
// local builds must never notify search engines.
if (process.env.CONTEXT !== "production") {
  console.log("IndexNow skipped outside a production deploy.");
  process.exit(0);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemap = fs.readFileSync(path.join(root, "dist", "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  throw new Error("IndexNow submission aborted: the generated sitemap is empty");
}

const key = "955b6f2c0c93b06f4c9c7c7b0921dbb5";
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "pile-ouface.fr",
    key,
    keyLocation: `https://pile-ouface.fr/${key}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow rejected the submission with HTTP ${response.status}`);
}

console.log(`IndexNow accepted ${urlList.length} production URLs.`);
