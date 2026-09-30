import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "@/components/home/home.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Engine from "@/components/home/Engine";
import Backdrop from "@/components/home/Backdrop";
import { Gear, Node, Trace } from "@/components/home/Gear";
import NotFoundReadout from "@/components/ui/NotFoundReadout";

export const metadata: Metadata = { title: "Part not found" };

const lines = ["Part", "not", "found."];
const digit = "text-[clamp(6rem,19vw,17rem)]";

export default function NotFound() {
  return (
    <>
      <Header />
      <div id="hm" className="hm">
        <Engine />
        <Backdrop />
        <main className="relative z-10 overflow-hidden">
          <div className="hm-scan" aria-hidden />
          <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col items-center justify-center px-5 py-16 text-center">
            <p className="hm-fade font-mono text-[11px] uppercase tracking-[0.3em] hm-o">Error · DWG-404</p>

            <div className="mt-6 flex items-center justify-center font-display font-black leading-none" aria-label="404">
              <span className={`hm-outline ${digit}`}>4</span>
              <svg viewBox="-110 -110 220 220" className="hm-spool size-[clamp(5.5rem,17vw,15rem)]" fill="none" aria-hidden>
                <Gear n={16} m={12} color="var(--hm-orange-hi)" sw={3} glow spokes={5} fill={0.1} spin={30} />
              </svg>
              <span className={`hm-outline ${digit}`}>4</span>
            </div>

            <svg data-draw viewBox="0 0 600 60" className="mt-2 w-full max-w-xl" fill="none" aria-hidden>
              <Trace d="M0 30 H230 L250 10 H270" color="var(--hm-blue-hi)" delay={0.3} dur={3} />
              <Trace d="M600 30 H370 L350 50 H330" color="var(--hm-orange-hi)" delay={0.6} dur={3} />
              <Node x={272} y={10} r={5} color="var(--hm-blue-hi)" delay={0.3} />
              <circle cx={328} cy={50} r={5} stroke="var(--hm-orange-hi)" strokeWidth={2} className="hm-blink" />
            </svg>

            <h1 aria-label={lines.join(" ")} className="mt-6 font-display text-[clamp(2rem,5.6vw,5rem)] font-black uppercase leading-[1.08]">
              <span aria-hidden>
                {lines.map((l, i) => (
                  <span key={l} className={`mr-[0.3em] inline-block overflow-hidden pb-[0.08em] ${i === 2 ? "hm-o" : ""}`}>
                    {[...l].map((c, k) => (
                      <span key={k} className="hm-char" style={{ "--d": `${i * 0.25 + k * 0.045}s` } as CSSProperties}>
                        {c}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hm-fade mt-4 max-w-md text-[color:var(--hm-text)]/75" style={{ "--fx": "0px", animationDelay: "0.9s" } as CSSProperties}>
              Something on this page wasn't bolted on right. The page you wanted moved, never existed, or is still on the workbench.
            </p>

            <NotFoundReadout />

            <div className="hm-fade mt-10 flex flex-wrap justify-center gap-3" style={{ "--fx": "0px", animationDelay: "1.6s" } as CSSProperties}>
              <Link href="/" className="hm-btn hm-btn-solid">Back to base <span>→</span></Link>
              <Link href="/meetings" className="hm-btn hm-btn-blue">Meetings <span>→</span></Link>
              <Link href="/join" className="hm-btn hm-btn-blue">Join <span>→</span></Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
