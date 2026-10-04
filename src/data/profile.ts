// The current role, split so each surface can show the part it needs
// (the stats tile shows the focus, titles show the full role). Changing jobs
// should only need edits here and in experience.ts.
const roleTitle = "Associate Lead";
const roleFocus = "AI & ML";
const role = `${roleTitle} - ${roleFocus}`;
const company = "AceTrak Technologies";
const parentCompany = "Zone24x7";
const headline = `${role} at ${company}`;

export const profile = {
  name: "Gayashan Kariyawasam",
  shortName: "Gayashan",
  initials: "GK",
  roleTitle,
  roleFocus,
  role,
  shortRole: role,
  company,
  // AceTrak Technologies is part of Zone24x7; this is the parent's site.
  companyUrl: "https://zone24x7.com/",
  parentCompany,
  headline,
  description: `${headline}. IEEE-published, MSc Software Architecture. Building agentic AI, MCP servers, RAG pipelines.`,
  location: "Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  yearsExperience: 6,

  tagline: "From AI curiosity → AI capability → AI strategy.",
  shortBio: `${role} with ~6 years shipping production AI systems — agentic platforms, MCP servers, RAG pipelines and LLM-powered tooling at enterprise scale.`,
  longBio:
    `I'm ${role} at ${company}, part of ${parentCompany}. Before that I spent nearly six years at CodeGen International, where I led AI & Platform Engineering and designed, built and shipped agentic AI systems end-to-end — a conversational diagnostic platform (IDRP), custom Model Context Protocol servers, RAG pipelines, and LLM-powered enterprise integrations across travel-tech and hospitality — while mentoring a team of six senior engineers. I hold an IEEE publication in computer vision, and I'm finishing an MSc in Software Architecture at the University of Moratuwa.`,

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
