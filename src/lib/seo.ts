import { profile } from "@/data/profile";
import { papers } from "@/data/research";

// Stable, domain-owned identifiers so every page references the same entity.
const PERSON_ID = `${profile.siteUrl}/#person`;
const WEBSITE_ID = `${profile.siteUrl}/#website`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    givenName: "Gayashan",
    familyName: "Kariyawasam",
    alternateName: "gayashankariyawasam",
    url: profile.siteUrl,
    mainEntityOfPage: profile.siteUrl,
    image: `${profile.siteUrl}/portrait.jpg`,
    jobTitle: profile.role,
    description: profile.shortBio,
    // Separates this Gayashan Kariyawasam from others sharing the surname.
    disambiguatingDescription:
      "AI & Platform Engineering Tech Lead at CodeGen International in Colombo, Sri Lanka — IEEE-published computer-vision researcher building agentic AI, MCP servers and RAG pipelines.",
    worksFor: {
      "@type": "Organization",
      name: profile.company,
      url: profile.companyUrl,
    },
    nationality: { "@type": "Country", name: "Sri Lanka" },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Moratuwa",
        url: "https://uom.lk/",
        description:
          "MSc Computer Science (Software Architecture), 2024 – Dec 2026 (in progress)",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Sri Lanka Institute of Information Technology",
        url: "https://www.sliit.lk/",
        description:
          "BSc (Hons) Information Technology — Data Science, 2016 – 2020",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Generative AI",
      "Agentic AI",
      "Large Language Models",
      "Model Context Protocol",
      "MCP Servers",
      "Retrieval-Augmented Generation",
      "RAG Pipelines",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Anthropic Claude",
      "Claude Code",
      "AI Security",
      "AI Agent Evaluation",
      "Enterprise AI Strategy",
      "LLM Inference Optimization",
      "Prompt Engineering",
      "Computer Vision",
      "Hospitality Tech",
      "Travel Tech",
      "Software Architecture",
      "Microservices",
      "Distributed Caching",
    ],
    // Add the ORCID and Wikidata URLs here once those profiles exist — they are
    // the highest-leverage additions for entity recognition.
    sameAs: [
      profile.socials.linkedin,
      profile.socials.github,
      profile.socials.scholar,
      profile.socials.ieee,
      profile.socials.ieeeAuthor,
      profile.socials.newsletter,
    ],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: profile.name,
    alternateName: "gayashankariyawasam.github.io",
    url: profile.siteUrl,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  } as const;
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${profile.siteUrl}/about/#profilepage`,
    url: `${profile.siteUrl}/about/`,
    name: `About ${profile.name}`,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  } as const;
}

/** The IEEE paper as its own entity, author-linked back to #person. */
export function scholarlyArticlesJsonLd() {
  return papers.map((paper) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": paper.links[0].url,
    name: paper.title,
    headline: paper.title,
    author: paper.authors.split(", ").map((name) =>
      name.includes("Kariyawasam")
        ? { "@id": PERSON_ID }
        : { "@type": "Person", name }
    ),
    datePublished: String(paper.year),
    publisher: { "@type": "Organization", name: "IEEE" },
    isPartOf: { "@type": "CreativeWork", name: paper.venue },
    url: paper.links[0].url,
    sameAs: paper.links.map((l) => l.url),
  }));
}

export function aboutBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${profile.siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${profile.siteUrl}/about/` },
    ],
  } as const;
}
