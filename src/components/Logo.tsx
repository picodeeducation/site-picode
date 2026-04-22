import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/logo-picode-dark.svg";
import logoWhite from "@/assets/logo-picode-white.svg";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const src = variant === "light" ? logoWhite : logoDark;
  return (
    <Link to="/" className="flex items-center group" aria-label="PiCode Education">
      <img
        src={src}
        alt="PiCode Education"
        className="h-9 w-auto transition-transform group-hover:scale-[1.03]"
      />
    </Link>
  );
}
