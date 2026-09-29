import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/components/home/home.css";
import { sanityFetch } from "@/sanity/lib/live";
import { staticFetch } from "@/sanity/lib/client";
import { MEETING_QUERY, MEETING_SLUGS_QUERY, MEETING_NAV_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { dateParts } from "@/lib/utils";
import Container from "@/components/layout/Container";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import Countdown from "@/components/home/Countdown";
import AboutHead from "@/components/about/AboutHead";
import Gallery from "@/components/meetings/Gallery";
import type { Meeting, NavItem } from "@/components/meetings/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await staticFetch(MEETING_SLUGS_QUERY);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: m } = (await sanityFetch({ query: MEETING_QUERY, params: { slug } })) as unknown as { data: Meeting | null };
  if (!m) return {};
  const image = m.thumb ? urlFor(m.thumb).width(1200).height(630).url() : undefined;
  return {
    title: m.title,
    description: m.summary,
    openGraph: { title: m.title, description: m.summary, type: "article", images: image ? [{ url: image, width: 1200, height: 630 }] : undefined },
  };
}

function Step({ item, dir }: { item: NavItem | null; dir: "older" | "newer" }) {
  if (!item) return <div />;
  const p = dateParts(item.date);
  return (
    <Link
      href={`/meetings/${item.slug}`}
      className={`group border bg-[color:var(--hm-panel)] p-6 transition-shadow hm-bd hover:shadow-[0_0_0_1px_var(--hm-orange-hi)] ${dir === "newer" ? "md:text-right" : ""}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] hm-o">
        {dir === "older" ? "← Older" : "Newer →"}
      </p>
      <h3 className="mt-3 font-display text-xl font-black uppercase leading-tight">{item.title}</h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest hm-mute">
        {p.month} {p.day} · {p.year}
      </p>
    </Link>
  );
}

export default async function MeetingPage({ params }: Props) {
  const { slug } = await params;
  const [{ data: m }, { data: nav }] = (await Promise.all([
    sanityFetch({ query: MEETING_QUERY, params: { slug } }),
    sanityFetch({ query: MEETING_NAV_QUERY }),
  ])) as unknown as [{ data: Meeting | null }, { data: NavItem[] }];
  if (!m) notFound();

  const p = dateParts(m.date);
  const upcoming = new Date(m.date).getTime() > Date.now();
  const i = (nav ?? []).findIndex((n) => n.slug === slug);
  const newer = i > 0 ? nav[i - 1] : null;
  const older = i >= 0 && i < nav.length - 1 ? nav[i + 1] : null;
  const frames = m.gallery?.length ?? 0;

  return (
    <div id="hm" className="hm">
      <Engine />
      <Backdrop />
      <div className="relative z-10">
        <section className="relative overflow-hidden">
          <div className="hm-scan" aria-hidden />
          <Container className="relative py-12 md:py-20">
            <Link href="/meetings" className="font-mono text-xs uppercase tracking-[0.25em] text-[color:var(--hm-mute)] transition-colors hover:text-[color:var(--hm-text)]">
              ← Archive
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
              <div className="hm-fade flex items-end gap-4 font-display font-black uppercase leading-none">
                <span className="hm-outline-o text-[clamp(6rem,14vw,11rem)]">{p.day}</span>
                <span className="pb-3 text-3xl md:text-4xl">
                  {p.month}
                  <br />
                  <span className="font-mono text-sm font-normal tracking-widest hm-mute">{p.year}</span>
                  <br />
                  <span className="font-mono text-sm font-normal tracking-widest hm-o">{p.time}</span>
                </span>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] hm-bd">
                    <i className={`size-1.5 rounded-full bg-[color:var(--hm-orange-hi)] ${upcoming ? "hm-blink" : ""}`} />
                    <span className="hm-o">{upcoming ? "Upcoming" : "Completed"}</span>
                  </p>
                  <h1 className="mt-5 font-display text-[clamp(2rem,5.4vw,4.75rem)] font-black uppercase leading-[1.08]">{m.title}</h1>
                </div>

                {m.summary && (
                  <div className="relative border bg-[color:var(--hm-panel)] p-6 hm-bd md:p-8">
                    <i className="hm-corner tl" />
                    <i className="hm-corner br" />
                    <p className="whitespace-pre-line text-lg text-[color:var(--hm-text)]/80">{m.summary}</p>
                  </div>
                )}

                {upcoming && <Countdown to={m.date} />}

                {m.slidesUrl && (
                  <a href={m.slidesUrl} target="_blank" rel="noopener noreferrer" className="hm-btn hm-btn-solid">
                    View slides <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="relative py-16 md:py-28">
          <Container>
            <AboutHead n="01" label="Gallery" title={frames ? `${frames} ${frames === 1 ? "frame" : "frames"} captured.` : "No photos yet."} />
            {frames > 0 && (
              <div className="mt-12">
                <Gallery images={m.gallery!} />
              </div>
            )}
          </Container>
        </section>

        {(newer || older) && (
          <section className="relative pb-24">
            <Container>
              <div className="grid gap-6 md:grid-cols-2">
                <Step item={older} dir="older" />
                <Step item={newer} dir="newer" />
              </div>
            </Container>
          </section>
        )}

      </div>
    </div>
  );
}
