import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { OrganizationSchema } from "./SEO";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <OrganizationSchema />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
