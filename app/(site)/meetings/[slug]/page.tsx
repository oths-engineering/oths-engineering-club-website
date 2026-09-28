import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { staticFetch } from "@/sanity/lib/client";
import { MEETING_QUERY, MEETING_SLUGS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import Gallery from "@/components/meetings/Gallery";

type Props = { params: Promise<{ slug: string }> };

type Meeting = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location?: string;
  summary?: string;
  thumb?: { asset?: { _ref?: string }; alt?: string };
  slidesUrl?: string;
  body?: unknown;
  gallery?: { asset?: { _ref?: string }; alt?: string }[];
};

export async function generateStaticParams() {
  const slugs = await staticFetch(MEETING_SLUGS_QUERY) as { slug: string }[];
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: m } = await sanityFetch({ query: MEETING_QUERY, params: { slug }, stega: false }) as { data: Meeting };
  if (!m) return {};
  const image = m.thumb ? urlFor(m.thumb).width(1200).height(630).url() : undefined;
  return {
    title: m.title,
    description: m.summary,
    openGraph: {
      title: m.title,
      description: m.summary,
      type: "article",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function MeetingPage({ params }: Props) {
  const { slug } = await params;
  const { data: m } = await sanityFetch({ query: MEETING_QUERY, params: { slug } }) as { data: Meeting };
  if (!m) notFound();

  return (
    <article className="space-y-6">
      <Link href="/meetings" className="text-sm underline">
        &larr; All meetings
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{m.title}</h1>
        <p className="text-neutral-600">{formatDate(m.date)}</p>
      </header>
      {m.summary && <p className="whitespace-pre-line">{m.summary}</p>}
      {m.slidesUrl && (
        <a
          href={m.slidesUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded bg-black px-5 py-3 text-white"
        >
          View Slides
        </a>
      )}
      {m.gallery && m.gallery.length > 0 && <Gallery images={m.gallery} />}
    </article>
  );
}
