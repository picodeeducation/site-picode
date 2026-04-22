import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[oklch(0.13_0.04_260)] text-white/80 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
              Soluções tecnológicas de pensamento computacional e robótica
              educacional para escolas que querem preparar alunos para o futuro.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Início</Link></li>
              <li><Link to="/solucoes" className="hover:text-white">Soluções</Link></li>
              <li><Link to="/sobre" className="hover:text-white">Sobre</Link></li>
              <li><Link to="/contato" className="hover:text-white">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>contato@picode.com.br</span></li>
              <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /><span>+55 (15) 98132-9879</span></li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Votorantim/SP, Brasil</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50">
          <p>© {new Date().getFullYear()} PiCode Education. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
