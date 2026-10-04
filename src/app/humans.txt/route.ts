import { profile } from "@/data/profile";

// Rendered to out/humans.txt at build, so the role tracks profile.ts.
export const dynamic = "force-static";

export function GET() {
  const body = `/* TEAM */
Name:     ${profile.name}
Role:     ${profile.role}
Site:     ${profile.siteUrl}
Github:   gayashankariyawasam
Linkedin: gayashan-kariyawasam
Location: ${profile.location}

/* SITE */
Built with: Next.js, TypeScript, Tailwind CSS, GSAP, Motion, Lenis
Hosted on:  GitHub Pages
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
