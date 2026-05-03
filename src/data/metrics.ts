export type Metric = {
  value: number | string;
  suffix?: string;
  label: string;
  source: string;
};

export const heroMetrics: Metric[] = [
  {
    value: 6,
    suffix: "yrs",
    label: "Shipping production AI & platform systems",
    source: "Career",
  },
  {
    value: "AI Lead",
    label: "AI & Platform Engineering @ CodeGen International",
    source: "CodeGen International",
  },
  {
    value: "MSc",
    label: "Software Architecture · Moratuwa (in progress)",
    source: "University of Moratuwa",
  },
  {
    value: 53,
    suffix: "+",
    label: "Citations on IEEE-published research",
    source: "Google Scholar",
  },
];
