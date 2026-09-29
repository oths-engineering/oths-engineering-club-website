"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import Tilt from "@/components/home/Tilt";
import { GearIcon } from "@/components/home/Gear";
import { urlFor } from "@/sanity/lib/image";
import { dateParts } from "@/lib/utils";
import type { Meeting } from "./types";

const PER = 9;
const TABS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const pad = (n: number) => String(n).padStart(2, "0");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function hl(text: string, words: string[]): ReactNode {
  if (!words.length) return text;
  return text.split(new RegExp(`(${words.map(esc).join("|")})`, "gi")).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="bg-[color:var(--hm-orange-hi)] px-0.5 text-[color:var(--hm-bg)]">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function hay(m: Meeting) {
  const p = dateParts(m.date);
  const long = new Date(m.date).toLocaleString("en-US", { month: "long", timeZone: "America/Chicago" });
  return `${m.title} ${m.summary ?? ""} ${long} ${p.month} ${p.day} ${p.year}`.toLowerCase();
}

function pageList(cur: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const s = new Set([1, total, cur - 1, cur, cur + 1]);
  if (cur <= 3) [2, 3, 4].forEach((n) => s.add(n));
  if (cur >= total - 2) [total - 1, total - 2, total - 3].forEach((n) => s.add(n));
  const arr = [...s].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  arr.forEach((n, i) => {
    if (i && n - arr[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

function PageBtn({ children, active, disabled, onClick }: { children: ReactNode; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`min-w-11 border px-3 py-2.5 transition-all disabled:pointer-events-none disabled:opacity-30 ${
        active
          ? "border-[color:var(--hm-orange-hi)] bg-[color:var(--hm-orange)] text-[color:var(--hm-bg)] shadow-[0_0_24px_-4px_var(--hm-orange-hi)]"
          : "hm-bd bg-[color:var(--hm-panel)] hover:-translate-y-0.5 hover:bg-[color:var(--hm-blue)]"
      }`}
    >
      {children}
    </button>
  );
}

function Tile({ m, i, words }: { m: Meeting; i: number; words: string[] }) {
  const p = dateParts(m.date);
  const src = m.thumb ? urlFor(m.thumb).width(900).height(675).url() : null;
  return (
    <div className="hm-fade" style={{ "--fx": "0px", animationDuration: "0.7s", animationDelay: `${i * 0.06}s` } as CSSProperties}>
      <Tilt>
        <Link
          href={`/meetings/${m.slug}`}
          className="group flex h-full flex-col border bg-[color:var(--hm-panel)] hm-bd transition-shadow hover:shadow-[0_0_0_1px_var(--hm-orange-hi)]"
        >
          <div className="hm-duo relative aspect-[4/3] overflow-hidden">
            {src ? (
              <Image src={src} alt={m.thumb?.alt ?? m.title} width={900} height={675} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center bg-[color:var(--hm-panel)]">
                <GearIcon n={12} className="hm-o size-28" spin={12} />
              </div>
            )}
            <span className="absolute left-0 top-0 bg-[color:var(--hm-bg)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest hm-o">
              {p.month} {p.day} · {p.year}
            </span>
            {m.upcoming && (
              <span className="absolute right-0 top-0 flex items-center gap-2 bg-[color:var(--hm-orange)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--hm-bg)]">
                <i className="hm-blink size-1.5 rounded-full bg-[color:var(--hm-bg)]" />
                Upcoming
              </span>
            )}
            {m.slidesUrl && (
              <span className="absolute bottom-0 right-0 bg-[color:var(--hm-blue)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest">Slides</span>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="font-display text-xl font-extrabold uppercase leading-tight">{hl(m.title, words)}</h3>
            {m.summary && <p className="line-clamp-3 text-sm text-[color:var(--hm-text)]/65">{hl(m.summary, words)}</p>}
            <span className="mt-auto pt-3 font-mono text-xs uppercase tracking-[0.2em] hm-o">
              Open <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </Link>
      </Tilt>
    </div>
  );
}

export default function MeetingsBrowser({ meetings }: { meetings: Meeting[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const q = sp.get("q") ?? "";
  const tab = (TABS.some((t) => t.id === sp.get("tab")) ? sp.get("tab") : "all") as Tab;
  const page = Math.max(1, Number(sp.get("page")) || 1);

  const [input, setInput] = useState(q);
  const inputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const setParams = useCallback(
    (patch: Record<string, string | null>) => {
      const p = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(patch)) (v ? p.set(k, v) : p.delete(k));
      const s = p.toString();
      router.replace(s ? `${path}?${s}` : path, { scroll: false });
    },
    [sp, router, path]
  );

  useEffect(() => {
    if (input.trim() === q) return;
    const t = setTimeout(() => setParams({ q: input.trim() || null, page: null }), 220);
    return () => clearTimeout(t);
  }, [input, q, setParams]);

  useEffect(() => {
    if (document.activeElement !== inputRef.current) setInput(q);
  }, [q]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setInput("");
        inputRef.current?.blur();
      }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  const words = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const searched = useMemo(() => meetings.filter((m) => words.every((w) => hay(m).includes(w))), [meetings, words]);
  const counts = {
    all: searched.length,
    upcoming: searched.filter((m) => m.upcoming).length,
    past: searched.filter((m) => !m.upcoming).length,
  };
  const filtered = tab === "all" ? searched : searched.filter((m) => (tab === "upcoming" ? m.upcoming : !m.upcoming));
  const pages = Math.max(1, Math.ceil(filtered.length / PER));
  const cur = Math.min(page, pages);
  const slice = filtered.slice((cur - 1) * PER, cur * PER);

  const goPage = (n: number) => {
    setParams({ page: n <= 1 ? null : String(n) });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pb-24 pt-4 md:pb-36">
      <Container>
        <div ref={topRef} className="scroll-mt-24 space-y-5">
          <label className="group relative flex items-center gap-4 border bg-[color:var(--hm-panel)] px-5 py-4 transition-shadow hm-bd focus-within:shadow-[0_0_0_1px_var(--hm-orange-hi),0_0_40px_-8px_var(--hm-orange-hi)]">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 hm-o" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search title, topic, month…"
              aria-label="Search meetings"
              className="w-full bg-transparent font-mono text-sm uppercase tracking-[0.15em] text-[color:var(--hm-text)] outline-none placeholder:text-[color:var(--hm-mute)]"
            />
            {input ? (
              <button type="button" onClick={() => setInput("")} aria-label="Clear search" className="font-mono text-lg leading-none hm-mute hover:opacity-70">
                ×
              </button>
            ) : (
              <kbd className="hidden border px-2 py-1 font-mono text-[10px] hm-bd hm-mute sm:block">/</kbd>
            )}
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="tablist" className="flex gap-px border bg-[color:var(--hm-line-2)] hm-bd">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.id}
                  onClick={() => setParams({ tab: t.id === "all" ? null : t.id, page: null })}
                  className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    tab === t.id
                      ? "bg-[color:var(--hm-orange)] text-[color:var(--hm-bg)]"
                      : "bg-[color:var(--hm-panel)] hover:bg-[color:var(--hm-blue)]"
                  }`}
                >
                  {t.label}
                  <span className="opacity-70">{pad(counts[t.id])}</span>
                </button>
              ))}
            </div>
            <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.25em] hm-mute">
              {pad(filtered.length)} {filtered.length === 1 ? "result" : "results"} · Page {pad(cur)}/{pad(pages)}
            </p>
          </div>
        </div>

        {slice.length ? (
          <div key={`${tab}-${q}-${cur}`} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slice.map((m, i) => (
              <Tile key={m._id} m={m} i={i} words={words} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center">
            <GearIcon n={12} className="hm-b size-24" spin={14} />
            <p className="font-display text-2xl font-black uppercase">No signal.</p>
            <p className="font-mono text-xs uppercase tracking-[0.25em] hm-mute">
              {q ? `Nothing matches “${q}”.` : "Nothing logged here yet."}
            </p>
            {(q || tab !== "all") && (
              <button type="button" onClick={() => { setInput(""); setParams({ q: null, tab: null, page: null }); }} className="hm-btn hm-btn-blue">
                Reset filters
              </button>
            )}
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
            <PageBtn disabled={cur === 1} onClick={() => goPage(cur - 1)}>← Prev</PageBtn>
            {pageList(cur, pages).map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} className="px-2 hm-mute">…</span>
              ) : (
                <PageBtn key={n} active={n === cur} onClick={() => goPage(n)}>{pad(n)}</PageBtn>
              )
            )}
            <PageBtn disabled={cur === pages} onClick={() => goPage(cur + 1)}>Next →</PageBtn>
          </nav>
        )}
      </Container>
    </section>
  );
}
