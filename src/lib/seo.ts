import { profile } from "@/data/profile";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    image: `${profile.siteUrl}/portrait.jpg`,
    jobTitle: profile.role,
    worksFor: {
      "@type": "Organization",
      name: profile.company,
      url: profile.companyUrl,
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
    sameAs: [
      profile.socials.linkedin,
      profile.socials.github,
      profile.socials.scholar,
      profile.socials.ieee,
      profile.socials.newsletter,
    ],
  } as const;
}

export function websiteJsonLd() {
  const person = {
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
  } as const;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    alternateName: "gayashankariyawasam.github.io",
    url: profile.siteUrl,
    inLanguage: "en",
    author: person,
    publisher: person,
  } as const;
}
