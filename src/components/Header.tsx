import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

const nav = [
  { to: "/", label: "Início" },
  { to: "/solucoes", label: "Soluções" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Logo variant="dark" />

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-foreground/[0.04] border border-foreground/5">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-full"
              activeProps={{
                className:
                  "px-4 py-1.5 text-sm font-medium rounded-full bg-background text-foreground shadow-sm",
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href="https://hub.picode.com.br" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" className="font-medium">
              Entrar
            </Button>
          </a>
          <Link to="/contato">
            <Button
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-5 shadow-glow"
            >
              Fale conosco
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-accent"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="md:hidden fixed inset-0 top-[64px] z-[-1] bg-foreground/10 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        </>
      )}
      {open && (
        <div className="md:hidden absolute right-3 left-3 top-full mt-2 rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-elegant overflow-hidden">
          <nav className="flex flex-col p-3 gap-1.5">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="group relative flex items-center justify-between rounded-2xl border border-transparent bg-foreground/[0.02] px-4 py-3 text-sm font-semibold text-foreground/80 transition-all hover:border-primary/20 hover:bg-primary/[0.06] hover:text-foreground hover:translate-x-1"
                activeProps={{
                  className:
                    "relative flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/[0.08] px-4 py-3 text-sm font-semibold text-foreground shadow-sm",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}

            <div className="my-2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <a
              href="https://hub.picode.com.br"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-accent transition-colors"
            >
              Entrar
            </a>
            <Link to="/contato" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-2xl bg-gradient-blue text-white font-semibold h-11 shadow-glow hover:shadow-[0_18px_40px_-12px_oklch(0.55_0.2_255_/_0.55)] hover:-translate-y-0.5 transition-all">
                Fale conosco
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
