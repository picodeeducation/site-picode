/**
 * Divisor SVG simples e contínuo entre seções.
 * IMPORTANTE: use o MESMO `fill` da cor da próxima seção para que não apareça
 * uma "linha" ou faixa de cor diferente entre os blocos.
 */
export function Wave({
  variant = "bottom",
  className = "",
  fill = "var(--background)",
  baseFill = "transparent",
  flip = false,
}: {
  variant?: "top" | "bottom";
  className?: string;
  fill?: string;
  baseFill?: string;
  flip?: boolean;
}) {
  // Curva muito sutil — quase uma linha levemente arqueada, sem efeito "sugado".
  // `baseFill` pinta a área transparente do SVG com a cor da seção anterior,
  // evitando faixas/brancos entre blocos.
  const path =
    variant === "bottom"
      ? "M0,0 C480,28 960,28 1440,0 L1440,40 L0,40 Z"
      : "M0,40 C480,12 960,12 1440,40 L1440,0 L0,0 Z";

  return (
    <div
      className={`pointer-events-none block w-full ${className}`}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        lineHeight: 0,
        marginTop: -1,
        marginBottom: -1,
        background: baseFill,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="block h-[28px] w-full md:h-[40px]"
      >
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
