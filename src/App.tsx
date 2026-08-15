import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutesClient } from "./AppRoutesClient";
import { AppShell } from "./AppShell";
import { TrailingSlashRedirect } from "./components/TrailingSlashRedirect";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <AppShell queryClient={queryClient}>
      <BrowserRouter>
        <TrailingSlashRedirect />
        <AppRoutesClient />
      </BrowserRouter>
    </AppShell>
  </HelmetProvider>
);

export default App;
