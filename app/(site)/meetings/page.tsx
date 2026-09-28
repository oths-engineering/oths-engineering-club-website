import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { UPCOMING_MEETINGS_QUERY, PAST_MEETINGS_QUERY } from "@/sanity/lib/queries";
import MeetingList from "@/components/meetings/MeetingList";

type MeetingListItem = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location?: string;
  summary?: string;
  thumb?: { asset?: { _ref?: string }; alt?: string };
  slidesUrl?: string;
};

export const metadata: Metadata = {
  title: "Meetings",
  description: "Upcoming meetings and recaps of past ones.",
};

export default async function MeetingsPage() {
  const [{ data: upcoming }, { data: past }] = await Promise.all([
    sanityFetch({ query: UPCOMING_MEETINGS_QUERY }) as unknown as { data: MeetingListItem[] },
    sanityFetch({ query: PAST_MEETINGS_QUERY }) as unknown as { data: MeetingListItem[] },
  ]);

  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
        <MeetingList meetings={upcoming} empty="No upcoming meetings scheduled yet." />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Past Meetings</h2>
        <MeetingList meetings={past} empty="Nothing here yet." />
      </section>
    </div>
  );
}
