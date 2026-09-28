export const site = {
  name: "Tompkins Engineering & Design Club",
  description: "Workshops, competitions, and projects for student engineers at Texas A&M.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "you@example.com",
  location: "Meeting location here",
  linktree: "https://linktr.ee/yourclub",
  socials: [
    { platform: "Discord", url: "" },
    { platform: "Remind", url: "" },
    { platform: "X", url: "" },
    { platform: "Instagram", url: "" },
  ],
};

export const hero = {
  headline: "Tompkins Engineering & Design",
  subheadline: "Empowering OTHS students to create their own designs via workshops, competitions, and other opportunities. ",
  cta: "Plan - Prototype - Perfect",
};

export const mission = [
  "",
];

export const team: { name: string; role: string; photo?: string }[] = [
  { name: "Santiago Silva", role: "Co President", photo: "" },
  { name: "Rithvik Reddy Kolan", role: "Vice President", photo: "" },
];

export const clubSections: {
  title: string;
  category: "workshop" | "competition" | "project";
  description: string;
  image?: string;
}[] = [
  { title: "Engineering Workshops", category: "workshop", description: "" },
  { title: "Engineering Competitions", category: "competition", description: "" },
  { title: "Example Project", category: "project", description: "" },
];

export const membership = [
  "",
];
