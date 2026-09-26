// Central place for site content — edit here instead of hunting through components.

export const site = {
  name: "Tarushi Jindal",
  role: "Designer + Content Ceator",
  year: "2025",
  resumeUrl: "/resume.pdf",
  profileImage: "/images/profile-placeholder.svg",
  email: "hello@example.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Behance", href: "https://www.behance.net/" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "Product Design",
    year: "2025",
    summary: "Placeholder summary for the first case study.",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Content",
    year: "2025",
    summary: "Placeholder summary for the second case study.",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Branding",
    year: "2024",
    summary: "Placeholder summary for the third case study.",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "UX Research",
    year: "2024",
    summary: "Placeholder summary for the fourth case study.",
  },
];
