import { GearIcon } from "./Gear";
import { ticker } from "@/content/site";

export default function Ticker() {
  return (
    <div className="hm-panel relative overflow-hidden border-y hm-bd py-5" aria-hidden>
      <div className="hm-marquee flex w-max">
        {[0, 1, 2, 3].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {ticker.map((t, i) => (
              <li key={t} className="flex items-center gap-8 pr-8">
                <span className={`font-display text-4xl font-black uppercase tracking-wide ${i % 2 ? "hm-outline-soft" : ""}`}>{t}</span>
                <GearIcon n={i % 2 ? 8 : 10} className={`size-12 ${i % 2 ? "hm-b" : "hm-o"}`} spin={6 + i} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
