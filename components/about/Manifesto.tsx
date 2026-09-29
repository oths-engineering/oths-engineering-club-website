import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import { about } from "@/content/site";

const words = about.manifesto.split(" ");

export default function Manifesto() {
  return (
    <section data-scrub="sticky" className="relative h-[240vh]">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.3em]">
            <span className="hm-o">[01]</span> <span className="hm-mute">Manifesto</span>
          </p>
          <p className="mt-6 max-w-6xl font-display text-[clamp(1.4rem,3.3vw,3.1rem)] font-bold uppercase leading-[1.3]">
            {words.map((w, i) => (
              <span
                key={i}
                className="mr-[0.3em] inline-block"
                style={{ "--c": 0.05 + (0.8 * i) / words.length, opacity: "clamp(0.14, calc(0.14 + (var(--sp) - var(--c)) * 60), 1)" } as CSSProperties}
              >
                {w}
              </span>
            ))}
          </p>
          <div className="mt-10 h-px w-full bg-[color:var(--hm-line-2)]">
            <div className="h-full bg-[color:var(--hm-orange-hi)]" style={{ width: "calc(var(--sp) * 100%)" }} />
          </div>
        </Container>
      </div>
    </section>
  );
}
