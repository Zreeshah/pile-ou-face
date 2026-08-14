import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient } from "@tanstack/react-query";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppRoutes } from "./AppRoutes";
import { AppShell } from "./AppShell";
import { publishedProbabilites, pathFor } from "./data/probabilites";
import { publishedDeRoutes } from "./data/des";
import "./index.css";

// Routes the prerender script must emit as static HTML. Meta is data-driven via
// <SEO>, so these carry no title — prerender falls back to the SSR Helmet head.
export const probabiliteRoutes = [
  { path: "/probabilite-pile-ou-face" },
  ...publishedProbabilites.map((p) => ({ path: pathFor(p.n, p.k) })),
];

// Dice cluster routes (single-face + multi-dice), same data-driven meta.
export const deRoutes = publishedDeRoutes;

export function render(url: string) {
  const queryClient = new QueryClient();
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppShell queryClient={queryClient}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppShell>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = `
    ${helmet?.title?.toString() ?? ""}
    ${helmet?.meta?.toString() ?? ""}
    ${helmet?.link?.toString() ?? ""}
  `;
  return { html, head };
}
