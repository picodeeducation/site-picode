import { useEffect, useRef, type ReactNode } from "react";

/**
 * Spotlight leve para o hero inteiro, sem corte visível nas bordas.
 */
export function SpotlightHero({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const updatePosition = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    updatePosition(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        // @ts-expect-error css var
        "--mx": "50%",
        "--my": "50%",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(56rem circle at var(--mx) var(--my), oklch(0.78 0.13 220 / 0.16), transparent 68%)",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
