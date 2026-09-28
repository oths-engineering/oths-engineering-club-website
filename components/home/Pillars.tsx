import Link from "next/link";
import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import Head from "./Head";
import { Gear } from "./Gear";
import { clubSections } from "@/content/site";

const groups = [
  { key: "workshop", label: "Workshops", blurb: "Hands-on sessions. Leave knowing something new.", color: "var(--hm-blue-hi)", n: 26, dir: 1 },
  { key: "competition", label: "Competitions", blurb: "Build against a deadline and a rival.", color: "var(--hm-orange-hi)", n: 20, dir: -1 },
  { key: "project", label: "Projects", blurb: "Long builds with a team and a real result.", color: "var(--hm-blue-hi)", n: 32, dir: 1 },
] as const;

export default function Pillars() {
  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <Head n="01" label="What we do" title="Three drives. One machine." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {groups.map((g, i) => {
            const items = clubSections.filter((s) => s.category === g.key);
            return (
              <div key={g.key} data-reveal style={{ "--d": `${i * 0.14}s` } as CSSProperties}>
                <Link
                  href="/about"
                  className="hm-card hm-panel group relative flex min-h-[30rem] flex-col justify-between overflow-hidden border hm-bd p-6 transition-colors duration-300 hover:border-[color:var(--hm-orange-hi)] md:p-8"
                >
                  <svg viewBox="-190 -190 380 380" className="hm-card-gear pointer-events-none absolute -bottom-24 -right-24 size-[24rem]" fill="none" aria-hidden>
                    <Gear n={g.n} m={10 * (26 / g.n) > 12 ? 12 : 10} dir={g.dir as 1 | -1} color={g.color} sw={2} glow spokes={6} fill={0.08} />
                  </svg>

                  <div className="relative flex justify-between font-mono text-xs uppercase tracking-[0.25em]">
                    <span className="hm-o">A.{i + 1}</span>
                    <span className="hm-mute">{String(items.length).padStart(2, "0")} items</span>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-7xl font-black uppercase leading-[0.85] md:text-[5.5rem]">{g.label}</h3>
                    <p className="mt-4 max-w-xs text-[color:var(--hm-text)]/75">{g.blurb}</p>
                    <ul className="mt-6 space-y-1 font-mono text-xs uppercase tracking-wider">
                      {items.slice(0, 4).map((s) => (
                        <li key={s.title} className="flex gap-2">
                          <span className="hm-o">+</span>
                          {s.title}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.25em] transition-transform group-hover:translate-x-2">
                      Explore →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
