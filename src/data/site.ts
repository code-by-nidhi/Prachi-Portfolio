// Content model + defaults. Everything here is editable from /admin; what's saved there (Supabase)
// is merged over these defaults, so any field that was never edited falls back to the value below.

export type Link = { label: string; href: string };

export type Photo = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  image: string; // optional cover; leave empty for the placeholder
};

// Styles for pieces of the About paragraph. Icon styles ignore their text.
export const aboutStyles = {
  plain: "Plain",
  bold: "Bold white",
  emphasis: "Wide italic",
  "outline-pill": "Outlined pill (italic)",
  "bold-pill": "Outlined pill (bold)",
  "filled-pill": "Filled pill",
  sparkle: "✦ Sparkle icon",
  smiley: "☺ Smiley icon",
} as const;

export type AboutStyle = keyof typeof aboutStyles;
export type AboutSegment = { text: string; style: AboutStyle };

export type SiteContent = {
  site: {
    name: string;
    role: string;
    year: string;
    email: string;
    phone: string;
    resumeUrl: string;
    socials: Link[];
  };
  nav: { about: string; explore: string };
  hero: {
    greeting: string;
    headline: string; // each line break becomes a line break on large screens
    buttonLabel: string;
    image: string;
  };
  about: { segments: AboutSegment[] };
  projects: { title: string; items: Project[] };
  beyond: {
    title: string;
    text: string;
    cta: Link;
    photos: Photo[]; // top-of-stack first
  };
  cta: { title: string; hire: string; resume: string };
  hire: {
    greeting: string;
    headline: string; // wrap words in *asterisks* to render them in the handwritten font
    intro: string;
    image: string;
    clientsTitle: string;
    clients: string[];
  };
};

export const defaultContent: SiteContent = {
  site: {
    name: "Prachi Zakhmi",
    role: "Designer + Content Ceator",
    year: "2025",
    email: "hello@example.com",
    phone: "",
    resumeUrl: "/resume.pdf",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "Instagram", href: "https://www.instagram.com/" },
      { label: "Behance", href: "https://www.behance.net/" },
    ],
  },
  nav: { about: "About me", explore: "Explore" },
  hero: {
    greeting: "Hello,",
    headline: "I design\nproducts and\ncreate content that\ntells stories.",
    buttonLabel: "Resume",
    image: "/images/profile-placeholder.svg",
  },
  about: {
    segments: [
      { text: "I am a versatile designer who enjoys delving into", style: "plain" },
      { text: "various art forms and mediums", style: "emphasis" },
      { text: "", style: "sparkle" },
      { text: "weaving stories", style: "bold" },
      { text: "through my designs and concepts", style: "outline-pill" },
      { text: "", style: "smiley" },
      { text: ". Catch me in my natural habitat, soaking up", style: "bold" },
      { text: "inspiration from the chaos of life", style: "filled-pill" },
      { text: "and", style: "bold" },
      { text: "occasionally going bonkers", style: "bold-pill" },
      { text: "with my craft", style: "bold" },
      { text: "", style: "sparkle" },
    ],
  },
  projects: {
    title: "Selected projects",
    items: [
      { slug: "project-one", title: "Project One", category: "Product Design", year: "2025", summary: "Placeholder summary for the first case study.", image: "" },
      { slug: "project-two", title: "Project Two", category: "Content", year: "2025", summary: "Placeholder summary for the second case study.", image: "" },
      { slug: "project-three", title: "Project Three", category: "Branding", year: "2024", summary: "Placeholder summary for the third case study.", image: "" },
      { slug: "project-four", title: "Project Four", category: "UX Research", year: "2024", summary: "Placeholder summary for the fourth case study.", image: "" },
    ],
  },
  beyond: {
    title: "Life Beyond Office",
    text: "When I'm not designing, I love to take a break from work and travel to a remote village in the Himalayas. The Himalayas give me a sense of home that doesn't belong to me. The people feel like old friends, sharing stories of how they ended up in the mountains forever. Each visit leaves me inspired and renewed, bringing a fresh perspective back to my work and life.",
    cta: { label: "Who I am", href: "/about" },
    photos: [
      { src: "/images/beyond/plane.svg", alt: "View of a plane wing above the clouds at sunset" },
      { src: "/images/beyond/lake.svg", alt: "Palaces along a lake" },
      { src: "/images/beyond/beach.svg", alt: "Beach with a thatched umbrella" },
      { src: "/images/beyond/arch.svg", alt: "The Taj Mahal seen through an arch" },
      { src: "/images/beyond/hills.svg", alt: "Sitting on a green hillside" },
    ],
  },
  cta: { title: "Let's Collaborate", hire: "Hire me", resume: "Resume" },
  hire: {
    greeting: "Hey, I'm Prachi",
    headline: "Obsessed with a Dash of *Creativity* and a Lot of *Heart*",
    intro: "Hi, welcome to my world! I'm passionate about telling stories through design and content, crafting products people love and content people remember.",
    image: "/images/profile-placeholder.svg",
    clientsTitle: "Worked with the best of the best",
    clients: ["Company One", "Company Two", "Company Three", "Company Four", "Company Five", "Company Six"],
  },
};
