import type { TemplateEntry } from './registry'

const SITE_NAME = 'PiCode Education'

interface ContactNotificationProps {
  name?: string
  role?: string
  email?: string
  phone?: string
  school?: string
  message?: string
  submittedAt?: string
}

const ContactNotificationEmail = ({
  name = '—',
  role = '—',
  email = '—',
  phone = '—',
  school = '—',
  message = '—',
  submittedAt,
}: ContactNotificationProps) => (
  <html lang="pt-BR" dir="ltr">
    <head>
      <meta charSet="utf-8" />
      <title>Novo contato pelo site</title>
    </head>
    <body style={main}>
      <div style={{ display: 'none', overflow: 'hidden', lineHeight: 1, opacity: 0, maxHeight: 0, maxWidth: 0 }}>
        Novo contato pelo site — {name} ({school})
      </div>
      <div style={container}>
        <div style={brandBar}>
          <p style={brandText}>{SITE_NAME}</p>
        </div>

        <div style={contentSection}>
          <h1 style={h1}>Novo contato pelo site</h1>
          <p style={subtitle}>
            Um lead acabou de preencher o formulário em picode.com.br
          </p>

          <hr style={divider} />

          <div style={fieldRow}>
            <p style={label}>Nome</p>
            <p style={value}>{name}</p>
          </div>

          <div style={fieldRow}>
            <p style={label}>Cargo</p>
            <p style={value}>{role}</p>
          </div>

          <div style={fieldRow}>
            <p style={label}>Escola</p>
            <p style={value}>{school}</p>
          </div>

          <div style={fieldRow}>
            <p style={label}>E-mail</p>
            <p style={value}>{email}</p>
          </div>

          <div style={fieldRow}>
            <p style={label}>Telefone</p>
            <p style={value}>{phone}</p>
          </div>

          <hr style={divider} />

          <div style={messageBlock}>
            <p style={label}>Mensagem</p>
            <p style={messageText}>{message}</p>
          </div>

          {submittedAt ? (
            <p style={timestamp}>Recebido em {submittedAt}</p>
          ) : null}
        </div>

        <div style={footer}>
          <p style={footerText}>
            Esta é uma notificação automática do site da {SITE_NAME}.
          </p>
        </div>
      </div>
    </body>
  </html>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Novo contato — ${data?.name ?? 'Sem nome'} (${data?.school ?? 'Escola não informada'})`,
  to: 'piovani@picode.com.br',
  displayName: 'Notificação de contato (time)',
  previewData: {
    name: 'Maria Silva',
    role: 'Coordenadora pedagógica',
    email: 'maria@escolaexemplo.com.br',
    phone: '(11) 99999-9999',
    school: 'Escola Exemplo',
    message: 'Gostaríamos de uma proposta para 6º ao 9º ano, cerca de 240 alunos.',
    submittedAt: '19/04/2026 às 15:32',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  margin: 0,
  padding: 0,
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '0',
}

const brandBar = {
  backgroundColor: '#0a1f44',
  padding: '24px 32px',
  borderRadius: '12px 12px 0 0',
}

const brandText = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 700 as const,
  letterSpacing: '0.02em',
  margin: 0,
}

const contentSection = {
  padding: '32px',
  backgroundColor: '#ffffff',
  border: '1px solid #e5e9f2',
  borderTop: 'none',
}

const h1 = {
  color: '#0a1f44',
  fontSize: '24px',
  fontWeight: 700 as const,
  lineHeight: '1.2',
  margin: '0 0 8px',
}

const subtitle = {
  color: '#5b6b8a',
  fontSize: '14px',
  margin: '0 0 24px',
}

const divider = {
  borderColor: '#e5e9f2',
  margin: '24px 0',
}

const fieldRow = {
  margin: '0 0 16px',
}

const label = {
  color: '#5b6b8a',
  fontSize: '11px',
  fontWeight: 600 as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  margin: '0 0 4px',
}

const value = {
  color: '#0a1f44',
  fontSize: '15px',
  fontWeight: 500 as const,
  margin: 0,
}

const messageBlock = {
  backgroundColor: '#f4f7fc',
  padding: '16px 20px',
  borderRadius: '8px',
  borderLeft: '3px solid #2563eb',
}

const messageText = {
  color: '#0a1f44',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
}

const timestamp = {
  color: '#8b95a8',
  fontSize: '12px',
  margin: '24px 0 0',
}

const footer = {
  padding: '16px 32px',
  textAlign: 'center' as const,
  backgroundColor: '#f4f7fc',
  borderRadius: '0 0 12px 12px',
  border: '1px solid #e5e9f2',
  borderTop: 'none',
}

const footerText = {
  color: '#8b95a8',
  fontSize: '12px',
  margin: 0,
}
