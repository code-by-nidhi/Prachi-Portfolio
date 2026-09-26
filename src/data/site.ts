// Central place for site content — edit here instead of hunting through components.

export const site = {
  name: "Prachi Zakhmi",
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

// "Beyond work" section. Photos are listed top-of-stack first; replace the placeholder SVGs with real photos.
export const beyondWork = {
  title: "Beyond work",
  text: "When I'm not designing, I love to take a break from work and travel to a remote village in the Himalayas. The Himalayas give me a sense of home that doesn't belong to me. The people feel like old friends, sharing stories of how they ended up in the mountains forever. Each visit leaves me inspired and renewed, bringing a fresh perspective back to my work and life.",
  cta: { label: "Who I am", href: "/about" },
  photos: [
    { src: "/images/beyond/plane.svg", alt: "View of a plane wing above the clouds at sunset" },
    { src: "/images/beyond/lake.svg", alt: "Palaces along a lake" },
    { src: "/images/beyond/beach.svg", alt: "Beach with a thatched umbrella" },
    { src: "/images/beyond/arch.svg", alt: "The Taj Mahal seen through an arch" },
    { src: "/images/beyond/hills.svg", alt: "Sitting on a green hillside" },
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
