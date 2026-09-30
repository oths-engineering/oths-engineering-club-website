import type { Metadata } from "next";
import "@/components/home/home.css";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import JoinHero from "@/components/join/JoinHero";
import Channels from "@/components/join/Channels";
import Steps from "@/components/join/Steps";

export const metadata: Metadata = {
  title: "Join",
  description: "Join the Tompkins Engineering Design Club on Discord and Remind.",
};

export default function JoinPage() {
  return (
    <div id="hm" className="hm">
      <Engine />
      <Backdrop />
      <div className="relative z-10">
        <JoinHero />
        <Channels />
        <Steps />
      </div>
    </div>
  );
}
