import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { papers, newsletterPosts } from "@/data/research";
import { education } from "@/data/education";

// llms.txt (https://llmstxt.org): a Markdown summary for language models,
// rendered to out/llms.txt at build from the same data as the site.
export const dynamic = "force-static";

export function GET() {
  const site = profile.siteUrl;

  const roles = experiences.map(
    (e) => `- **${e.role}**, ${e.company} (${e.start} – ${e.end}): ${e.summary}`
  );

  const work = projects.map((p) => {
    const link = p.links?.[0];
    const title = link ? `[${p.title}](${link.url})` : p.title;
    return `- ${title}: ${p.blurb}`;
  });

  const research = papers.map(
    (p) =>
      `- [${p.title}](${p.links[0].url}): ${p.authors}. ${p.venue}, ${p.year}. ${p.citations}+ citations.`
  );

  const writing = newsletterPosts.map((n) => `- [${n.title}](${n.url}): ${n.excerpt}`);

  const schooling = education.map(
    (e) =>
      `- ${e.degree}, ${e.field}, ${e.institution} (${e.start} – ${e.end}${e.inProgress ? ", in progress" : ""})`
  );

  const body = `# ${profile.name}

> ${profile.shortBio}

Based in ${profile.location}. ${profile.longBio}

Currently exploring: ${profile.currentlyExploring.join("; ")}.

## Pages

- [Home](${site}/): career timeline, selected work, research and stack
- [About](${site}/about/): full profile, experience, education and verified links

## Experience

${roles.join("\n")}

## Selected work

${work.join("\n")}

## Research

${research.join("\n")}

## Writing

${writing.join("\n")}

## Education

${schooling.join("\n")}

## Links

- [LinkedIn](${profile.socials.linkedin})
- [GitHub](${profile.socials.github})
- [Google Scholar](${profile.socials.scholar})
- [IEEE Xplore author page](${profile.socials.ieeeAuthor})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
