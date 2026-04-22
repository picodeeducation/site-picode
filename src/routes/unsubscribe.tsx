import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [
      { title: 'Cancelar inscrição — PiCode Education' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: UnsubscribePage,
})

type Status =
  | 'loading'
  | 'ready'
  | 'already'
  | 'invalid'
  | 'submitting'
  | 'success'
  | 'error'

function UnsubscribePage() {
  const [status, setStatus] = useState<Status>('loading')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')
    if (!t) {
      setStatus('invalid')
      return
    }
    setToken(t)
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then(async (res) => {
        if (!res.ok) {
          setStatus('invalid')
          return
        }
        const data = await res.json()
        if (data.valid === false && data.reason === 'already_unsubscribed') {
          setStatus('already')
        } else if (data.valid) {
          setStatus('ready')
        } else {
          setStatus('invalid')
        }
      })
      .catch(() => setStatus('invalid'))
  }, [])

  const handleConfirm = async () => {
    if (!token) return
    setStatus('submitting')
    try {
      const res = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (res.ok && (data.success || data.reason === 'already_unsubscribed')) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 md:p-10 shadow-elegant text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Verificando link…</p>
          </>
        )}

        {status === 'ready' && (
          <>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Cancelar inscrição
            </h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Ao confirmar, você não receberá mais e-mails da PiCode Education
              neste endereço.
            </p>
            <Button
              onClick={handleConfirm}
              size="lg"
              className="mt-6 w-full bg-gradient-blue text-white shadow-glow h-12 rounded-xl font-semibold"
            >
              Confirmar cancelamento
            </Button>
          </>
        )}

        {status === 'submitting' && (
          <>
            <Loader2 className="mx-auto h-10 w-10 text-primary animate-spin" />
            <p className="mt-4 text-muted-foreground">Processando…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Inscrição cancelada
            </h1>
            <p className="mt-2 text-muted-foreground">
              Você não receberá mais e-mails neste endereço.
            </p>
          </>
        )}

        {status === 'already' && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Já cancelado
            </h1>
            <p className="mt-2 text-muted-foreground">
              Este endereço já está descadastrado.
            </p>
          </>
        )}

        {status === 'invalid' && (
          <>
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Link inválido
            </h1>
            <p className="mt-2 text-muted-foreground">
              Este link de cancelamento é inválido ou expirou.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Algo deu errado
            </h1>
            <p className="mt-2 text-muted-foreground">
              Não conseguimos processar seu pedido. Tente novamente em instantes.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
