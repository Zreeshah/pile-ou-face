import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  Lancer une pièce
                </Link>
              </li>
              <li>
                <Link 
                  to="/comment-lancer-piece-en-ligne" 
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  Comment lancer une pièce en ligne
                </Link>
              </li>
              <li>
                <Link 
                  to="/a-propos" 
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Keywords/SEO */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Pile ou Face</h3>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>✓ Pile ou face en ligne</li>
              <li>✓ Simulateur pile ou face</li>
              <li>✓ Lancer une pièce gratuit</li>
              <li>✓ Jeu pile ou face</li>
              <li>✓ 100% aléatoire</li>
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
