"use client";

import { useEffect } from "react";

// One scroll loop: writes --scroll, per-section --sp, and cursor position. No React state.
export default function Engine() {
  useEffect(() => {
    const host = document.getElementById("hm");
    if (!host) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    host.querySelectorAll("[data-reveal],[data-draw]").forEach((el) => {
      if (reduce) el.classList.add("is-in");
      else io.observe(el);
    });

    const scrubs = Array.from(host.querySelectorAll<HTMLElement>("[data-scrub]")).map((el) => ({
      el,
      sticky: el.dataset.scrub === "sticky",
      pct: el.querySelector<HTMLElement>("[data-pct]"),
    }));

    let raf = 0;
    const frame = () => {
      raf = 0;
      host.style.setProperty("--scroll", String(Math.round(scrollY)));
      const vh = innerHeight;
      for (const s of scrubs) {
        const r = s.el.getBoundingClientRect();
        // 64 = sticky header height
        let p = s.sticky ? (64 - r.top) / (r.height - vh + 64) : (vh - r.top) / (vh + r.height);
        p = Math.min(1, Math.max(0, p));
        s.el.style.setProperty("--sp", p.toFixed(4));
        if (s.pct) s.pct.textContent = String(Math.round(p * 100)).padStart(3, "0");
      }
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => {
      host.style.setProperty("--mx", `${e.clientX}px`);
      host.style.setProperty("--my", `${e.clientY}px`);
    };

    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    if (!reduce) addEventListener("pointermove", move, { passive: true });
    frame();

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
      removeEventListener("pointermove", move);
    };
  }, []);

  return null;
}
