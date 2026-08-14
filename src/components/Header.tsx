import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/comment-lancer-piece-en-ligne", label: "Comment ça marche" },
  {
    label: "Outils",
    children: [
      { href: "/pile-ou-face-plusieurs-lancers", label: "Lancers multiples" },
      { href: "/de-en-ligne", label: "Dé en ligne" },
      { href: "/tirage-au-sort", label: "Tirage au sort" },
      { href: "/nombre-aleatoire", label: "Nombre aléatoire" },
    ],
  },
  { href: "/probabilite-pile-ou-face", label: "Probabilités" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex min-h-11 items-center gap-2 text-xl font-display font-bold text-foreground hover:text-primary transition-colors"
          >
            <img src={logo} alt="Pile ou Face" width="40" height="40" className="h-10 w-10 object-contain" />
            <span className="hidden sm:inline">Pile ou Face</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              if ("children" in link && link.children) {
                const isActive = link.children.some(c => location.pathname === c.href);
                return (
                  <li key={link.label} className="relative">
                    <button
                      onClick={() => setIsToolsOpen(!isToolsOpen)}
                      onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                      className={`nav-link flex items-center gap-1 ${
                        isActive ? "active text-foreground" : ""
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {isToolsOpen && (
                      <ul className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-lg py-2 min-w-[180px] animate-fade-in">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              onClick={() => setIsToolsOpen(false)}
                              className={`block px-4 py-2 text-sm hover:bg-muted transition-colors ${
                                location.pathname === child.href
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`nav-link ${
                      location.pathname === link.href ? "active text-foreground" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex min-h-11 min-w-11 items-center justify-center hover:bg-muted rounded-lg transition-colors"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if ("children" in link && link.children) {
                  return (
                    <li key={link.label}>
                      <span className="block px-4 py-2 text-sm font-medium text-muted-foreground">
                        {link.label}
                      </span>
                      <ul className="ml-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              onClick={() => setIsMenuOpen(false)}
                              className={`block px-4 py-2 rounded-lg transition-colors text-sm ${
                                location.pathname === child.href
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === link.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
