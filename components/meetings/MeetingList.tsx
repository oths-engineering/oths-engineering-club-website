import Link from "next/link";
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

export default function MeetingList({
  meetings,
  empty = "No meetings found.",
}: {
  meetings: Meeting[] | null | undefined;
  empty?: string;
}) {
  if (!meetings?.length) {
    return (
      <p className="font-mono text-sm uppercase tracking-[0.25em] hm-mute">
        {empty}
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {meetings.map((m) => {
        const p = dateParts(m.date);
        const src = m.coverImage?.asset?._ref
          ? urlFor(m.coverImage.asset._ref).width(400).height(300).url()
          : null;
        return (
          <Link
            key={m._id}
            href={`/meetings/${m.slug}`}
            className="hm-panel group flex gap-4 border hm-bd p-4 transition-colors hover:border-[color:var(--hm-orange-hi)]"
          >
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={m.coverImage?.alt ?? m.title}
                className="h-20 w-20 shrink-0 rounded object-cover"
              />
            ) : (
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded bg-[color:var(--hm-panel)]">
                <span className="font-mono text-[10px] uppercase hm-mute">No img</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="truncate font-display text-lg font-bold uppercase">
                  {m.title}
                </h3>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider hm-o">
                  {p.month} {p.day}
                </span>
              </div>
              {m.summary && (
                <p className="mt-1 line-clamp-2 text-sm text-[color:var(--hm-text)]/65">
                  {m.summary}
                </p>
              )}
              {m.location && (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider hm-mute">
                  {m.location}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
