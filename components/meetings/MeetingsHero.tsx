import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import CountUp from "@/components/home/CountUp";
import { Gear } from "@/components/home/Gear";

const lines = ["The", "meeting", "archive."];

export default function MeetingsHero({ total, upcoming, past }: { total: number; upcoming: number; past: number }) {
  const cells = [
    ["Total", total],
    ["Upcoming", upcoming],
    ["Past", past],
  ] as const;

  return (
    <section className="relative overflow-hidden">
      <div className="hm-scan" aria-hidden />
      <Container className="relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <p className="hm-fade font-mono text-[11px] uppercase tracking-[0.3em] hm-o">[00] Archive</p>
          <h1 aria-label={lines.join(" ")} className="mt-6 font-display text-[clamp(2.4rem,7.2vw,6.75rem)] font-black uppercase leading-[1.05]">
            <span aria-hidden>
              {lines.map((l, i) => (
                <span key={l} className={`block overflow-hidden pb-[0.08em] ${i === 1 ? "hm-outline" : i === 2 ? "hm-o" : ""}`}>
                  {[...l].map((c, k) => (
                    <span key={k} className="hm-char" style={{ "--d": `${i * 0.18 + k * 0.045}s` } as CSSProperties}>
                      {c}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          <div className="hm-fade mt-10 grid max-w-md grid-cols-3 gap-px border hm-bd bg-[color:var(--hm-line-2)]" style={{ animationDelay: "0.8s" }}>
            {cells.map(([label, v]) => (
              <div key={label} className="bg-[color:var(--hm-panel)] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] hm-mute">{label}</p>
                <p className="mt-2 font-display text-3xl font-black hm-o">
                  <CountUp to={v} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hm-spool relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
          <svg viewBox="-300 -300 600 600" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
            <Gear n={44} m={10} color="var(--hm-orange-hi)" sw={2} spokes={0} fill={0.04} glow spin={220} />
            <Gear n={30} m={10} dir={-1} color="var(--hm-blue-hi)" sw={2.5} spokes={0} fill={0.05} glow spin={160} />
          </svg>
          <div className="absolute inset-0 grid place-items-center font-display text-7xl font-black hm-outline-o md:text-8xl">
            <CountUp to={total} />
          </div>
        </div>
      </Container>
    </section>
  );
}
