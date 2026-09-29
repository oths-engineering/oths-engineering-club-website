import type { Metadata } from "next";
import "@/components/home/home.css";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import CircuitDivider from "@/components/home/CircuitDivider";
import Stats from "@/components/home/Stats";
import JoinCta from "@/components/home/JoinCta";
import AboutHero from "@/components/about/AboutHero";
import Manifesto from "@/components/about/Manifesto";
import Tracks from "@/components/about/Tracks";
import Team from "@/components/about/Team";
import Rhythm from "@/components/about/Rhythm";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission, our team, and how the club runs.",
};

export default function AboutPage() {
  return (
    <div id="hm" className="hm">
      <Engine />
      <Backdrop />
      <div className="relative z-10">
        <AboutHero />
        <Manifesto />
        <Tracks />
        <CircuitDivider />
        <Team />
        <Rhythm />
        <Stats />
        <JoinCta />
      </div>
    </div>
  );
}
