export default function Head({ n, label, title }: { n: string; label: string; title: string }) {
  return (
    <div data-reveal className="max-w-5xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
        <span className="hm-o">[{n}]</span>
        <span className="h-px w-10 bg-[color:var(--hm-orange-hi)]" />
        <span className="hm-mute">{label}</span>
      </p>
      <h2 className="mt-5 font-display text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.01em]">
        {title}
      </h2>
    </div>
  );
}
