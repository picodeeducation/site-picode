

## Problema
O preview está caindo porque o template de e-mail `src/lib/email-templates/contact-notification.tsx` importa `@react-email/body`, `@react-email/container`, etc., mas esses pacotes **não estão instalados**. Como `registry.ts` (e portanto `/api/contact`) carrega esse arquivo, o erro propaga e derruba o servidor.

```
Cannot find module '@react-email/body' imported from
src/lib/email-templates/contact-notification.tsx
```

## Solução
Substituir os componentes `@react-email/*` por **JSX puro com tags HTML nativas** (`<html>`, `<body>`, `<div>`, `<h1>`, etc.). Isso:

- Remove a dependência quebrada (sem precisar instalar nada).
- Mantém o e-mail funcionando exatamente igual — `renderToStaticMarkup` (já usado em `src/lib/email/render.ts`) gera o mesmo HTML inline.
- Preserva todos os estilos atuais (paleta da marca, layout, preview text).

## Arquivo alterado
- `src/lib/email-templates/contact-notification.tsx`
  - Trocar imports de `@react-email/*` por nada (usar tags HTML).
  - `<Html>` → `<html lang="pt-BR">`, `<Body>` → `<body>`, `<Container>/<Section>` → `<div>`, `<Heading>` → `<h1>`, `<Text>` → `<p>`, `<Hr>` → `<hr>`, `<Preview>` → `<div style={{display:'none'}}>`, `<Head>` → `<head><meta charSet="utf-8"/></head>`.
  - Estilos e estrutura permanecem idênticos.

Sem mudanças em registry, render, ou rota `/api/contact`.

