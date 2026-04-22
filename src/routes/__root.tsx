import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gradient-blue">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold uppercase">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-blue px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Site - PiCode" },
      {
        name: "description",
        content:
          "Plataforma e kits de robótica que levam o pensamento computacional para a sala de aula. Soluções tecnológicas para escolas que preparam alunos para o futuro.",
      },
      { name: "author", content: "PiCode Education" },
      { property: "og:title", content: "Site - PiCode" },
      { property: "og:description", content: "PiCode Reimagined is a modern, sophisticated website showcasing computational thinking for schools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Site - PiCode" },
      { name: "description", content: "PiCode Reimagined is a modern, sophisticated website showcasing computational thinking for schools." },
      { name: "twitter:description", content: "PiCode Reimagined is a modern, sophisticated website showcasing computational thinking for schools." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b3e29468-a8ef-4a13-b479-95ede0476267/id-preview-6bb015d5--21c416c0-941f-4051-8bd8-4f58988b3f48.lovable.app-1776464151043.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b3e29468-a8ef-4a13-b479-95ede0476267/id-preview-6bb015d5--21c416c0-941f-4051-8bd8-4f58988b3f48.lovable.app-1776464151043.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
