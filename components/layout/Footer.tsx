import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { href: "/about", label: "About" },
  { href: "/meetings", label: "Meetings" },
  { href: "/join", label: "Join" },
];

const label = "font-mono text-[11px] uppercase tracking-[0.25em] text-[#ff7f57]";
const link = "text-white/70 transition-colors hover:text-white";

export default function Footer() {
  const socials = site.socials.filter((s) => s.url);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#06080d] text-white">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4585f7] to-transparent opacity-70" />

      <div className="mx-auto w-full max-w-[1400px] px-5 pt-16 md:px-10">
        <div className="grid gap-px border border-white/15 bg-white/15 md:grid-cols-4">
          <div className="space-y-3 bg-[#0a0e17] p-6">
            <p className={label}>Contact</p>
            <a href={`mailto:${site.email}`} className={`${link} underline underline-offset-4`}>
              {site.email}
            </a>
          </div>

          <div className="space-y-3 bg-[#0a0e17] p-6">
            <p className={label}>Location</p>
            <p className="text-white/70">{site.location}</p>
          </div>

          <div className="space-y-3 bg-[#0a0e17] p-6">
            <p className={label}>Elsewhere</p>
            {socials.length ? (
              <ul className="space-y-1.5">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={link}>
                      {s.platform} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/40">Coming soon</p>
            )}
          </div>

          <div className="space-y-3 bg-[#0a0e17] p-6">
            <p className={label}>Index</p>
            <ul className="space-y-1.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-12 select-none text-center font-display text-[clamp(5rem,26vw,22rem)] font-black uppercase leading-[0.8] tracking-normal text-white/[0.04]"
        >
          {site.short}
        </p>
      </div>

      <div className="border-t border-white/10 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
        © {new Date().getFullYear()} {site.name}
      </div>
    </footer>
  );
}
