import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import CountUp from "./CountUp";
import { GearIcon } from "./Gear";
import { stats } from "@/content/site";

export default function Stats() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-2 gap-px border hm-bd bg-[color:var(--hm-line-2)] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--d": `${i * 0.1}s` } as CSSProperties}
              className="hm-panel group relative overflow-hidden p-6 md:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] hm-mute">{s.label}</p>
              <p
                className={`my-4 font-display text-[clamp(2.25rem,4.4vw,4rem)] font-black leading-none ${i % 2 ? "hm-b" : "hm-o"}`}
                style={{ textShadow: "0 0 40px currentColor" }}
              >
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <GearIcon
                n={10 + i * 2}
                spin={5 + i * 2}
                className={`absolute -bottom-6 -right-6 size-32 opacity-20 transition-opacity duration-500 group-hover:opacity-70 ${i % 2 ? "hm-o" : "hm-b"}`}
              />
              <span className="hm-bar" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
