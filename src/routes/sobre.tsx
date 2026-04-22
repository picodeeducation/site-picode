import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Globe, Zap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { PathLines } from "@/components/PathLines";
import { DotsField } from "@/components/DotsField";
import { SpotlightHero } from "@/components/SpotlightHero";
import studentsImg from "@/assets/students-collab-updated.jpg";
import foguete3d from "@/assets/foguete-3d.png";
import partnerWadhwani from "@/assets/partner-wadhwani.webp";
import partnerAws from "@/assets/partner-aws-edstart.png";
import partnerAnjos from "@/assets/partner-anjos.png";
import partnerCriabiz from "@/assets/partner-criabiz.png";

const partners = [
  { src: partnerWadhwani, alt: "Wadhwani Foundation" },
  { src: partnerAws, alt: "AWS EdStart Member" },
  { src: partnerAnjos, alt: "Anjos do Brasil" },
  { src: partnerCriabiz, alt: "CriaBiz Ventures" },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — PiCode Education" },
      { name: "description", content: "Conheça a PiCode Education: missão, valores e história de uma EdTech brasileira que leva pensamento computacional para escolas." },
      { property: "og:title", content: "Sobre a PiCode Education" },
      { property: "og:description", content: "EdTech brasileira reconhecida pelo InovAtiva como destaque na América Latina." },
    ],
  }),
  component: SobrePage,
});

const valores = [
  { icon: Heart, title: "Inclusão", desc: "Educação tecnológica para toda escola — pública ou privada, em qualquer região do Brasil." },
  { icon: Zap, title: "Inovação", desc: "Atualizamos métodos e ferramentas no ritmo em que a tecnologia evolui." },
  { icon: Globe, title: "Impacto", desc: "Cada projeto entregue é uma criança a mais preparada para o futuro." },
];

function SobrePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background text-foreground">
        <DotsField />
        <div className="absolute top-[5%] right-[-8%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift" style={{ background: "oklch(0.7 0.2 245 / 0.14)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] h-[460px] w-[460px] rounded-full blur-3xl animate-drift-reverse" style={{ background: "oklch(0.55 0.2 255 / 0.10)" }} />
        <SpotlightHero className="relative">
          <PathLines className="opacity-40" />
          <motion.img
            src={foguete3d}
            alt="Foguete PiCode"
            initial={{ opacity: 0, y: 30, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block absolute right-[14%] top-44 w-24 lg:w-28 drop-shadow-2xl animate-float pointer-events-none select-none z-20"
          />
          <motion.img
            src={foguete3d}
            alt=""
            aria-hidden
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:hidden absolute right-6 top-28 w-16 drop-shadow-2xl animate-float pointer-events-none select-none z-20"
          />
          <div className="relative mx-auto max-w-5xl px-6 pt-32 md:pt-40 pb-20 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/15 text-[11px] font-semibold uppercase tracking-[0.18em] font-mono-display">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Sobre nós
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.98] tracking-tight">
              Educação que <span className="text-gradient-blue">evolui com o mundo</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Somos uma EdTech brasileira que acredita em uma educação transformadora, inclusiva e conectada com o futuro. Cada solução nossa carrega esses valores.
            </p>
          </div>
        </SpotlightHero>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant"
          >
            <img src={studentsImg} alt="Estudantes em projeto de robótica" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Nossa missão"
              title={<>Levar tecnologia <span className="text-gradient-blue">para toda sala de aula</span></>}
              description="Acreditamos que pensamento computacional é tão fundamental quanto ler e escrever. Nossa missão é dar às escolas as ferramentas, o conteúdo, o apoio e a tranquilidade para tornar isso realidade."
            />
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border p-4">
                <p className="font-display text-3xl font-bold text-gradient-blue">+50 mil</p>
                <p className="text-xs text-muted-foreground mt-1">alunos impactados</p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="font-display text-3xl font-bold text-gradient-blue">+1000</p>
                <p className="text-xs text-muted-foreground mt-1">professores formados</p>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="font-display text-3xl font-bold text-gradient-blue">22</p>
                <p className="text-xs text-muted-foreground mt-1">Estados + DF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[oklch(0.97_0.01_260)] dark:bg-secondary">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Nossos valores"
            title={<>O que nos <span className="text-gradient-blue">move</span></>}
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {valores.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-card border border-border p-8 shadow-card"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-blue text-white shadow-glow">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold uppercase">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight">
            <span className="block text-foreground">Reconhecida pelo InovAtiva como</span>
            <span className="block text-gradient-blue">Destaque na América Latina</span>
          </h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
            {partners.map((p) => (
              <div key={p.alt} className="flex items-center justify-center h-20">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="max-h-16 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
          <Link to="/contato">
            <Button size="lg" className="mt-10 bg-gradient-blue text-white shadow-glow h-12 px-6">
              Quero levar para minha escola <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
