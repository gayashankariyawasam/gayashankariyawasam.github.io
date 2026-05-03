export type StackCategory = {
  category: string;
  items: string[];
};

export const stack: StackCategory[] = [
  {
    category: "AI / ML",
    items: [
      "Python",
      "LangChain",
      "OpenAI",
      "Anthropic",
      "Hugging Face",
      "LlamaIndex",
      "PyTorch",
      "TensorFlow",
    ],
  },
  {
    category: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "TypeScript",
      "Java",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "REST",
    ],
  },
  {
    category: "Cloud / Infra",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "Linux",
    ],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Three.js", "Motion", "GSAP"],
  },
];
