export type Project = {
  title: string;
  blurb: string;
  description: string;
  year: string;
  category: "AI" | "Backend" | "Research" | "Web" | "Platform" | "AR";
  stack: string[];
  metric?: string;
  links?: { label: string; url: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "IDRP — Intelligent Diagnostic & Resolution Platform",
    blurb: "Agentic conversational AI for self-service API testing & troubleshooting",
    description:
      "Led the end-to-end design, development and deployment of an agentic AI platform that lets client-facing teams and QA self-serve API testing, log tracing and integration troubleshooting through a conversational interface. Reduced support escalations by 40%+.",
    year: "2024",
    category: "AI",
    metric: "40%+ ↓ support escalations",
    stack: [
      "Python",
      "LangChain",
      "LangGraph",
      "Anthropic Claude API",
      "MCP",
      "Redis",
    ],
    featured: true,
  },
  {
    title: "Custom MCP Servers (Python)",
    blurb: "Model Context Protocol servers powering AI-assisted dev workflows",
    description:
      "Architected and implemented custom Model Context Protocol servers in Python — an agentic RAG system for API documentation, plus a driver-context server for integration patterns — enabling AI-assisted development across the engineering organisation.",
    year: "2024",
    category: "AI",
    metric: "Org-wide AI dev workflow",
    stack: ["Python", "MCP", "RAG", "LangChain", "Vector DB"],
    featured: true,
  },
  {
    title: "LLM Cancellation-Policy Pipeline (Dhisco)",
    blurb: "Redis-backed LLM inference + prompt engineering for hotel cancellation policies",
    description:
      "Engineered an LLM-powered cancellation policy interpretation pipeline for the Dhisco integration with Redis-backed inference caching and prompt-engineering optimization — eliminated ~60% of redundant API calls, reduced p95 search latency by ~30%, and cut LLM inference costs while preserving accuracy.",
    year: "2024",
    category: "AI",
    metric: "60% ↓ API calls · 30% ↓ p95 latency",
    stack: ["Python", "OpenAI", "Redis", "Prompt Engineering"],
    featured: true,
  },
  {
    title: "Tritium OPS Tool",
    blurb: "Deployment governance, audit trails, GitOps & Jira integration",
    description:
      "Initiated and led the Tritium OPS Tool — a governed change-management layer for production AI and platform systems with deployment governance, audit trails, approval workflows, GitOps and Jira integration, and an admin dashboard.",
    year: "2024",
    category: "Platform",
    metric: "Governed production change layer",
    stack: ["Java", "Spring Boot", "GitOps", "Jira API", "Angular"],
    featured: true,
  },
  {
    title: "H2H Hotel Integrations",
    blurb: "Production-grade integrations across major hospitality providers",
    description:
      "Delivered H2H integrations covering full lifecycle flows — search, book, cancel, lookup — across Expedia, Webbeds, Umrahme and Juniper, with production-grade reliability and observability.",
    year: "2023",
    category: "Backend",
    metric: "4 major hospitality providers",
    stack: ["Java", "Spring", "REST APIs", "MySQL"],
  },
  {
    title: "Distributed Redis Caching",
    blurb: "Percentile-based prepopulation + tiered refresh — later reused for LLM inference",
    description:
      "Designed a distributed Redis caching solution with percentile-based prepopulation and tiered refresh intervals, improving cache hit rates by keeping high-demand data warm based on access-pattern analytics. The pattern was later reused for LLM inference caching.",
    year: "2023",
    category: "Backend",
    metric: "Pattern reused for LLM inference",
    stack: ["Java", "Redis", "HikariCP", "Analytics"],
  },
  {
    title: "Suspicious Activity Detection in Surveillance Footage",
    blurb: "IEEE-published computer vision research (53+ citations)",
    description:
      "Co-author of an ICECTA 2019 paper detecting anomalous behaviour in surveillance footage using deep learning. Presented at the International Conference on Electrical and Computing Technologies and Applications, Ras Al Khaimah, UAE.",
    year: "2019",
    category: "Research",
    metric: "53+ citations · IEEE Xplore",
    stack: ["Python", "TensorFlow", "OpenCV", "Computer Vision"],
    links: [
      {
        label: "IEEE Xplore (DOI)",
        url: "https://ieeexplore.ieee.org/document/8959600",
      },
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/citations?user=arKNy4MAAAAJ&hl=en",
      },
    ],
    featured: true,
  },
  {
    title: "HoloLens AR — IFS Spectator View",
    blurb: "Microsoft HoloLens features + Digital Twin IoT prototype at IFS",
    description:
      "Built Spectator View Pro and Spectator View Mobile features for Microsoft HoloLens at IFS R&D, upgraded the IFS HoloLens API to support IFS Application 10, and prototyped a Digital Twin integration via Raspberry Pi connecting IoT devices to the IFS IoT Business Connector.",
    year: "2019",
    category: "AR",
    stack: ["Unity 3D", "C#", "HoloLens", "ASP.NET Core", "Python", "OData"],
  },
  {
    title: "From Code to AI Strategy",
    blurb: "Writing on the shift from AI curiosity to enterprise capability",
    description:
      "A regular on-platform write-up on agent design, evaluation, security and the organisational work it takes to turn AI prototypes into production systems.",
    year: "Ongoing",
    category: "Web",
    stack: ["Writing", "LinkedIn"],
    links: [
      {
        label: "Read on LinkedIn",
        url: "https://www.linkedin.com/in/gayashan-kariyawasam-826001160/",
      },
    ],
  },
];
