import Link from "next/link";
import type { CSSProperties } from "react";
import Container from "@/components/layout/Container";
import Head from "./Head";
import { GearIcon } from "./Gear";
import { urlFor } from "@/sanity/lib/image";
import { dateParts } from "@/lib/utils";

type Meeting = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location?: string;
  summary?: string;
  coverImage?: { asset?: { _ref?: string }; alt?: string };
  slidesUrl?: string;
};

export default function NextMeeting({ meeting }: { meeting: Meeting | null | undefined }) {
  if (!meeting) {
    return (
      <section className="relative py-24 md:py-36">
        <Container>
          <Head n="03" label="Next meeting" title="Nothing scheduled yet." />
          <div data-reveal className="mt-14 flex items-center gap-6">
            <GearIcon n={12} className="hm-b size-20" />
            <p className="font-mono text-sm uppercase tracking-[0.25em] hm-mute">
              Check back soon.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const p = dateParts(meeting.date);
  const src = meeting.coverImage?.asset?._ref
    ? urlFor(meeting.coverImage.asset._ref).width(1200).height(675).url()
    : null;

  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <Head n="03" label="Next meeting" title="Mark your calendar." />
        <Link
          href={`/meetings/${meeting.slug}`}
          className="hm-panel group mt-14 grid overflow-hidden border hm-bd transition-colors hover:border-[color:var(--hm-orange-hi)] md:grid-cols-2"
        >
          <div className="hm-duo relative aspect-[4/3] overflow-hidden md:aspect-auto">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={meeting.coverImage?.alt ?? meeting.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="grid h-full min-h-[200px] place-items-center bg-[color:var(--hm-panel)]">
                <GearIcon n={16} className="hm-o size-40" spin={20} />
              </div>
            )}
            <span className="absolute left-0 top-0 bg-[color:var(--hm-bg)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hm-o">
              {p.month} {p.day} · {p.year}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
            <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-5xl">
              {meeting.title}
            </h3>
            {meeting.summary && (
              <p className="line-clamp-3 text-[color:var(--hm-text)]/75">
                {meeting.summary}
              </p>
            )}
            {meeting.location && (
              <p className="font-mono text-xs uppercase tracking-[0.2em] hm-mute">
                {meeting.location}
              </p>
            )}
            <span
              data-reveal
              className="mt-2 font-mono text-xs uppercase tracking-[0.25em] hm-o"
              style={{ "--d": "0.2s" } as CSSProperties}
            >
              View details <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
