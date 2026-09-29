export default function AboutHead({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div data-reveal className="max-w-5xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
        <span className="hm-o">[{n}]</span>
        <span className="h-px w-10 bg-[color:var(--hm-orange-hi)]" />
        <span className="hm-mute">{label}</span>
      </p>
      <h2 className="mt-5 font-display text-[clamp(2rem,5.2vw,4.75rem)] font-black uppercase leading-[1.08]">{title}</h2>
    </div>
  );
}
