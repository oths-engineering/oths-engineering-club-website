export const site = {
  name: "Tompkins Engineering & Design Club",
  short: "TEDC",
  description: "Workshops, competitions, and projects for OTHS students who want to create their own designs.",
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
  kicker: "Tompkins Engineering & Design Club",
  lines: ["Plan.", "Prototype.", "Perfect."],
  sub: "Empowering OTHS students to create their own designs via workshops, competitions, and other opportunities.",
  cta: "Join the club",
};

export const ticker = ["Plan", "Prototype", "Perfect", "Design", "Build", "Test", "Ship"];

export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 0, suffix: "+", label: "Members" },
  { value: 0, label: "Workshops run" },
  { value: 0, label: "Competitions" },
  { value: 0, label: "Projects shipped" },
];

export const stages = [
  { k: "Design", d: "Sketch it, model it, argue about it. Every build starts as a bad idea on a whiteboard." },
  { k: "Build", d: "Solder, print, machine, wire. Nobody watches from the sidelines." },
  { k: "Test", d: "Break it on purpose, find out why, and fix it before it counts." },
  { k: "Ship", d: "Demo day. Competition day. It works, or it teaches you why it didn't." },
];

export const mission = [""];

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

export const membership = [""];
