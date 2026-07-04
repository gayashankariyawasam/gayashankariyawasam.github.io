#!/usr/bin/env node
/**
 * Turns the generated hero-orbit clip into the scroll-scrub frame sequence
 * consumed by CinematicHero (public/hero-seq/ + manifest.json).
 *
 *   node scripts/extract-hero-frames.mjs <hero.mp4> [fps]
 *
 * ffmpeg pulls full-res JPEG stills (this build has no libwebp), then sharp
 * emits WebP at two widths (desktop / mobile) so the client can pick by
 * viewport, plus the manifest the loader fetches.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const [, , input, fpsArg] = process.argv;
if (!input) {
  console.error("usage: node scripts/extract-hero-frames.mjs <hero.mp4> [fps]");
  process.exit(1);
}

const FPS = Number(fpsArg) || 15; // 8s clip → ~120 frames
const WIDTHS = [1600, 960];
const OUT = join(process.cwd(), "public", "hero-seq");

rmSync(OUT, { recursive: true, force: true });
const tmp = mkdtempSync(join(tmpdir(), "hero-seq-"));

execFileSync(
  "ffmpeg",
  [
    "-hide_banner", "-loglevel", "error",
    "-i", input,
    "-vf", `fps=${FPS}`,
    "-q:v", "2",
    "-start_number", "0",
    join(tmp, "f%04d.jpg"),
  ],
  { stdio: "inherit" }
);

const stills = readdirSync(tmp).filter((f) => f.endsWith(".jpg")).sort();
for (const w of WIDTHS) {
  mkdirSync(join(OUT, `w${w}`), { recursive: true });
}
await Promise.all(
  stills.flatMap((f) =>
    WIDTHS.map((w) =>
      sharp(join(tmp, f))
        .resize({ width: w })
        .webp({ quality: w >= 1600 ? 70 : 66 })
        .toFile(join(OUT, `w${w}`, f.replace(".jpg", ".webp")))
    )
  )
);
rmSync(tmp, { recursive: true, force: true });

const manifest = {
  frames: stills.length,
  widths: [...WIDTHS].sort((a, b) => a - b),
  pattern: "/hero-seq/w{w}/f{i}.webp",
  pad: 4,
};
writeFileSync(join(OUT, "manifest.json"), JSON.stringify(manifest));
console.log(`hero-seq ready: ${stills.length} frames @ ${WIDTHS.join("/")}px`);
