import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Gayashan Kariyawasam — AI Engineer & Tech Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #07070b 0%, #14141d 60%, #1c1c28 100%)",
          color: "#ececf1",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            color: "#9b9bab",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          gayashan kariyawasam
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              backgroundImage: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            From AI curiosity →
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#ececf1",
            }}
          >
            AI capability → AI strategy.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#9b9bab",
            fontSize: 24,
          }}
        >
          <div>Tech Lead & AI Engineer · Codegen International</div>
          <div>gayashankariyawasam.github.io</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
