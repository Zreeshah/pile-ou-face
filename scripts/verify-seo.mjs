import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const baseUrl = "https://pile-ouface.fr";

function collectIndexFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectIndexFiles(fullPath);
    return entry.name === "index.html" ? [fullPath] : [];
  });
}

function count(html, pattern) {
  return html.match(pattern)?.length ?? 0;
}

function tagsWithAttribute(html, tag, attribute, value) {
  const pattern = new RegExp(
    `<${tag}\\b(?=[^>]*\\b${attribute}="${value}")[^>]*>`,
    "gi",
  );
  return html.match(pattern) ?? [];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^{}()|[\]\\]/g, "\\$&");
}

function canonicalFor(file) {
  const relativeDirectory = path.relative(dist, path.dirname(file));
  return relativeDirectory
    ? `${baseUrl}/${relativeDirectory.split(path.sep).join("/")}/`
    : `${baseUrl}/`;
}

const pageFiles = collectIndexFiles(dist);
assert.equal(pageFiles.length, 55, "Expected exactly 55 prerendered indexable pages");

for (const file of pageFiles) {
  const html = fs.readFileSync(file, "utf8");
  const label = path.relative(dist, file);

  assert.equal(count(html, /<title\b/gi), 1, `${label}: expected one title`);
  assert.equal(tagsWithAttribute(html, "meta", "name", "description").length, 1, `${label}: expected one description`);
  const canonicalTags = tagsWithAttribute(html, "link", "rel", "canonical");
  assert.equal(canonicalTags.length, 1, `${label}: expected one canonical`);
  assert.equal(tagsWithAttribute(html, "meta", "name", "robots").length, 1, `${label}: expected one robots tag`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:title").length, 1, `${label}: expected one og:title`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:description").length, 1, `${label}: expected one og:description`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:image").length, 1, `${label}: expected one og:image`);
  assert.equal(tagsWithAttribute(html, "meta", "name", "twitter:card").length, 1, `${label}: expected one twitter:card`);
  assert.match(canonicalTags[0], new RegExp(`href="${escapeRegExp(canonicalFor(file))}"`), `${label}: canonical mismatch`);
  assert.doesNotMatch(html, /\\u[0-9a-fA-F]{4}|\\+'/g, `${label}: escaped text leaked into HTML`);
}

const notFound = fs.readFileSync(path.join(dist, "404.html"), "utf8");
assert.equal(count(notFound, /<title\b/gi), 1, "404: expected one title");
assert.equal(tagsWithAttribute(notFound, "meta", "name", "robots").length, 1, "404: expected one robots tag");
assert.equal(tagsWithAttribute(notFound, "link", "rel", "canonical").length, 0, "404: canonical must be omitted");
assert.match(notFound, /content="noindex, nofollow"/i, "404: expected noindex, nofollow");

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
assert.equal(count(sitemap, /<url>/g), 55, "Sitemap must contain exactly 55 URLs");
assert.doesNotMatch(sitemap, /<priority>|<lastmod>/, "Sitemap must not contain stale or ignored metadata");

const ogImage = fs.readFileSync(path.join(dist, "og-image.png"));
assert.equal(ogImage.toString("ascii", 1, 4), "PNG", "OG image must be a PNG");
assert.equal(ogImage.readUInt32BE(16), 1200, "OG image width must be 1200");
assert.equal(ogImage.readUInt32BE(20), 630, "OG image height must be 630");

console.log(`SEO verification passed for ${pageFiles.length} pages plus the custom 404.`);
