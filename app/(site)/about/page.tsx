import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import { mission, team, clubSections } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about our club's mission, team, and activities.",
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-16">
      <Container>
        <h1 className="font-display text-5xl font-black uppercase tracking-tight md:text-7xl">
          About Us
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[color:var(--hm-text)]/75">
          {mission[0] || "We are a student-run engineering and design club."}
        </p>
      </Container>

      <Container>
        <h2 className="font-display text-3xl font-bold uppercase">Our Team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="hm-panel border hm-bd p-6">
              <h3 className="font-display text-xl font-bold">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider hm-o">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="font-display text-3xl font-bold uppercase">What We Do</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubSections.map((section) => (
            <div key={section.title} className="hm-panel border hm-bd p-6">
              <h3 className="font-display text-xl font-bold">{section.title}</h3>
              {section.description && (
                <p className="mt-2 text-sm text-[color:var(--hm-text)]/70">
                  {section.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
