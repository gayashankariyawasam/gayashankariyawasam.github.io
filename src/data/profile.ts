export const profile = {
  name: "Gayashan Kariyawasam",
  shortName: "Gayashan",
  initials: "GK",
  role: "Tech Lead & AI Engineer",
  company: "Codegen International",
  companyUrl: "https://codegen.com",
  location: "Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  email: "gmkariyawasam@gmail.com",

  tagline: "From AI curiosity → AI capability → AI strategy.",
  shortBio:
    "I help engineering teams turn LLMs into production-grade systems — from agent design and evaluation to enterprise AI architecture and security.",
  longBio:
    "I'm an AI Engineer and Tech Lead based in Colombo, building LLM-powered products at Codegen International. My focus is the messy middle of enterprise AI: agent design, evaluation harnesses, AI security, and the strategy work that turns prototypes into production. I write the biweekly From Code to AI Strategy newsletter on LinkedIn, and I'm an IEEE-published researcher (computer vision, surveillance).",

  currentlyExploring: [
    "AI agent evaluation",
    "LLM security",
    "Multi-agent orchestration",
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/gayashan-kariyawasam/",
    github: "https://github.com/gayashankariyawasam",
    scholar: "https://scholar.google.com/citations?user=arKNy4MAAAAJ&hl=en",
    ieee: "https://ieeexplore.ieee.org/author/37087239043",
    newsletter:
      "https://www.linkedin.com/newsletters/from-code-to-ai-strategy-7245789442345005056/",
    email: "mailto:gmkariyawasam@gmail.com",
  },

  siteUrl: "https://gayashankariyawasam.github.io",
} as const;

export type Profile = typeof profile;
