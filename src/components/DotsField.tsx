import { useEffect, useRef } from "react";

/**
 * Campo de pontos sutis ao fundo, que reagem ao mouse com leve atração/parallax.
 * Inspiração: hero do antigravity.google. Canvas leve, ~120 pontos.
 */
export function DotsField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Dot = { x: number; y: number; ox: number; oy: number; r: number; phase: number };
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let t = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // distribuição em grid com pequeno jitter
      const gap = 42;
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + (j % 2 ? gap / 2 : 0);
          const y = j * gap;
          dots.push({
            x,
            y,
            ox: x,
            oy: y,
            r: 1.1 + Math.random() * 0.9,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const radius = 160;
      const radius2 = radius * radius;

      for (const d of dots) {
        // breathing leve
        const breathe = reduced ? 0 : Math.sin(t + d.phase) * 1.2;
        let tx = d.ox;
        let ty = d.oy + breathe;

        if (mouse.active) {
          const dx = tx - mouse.x;
          const dy = ty - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < radius2) {
            const dist = Math.sqrt(dist2) || 1;
            const force = (1 - dist / radius) * 14;
            tx += (dx / dist) * force;
            ty += (dy / dist) * force;
          }
        }

        // distância p/ mouse para tingir cor
        let alpha = 0.22;
        let color = "120, 145, 200"; // azul acinzentado base
        if (mouse.active) {
          const dx = tx - mouse.x;
          const dy = ty - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius) {
            const k = 1 - dist / radius;
            alpha = 0.22 + k * 0.55;
            color = "59, 130, 246"; // brand blue
          }
        }

        ctx.beginPath();
        ctx.arc(tx, ty, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
