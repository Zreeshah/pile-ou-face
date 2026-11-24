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

function decodeHtml(value) {
  return value
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function attributeValue(tag, attribute) {
  const escaped = escapeRegExp(attribute);
  return decodeHtml(tag.match(new RegExp(`\\b${escaped}="([^"]*)"`))?.[1] ?? "");
}

function titleText(html) {
  return decodeHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
}

function canonicalFor(file) {
  const relativeDirectory = path.relative(dist, path.dirname(file));
  return relativeDirectory
    ? `${baseUrl}/${relativeDirectory.split(path.sep).join("/")}/`
    : `${baseUrl}/`;
}

const pageFiles = collectIndexFiles(dist);
const expectedPrerenderedPages = 58;
const expectedSitemapUrls = 34; // 48 before 2026-11-17: minus 12 probability + 3 multi-dice noindex pages, plus /conditions-generales (2026-11-24)

// Noindex programmatic pages (2026-11-17): zero search demand, still live for users.
const NOINDEX_PATHS = [
  ...[
    "3-lancers/2-piles", "4-lancers/2-piles", "5-lancers/3-piles",
    "2-lancers/2-piles", "6-lancers/3-piles", "10-lancers/5-piles",
    "3-lancers/3-piles", "4-lancers/4-piles", "5-lancers/5-piles",
    "6-lancers/6-piles", "7-lancers/7-piles", "10-lancers/10-piles",
  ].map((s) => `probabilite-pile-ou-face/${s}`),
  "de-en-ligne/3-des-6-faces",
  "de-en-ligne/2-des-10-faces",
  "de-en-ligne/2-des-20-faces",
];
assert.equal(pageFiles.length, expectedPrerenderedPages, `Expected exactly ${expectedPrerenderedPages} prerendered pages`);

for (const file of pageFiles) {
  const html = fs.readFileSync(file, "utf8");
  const label = path.relative(dist, file);
  const isRandomPreset = label.startsWith(`nombre-aleatoire${path.sep}`)
    && label !== path.join("nombre-aleatoire", "index.html");

  assert.equal(count(html, /<title\b/gi), 1, `${label}: expected one title`);
  const title = titleText(html);
  assert.ok(title.length <= 60, `${label}: title too long (${title.length})`);
  const descriptionTags = tagsWithAttribute(html, "meta", "name", "description");
  assert.equal(descriptionTags.length, 1, `${label}: expected one description`);
  const description = attributeValue(descriptionTags[0], "content");
  assert.ok(description.length <= 160, `${label}: description too long (${description.length})`);
  const canonicalTags = tagsWithAttribute(html, "link", "rel", "canonical");
  assert.equal(canonicalTags.length, 1, `${label}: expected one canonical`);
  assert.equal(tagsWithAttribute(html, "meta", "name", "robots").length, 1, `${label}: expected one robots tag`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:title").length, 1, `${label}: expected one og:title`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:description").length, 1, `${label}: expected one og:description`);
  assert.equal(tagsWithAttribute(html, "meta", "property", "og:image").length, 1, `${label}: expected one og:image`);
  assert.equal(tagsWithAttribute(html, "meta", "name", "twitter:card").length, 1, `${label}: expected one twitter:card`);
  const expectedCanonical = isRandomPreset
    ? `${baseUrl}/nombre-aleatoire/`
    : canonicalFor(file);
  assert.match(canonicalTags[0], new RegExp(`href="${escapeRegExp(expectedCanonical)}"`), `${label}: canonical mismatch`);
  const isNoindexProgrammatic = NOINDEX_PATHS.some((p) => label.startsWith(p + path.sep));
  assert.match(
    html,
    isRandomPreset || isNoindexProgrammatic ? /content="noindex, follow"/i : /content="index, follow"/i,
    `${label}: unexpected robots directive`,
  );
  assert.equal(
    count(html, /"@type":"WebPage"/g),
    isRandomPreset ? 0 : 1,
    `${label}: unexpected WebPage schema count`,
  );
  assert.doesNotMatch(html, /"@type":"(?:FAQPage|HowTo)"/, `${label}: deprecated or ineligible schema found`);

  if (label.startsWith(`blog${path.sep}`) && label !== path.join("blog", "index.html")) {
    assert.equal(count(html, /"@type":"BlogPosting"/g), 1, `${label}: expected one BlogPosting`);
    assert.equal(count(html, /"@type":"BreadcrumbList"/g), 1, `${label}: expected one BreadcrumbList`);
  }
  assert.doesNotMatch(html, /\\u[0-9a-fA-F]{4}|\\+'/g, `${label}: escaped text leaked into HTML`);
}

const notFound = fs.readFileSync(path.join(dist, "404.html"), "utf8");
assert.equal(count(notFound, /<title\b/gi), 1, "404: expected one title");
assert.equal(tagsWithAttribute(notFound, "meta", "name", "robots").length, 1, "404: expected one robots tag");
assert.equal(tagsWithAttribute(notFound, "link", "rel", "canonical").length, 0, "404: canonical must be omitted");
assert.match(notFound, /content="noindex, nofollow"/i, "404: expected noindex, nofollow");

const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
assert.equal(count(sitemap, /<url>/g), expectedSitemapUrls, `Sitemap must contain exactly ${expectedSitemapUrls} indexable URLs`);
assert.doesNotMatch(sitemap, /\/nombre-aleatoire\/\d+-tirage\//, "Sitemap must exclude noindex random presets");
assert.doesNotMatch(sitemap, /\/probabilite-pile-ou-face\/\d+-lancers\//, "Sitemap must exclude noindex probability pages");
assert.doesNotMatch(sitemap, /\/(3-des-6-faces|2-des-10-faces|2-des-20-faces)\//, "Sitemap must exclude noindex multi-dice pages");
assert.doesNotMatch(sitemap, /<priority>|<lastmod>/, "Sitemap must not contain stale or ignored metadata");

const ogImage = fs.readFileSync(path.join(dist, "og-image.png"));
assert.equal(ogImage.toString("ascii", 1, 4), "PNG", "OG image must be a PNG");
assert.equal(ogImage.readUInt32BE(16), 1200, "OG image width must be 1200");
assert.equal(ogImage.readUInt32BE(20), 630, "OG image height must be 630");

console.log(`SEO verification passed for ${pageFiles.length} prerendered pages (${expectedSitemapUrls} indexable) plus the custom 404.`);
