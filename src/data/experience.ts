export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string | "Present";
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  clients?: string[];
};

export const experiences: Experience[] = [
  {
    role: "Associate Technical Team Lead — AI & Platform Engineering",
    company: "CodeGen International",
    companyUrl: "https://codegen.com",
    start: "Jan 2024",
    end: "Present",
    location: "Colombo, Sri Lanka",
    summary:
      "Lead the design, development and deployment of agentic AI systems and LLM-powered platforms at enterprise scale. Mentor a team of six senior engineers and act as the primary technical contact for AI initiatives across multiple products.",
    highlights: [
      "Led IDRP — an agentic conversational AI platform for self-service API testing, log tracing and integration troubleshooting. Reduced support escalations by 40%+",
      "Architected custom Model Context Protocol (MCP) servers in Python: an agentic RAG system for API documentation and a driver-context server for integration patterns",
      "Engineered an LLM-powered cancellation policy interpretation pipeline (Dhisco) with Redis-backed inference caching and prompt-engineering optimization — eliminated ~60% of redundant API calls and reduced p95 search latency by ~30%",
      "Drove enterprise-wide adoption of agentic dev tooling (Claude Code, Kiro, Antigravity, Codex, Qwen) and authored custom Claude Code commands",
      "Initiated and led the Tritium OPS Tool — deployment governance, audit trails, GitOps and Jira integration, and an admin dashboard",
      "Mentored six senior engineers; primary technical contact for Dhisco Revamp, AOS, NEXO and Juniper engagements",
    ],
    stack: [
      "Python",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Anthropic Claude API",
      "OpenAI",
      "MCP",
      "Redis",
      "Docker",
      "Kubernetes",
      "Azure",
    ],
    clients: ["Dhisco Revamp", "AOS", "NEXO", "Juniper"],
  },
  {
    role: "Senior Software Engineer",
    company: "CodeGen International",
    companyUrl: "https://codegen.com",
    start: "Jan 2023",
    end: "Dec 2023",
    location: "Colombo, Sri Lanka",
    summary:
      "Delivered production-grade hotel & travel-tech integrations and platform engineering work that became the foundation for later AI initiatives.",
    highlights: [
      "Delivered H2H integrations (Expedia, Webbeds, Umrahme, Juniper) covering full lifecycle flows — search, book, cancel, lookup",
      "Led MySQL migration across DEV/QA/STG/PROD with under 5 minutes of production downtime; introduced HikariCP, materialized tables, stored procedures — improved critical query performance by ~40%",
      "Architected the intelligent room-mapping system, rebook flow and Tritium Analytics Data Warehouse — laid the foundation for downstream ML/AI use cases",
      "Designed a distributed Redis caching solution with percentile-based prepopulation and tiered refresh — a pattern later reused for LLM inference caching",
      "Automated repetitive operational workflows with Python, UI automation and shell scripting",
    ],
    stack: [
      "Java",
      "Spring",
      "MySQL",
      "Redis",
      "HikariCP",
      "Python",
      "Shell",
    ],
    clients: ["Expedia", "Webbeds", "Umrahme", "Juniper"],
  },
  {
    role: "Software Engineer",
    company: "CodeGen International",
    companyUrl: "https://codegen.com",
    start: "Nov 2020",
    end: "Dec 2022",
    location: "Colombo, Sri Lanka",
    summary:
      "Full-stack engineering on an enterprise hotel-management platform — production REST APIs, dual-database support and CI/CD foundations.",
    highlights: [
      "Built production REST APIs with Spring Framework + Hibernate ORM, dual-database compatibility across Oracle and MariaDB",
      "Built responsive Angular + TypeScript frontend components used by enterprise customers",
      "Implemented database migration strategy and compatibility layer ensuring data integrity across Oracle and MariaDB",
      "Established CI/CD pipelines that automated build, test and deployment — improved release reliability",
    ],
    stack: [
      "Java",
      "Spring",
      "Hibernate",
      "Angular",
      "TypeScript",
      "Oracle",
      "MariaDB",
      "CI/CD",
    ],
  },
  {
    role: "Undergraduate Trainee",
    company: "IFS R&D International",
    companyUrl: "https://www.ifs.com/",
    start: "Jan 2019",
    end: "Jul 2019",
    location: "Sri Lanka",
    summary:
      "Worked on next-generation AR / Mixed Reality and IoT prototypes for IFS's enterprise ERP platform.",
    highlights: [
      "Implemented Spectator View Pro and Spectator View Mobile features for Microsoft HoloLens",
      "Upgraded the IFS HoloLens API to support IFS Application 10",
      "Prototyped Digital Twin integration via Raspberry Pi — connecting IoT devices to the IFS IoT Business Connector using Python and OData",
    ],
    stack: [
      "Python",
      "ASP.NET Core",
      "OData",
      "PL/SQL",
      "Unity 3D",
      "C#",
      "HoloLens",
    ],
  },
];
