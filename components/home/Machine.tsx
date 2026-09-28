import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import Head from "./Head";
import { Gear } from "./Gear";
import { attach } from "@/lib/gear";
import { stages } from "@/content/site";

const M = 12;
const g1 = { x: 230, y: 210, n: 20, ph: 0 };
const g2 = attach(g1, 28, 25, M);
const g3 = attach(g2, 16, 95, M);
const g4 = attach(g3, 22, 160, M);
const gears = [
  { g: g1, dir: 1, color: "var(--hm-blue-hi)" },
  { g: g2, dir: -1, color: "var(--hm-orange-hi)" },
  { g: g3, dir: 1, color: "var(--hm-blue-hi)" },
  { g: g4, dir: -1, color: "var(--hm-orange-hi)" },
] as const;

const axle = `M${g1.x} ${g1.y} L${g2.x} ${g2.y} L${g3.x} ${g3.y} L${g4.x} ${g4.y}`;

export default function Machine() {
  return (
    <>
      <section className="relative pt-24 md:pt-36">
        <Container>
          <Head n="02" label="The process" title="Scroll to turn the crank." />
        </Container>
      </section>

      <section data-scrub="sticky" className="relative h-[440vh]">
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
          <Container className="grid w-full items-center gap-6 md:grid-cols-[1.05fr_1fr]">
            <div>
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em]">
                <span className="hm-mute">Progress</span>
                <span className="hm-o"><span data-pct>000</span>%</span>
              </div>
              <div className="mt-3 h-1 w-full bg-[color:var(--hm-line-2)]">
                <div className="h-full bg-[color:var(--hm-orange-hi)]" style={{ width: "calc(var(--sp) * 100%)" }} />
              </div>

              <div className="relative mt-8 h-[42vh] md:h-[46vh]">
                {stages.map((s, i) => (
                  <div
                    key={s.k}
                    className="hm-step absolute inset-0 flex flex-col justify-center"
                    style={{ "--c": i / (stages.length - 1) } as CSSProperties}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.3em] hm-b">
                      Stage {String(i + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                    </p>
                    <h3 className={`mt-3 font-display text-[clamp(4.5rem,12vw,11rem)] font-black uppercase leading-[0.82] ${i % 2 ? "hm-outline-o" : "hm-outline"}`}>
                      {s.k}
                    </h3>
                    <p className="mt-5 max-w-md text-lg text-[color:var(--hm-text)]/80">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <svg viewBox="0 0 780 840" className="mx-auto max-h-[52vh] w-full md:max-h-[72vh]" fill="none" aria-hidden>
              <path d={axle} stroke="var(--hm-line-2)" strokeWidth="2" strokeDasharray="6 8" />
              <path d={axle} pathLength={1} className="hm-scrubdraw" stroke="var(--hm-orange-hi)" strokeWidth="3" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 6px var(--hm-orange-hi))" }} />
              {gears.map(({ g, dir, color }, i) => (
                <Gear key={i} {...g} m={M} dir={dir as 1 | -1} color={color} drive="sp" c={i / (gears.length - 1)} glow spin={240} sw={2.5} fill={0.1} />
              ))}
            </svg>
          </Container>
        </div>
      </section>
    </>
  );
}
