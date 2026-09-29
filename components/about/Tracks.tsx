import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import AboutHead from "./AboutHead";
import { Gear } from "@/components/home/Gear";
import { about } from "@/content/site";

export default function Tracks() {
  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <AboutHead n="02" label="What we do" title="Three ways to build." />
        <div className="mt-14 border-t hm-bd">
          {about.tracks.map((t, i) => (
            <div
              key={t.k}
              data-reveal
              style={{ "--d": `${i * 0.12}s` } as CSSProperties}
              className="hm-card group relative grid items-center gap-6 overflow-hidden border-b hm-bd py-10 md:grid-cols-[9rem_1fr_15rem]"
            >
              <span className="hm-outline font-display text-7xl font-black leading-none">0{i + 1}</span>
              <div>
                <h3 className="font-display text-[clamp(1.6rem,3.6vw,3.2rem)] font-black uppercase leading-[1.1] transition-colors group-hover:text-[color:var(--hm-orange-hi)]">
                  {t.k}
                </h3>
                <p className="mt-3 max-w-xl text-[color:var(--hm-text)]/75">{t.d}</p>
              </div>
              <svg viewBox="-190 -190 380 380" className="hm-card-gear hidden size-56 md:block" fill="none" aria-hidden>
                <Gear n={t.g} m={10} dir={i % 2 ? -1 : 1} color={i % 2 ? "var(--hm-orange-hi)" : "var(--hm-blue-hi)"} sw={2} glow spokes={6} fill={0.08} />
              </svg>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
