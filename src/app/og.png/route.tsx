import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Rendered to out/og.png at build so the card tracks profile.ts. Uses the
// Geist Regular face that ImageResponse bundles by default.
export const dynamic = "force-static";

const MUTED = "#9a9aa6";
const TEXT = "#f1f1f4";
const GRAD_END = "#3b9df0";

function Arrow({ color }: { color: string }) {
  return (
    <svg
      width="63"
      height="63"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="square"
      style={{ margin: "0 16px" }}
    >
      <path d="M3 12h17M13 5l7 7-7 7" />
    </svg>
  );
}

export function GET() {
  const host = new URL(profile.siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "84px 90px 0 80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #101117 55%, #1a1b22 100%)",
          color: TEXT,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: "0.25em", color: MUTED }}>
          {profile.name.toUpperCase().replace(" ", "  ")}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 108,
            fontSize: 81,
            letterSpacing: "-0.02em",
            lineHeight: 1.18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #8b5cf6 0%, #6c7bf2 45%, #3b9df0 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              From AI curiosity
            </span>
            <Arrow color={GRAD_END} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>AI capability</span>
            <Arrow color={TEXT} />
            <span>AI strategy.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "auto",
            marginBottom: 76,
            fontSize: 24,
            color: MUTED,
          }}
        >
          <span>
            {profile.roleFocus} · {profile.company}
          </span>
          <span>{host}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
