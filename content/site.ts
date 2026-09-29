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


export const team: { name: string; role: string; photo?: string }[] = [
  { name: "Santiago Silva", role: "Co President", photo: "" },
  { name: "Rithvik Reddy Kolan", role: "Co President", photo: "" },
  { name: "Garrett Smith", role: "Vice President", photo: "" },
  { name: "Jhansi Karusala", role: "Head of Public Relations", photo: "" },
  { name: "Elijah Muse-May", role: "Web Development lead", photo: "" },
];

export const membership = [""];

export const about = {
  kicker: "About the club",
  title: ["We build", "what we", "envision."],
  lead: "Tompkins Engineering Design is a student-run club at OTHS where anyone can turn an idea into something real.",
  manifesto:
    "We believe engineering is learned with your hands. Our main goal is to give students the tools, mentorship, and empowerment to bring their ideas to life.",
  tracks: [
    { k: "Workshops", d: "Hands-on sessions in CAD, Electronics, 3D printing, and code. Leave knowing something new.", g: 26 },
    { k: "Competitions", d: "Participate in Engineering challenges against other teams.", g: 20 },
    { k: "Projects", d: "Long builds with a team, from first sketch to a working result you can show off.", g: 32 },
  ],
  rhythm: [
    { t: "Arrive", d: "Doors open, grab a seat, see what's on the board." },
    { t: "Brief", d: "A short summary/introduction to the topic of the day, that be a workshop or project day." },
    { t: "Build", d: "Either follow along on the hands-on workshop, or get to work on your final project." },
    { t: "Discuss", d: "Process what you have learned or achieved that day, sometimes even with food." },
  ],
};
