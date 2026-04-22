import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PathLines } from "@/components/PathLines";
import { DotsField } from "@/components/DotsField";
import { SpotlightHero } from "@/components/SpotlightHero";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — PiCode Education" },
      { name: "description", content: "Fale com a PiCode Education. Receba uma proposta personalizada para sua escola e descubra como começar." },
      { property: "og:title", content: "Fale com a PiCode" },
      { property: "og:description", content: "Solicite uma proposta personalizada para sua escola." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
              Fale conosco
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[0.98] tracking-tight">
              Vamos transformar <br /><span className="text-gradient-blue">sua escola juntos</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conte um pouco sobre sua escola e vamos preparar uma proposta personalizada para você.
            </p>
          </div>
        </SpotlightHero>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </section>

      <section className="relative py-24 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_80%_-10%,oklch(0.9_0.06_240/0.35),transparent_60%),radial-gradient(50rem_35rem_at_-10%_110%,oklch(0.92_0.05_220/0.30),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <aside className="lg:col-span-2 lg:sticky lg:top-28 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15 text-[11px] font-semibold uppercase tracking-[0.18em] font-mono-display">
                Contato direto
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Outras formas <br /><span className="text-gradient-blue">de falar com a gente</span>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Prefere algo mais rápido? Estamos disponíveis nos canais abaixo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/5515981329879"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border bg-card/60 backdrop-blur-xl px-4 text-sm font-semibold hover:border-primary/40 hover:bg-primary/[0.04] transition-colors shadow-card"
              >
                <MessageCircle className="h-4 w-4 text-[#1faa55]" strokeWidth={2.4} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:contato@picode.com.br"
                className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border bg-card/60 backdrop-blur-xl px-4 text-sm font-semibold hover:border-primary/40 hover:bg-primary/[0.04] transition-colors shadow-card"
              >
                <Mail className="h-4 w-4 text-primary" strokeWidth={2.4} />
                <span>E-mail</span>
              </a>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 md:p-10 shadow-elegant">
              <div aria-hidden className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-40 -z-10 blur-xl" />
              {sent ? (
                <div className="py-20 text-center">
                  <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight">Mensagem enviada!</h3>
                  <p className="mt-2 text-muted-foreground">Em breve nosso time entrará em contato.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/15 text-[11px] font-semibold uppercase tracking-[0.18em] font-mono-display">
                      Formulário
                    </span>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">
                      Conte sobre sua escola
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Resposta personalizada em até 1 dia útil.
                    </p>
                  </div>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const data = new FormData(form);
                      const payload = {
                        name: ((data.get("name") as string) ?? "").trim(),
                        role: ((data.get("role") as string) ?? "").trim(),
                        email: ((data.get("email") as string) ?? "").trim(),
                        phone: ((data.get("phone") as string) ?? "").trim(),
                        school: ((data.get("school") as string) ?? "").trim(),
                        message: ((data.get("msg") as string) ?? "").trim(),
                      };

                      if (
                        !payload.name ||
                        !payload.role ||
                        !payload.email ||
                        !payload.phone ||
                        !payload.school ||
                        !payload.message
                      ) {
                        toast.error("Por favor, preencha todos os campos antes de enviar.");
                        return;
                      }

                      if (submitting) return;
                      setSubmitting(true);
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });
                        if (!res.ok) {
                          const err = await res.json().catch(() => ({}));
                          if (res.status === 400 && err?.details?.fieldErrors) {
                            const first = Object.values(err.details.fieldErrors)[0] as string[] | undefined;
                            toast.error(first?.[0] ?? "Verifique os dados e tente novamente.");
                          } else {
                            toast.error("Não foi possível enviar agora. Tente novamente em instantes.");
                          }
                          return;
                        }
                        setSent(true);
                      } catch {
                        toast.error("Erro de conexão. Verifique sua internet e tente novamente.");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nome</Label>
                        <Input id="name" name="name" required placeholder="Seu nome completo" className="mt-2 h-11 bg-background/60" />
                      </div>
                      <div>
                        <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cargo</Label>
                        <Input id="role" name="role" required placeholder="Diretor, coordenador..." className="mt-2 h-11 bg-background/60" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">E-mail</Label>
                        <Input id="email" name="email" type="email" required placeholder="voce@escola.com.br" className="mt-2 h-11 bg-background/60" />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Telefone</Label>
                        <Input id="phone" name="phone" required placeholder="(11) 90000-0000" className="mt-2 h-11 bg-background/60" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="school" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Escola</Label>
                      <Input id="school" name="school" required placeholder="Nome da instituição" className="mt-2 h-11 bg-background/60" />
                    </div>
                    <div>
                      <Label htmlFor="msg" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Como podemos ajudar?</Label>
                      <Textarea id="msg" name="msg" required rows={5} placeholder="Conte um pouco sobre o seu projeto, número de alunos, séries..." className="mt-2 bg-background/60 resize-none" />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="group relative w-full overflow-hidden bg-gradient-blue text-white shadow-glow h-12 rounded-xl font-semibold transition-all duration-300 hover:shadow-[0_18px_40px_-12px_oklch(0.55_0.2_255_/_0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-90 disabled:cursor-wait"
                    >
                      <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                      <span className="relative inline-flex items-center justify-center">
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensagem
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                    <p className="text-[11px] text-center text-muted-foreground">
                      Ao enviar, você concorda em receber um retorno do nosso time comercial.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
