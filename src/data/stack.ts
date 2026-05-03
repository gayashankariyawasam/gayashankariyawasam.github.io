export type StackCategory = {
  category: string;
  items: string[];
};

export const stack: StackCategory[] = [
  {
    category: "Languages",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "SQL",
      "PL/SQL",
      "Shell",
    ],
  },
  {
    category: "Generative & Agentic AI",
    items: [
      "LLMs",
      "Agentic AI",
      "RAG",
      "MCP Servers",
      "Prompt Engineering",
      "LLM Inference Optimization",
    ],
  },
  {
    category: "AI / ML Frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "MLFlow",
      "PyTorch",
      "Anthropic Claude API",
      "OpenAI API",
      "Claude Code",
      "Codex",
      "Kiro",
      "Qwen",
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      "Java",
      "Python",
      "Spring Framework",
      "Spring Boot",
      "Hibernate",
      "Node.js",
      "FastAPI",
      "REST",
      "Microservices",
    ],
  },
  {
    category: "Frontend",
    items: ["Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Databases & Caching",
    items: [
      "Oracle",
      "MySQL",
      "MariaDB",
      "Redis",
      "HikariCP",
      "PL/SQL",
      "Stored Procedures",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "CI/CD",
      "GitOps",
      "Docker",
      "Kubernetes",
      "Azure",
      "Jenkins",
      "Git",
    ],
  },
];
