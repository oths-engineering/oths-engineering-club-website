import "@/components/home/home.css";
import { sanityFetch } from "@/sanity/lib/live";
import { UPCOMING_MEETINGS_QUERY, PAST_MEETINGS_QUERY } from "@/sanity/lib/queries";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Stats from "@/components/home/Stats";
import CircuitDivider from "@/components/home/CircuitDivider";
import Pillars from "@/components/home/Pillars";
import Machine from "@/components/home/Machine";
import NextMeeting from "@/components/home/NextMeeting";
import RecentMeetings from "@/components/home/RecentMeetings";
import JoinCta from "@/components/home/JoinCta";

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

export default async function Home() {
  const [{ data: upcoming }, { data: past }] = await Promise.all([
    sanityFetch({ query: UPCOMING_MEETINGS_QUERY }) as unknown as { data: MeetingListItem[] },
    sanityFetch({ query: PAST_MEETINGS_QUERY }) as unknown as { data: MeetingListItem[] },
  ]);

  return (
    <div id="hm" className="hm">
      <noscript>
        <style>{`.hm [data-reveal]{opacity:1!important;transform:none!important;filter:none!important}.hm .hm-char{transform:none!important}.hm [data-draw] .hm-draw{stroke-dashoffset:0!important}.hm .hm-node{transform:none!important}`}</style>
      </noscript>
      <Engine />
      <Backdrop />
      <div className="relative z-10">
        <Hero />
        <Ticker />
        <Stats />
        <CircuitDivider />
        <Pillars />
        <Machine />
        <CircuitDivider flip />
        <NextMeeting meeting={upcoming?.[0]} />
        <RecentMeetings meetings={(Array.isArray(past) ? past : []).slice(0, 3)} />
        <JoinCta />
      </div>
    </div>
  );
}
