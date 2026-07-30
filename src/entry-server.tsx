import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./AppRoutes";
import { publishedProbabilites, pathFor } from "./data/probabilites";
import "./index.css";

// Routes the prerender script must emit as static HTML. Meta is data-driven via
// <SEO>, so these carry no title — prerender falls back to the SSR Helmet head.
export const probabiliteRoutes = [
  { path: "/probabilite-pile-ou-face" },
  ...publishedProbabilites.map((p) => ({ path: pathFor(p.n, p.k) })),
];

export function render(url: string) {
  const queryClient = new QueryClient();
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `;

  return { html, head };
}
