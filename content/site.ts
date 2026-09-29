export const site = {
  name: "Tompkins Engineering Design",
  short: "TEDC",
  description: "Workshops, competitions, and projects for OTHS students who want to create their own designs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "tmpkengineeringclub@gmail.com",
  location: "Room 2232 at OTHS",
  linktree: "https://linktr.ee/OTHSEngineering",
  socials: [
    { platform: "Discord", url: "" },
    { platform: "Remind", url: "" },
    { platform: "X", url: "" },
    { platform: "Instagram", url: "" },
  ],
};

export const hero = {
  kicker: "Tompkins Engineering Design Club",
  lines: ["Create", "Your", "Vision"],
  sub: "We empower OTHS students to create their own designs via workshops, competitions, and other opportunities.",
  cta: "Join the club",
};

export const ticker = ["Plan", "Prototype", "Perfect"];

export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 40, suffix: "+", label: "Members" },
  { value: 20, label: "Workshops planned" },
  { value: 2, label: "Competitions" },
  { value: 0, label: "Projects shipped" },
];

export const stages = [
  { k: "Design", d: "Sketch it, model it, discuss it. Every build starts as a bad idea on a whiteboard." },
  { k: "Build", d: "print, Solder, Construct, Code. Make your vision come to life." },
  { k: "Test", d: "Break it on purpose, find out why, and fix it before it counts." },
  { k: "Present", d: "It works, or it teaches you why it didn't." },
];

export const mission = [""];

export const team: { name: string; role: string; photo?: string }[] = [
  { name: "Santiago Silva", role: "Co President", photo: "" },
  { name: "Rithvik Reddy Kolan", role: "Co President", photo: "" },
];

export const membership = [""];
