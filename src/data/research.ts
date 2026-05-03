export type Paper = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  citations: number;
  links: { label: string; url: string }[];
};

export const papers: Paper[] = [
  {
    title: "Suspicious Activity Detection in Surveillance Footage",
    authors: "S. Loganathan, G. Kariyawasam, P. Sumathipala",
    venue:
      "2019 International Conference on Electrical and Computing Technologies and Applications (ICECTA), Ras Al Khaimah, UAE",
    year: 2019,
    citations: 53,
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
  },
];

export type NewsletterPost = {
  title: string;
  excerpt: string;
  url: string;
};

export const newsletterPosts: NewsletterPost[] = [
  {
    title: "From Code to AI Strategy",
    excerpt:
      "Writing on the shift from AI curiosity → AI capability → AI strategy. Agent design, evaluation, MCP servers, security, and the organisational work it takes to ship.",
    url: "https://www.linkedin.com/in/gayashan-kariyawasam-826001160/",
  },
];
