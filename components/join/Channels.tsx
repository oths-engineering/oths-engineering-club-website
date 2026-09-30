import type { CSSProperties, ReactNode } from "react";
import Container from "@/components/layout/Container";
import AboutHead from "@/components/about/AboutHead";
import { Gear } from "@/components/home/Gear";
import { site } from "@/content/site";

const url = (p: string) => site.socials.find((s) => s.platform === p)?.url ?? "";

const primary = [
  { p: "Discord", cta: "Join the server", col: "var(--hm-blue-hi)", n: 26, d: "Where the club lives. Announcements, project chat, and help whenever you're stuck." },
  { p: "Remind", cta: "Get remind", col: "var(--hm-orange-hi)", n: 20, d: "Meeting reminders straight to your phone, so you never miss a session." },
];

const secondary = [
  { p: "Instagram", d: "Photos and behind-the-scenes from every meeting." },
  { p: "X", d: "Quick updates and announcements." },
];

function Wrap({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <div aria-disabled className={`${className} cursor-not-allowed opacity-60`}>
      {children}
    </div>
  );
}

export default function Channels() {
  return (
    <section className="relative pb-16 pt-8 md:pb-28">
      <Container>
        <AboutHead n="01" label="Start here" title="Two Platforms. That's it." />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {primary.map((c, i) => (
            <div key={c.p} data-reveal style={{ "--d": `${i * 0.14}s` } as CSSProperties}>
              <Wrap
                href={url(c.p)}
                className="hm-card group relative flex min-h-[26rem] flex-col justify-between overflow-hidden border bg-[color:var(--hm-panel)] p-8 transition-colors hm-bd hover:border-[color:var(--hm-orange-hi)] md:p-10"
              >
                <i className="hm-corner tl" />
                <i className="hm-corner br" />
                <svg viewBox="-190 -190 380 380" className="hm-card-gear pointer-events-none absolute -bottom-24 -right-24 size-[24rem]" fill="none" aria-hidden>
                  <Gear n={c.n} m={12} dir={i ? -1 : 1} color={c.col} sw={2} glow spokes={6} fill={0.08} />
                </svg>
                <p className="relative font-mono text-xs uppercase tracking-[0.25em]">
                  <span className="hm-o">0{i + 1}</span> <span className="hm-mute">Primary</span>
                </p>
                <div className="relative">
                  <h3 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-black uppercase leading-[1.05]">{c.p}</h3>
                  <p className="mt-4 max-w-sm text-[color:var(--hm-text)]/75">{c.d}</p>
                  <span className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.25em] hm-o">
                    {url(c.p) ? (
                      <>
                        {c.cta} <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                      </>
                    ) : (
                      "Link coming soon"
                    )}
                  </span>
                </div>
              </Wrap>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-16 font-mono text-xs uppercase tracking-[0.3em] hm-mute">Also find us on</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {secondary.map((s, i) => (
            <div key={s.p} data-reveal style={{ "--d": `${i * 0.1}s` } as CSSProperties}>
              <Wrap
                href={url(s.p)}
                className="group flex items-center justify-between gap-6 border bg-[color:var(--hm-panel)] p-6 transition-colors hm-bd hover:border-[color:var(--hm-blue-hi)]"
              >
                <div>
                  <h3 className="font-display text-xl font-black uppercase">{s.p}</h3>
                  <p className="mt-1 text-sm text-[color:var(--hm-text)]/65">{s.d}</p>
                </div>
                <span className="font-mono text-lg hm-b transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </Wrap>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
