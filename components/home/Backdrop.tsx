import { Gear } from "./Gear";
import { attach } from "@/lib/gear";

const B = "var(--hm-blue-hi)";
const O = "var(--hm-orange-hi)";

const r0 = { x: 330, y: 160, n: 26, ph: 0 };
const r1 = attach(r0, 16, 100);
const r2 = attach(r1, 24, 70);
const r3 = attach(r2, 14, 110);
const r4 = attach(r3, 30, 75);
const right = [
  { g: r0, dir: 1, col: B }, { g: r1, dir: -1, col: O }, { g: r2, dir: 1, col: B },
  { g: r3, dir: -1, col: O }, { g: r4, dir: 1, col: B },
] as const;

const l0 = { x: 70, y: 380, n: 22, ph: 0 };
const l1 = attach(l0, 18, 80);
const l2 = attach(l1, 12, 120);
const l3 = attach(l2, 26, 70);
const left = [
  { g: l0, dir: 1, col: O }, { g: l1, dir: -1, col: B }, { g: l2, dir: 1, col: O }, { g: l3, dir: -1, col: B },
] as const;

export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="hm-grid absolute inset-0" />
      <div className="hm-grid-lit absolute inset-0" />
      <div className="hm-spot absolute inset-0" />

      <div className="hm-fade absolute right-0 top-0 h-full w-[34vw] min-w-[280px] max-w-[480px] translate-x-[38%] opacity-40" style={{ "--fx": "120px" } as React.CSSProperties}>
        <svg viewBox="0 0 400 1000" preserveAspectRatio="xMaxYMid slice" className="h-full w-full overflow-visible" fill="none">
          {right.map(({ g, dir, col }, i) => (
            <Gear key={i} {...g} dir={dir as 1 | -1} color={col} m={10} sw={1.6} spokes={5} />
          ))}
        </svg>
      </div>

      <div className="hm-fade absolute left-0 top-0 hidden h-full w-[26vw] max-w-[380px] -translate-x-[45%] opacity-30 md:block" style={{ "--fx": "-120px" } as React.CSSProperties}>
        <svg viewBox="0 0 300 1000" preserveAspectRatio="xMinYMid slice" className="h-full w-full overflow-visible" fill="none">
          {left.map(({ g, dir, col }, i) => (
            <Gear key={i} {...g} dir={dir as 1 | -1} color={col} m={10} sw={1.6} spokes={5} />
          ))}
        </svg>
      </div>

      <div className="hm-vignette absolute inset-0" />
    </div>
  );
}
