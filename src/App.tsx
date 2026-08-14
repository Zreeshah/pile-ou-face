import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutesClient } from "./AppRoutesClient";
import { AppShell } from "./AppShell";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <AppShell queryClient={queryClient}>
      <BrowserRouter>
        <AppRoutesClient />
      </BrowserRouter>
    </AppShell>
  </HelmetProvider>
);

export default App;
