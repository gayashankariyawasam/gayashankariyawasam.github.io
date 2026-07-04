"use client";

/**
 * Loader + painter for the scroll-scrubbed hero orbit frame sequence.
 *
 * The sequence lives in /public/hero-seq/ as WebP stills extracted from the
 * Seedance hero-orbit clip, described by manifest.json:
 *   { "frames": 121, "widths": [960, 1600], "pattern": "/hero-seq/w{w}/f{i}.webp", "pad": 4 }
 *
 * Until the generated frames exist (manifest 404s), paintProceduralFrame
 * renders a code-driven noir stand-in so the hero scrub still works.
 */

export type SequenceManifest = {
  frames: number;
  widths: number[];
  pattern: string;
  pad: number;
};

export type HeroSequence = {
  frames: number;
  /** Sparse array of decoded frames; gaps fall back to nearest loaded. */
  images: (HTMLImageElement | undefined)[];
  loaded: Set<number>;
};

export async function fetchManifest(): Promise<SequenceManifest | null> {
  try {
    const res = await fetch("/hero-seq/manifest.json", { cache: "force-cache" });
    if (!res.ok) return null;
    const m = (await res.json()) as SequenceManifest;
    if (!m.frames || !m.widths?.length || !m.pattern) return null;
    return m;
  } catch {
    return null;
  }
}

function frameUrl(m: SequenceManifest, width: number, index: number) {
  return m.pattern
    .replace("{w}", String(width))
    .replace("{i}", String(index).padStart(m.pad, "0"));
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Loads the sequence progressively: a coarse pass (every 6th frame) lands
 * fast so scrubbing works almost immediately, then the fill pass sharpens it.
 * onProgress fires as frames land so the canvas can repaint.
 */
export function loadSequence(
  m: SequenceManifest,
  viewportWidth: number,
  dpr: number,
  onProgress: (seq: HeroSequence) => void
): { seq: HeroSequence; cancel: () => void } {
  const target = viewportWidth * Math.min(dpr, 2);
  const width =
    m.widths.find((w) => w >= target) ?? m.widths[m.widths.length - 1];

  const seq: HeroSequence = {
    frames: m.frames,
    images: new Array(m.frames),
    loaded: new Set(),
  };

  let cancelled = false;
  const order: number[] = [];
  for (let i = 0; i < m.frames; i += 6) order.push(i);
  for (let i = 0; i < m.frames; i++) if (i % 6 !== 0) order.push(i);

  (async () => {
    // Modest concurrency keeps decode jank off the scroll thread.
    const CONCURRENCY = 6;
    let cursor = 0;
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        while (cursor < order.length && !cancelled) {
          const idx = order[cursor++];
          try {
            const img = await loadImage(frameUrl(m, width, idx));
            if (cancelled) return;
            seq.images[idx] = img;
            seq.loaded.add(idx);
            onProgress(seq);
          } catch {
            // Missing frame — nearest-neighbour fallback covers it.
          }
        }
      })
    );
  })();

  return { seq, cancel: () => (cancelled = true) };
}

export function nearestLoaded(seq: HeroSequence, index: number) {
  if (seq.images[index]) return seq.images[index];
  for (let d = 1; d < seq.frames; d++) {
    if (seq.images[index - d]) return seq.images[index - d];
    if (seq.images[index + d]) return seq.images[index + d];
  }
  return undefined;
}

/** Draw an image cover-fit, biased toward the subject's head-height. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  focusY = 0.42
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) * focusY;
  ctx.drawImage(img, dx, dy, dw, dh);
}

/* ————————————————————————————————————————————————————————————————
   Procedural stand-in — an orbiting emerald presence in a black void,
   drawn from the scrub progress so the hero behaves identically before
   the generated frames are dropped in.
   ———————————————————————————————————————————————————————————————— */

