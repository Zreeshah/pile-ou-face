import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="Page non trouvée (404)"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        canonicalUrl={null}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl mb-6">🪙</div>
          <h1 className="mb-4 text-5xl font-display font-bold">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">
            Oups ! Cette page n'existe pas.
          </p>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            La pièce est tombée du mauvais côté... La page que vous cherchez 
            n'a pas été trouvée.
          </p>
          <Link 
            to="/" 
            className="btn-flip inline-block"
          >
            🏠 Retour à l'accueil
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
