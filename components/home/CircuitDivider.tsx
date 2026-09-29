import { Node, Trace } from "./Gear";

const W = 1440;
const N = 6;
const GAP = 16;
const DROP = 64;
const A = 516;
const B = 780;

const color = (i: number) => (i === 2 ? "var(--hm-orange-hi)" : "var(--hm-blue-hi)");

const lines = Array.from({ length: N }, (_, i) => {
  const y = 24 + i * GAP;
  const d1 = A + (N - 1 - i) * GAP;
  const d2 = B + i * GAP;
  return {
    d: `M0 ${y} H${d1} l${DROP} ${DROP} H${d2} l${DROP} ${-DROP} H${W}`,
    mx: (d1 + DROP + d2) / 2,
    my: y + DROP,
  };
});

export default function CircuitDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-[120px] w-full overflow-hidden md:h-[200px]" aria-hidden>
      <svg
        data-draw
        viewBox={`0 0 ${W} 200`}
        preserveAspectRatio="xMidYMid slice"
        className={`h-full w-full ${flip ? "-scale-x-100" : ""}`}
        fill="none"
      >
        {lines.map((l, i) => (
          <Trace key={i} d={l.d} w={1.6} delay={i * 0.18} dur={5 + i * 0.8} color={color(i)} />
        ))}
        {lines.map((l, i) => (
          <Node key={i} x={l.mx} y={l.my} r={4} delay={i * 0.18} color={color(i)} />
        ))}
      </svg>
    </div>
  );
}
