import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import Head from "./Head";
import Tilt from "./Tilt";
import { GearIcon } from "./Gear";
import { urlFor } from "@/sanity/lib/image";
import { dateParts } from "@/lib/utils";
import type { Meeting } from "@/components/meetings/types";

export default function RecentMeetings({ meetings }: { meetings: Meeting[] }) {
  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <Head n="04" label="Archive" title="Logged. Documented. Shipped." />

        {meetings.length ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {meetings.map((m, i) => {
              const p = dateParts(m.date);
              const src = m.thumb ? urlFor(m.thumb).width(900).height(675).url() : null;
              return (
                <div key={m._id} data-reveal style={{ "--d": `${i * 0.12}s` } as CSSProperties}>
                  <Tilt>
                    <Link href={`/meetings/${m.slug}`} className="group hm-panel flex h-full flex-col border hm-bd transition-colors hover:border-[color:var(--hm-orange-hi)]">
                      <div className="hm-duo relative aspect-[4/3] overflow-hidden">
                        {src ? (
                          <Image src={src} alt={m.thumb?.alt ?? m.title} width={900} height={675} className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid h-full place-items-center bg-[color:var(--hm-panel)]">
                            <GearIcon n={12} className="hm-o size-32" spin={12} />
                          </div>
                        )}
                        <span className="absolute left-0 top-0 bg-[color:var(--hm-bg)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hm-o">
                          {p.month} {p.day} · {p.year}
                        </span>
                        {m.slidesUrl && (
                          <span className="absolute bottom-0 right-0 bg-[color:var(--hm-orange)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--hm-bg)]">
                            Slides
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <h3 className="font-display text-xl font-extrabold uppercase leading-tight">{m.title}</h3>
                        {m.summary && <p className="line-clamp-3 text-sm text-[color:var(--hm-text)]/65">{m.summary}</p>}
                        <span className="mt-auto pt-3 font-mono text-xs uppercase tracking-[0.2em] hm-o">
                          Open <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
                        </span>
                      </div>
                    </Link>
                  </Tilt>
                </div>
              );
            })}
          </div>
        ) : (
          <div data-reveal className="mt-14 flex items-center gap-6">
            <GearIcon n={12} className="hm-b size-20" />
            <p className="font-mono text-sm uppercase tracking-[0.25em] hm-mute">Nothing logged yet. First entry incoming.</p>
          </div>
        )}

        <div data-reveal className="mt-12">
          <Link href="/meetings" className="hm-btn hm-btn-blue">All meetings <span>→</span></Link>
        </div>
      </Container>
    </section>
  );
}
