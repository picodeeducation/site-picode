/**
 * Linhas de "trajetória" — grafismo da marca PiCode.
 * Inspirado no guia: caminhos que representam a jornada educacional.
 */
export function PathLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.13 220)" stopOpacity="0.0" />
          <stop offset="50%" stopColor="oklch(0.78 0.13 220)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.6 0.2 295)" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d="M-50 600 C 200 400, 400 700, 700 350 S 1100 200, 1300 100"
        stroke="url(#pathGrad)"
        strokeWidth="1.5"
        className="animate-draw"
      />
      <path
        d="M-50 700 C 300 500, 500 800, 800 450 S 1200 300, 1400 200"
        stroke="url(#pathGrad)"
        strokeWidth="1"
        opacity="0.5"
        className="animate-draw"
      />
      <path
        d="M-50 200 C 200 100, 500 300, 800 150 S 1100 50, 1300 0"
        stroke="url(#pathGrad)"
        strokeWidth="1"
        opacity="0.4"
        className="animate-draw"
      />
    </svg>
  );
}
