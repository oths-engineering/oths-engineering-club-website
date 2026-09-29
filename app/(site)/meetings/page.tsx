import type { Metadata } from "next";
import { Suspense } from "react";
import "@/components/home/home.css";
import { sanityFetch } from "@/sanity/lib/live";
import { UPCOMING_MEETINGS_QUERY, PAST_MEETINGS_QUERY } from "@/sanity/lib/queries";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import MeetingsHero from "@/components/meetings/MeetingsHero";
import MeetingsBrowser from "@/components/meetings/MeetingsBrowser";
import type { Meeting } from "@/components/meetings/types";

export const metadata: Metadata = {
  title: "Meetings",
  description: "Upcoming meetings and the archive of everything we've built.",
};

export default async function MeetingsPage() {
  const [{ data: upcoming }, { data: past }] = await Promise.all([
    sanityFetch({ query: UPCOMING_MEETINGS_QUERY }) as unknown as Promise<{ data: Meeting[] }>,
    sanityFetch({ query: PAST_MEETINGS_QUERY }) as unknown as Promise<{ data: Meeting[] }>,
  ]);

  const all: Meeting[] = [...(upcoming ?? []).map((m) => ({ ...m, upcoming: true })), ...(past ?? [])];

  return (
    <div id="hm" className="hm">
      <Engine />
      <Backdrop />
      <div className="relative z-10">
        <MeetingsHero total={all.length} upcoming={upcoming?.length ?? 0} past={past?.length ?? 0} />
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <MeetingsBrowser meetings={all} />
        </Suspense>
      </div>
    </div>
  );
}
