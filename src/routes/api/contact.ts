import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'
import { renderEmailHtml, renderEmailPlainText } from '@/lib/email/render'
import { TEMPLATES } from '@/lib/email-templates/registry'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório').max(120),
  role: z.string().trim().min(1, 'Cargo é obrigatório').max(120),
  email: z.string().trim().email('E-mail inválido').max(200),
  phone: z.string().trim().min(6, 'Telefone inválido').max(40),
  school: z.string().trim().min(1, 'Escola é obrigatória').max(200),
  message: z.string().trim().min(1, 'Mensagem é obrigatória').max(4000),
})

// Email infra constants (must match send-transactional-email route)
const SITE_NAME = 'site-picode'
const SENDER_DOMAIN = 'notify.picode.com.br'
const FROM_DOMAIN = 'picode.com.br'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          console.error('Missing required environment variables')
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = contactSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json(
            { error: 'Validation failed', details: parsed.error.flatten() },
            { status: 400 },
          )
        }

        const data = parsed.data
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const { data: inserted, error: insertError } = await supabase
          .from('contact_submissions')
          .insert({
            name: data.name,
            role: data.role,
            email: data.email,
            phone: data.phone,
            school: data.school,
            message: data.message,
          })
          .select('id, created_at')
          .single()

        if (insertError || !inserted) {
          console.error('Failed to insert contact submission', { error: insertError })
          return Response.json({ error: 'Failed to save submission' }, { status: 500 })
        }

        // Format timestamp in Brazil timezone
        const submittedAt = new Date(inserted.created_at).toLocaleString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        // Render and enqueue the notification email DIRECTLY (no self-fetch — that causes Cloudflare 522).
        try {
          const templateName = 'contact-notification'
          const template = TEMPLATES[templateName]
          if (!template) throw new Error(`Template '${templateName}' not registered`)

          const recipient = template.to
          if (!recipient) throw new Error('Template missing fixed recipient')

          const messageId = crypto.randomUUID()
          const idempotencyKey = `contact-notify-${inserted.id}`
          const templateData = {
            name: data.name,
            role: data.role,
            email: data.email,
            phone: data.phone,
            school: data.school,
            message: data.message,
            submittedAt,
          }

          // Suppression check
          const { data: suppressed } = await supabase
            .from('suppressed_emails')
            .select('id')
            .eq('email', recipient.toLowerCase())
            .maybeSingle()

          if (suppressed) {
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: recipient,
              status: 'suppressed',
            })
            return Response.json({ success: true, id: inserted.id })
          }

          // Get or create unsubscribe token
          const normalizedEmail = recipient.toLowerCase()
          let unsubscribeToken: string

          const { data: existingToken } = await supabase
            .from('email_unsubscribe_tokens')
            .select('token, used_at')
            .eq('email', normalizedEmail)
            .maybeSingle()

          if (existingToken && !existingToken.used_at) {
            unsubscribeToken = existingToken.token
          } else {
            unsubscribeToken = generateToken()
            await supabase
              .from('email_unsubscribe_tokens')
              .upsert(
                { token: unsubscribeToken, email: normalizedEmail },
                { onConflict: 'email', ignoreDuplicates: true },
              )
            const { data: storedToken } = await supabase
              .from('email_unsubscribe_tokens')
              .select('token')
              .eq('email', normalizedEmail)
              .maybeSingle()
            if (storedToken?.token) unsubscribeToken = storedToken.token
          }

          const element = React.createElement(template.component, templateData)
          const html = await renderEmailHtml(element)
          const plainText = renderEmailPlainText(html)

          const resolvedSubject =
            typeof template.subject === 'function'
              ? template.subject(templateData)
              : template.subject

          // Log pending
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: templateName,
            recipient_email: recipient,
            status: 'pending',
          })

          // Enqueue
          const { error: enqueueError } = await supabase.rpc('enqueue_email', {
            queue_name: 'transactional_emails',
            payload: {
              message_id: messageId,
              to: recipient,
              from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
              sender_domain: SENDER_DOMAIN,
              subject: resolvedSubject,
              html,
              text: plainText,
              purpose: 'transactional',
              label: templateName,
              idempotency_key: idempotencyKey,
              unsubscribe_token: unsubscribeToken,
              queued_at: new Date().toISOString(),
            },
          })

          if (enqueueError) {
            console.error('Failed to enqueue contact notification', {
              error: enqueueError,
              submissionId: inserted.id,
            })
            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: templateName,
              recipient_email: recipient,
              status: 'failed',
              error_message: 'Failed to enqueue email',
            })
          }
        } catch (err) {
          console.error('Error preparing contact notification email', {
            error: err instanceof Error ? err.message : err,
            submissionId: inserted.id,
          })
          // Non-fatal: submission persisted.
        }

        return Response.json({ success: true, id: inserted.id })
      },
    },
  },
})
