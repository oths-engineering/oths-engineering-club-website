"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/meetings", label: "Meetings" },
  { href: "/join", label: "Join" },
];

export default function NavLinks() {
  const path = usePathname();
  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((l, i) => {
        const on = path === l.href || path.startsWith(`${l.href}/`);
        if (l.href === "/join") {
          return (
            <Link
              key={l.href}
              href={l.href}
              className="ml-2 border border-[#ff7f57] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#d4593b]"
            >
              {l.label}
            </Link>
          );
        }
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`group relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              on ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <span className="mr-1.5 hidden text-[#ff7f57] sm:inline">0{i + 1}</span>
            {l.label}
            <span
              className={`absolute inset-x-3 bottom-0 h-px origin-left bg-[#ff7f57] transition-transform duration-300 ${
                on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
