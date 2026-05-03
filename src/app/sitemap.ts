import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

function lastCommitDate(): Date {
  try {
    const iso = execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
    return iso ? new Date(iso) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const url = profile.siteUrl.endsWith("/")
    ? profile.siteUrl
    : `${profile.siteUrl}/`;
  return [
    {
      url,
      lastModified: lastCommitDate(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
