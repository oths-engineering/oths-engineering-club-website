import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { site, membership } from "@/content/site";

export const metadata: Metadata = {
  title: "Join",
  description: "Join our engineering and design club.",
};

export default function JoinPage() {
  return (
    <div className="space-y-16 py-16">
      <Container>
        <h1 className="font-display text-5xl font-black uppercase tracking-tight md:text-7xl">
          Join the Club
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[color:var(--hm-text)]/75">
          {membership[0] || "We're always looking for new members who want to build, learn, and ship."}
        </p>
      </Container>

      <Container>
        <div className="hm-panel border hm-bd p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold uppercase">How to Join</h2>
          <ol className="mt-6 space-y-4 text-[color:var(--hm-text)]/80">
            <li className="flex gap-3">
              <span className="font-mono text-sm hm-o">01</span>
              <span>Reach out via our socials or email.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-sm hm-o">02</span>
              <span>Come to a meeting and meet the team.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-sm hm-o">03</span>
              <span>Start building with us.</span>
            </li>
          </ol>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="hm-btn hm-btn-solid"
            >
              Contact Us <span>→</span>
            </a>
            <Link href="/meetings" className="hm-btn hm-btn-blue">
              See Meetings <span>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
