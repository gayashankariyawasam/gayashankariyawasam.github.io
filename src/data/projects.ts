export type Project = {
  title: string;
  blurb: string;
  description: string;
  year: string;
  category: "AI" | "Backend" | "Research" | "Web";
  stack: string[];
  links?: { label: string; url: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Enterprise AI Agent Platform",
    blurb: "Multi-agent orchestration for production workflows",
    description:
      "Architected an LLM agent system that turns business workflows into reliable, observable, evaluable production processes — with guardrails, eval harnesses, and human-in-the-loop checkpoints.",
    year: "2024",
    category: "AI",
    stack: ["Python", "LangChain", "OpenAI", "FastAPI", "Postgres", "Redis"],
    featured: true,
  },
  {
    title: "LLM Evaluation Harness",
    blurb: "Beyond demos: measuring agent reliability at scale",
    description:
      "An internal eval framework for scoring agent outputs across correctness, latency, cost and safety dimensions — the difference between a demo and a deployable system.",
    year: "2024",
    category: "AI",
    stack: ["Python", "Pytest", "OpenAI Evals", "Pydantic"],
    featured: true,
  },
  {
    title: "Suspicious Activity Detection",
    blurb: "IEEE-published computer vision research (53+ citations)",
    description:
      "Final-year research published at the IEEE International Conference on Electrical and Computing Technologies (2019). Detects anomalous behavior in surveillance footage using deep learning.",
    year: "2019",
    category: "Research",
    stack: ["Python", "TensorFlow", "OpenCV", "Computer Vision"],
    links: [
      {
        label: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/author/37087239043",
      },
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/citations?user=arKNy4MAAAAJ&hl=en",
      },
    ],
    featured: true,
  },
  {
    title: "From Code to AI Strategy",
    blurb: "Biweekly LinkedIn newsletter on enterprise AI",
    description:
      "Writing about the shift from AI curiosity → AI capability → AI strategy: agent design, evaluation, security, and the organizational work it takes to ship.",
    year: "2024–Present",
    category: "Web",
    stack: ["Writing", "LinkedIn", "Newsletter"],
    links: [
      {
        label: "Read on LinkedIn",
        url: "https://www.linkedin.com/in/gayashan-kariyawasam/",
      },
    ],
    featured: true,
  },
  {
    title: "Dispensary Management System",
    blurb: "Enterprise Java patient & inventory system",
    description:
      "Full-stack desktop application for clinic operations — patient records, prescriptions, inventory, billing — built with JavaFX and Hibernate.",
    year: "2018",
    category: "Backend",
    stack: ["Java", "JavaFX", "Hibernate", "MySQL"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/gayashankariyawasam/Dispensary-Management-System",
      },
    ],
  },
  {
    title: "NYSE Data Warehouse (SSIS)",
    blurb: "ETL pipeline for stock market analytics",
    description:
      "Built a star-schema data warehouse for NYSE end-of-day data with SSIS pipelines, fact/dimension modeling and OLAP queries.",
    year: "2018",
    category: "Backend",
    stack: ["SQL Server", "SSIS", "Data Warehousing", "ETL"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/gayashankariyawasam/NYSE_Data_Warehouse_SSIS_Project",
      },
    ],
  },
];
