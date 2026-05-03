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
};

export const experiences: Experience[] = [
  {
    role: "Tech Lead & AI Engineer",
    company: "Codegen International",
    companyUrl: "https://codegen.com",
    start: "2024",
    end: "Present",
    location: "Colombo, Sri Lanka",
    summary:
      "Lead engineering on LLM-powered products: agent design, evaluation, security, and the strategy work that ships them.",
    highlights: [
      "Designed multi-agent orchestration patterns for enterprise workflows",
      "Built evaluation harnesses to measure agent reliability beyond demos",
      "Author of the From Code to AI Strategy newsletter (biweekly, LinkedIn)",
    ],
    stack: ["Python", "LangChain", "OpenAI", "AWS", "Docker", "Kubernetes"],
  },
  {
    role: "Senior Software Engineer",
    company: "Earlier roles",
    start: "2019",
    end: "2024",
    location: "Sri Lanka",
    summary:
      "Built backend systems and integrations across enterprise Java and TypeScript stacks; transitioned into AI/ML engineering.",
    highlights: [
      "Designed REST APIs and data pipelines for enterprise SaaS",
      "Led migrations from legacy Java systems to modern cloud architectures",
      "Started shipping LLM features in production",
    ],
    stack: ["Java", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Redis"],
  },
  {
    role: "B.Sc. (Hons) in Computer Science & Engineering",
    company: "University of Moratuwa",
    companyUrl: "https://uom.lk/",
    start: "2015",
    end: "2019",
    location: "Moratuwa, Sri Lanka",
    summary:
      "Department of Computer Science & Engineering. Final-year research on suspicious activity detection in surveillance footage — published at ICECT 2019, now cited 53+ times.",
    highlights: [
      "Co-author, Suspicious activity detection in surveillance footage (IEEE, 2019)",
      "53+ citations on Google Scholar",
      "Computer vision, deep learning, video analytics",
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "Computer Vision"],
  },
];
