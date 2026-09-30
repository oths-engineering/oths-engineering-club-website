"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { MeetingImage } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Gallery({ images = [] }: { images?: MeetingImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const n = images.length;

  const go = useCallback((d: number) => setOpen((i) => (i === null ? null : (i + d + n) % n)), [n]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    addEventListener("keydown", k);
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [open, go]);

  return (
    <>
      <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 [grid-auto-flow:dense] md:auto-rows-[14rem] md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img._key ?? i}
            type="button"
            onClick={() => setOpen(i)}
            data-reveal
            style={{ "--d": `${Math.min(i, 8) * 0.06}s` } as CSSProperties}
            aria-label={`Open photo ${i + 1} of ${n}`}
            className={`group relative overflow-hidden border hm-bd ${i === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <Image
              src={urlFor(img).width(i === 0 ? 1200 : 700).height(i === 0 ? 1200 : 700).url()}
              alt={img.alt ?? ""}
              width={i === 0 ? 1200 : 700}
              height={i === 0 ? 1200 : 700}
              className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
            <span className="absolute left-0 top-0 bg-[#06080d] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#ff7f57]">
              {pad(i + 1)}
            </span>
            <span className="absolute inset-0 bg-[#4585f7]/0 transition-colors group-hover:bg-[#4585f7]/10" />
          </button>
        ))}
      </div>

      {isClient &&
        open !== null &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080d]/95 backdrop-blur-md"
          >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 font-mono text-xs uppercase tracking-[0.25em] text-white/70">
              <span>
                <span className="text-[#ff7f57]">{pad(open + 1)}</span> / {pad(n)}
              </span>
              <button type="button" onClick={() => setOpen(null)} className="border border-white/30 px-3 py-1.5 hover:bg-white/10">
                Close ✕
              </button>
            </div>

            {n > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 border border-white/30 px-4 py-3 text-white hover:border-[#ff7f57] hover:text-[#ff7f57] md:left-8">
                  ←
                </button>
                <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 border border-white/30 px-4 py-3 text-white hover:border-[#ff7f57] hover:text-[#ff7f57] md:right-8">
                  →
                </button>
              </>
            )}

            <Image
              key={open}
              src={urlFor(images[open]).width(2000).url()}
              alt={images[open].alt ?? ""}
              width={2000}
              height={1400}
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[80vh] w-auto max-w-[88vw] border border-white/20 object-contain shadow-[0_0_80px_-10px_#4585f7]"
            />
          </div>,
          document.body
        )}
    </>
  );
}
