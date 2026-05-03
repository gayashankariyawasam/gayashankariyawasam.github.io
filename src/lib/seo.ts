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
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Moratuwa",
      url: "https://uom.lk/",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Large Language Models",
      "AI Agents",
      "AI Security",
      "Enterprise AI Strategy",
      "Computer Vision",
      "Software Engineering",
    ],
    sameAs: [
      profile.socials.linkedin,
      profile.socials.github,
      profile.socials.scholar,
      profile.socials.ieee,
    ],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — Portfolio`,
    url: profile.siteUrl,
    inLanguage: "en",
    author: { "@type": "Person", name: profile.name },
  } as const;
}
