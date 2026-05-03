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
    title: "Suspicious activity detection in surveillance footage",
    authors: "S. Loganathan, G. Kariyawasam, P. Sumathipala",
    venue: "IEEE International Conference on Electrical and Computing Technologies",
    year: 2019,
    citations: 53,
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
      "A biweekly newsletter on the shift from AI curiosity → AI capability → AI strategy. Agent design, evaluation, security, and the organizational work it takes to ship.",
    url: "https://www.linkedin.com/in/gayashan-kariyawasam/",
  },
];
