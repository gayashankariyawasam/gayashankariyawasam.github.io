export type Metric = {
  value: number;
  suffix: string;
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
    value: 40,
    suffix: "%",
    label: "Reduction in support escalations (IDRP)",
    source: "CodeGen / IDRP",
  },
  {
    value: 60,
    suffix: "%",
    label: "Fewer redundant API calls (Dhisco)",
    source: "CodeGen / Dhisco",
  },
  {
    value: 53,
    suffix: "+",
    label: "Citations on IEEE-published research",
    source: "Google Scholar",
  },
];
