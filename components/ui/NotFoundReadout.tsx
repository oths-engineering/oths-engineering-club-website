"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

export default function NotFoundReadout() {
  const path = usePathname();
  const rows: [string, string][] = [
    ["hm-mute", `> GET ${path}`],
    ["hm-mute", "> scanning assembly... 0 of 4 routes matched"],
    ["hm-o", "> ERR 404: part not found"],
    ["hm-b", "> fix: pick a route below"],
  ];

  return (
    <div className="hm-panel relative mt-10 w-full max-w-xl border p-5 text-left hm-bd" role="status">
      <i className="hm-corner tl" />
      <i className="hm-corner br" />
      {rows.map(([cls, text], i) => (
        <p
          key={i}
          className={`hm-fade break-all font-mono text-xs uppercase leading-7 tracking-[0.12em] ${cls}`}
          style={{ "--fx": "0px", animationDelay: `${1 + i * 0.25}s` } as CSSProperties}
        >
          {text}
          {i === rows.length - 1 && <span className="hm-blink ml-1 inline-block h-3 w-2 translate-y-0.5 bg-[color:var(--hm-orange-hi)]" />}
        </p>
      ))}
    </div>
  );
}
