#!/usr/bin/env node
/**
 * Re-encodes a generated section clip into the lightweight backdrop that
 * SectionVideo plays (public/media/*.mp4).
 *
 *   node scripts/encode-section-video.mjs <in.mp4> <out.mp4> [crf]
 *
 * The clips sit under a 62–82% black wash, so 720p at CRF 28 is visually
 * indistinguishable from the 1080p source at a fraction of the size. Audio
 * is stripped and the moov atom moved up front so playback starts before
 * the whole file arrives. Lower the CRF (26, 24) if dark gradients band.
 * Give the output a new filename (e.g. closer-v2.mp4) so browsers don't keep
 * serving a cached copy of the old clip.
 */
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";

const [, , input, output, crfArg] = process.argv;
if (!input || !output) {
  console.error("usage: node scripts/encode-section-video.mjs <in.mp4> <out.mp4> [crf]");
  process.exit(1);
}

const CRF = String(Number(crfArg) || 28);

execFileSync(
  "ffmpeg",
  [
    "-hide_banner", "-loglevel", "error", "-y",
    "-i", input,
    "-vf", "scale=1280:-2:flags=lanczos",
    "-c:v", "libx264",
    "-preset", "veryslow",
    "-crf", CRF,
    // veryslow's extra reference frames would otherwise push this to level
    // 5.0; 4.0 is plenty for 720p24 and decodes on older phones.
    "-level:v", "4.0",
    "-pix_fmt", "yuv420p",
    "-an",
    "-movflags", "+faststart",
    output,
  ],
  { stdio: "inherit" }
);

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(2);
console.log(`${input} (${mb(input)} MB) → ${output} (${mb(output)} MB) at CRF ${CRF}`);
