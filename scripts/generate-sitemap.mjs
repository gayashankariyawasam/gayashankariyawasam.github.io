import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SITE_URL = "https://gayashankariyawasam.github.io/";
// sitemap.xml is the conventional path; sitemap-main.xml stays alive for the
// sitemap submission already sitting in Google Search Console.
const OUTS = ["public/sitemap.xml", "public/sitemap-main.xml"];

function lastCommitDate() {
  try {
    const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
    return iso ? iso.slice(0, 10) : new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const lastmod = lastCommitDate();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}about/</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
`;

for (const out of OUTS) {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, xml, "utf8");
  console.log(`wrote ${out}`);
}
