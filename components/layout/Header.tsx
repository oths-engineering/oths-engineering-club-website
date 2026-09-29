import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NavLinks from "./NavLinks";
import { site } from "@/content/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06080d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="size-[60px] transition-transform duration-700" />
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-white">{site.short}</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 lg:inline">{site.name}</span>
        </Link>
        <NavLinks />
      </div>
      <span aria-hidden className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#4585f7] to-transparent opacity-70" />
    </header>
  );
}