const P_COUNT = 90;
// Deterministic particle field (no Math.random — stable across frames).
const particles = Array.from({ length: P_COUNT }, (_, i) => {
  const s = Math.sin(i * 127.1) * 43758.5453;
  const t = Math.sin(i * 269.5) * 12543.853;
  const u = Math.sin(i * 419.2) * 32871.117;
  return {
    a: (s - Math.floor(s)) * Math.PI * 2,
    r: 0.18 + (t - Math.floor(t)) * 0.5,
    y: (u - Math.floor(u)) * 2 - 1,
    size: 0.6 + ((s * t) % 1 < 0 ? 1 - ((s * t) % 1) * -1 : (s * t) % 1) * 1.6,
    speed: 0.4 + (u - Math.floor(u)) * 0.8,
  };
});

export function paintProceduralFrame(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  t: number
) {
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "#050706";
  ctx.fillRect(0, 0, cw, ch);

  const cx = cw / 2;
  const cy = ch * 0.46;
  const R = Math.min(cw, ch) * 0.34;
  const orbit = t * Math.PI * 2;

  // Emerald nebula ground-glow
  const glow = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 2.2);
  glow.addColorStop(0, "rgba(19, 84, 67, 0.5)");
  glow.addColorStop(0.5, "rgba(13, 64, 52, 0.18)");
  glow.addColorStop(1, "rgba(5, 7, 6, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, cw, ch);

  // Orbiting holographic ring — reads as the camera circling the subject.
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(1, 0.32);
  for (let ring = 0; ring < 3; ring++) {
    const rr = R * (1.05 + ring * 0.28);
    ctx.beginPath();
    ctx.ellipse(0, 0, rr, rr, 0, 0, Math.PI * 2);
    ctx.strokeStyle =
      ring === 1
        ? `rgba(200, 164, 94, ${0.14 - ring * 0.03})`
        : `rgba(99, 199, 168, ${0.2 - ring * 0.05})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Central silhouette column — the subject placeholder.
  const body = ctx.createLinearGradient(cx, cy - R, cx, cy + R * 1.4);
  body.addColorStop(0, "rgba(18, 34, 28, 0.95)");
  body.addColorStop(1, "rgba(5, 7, 6, 1)");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(cx, cy - R * 0.55, R * 0.24, R * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - R * 0.42, cy + R * 1.5);
  ctx.quadraticCurveTo(cx - R * 0.4, cy - R * 0.25, cx, cy - R * 0.28);
  ctx.quadraticCurveTo(cx + R * 0.4, cy - R * 0.25, cx + R * 0.42, cy + R * 1.5);
  ctx.closePath();
  ctx.fill();

  // Emerald rim-light that travels with the "camera" orbit.
  const rimX = cx + Math.cos(orbit) * R * 0.26;
  const rim = ctx.createRadialGradient(rimX, cy - R * 0.4, 0, rimX, cy - R * 0.4, R * 0.9);
  rim.addColorStop(0, "rgba(99, 199, 168, 0.28)");
  rim.addColorStop(1, "rgba(99, 199, 168, 0)");
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, cw, ch);

  // Drifting particles orbiting the subject.
  for (const p of particles) {
    const ang = p.a + orbit * p.speed;
    const px = cx + Math.cos(ang) * R * (1 + p.r);
    const pz = Math.sin(ang); // depth: behind (<0) dimmer
    const py = cy + p.y * R * 0.9 + Math.sin(orbit * 2 + p.a) * 6;
    const depth = (pz + 1) / 2;
    ctx.beginPath();
    ctx.arc(px, py, p.size * (0.5 + depth * 0.8), 0, Math.PI * 2);
    ctx.fillStyle =
      p.size > 1.8
        ? `rgba(200, 164, 94, ${0.12 + depth * 0.3})`
        : `rgba(99, 199, 168, ${0.08 + depth * 0.35})`;
    ctx.fill();
  }

  // Floor reflection line
  const floor = ctx.createLinearGradient(0, ch * 0.78, 0, ch);
  floor.addColorStop(0, "rgba(13, 64, 52, 0.14)");
  floor.addColorStop(1, "rgba(5, 7, 6, 0)");
  ctx.fillStyle = floor;
  ctx.fillRect(0, ch * 0.78, cw, ch * 0.22);
}
