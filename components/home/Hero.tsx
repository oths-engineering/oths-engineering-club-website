import Link from "next/link";
import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import { Gear, HalfClips, Node, Trace } from "./Gear";
import { attach } from "@/lib/gear";
import { hero } from "@/content/site";

const B = "var(--hm-blue-hi)";
const O = "var(--hm-orange-hi)";

const A = { x: 500, y: 500, n: 30, ph: 0 };
const gB = attach(A, 16, -35);
const gC = attach(A, 20, 150);
const gD = attach(gB, 12, -100);
const gE = attach(gC, 24, 100);

function Line({ text, i }: { text: string; i: number }) {
  const cls = i === 1 ? "hm-outline" : i === hero.lines.length - 1 ? "hm-o" : "";
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${cls}`} style={i === hero.lines.length - 1 ? { textShadow: "0 0 50px rgb(255 127 87 / .45)" } : undefined}>
      {[...text].map((c, k) => (
        <span key={k} className="hm-char" style={{ "--d": `${i * 0.18 + k * 0.045}s` } as CSSProperties}>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <div className="hm-scan" aria-hidden />

      <div className="hm-spool pointer-events-none absolute right-[-32%] top-1/2 aspect-square w-[130vw] -translate-y-1/2 md:right-[-8%] md:w-[68vw] md:max-w-[1000px]" aria-hidden>
        <svg data-draw viewBox="0 0 1000 1000" className="h-full w-full overflow-visible opacity-60 md:opacity-100" fill="none">
          <HalfClips />

          {/* logo-style rings */}
          <g transform="translate(500 500)">
            <g className="hm-spin" style={{ animationDuration: "140s" }}>
              <circle r="232" stroke="var(--hm-orange)" strokeWidth="14" strokeDasharray="1000 458" opacity=".85" />
            </g>
            <g className="hm-spin" style={{ animationDuration: "90s", animationDirection: "reverse" }}>
              <circle r="256" stroke="var(--hm-blue-hi)" strokeWidth="3" strokeDasharray="380 1228" />
            </g>
          </g>

          {/* the split gear: blue half + orange half, same as the logo */}
          <Gear {...A} m={10} half="l" color={B} sw={3} fill={0.14} glow />
          <Gear {...A} m={10} half="r" color={O} sw={3} fill={0.14} glow />

          <Gear {...gB} dir={-1} color={B} sw={2.5} glow />
          <Gear {...gC} dir={-1} color={O} sw={2.5} glow />
          <Gear {...gD} dir={1} color={O} sw={2} />
          <Gear {...gE} dir={1} color={B} sw={2} />

          <Trace d="M688 368 H900 L960 428 V1000" color={B} delay={0.4} dur={5} />
          <Trace d="M283 625 H60 L0 685 V1000" color={O} delay={0.9} dur={6} />
          <Trace d="M664 230 V80 H820 L870 30 H1000" color={O} delay={1.3} dur={5.5} />
          <Node x={960} y={428} color={B} delay={0.4} />
          <Node x={60} y={625} color={O} delay={0.9} />
          <Node x={870} y={30} color={O} delay={1.3} />
        </svg>
      </div>

      <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between py-8">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em]">
          <span className="hm-mute">{hero.kicker}</span>
          <span className="hidden items-center gap-2 sm:flex">
            <i className="hm-blink inline-block size-2 rounded-full bg-[color:var(--hm-orange-hi)]" />
            <span className="hm-o">SYS online</span>
          </span>
        </div>

        <h1
          aria-label={hero.lines.join(" ")}
          className="my-10 font-display text-[clamp(4.2rem,14vw,14rem)] font-black uppercase leading-[0.82] tracking-[-0.02em]"
        >
          <span aria-hidden>
            {hero.lines.map((l, i) => (
              <Line key={l} text={l} i={i} />
            ))}
          </span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-md space-y-6">
            <p className="text-lg text-[color:var(--hm-text)]/80">{hero.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/join" className="hm-btn hm-btn-solid">{hero.cta} <span>→</span></Link>
              <Link href="/meetings" className="hm-btn hm-btn-blue">Meetings <span>→</span></Link>
            </div>
          </div>
          <div className="hidden items-end gap-4 font-mono text-[11px] uppercase tracking-[0.25em] md:flex">
            <span className="hm-mute [writing-mode:vertical-rl]">Scroll</span>
            <span className="hm-cue" />
          </div>
        </div>
      </Container>
    </section>
  );
}
