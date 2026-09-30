import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import AboutHead from "@/components/about/AboutHead";
import { join, site } from "@/content/site";

export default function Steps() {
  return (
    <section className="relative pb-24 md:pb-36">
      <Container>
        <AboutHead n="02" label="How it works" title="Three steps to in." />
        <div className="mt-14 grid gap-px border bg-[color:var(--hm-line-2)] hm-bd md:grid-cols-3">
          {join.steps.map((s, i) => (
            <div key={s.t} data-reveal style={{ "--d": `${i * 0.12}s` } as CSSProperties} className="bg-[color:var(--hm-panel)] p-8">
              <span className="hm-outline font-display text-6xl font-black leading-none">0{i + 1}</span>
              <h3 className="mt-6 font-display text-xl font-black uppercase leading-tight">{s.t}</h3>
              <p className="mt-3 text-[color:var(--hm-text)]/70">{s.d}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-10 font-mono text-xs uppercase tracking-[0.25em] hm-mute">
          {site.location} · Questions?{" "}
          <a href={`mailto:${site.email}`} className="hm-o underline underline-offset-4">
            {site.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
