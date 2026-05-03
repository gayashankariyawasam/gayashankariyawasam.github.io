export type Education = {
  degree: string;
  field: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  start: string;
  end: string | "Present";
  inProgress?: boolean;
  honor?: string;
};

export const education: Education[] = [
  {
    degree: "MSc",
    field: "Computer Science (Software Architecture)",
    institution: "University of Moratuwa",
    institutionUrl: "https://uom.lk/",
    location: "Moratuwa, Sri Lanka",
    start: "2024",
    end: "Dec 2026",
    inProgress: true,
  },
  {
    degree: "BSc (Hons)",
    field: "Information Technology — Data Science",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    institutionUrl: "https://www.sliit.lk/",
    location: "Malabe, Sri Lanka",
    start: "Feb 2016",
    end: "Feb 2020",
    honor: "CGPA 3.26 · Second Class (Lower)",
  },
];
