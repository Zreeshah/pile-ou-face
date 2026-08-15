import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-display font-bold mb-4">
              Pile ou Face
            </Link>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Le simulateur de pile ou face en ligne le plus simple et rapide. 
              Prenez vos décisions facilement avec notre outil gratuit.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Outils</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Pile ou face
                </Link>
              </li>
              <li>
                <Link to="/pile-ou-face-plusieurs-lancers" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Lancers multiples
                </Link>
              </li>
              <li>
                <Link to="/de-en-ligne" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Dé en ligne
                </Link>
              </li>
              <li>
                <Link to="/tirage-au-sort" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Tirage au sort
                </Link>
              </li>
              <li>
                <Link to="/nombre-aleatoire" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Nombre aléatoire
                </Link>
              </li>
              <li>
                <Link to="/probabilite-pile-ou-face" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Probabilités
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Blog</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Tous les articles
                </Link>
              </li>
              <li>
                <Link to="/blog/histoire-pile-ou-face" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Histoire du pile ou face
                </Link>
              </li>
              <li>
                <Link to="/blog/probabilite-pile-ou-face" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Probabilité expliquée
                </Link>
              </li>
              <li>
                <Link to="/blog/pile-ou-face-50-50" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  50/50 : mythe ou réalité ?
                </Link>
              </li>
              <li>
                <Link to="/blog/sophisme-du-joueur" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                  Sophisme du joueur
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Pile ou Face</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>
                <Link to="/a-propos" className="hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/comment-lancer-piece-en-ligne" className="hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li className="pt-2 text-secondary-foreground/60">
                Simulateur gratuit et sans inscription
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
            <p>© {currentYear} pile-ouface.fr - Tous droits réservés</p>
            <p>
              Simulateur de pile ou face gratuit et sans inscription
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
