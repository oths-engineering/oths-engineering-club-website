import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import Logo from "@/components/ui/Logo";
import { Gear } from "@/components/home/Gear";
import { about } from "@/content/site";

export default function AboutHero() {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="hm-scan" aria-hidden />
      <Container className="relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="hm-fade font-mono text-[11px] uppercase tracking-[0.3em] hm-o">[00] {about.kicker}</p>
          <h1 aria-label={about.title.join(" ")} className="mt-6 font-display text-[clamp(2.4rem,7.2vw,6.75rem)] font-black uppercase leading-[1.05]">
            <span aria-hidden>
              {about.title.map((l, i) => (
                <span key={l} className={`block overflow-hidden pb-[0.08em] ${i === 1 ? "hm-outline" : i === 2 ? "hm-o" : ""}`}>
                  {[...l].map((c, k) => (
                    <span key={k} className="hm-char" style={{ "--d": `${i * 0.18 + k * 0.045}s` } as CSSProperties}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <p className="hm-fade mt-8 max-w-md text-lg text-[color:var(--hm-text)]/80" style={{ animationDelay: "0.8s" }}>
            {about.lead}
          </p>
        </div>

        <div className="hm-spool relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
          <svg viewBox="-300 -300 600 600" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            <Gear n={44} m={10} color="var(--hm-blue-hi)" sw={2} spokes={0} fill={0.04} glow spin={220} />
            <Gear n={30} m={10} dir={-1} color="var(--hm-orange-hi)" sw={2.5} spokes={0} fill={0.05} glow spin={160} />
          </svg>
          <Logo className="absolute left-1/2 top-1/2 h-auto w-[44%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_30px_rgba(69,133,247,0.5)]" />
        </div>
      </Container>
    </section>
  );
}
