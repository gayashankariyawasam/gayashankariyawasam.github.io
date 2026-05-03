import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const SITE_URL = "https://gayashankariyawasam.github.io/";
const OUT = "public/sitemap-main.xml";

function lastCommitDate() {
  try {
    const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
    return iso ? iso.slice(0, 10) : new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${lastCommitDate()}</lastmod>
  </url>
</urlset>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, xml, "utf8");
console.log(`wrote ${OUT}`);
