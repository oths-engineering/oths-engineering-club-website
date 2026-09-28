import Link from "next/link";
import Container from "@/components/layout/Container";
import { Gear } from "./Gear";

export default function JoinCta() {
  return (
    <section className="relative overflow-hidden py-32 text-center md:py-52">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[70rem] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(closest-side, rgb(212 89 59 / .28), transparent)" }}
        aria-hidden
      />
      <svg viewBox="-620 -620 1240 1240" className="pointer-events-none absolute left-1/2 top-1/2 w-[160vw] max-w-[1500px] -translate-x-1/2 -translate-y-1/2 opacity-40" fill="none" aria-hidden>
        <Gear n={60} m={10} color="var(--hm-orange-hi)" sw={2} spokes={12} fill={0.03} />
        <Gear n={40} m={10} color="var(--hm-blue-hi)" sw={2} dir={-1} spokes={8} fill={0.03} />
        <Gear n={20} m={10} color="var(--hm-orange-hi)" sw={2} spokes={5} fill={0.05} />
      </svg>

      <Container className="relative">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] hm-o">[05] Membership</p>
        <h2 className="mt-6 font-display text-[clamp(4.5rem,16vw,16rem)] font-black uppercase leading-[0.8] tracking-[-0.02em]">
          <span data-reveal className="block" style={{ "--d": "0.1s" } as React.CSSProperties}>Come build</span>
          <span data-reveal className="block hm-outline-o" style={{ "--d": "0.25s" } as React.CSSProperties}>with us.</span>
        </h2>
        <div data-reveal className="mt-14" style={{ "--d": "0.4s" } as React.CSSProperties}>
          <Link href="/join" className="hm-btn hm-btn-solid hm-ping px-10 py-6 text-sm">
            Apply to join <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
