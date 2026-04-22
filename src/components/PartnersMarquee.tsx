const partners = [
  {
    name: "CriaBiz",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4 L8 18 L15 18 L13 28 L24 13 L17 13 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Arena",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="3" />
        <path d="M16 5 L16 27 M5 16 L27 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Wadhwani",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6 L10 26 L16 12 L22 26 L28 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "AWS EdStart",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M4 10 L16 16 L28 10 M16 16 L16 28" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "InovAtiva Brasil",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 26 L20 12 M20 12 L20 20 M20 12 L12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 6 L26 10 L24 14 L22 10 Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Anjos do Brasil",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18 Q 10 10, 14 16 Q 16 22, 12 24 Q 8 22, 4 18 Z" fill="currentColor" />
        <path d="M28 18 Q 22 10, 18 16 Q 16 22, 20 24 Q 24 22, 28 18 Z" fill="currentColor" />
        <circle cx="16" cy="8" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Poli Angels",
    logo: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4 L20 13 L29 13 L22 19 L25 28 L16 22 L7 28 L10 19 L3 13 L12 13 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export function PartnersMarquee() {
  const items = [...partners, ...partners];
  return (
    <div className="relative overflow-hidden marquee-mask py-4">
      <div className="flex gap-6 animate-marquee w-max">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-border bg-background/80 backdrop-blur whitespace-nowrap shrink-0 hover:border-primary/40 transition-colors"
          >
            <span className="h-7 w-7 text-primary shrink-0">{p.logo}</span>
            <span className="font-mono-display font-semibold uppercase text-[11px] tracking-[0.16em] text-foreground/80">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
