import Image from "next/image";
import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import AboutHead from "./AboutHead";
import Tilt from "@/components/home/Tilt";
import { Gear } from "@/components/home/Gear";
import { team } from "@/content/site";

const initials = (n: string) => {
  const p = n.split(" ");
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
};

export default function Team() {
  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <AboutHead n="03" label="The team" title="Meet The Team" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <div key={m.name} data-reveal style={{ "--d": `${i * 0.12}s` } as CSSProperties}>
              <Tilt>
                <div className="hm-panel relative flex min-h-[24rem] flex-col justify-between overflow-hidden border hm-bd p-8">
                  <i className="hm-corner tl" />
                  <i className="hm-corner br" />
                  <svg viewBox="-150 -150 300 300" className="pointer-events-none absolute -bottom-20 -right-20 size-80 opacity-30" fill="none" aria-hidden>
                    <Gear n={22} m={12} dir={i % 2 ? -1 : 1} color={i % 2 ? "var(--hm-orange-hi)" : "var(--hm-blue-hi)"} sw={2} glow spokes={6} fill={0.06} />
                  </svg>
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} width={320} height={320} className="relative size-40 object-cover grayscale" />
                  ) : (
                    <span className="hm-outline-o relative font-display text-[7rem] font-black leading-none">{initials(m.name)}</span>
                  )}
                  <div className="relative">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] hm-o">{m.role}</p>
                    <h3 className="mt-2 font-display text-2xl font-black uppercase leading-tight">{m.name}</h3>
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
