import { Links, Meta, ScrollRestoration, Scripts, Outlet } from "react-router";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import type { Route } from "./+types/root";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "NoteForge - Your Dev Note-Taking App" },
    {
      content:
        "NoteForge is a digital notebook that allows you to take notes, create notebooks, and more.",
      name: "description",
    },
  ];
};

export const loader = () => {
  const baseUrl = process.env.BASE_URL;
  return {
    clientEnv: {
      baseUrl,
    },
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang={"en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="vertical min-h-screen">
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </NuqsAdapter>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Outlet />
      <script
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: We set the window.env variable to the client env */
        dangerouslySetInnerHTML={{
          __html: `window.env = ${JSON.stringify(loaderData.clientEnv)}`,
        }}
      />
    </>
  );
}

declare global {
  interface Window {
    env: ReturnType<typeof loader>["clientEnv"];
  }
}
