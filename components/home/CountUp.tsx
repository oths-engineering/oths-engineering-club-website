"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1800);
          setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, reduced]);

  return (
    <span ref={ref}>
      {String(reduced ? to : v).padStart(Math.max(2, String(to).length), "0")}
      {suffix}
    </span>
  );
}
