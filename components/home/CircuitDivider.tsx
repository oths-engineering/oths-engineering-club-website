import { Node, Trace } from "./Gear";

const W = 1440;
const N = 6;
const GAP = 16;
const DROP = 64;

function bus(a: number, b: number, base: number) {
  return Array.from({ length: N }, (_, i) => {
    const y = base + i * GAP;
    const d1 = a + (N - 1 - i) * GAP; // lower lines descend first
    const d2 = b + i * GAP; // upper lines ascend first
    return `M0 ${y} H${d1} l${DROP} ${DROP} H${d2} l${DROP} ${-DROP} H${W}`;
  });
}

export default function CircuitDivider({ flip = false }: { flip?: boolean }) {
  const lines = bus(250, 550, 24);
  const chipX = flip ? 240 : 1000;
  return (
    <div className="relative h-[120px] w-full overflow-hidden md:h-[200px]" aria-hidden>
      <svg data-draw viewBox={`0 0 ${W} 200`} preserveAspectRatio="xMidYMid slice" className="h-full w-full" fill="none">
        {lines.map((d, i) => (
          <Trace key={i} d={d} w={1.6} delay={i * 0.18} dur={5 + i * 0.8} color={i === 2 ? "var(--hm-orange-hi)" : "var(--hm-blue-hi)"} />
        ))}
        {Array.from({ length: N }, (_, i) => (
          <Node key={i} x={16} y={24 + i * GAP} r={4} delay={i * 0.18} color={i === 2 ? "var(--hm-orange-hi)" : "var(--hm-blue-hi)"} />
        ))}

        <g transform={`translate(${chipX} 0)`}>
          <rect x="0" y="6" width="200" height="116" style={{ fill: "var(--hm-bg)" }} stroke="var(--hm-orange-hi)" strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} stroke="var(--hm-orange-hi)" strokeWidth="2">
              <path d={`M${20 + i * 22} 6 v-6`} />
              <path d={`M${20 + i * 22} 122 v6`} />
            </g>
          ))}
          <circle cx="16" cy="22" r="3" fill="var(--hm-orange-hi)" />
          <text x="100" y="72" textAnchor="middle" fontSize="18" letterSpacing="3" fill="var(--hm-text)" className="font-mono">
            TEDC-01
          </text>
        </g>
      </svg>
    </div>
  );
}
