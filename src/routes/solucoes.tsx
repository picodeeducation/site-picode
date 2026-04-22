import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, Brain, Target, Award, ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { PathLines } from "@/components/PathLines";
import { DotsField } from "@/components/DotsField";
import { SpotlightHero } from "@/components/SpotlightHero";
import { TypewriterHeading } from "@/components/TypewriterHeading";

export const Route = createFileRoute("/solucoes")({
  head: () => ({
    meta: [
      { title: "Soluções — PiCode Education" },
      { name: "description", content: "Code Lab, Vision Lab, Estoque Maker, Trilhas BNCC: o ecossistema completo da PiCode para ensinar pensamento computacional." },
      { property: "og:title", content: "Soluções PiCode" },
      { property: "og:description", content: "Plataforma, kits e trilhas para levar pensamento computacional para sua escola." },
    ],
  }),
  component: SolucoesPage,
});

const products = [
  {
    name: "Code Lab",
    tag: "Plataforma",
    icon: Code2,
    gradient: "bg-gradient-blue",
    desc: "Ambiente moderno para alunos e professores organizarem projetos de programação em pastas, com compartilhamento e colaboração.",
    features: ["Projetos por turma", "Pastas compartilhadas", "Editor visual e por código", "Histórico de versões"],
  },
  {
    name: "Vision Lab",
    tag: "IA & Visão Computacional",
    icon: Brain,
    gradient: "bg-gradient-purple",
    desc: "Experimentos de inteligência artificial e visão computacional, prontos para a sala de aula, sem complicação técnica.",
    features: ["Modelos pré-treinados", "Câmera ao vivo", "Projetos guiados", "Integração com kits"],
  },
  {
    name: "Estoque Maker",
    tag: "Gestão de Hardware",
    icon: Target,
    gradient: "bg-gradient-green",
    desc: "Controle completo dos kits didáticos da escola: o que está em uso, com quem está, o que precisa repor.",
    features: ["Inventário em tempo real", "Empréstimos por aluno", "Alertas de reposição", "Relatórios"],
  },
  {
    name: "Trilhas BNCC",
    tag: "Currículo",
    icon: Award,
    gradient: "bg-gradient-red",
    desc: "Conteúdo de pensamento computacional alinhado à Base Nacional Comum, do Fundamental ao Ensino Médio.",
    features: ["Planos de aula prontos", "Avaliação por competências", "Material do professor", "Atividades imprimíveis"],
  },
];

function SolucoesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background text-foreground">
        <DotsField />
        <div className="absolute top-[5%] right-[-8%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift" style={{ background: "oklch(0.7 0.2 245 / 0.14)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] h-[460px] w-[460px] rounded-full blur-3xl animate-drift-reverse" style={{ background: "oklch(0.55 0.2 255 / 0.10)" }} />
        <SpotlightHero className="relative">
          <PathLines className="opacity-40" />
          <div className="relative mx-auto max-w-5xl px-6 pt-32 md:pt-40 pb-20 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/15 text-[11px] font-semibold uppercase tracking-[0.18em] font-mono-display">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Soluções
            </span>
            <TypewriterHeading
              phrases={[
                { prefix: "Um ecossistema ", highlight: "para ensinar tecnologia" },
                { prefix: "Um universo ", highlight: "de possibilidades digitais" },
              ]}
            />
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Quatro produtos integrados que cobrem do conteúdo à gestão dos kits — pensados para escolas que querem ir além da aula tradicional.
            </p>
          </div>
        </SpotlightHero>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className={`relative aspect-[4/3] rounded-3xl ${p.gradient} overflow-hidden shadow-elegant flex items-center justify-center`}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <p.icon className="relative h-32 w-32 text-white/90 drop-shadow-2xl" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold text-white uppercase tracking-wider">
                  {p.tag}
                </div>
              </div>
              <div>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{p.name}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contato">
                  <Button className="mt-8 bg-gradient-blue text-white shadow-glow">
                    Quero conhecer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
