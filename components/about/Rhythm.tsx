import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import AboutHead from "./AboutHead";
import { about } from "@/content/site";

export default function Rhythm() {
  const n = about.rhythm.length;
  return (
    <section data-scrub="scroll" className="relative py-24 md:py-36">
      <Container>
        <AboutHead n="04" label="Anatomy of a meeting" title="Every session, one loop." />
        <div className="relative mt-14 pl-14 md:pl-20">
          <div className="absolute left-4 top-0 h-full w-px bg-[color:var(--hm-line-2)]" />
          <div
            className="absolute left-4 top-0 w-0.5 -translate-x-1/2 bg-[color:var(--hm-orange-hi)] shadow-[0_0_14px_var(--hm-orange-hi)]"
            style={{ height: "clamp(0%, calc((var(--sp) - 0.3) * 250%), 100%)" }}
          />
          {about.rhythm.map((s, i) => (
            <div
              key={s.t}
              className="relative pb-16 last:pb-0"
              style={{ "--c": 0.3 + (0.4 * i) / (n - 1), opacity: "clamp(0.2, calc(0.2 + (var(--sp) - var(--c)) * 60), 1)" } as CSSProperties}
            >
              <span className="absolute -left-10 top-3 size-4 -translate-x-1/2 rotate-45 border-2 border-[color:var(--hm-orange-hi)] bg-[color:var(--hm-bg)] md:-left-16" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] hm-b">Step 0{i + 1}</p>
              <h3 className="mt-2 font-display text-[clamp(1.8rem,4vw,3.4rem)] font-black uppercase leading-[1.1]">{s.t}</h3>
              <p className="mt-3 max-w-xl text-[color:var(--hm-text)]/75">{s.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
