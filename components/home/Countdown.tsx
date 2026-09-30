"use client";

import { useSyncExternalStore } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ to }: { to: string }) {
  const now = useSyncExternalStore(
    (cb) => {
      const id = setInterval(cb, 1000);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / 1000) * 1000,
    () => null
  );

  const diff = now === null ? null : Math.max(0, new Date(to).getTime() - now);
  const vals =
    diff === null
      ? ["--", "--", "--", "--"]
      : [pad(Math.floor(diff / 864e5)), pad(Math.floor(diff / 36e5) % 24), pad(Math.floor(diff / 6e4) % 60), pad(Math.floor(diff / 1e3) % 60)];
  const labels = ["Days", "Hrs", "Min", "Sec"];

  return (
    <div className="grid max-w-md grid-cols-4 gap-px border hm-bd bg-[color:var(--hm-line-2)]" role="timer" aria-label="Time until next meeting">
      {vals.map((v, i) => (
        <div key={labels[i]} className="hm-panel px-2 py-4 text-center">
          <div className={`overflow-hidden font-display text-3xl font-black tabular-nums md:text-4xl ${i === 3 ? "hm-o" : ""}`}>
            <span key={v} className="hm-tick">{v}</span>
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] hm-mute">{labels[i]}</p>
        </div>
      ))}
    </div>
  );
}
