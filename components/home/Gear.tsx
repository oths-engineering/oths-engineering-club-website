import type { CSSProperties } from "react";
import { gearPath } from "@/lib/gear";

type GearProps = {
  n: number;
  m?: number;
  x?: number;
  y?: number;
  dir?: 1 | -1;
  ph?: number;
  color?: string;
  spokes?: number;
  spin?: number;
  sw?: number;
  fill?: number;
  half?: "l" | "r";
  glow?: boolean;
  drive?: "scroll" | "sp" | "none";
  c?: number;
};

export function HalfClips() {
  return (
    <defs>
      <clipPath id="hm-clip-l"><rect x="-1000" y="-1000" width="1000" height="2000" /></clipPath>
      <clipPath id="hm-clip-r"><rect x="0" y="-1000" width="1000" height="2000" /></clipPath>
    </defs>
  );
}

export function Gear({
  n, m = 10, x = 0, y = 0, dir = 1, ph = 0, color = "var(--hm-blue-hi)", spokes = 6,
  spin = 90, sw = 2, fill = 0.06, half, glow, drive = "scroll", c,
}: GearProps) {
  const rp = (n * m) / 2;
  const ro = rp + m * 0.6;
  const ri = rp - m * 0.6;
  const hub = ri * 0.26;

  const body = (
    <g
      className="hm-spin"
      style={{ animationDuration: `${spin * (n / 24)}s`, animationDirection: dir === 1 ? "normal" : "reverse" }}
    >
      <path d={gearPath(n, ro, ri)} fill="currentColor" fillOpacity={fill} stroke="currentColor" strokeWidth={sw} strokeLinejoin="round" />
      <circle r={ri * 0.86} fill="none" stroke="currentColor" strokeWidth={sw * 0.5} strokeDasharray="2 8" opacity={0.7} />
      {Array.from({ length: spokes }, (_, i) => (
        <path
          key={i}
          transform={`rotate(${(360 / spokes) * i})`}
          d={`M${-ri * 0.06} ${-hub} L${-ri * 0.1} ${-ri * 0.8} L${ri * 0.1} ${-ri * 0.8} L${ri * 0.06} ${-hub}Z`}
          fill="none" stroke="currentColor" strokeWidth={sw * 0.7} strokeLinejoin="round" opacity={0.85}
        />
      ))}
      <circle r={hub} style={{ fill: "var(--hm-bg)" }} stroke="currentColor" strokeWidth={sw} />
      <circle r={hub * 0.4} fill="currentColor" />
    </g>
  );

  const driven =
    drive === "none" ? (
      body
    ) : (
      <g className={drive === "sp" ? "hm-sp" : "hm-scroll"} style={{ "--k": dir * (24 / n), "--ph": ph } as CSSProperties}>
        {body}
      </g>
    );

  const outer: CSSProperties = { color };
  if (c !== undefined) (outer as any)["--c"] = c;

  return (
    <g transform={`translate(${x} ${y})`} style={outer} className={[glow ? "hm-glow" : "", c !== undefined ? "hm-lit" : ""].join(" ")}>
      <g clipPath={half ? `url(#hm-clip-${half})` : undefined}>{driven}</g>
    </g>
  );
}

export function GearIcon({ n = 8, color = "currentColor", className = "", spin = 10 }: { n?: number; color?: string; className?: string; spin?: number }) {
  return (
    <svg viewBox="-34 -34 68 68" className={className} fill="none" aria-hidden>
      <Gear n={n} m={5} color={color} spokes={0} sw={2} spin={spin * (24 / n)} drive="none" />
    </svg>
  );
}

export function Trace({
  d, color = "var(--hm-blue-hi)", delay = 0, dur = 5, pulse = true, w = 2,
}: { d: string; color?: string; delay?: number; dur?: number; pulse?: boolean; w?: number }) {
  return (
    <g style={{ color }}>
      <path
        d={d} pathLength={1} className="hm-draw" fill="none" stroke="currentColor"
        strokeWidth={w} strokeLinejoin="round" strokeLinecap="round"
        style={{ "--td": `${delay}s` } as CSSProperties}
      />
      {pulse && (
        <circle r={w * 1.8} fill="currentColor" className="hm-pulse">
          <animateMotion path={d} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

export function Node({ x, y, r = 5, color = "var(--hm-orange-hi)", delay = 0 }: { x: number; y: number; r?: number; color?: string; delay?: number }) {
  return (
    <circle
      cx={x} cy={y} r={r} className="hm-node" fill="none" stroke={color} strokeWidth={2}
      style={{ "--td": `${delay + 1.6}s` } as CSSProperties}
    />
  );
}
