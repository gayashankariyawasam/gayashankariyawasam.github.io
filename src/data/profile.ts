export const profile = {
  name: "Gayashan Kariyawasam",
  shortName: "Gayashan",
  initials: "GK",
  role: "Associate Technical Team Lead — AI & Platform Engineering",
  shortRole: "Tech Lead — AI & Platform Engineering",
  company: "CodeGen International",
  companyUrl: "https://codegen.co.uk",
  location: "Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  yearsExperience: 6,

  tagline: "From AI curiosity → AI capability → AI strategy.",
  shortBio:
    "Tech lead with ~6 years shipping production AI systems — agentic platforms, MCP servers, RAG pipelines and LLM-powered tooling at enterprise scale.",
  longBio:
    "I lead AI & Platform Engineering at CodeGen International, where I design, build and ship agentic AI systems end-to-end. My current work centres on a conversational diagnostic platform (IDRP), custom Model Context Protocol servers, RAG pipelines, and LLM-powered enterprise integrations across travel-tech and hospitality. I mentor a team of six senior engineers, hold an IEEE publication in computer vision, and I'm finishing an MSc in Software Architecture at the University of Moratuwa.",

  currentlyExploring: [
    "Model Context Protocol (MCP) servers",
    "Agentic AI evaluation",
    "LLM inference optimization",
    "AI security & ethical compliance",
  ],

  socials: {
    linkedin: "https://www.linkedin.com/in/gayashan-kariyawasam/",
    github: "https://github.com/gayashankariyawasam",
    scholar: "https://scholar.google.com/citations?user=arKNy4MAAAAJ&hl=en",
    ieee: "https://ieeexplore.ieee.org/document/8959600",
    ieeeAuthor: "https://ieeexplore.ieee.org/author/37087239043",
    newsletter:
      "https://www.linkedin.com/newsletters/from-code-to-ai-strategy-7439360032959524865/",
  },

  siteUrl: "https://gayashankariyawasam.github.io",
} as const;

export type Profile = typeof profile;
