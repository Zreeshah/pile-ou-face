import { CoinFlip } from "@/components/CoinFlip";
import { FAQ } from "@/components/FAQ";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Target, Zap, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instantané",
    description: "Résultat immédiat à chaque lancer, sans temps de chargement.",
  },
  {
    icon: Shield,
    title: "100% Aléatoire",
    description: "Algorithme équitable garantissant 50% de chances pour chaque face.",
  },
  {
    icon: Smartphone,
    title: "Multi-appareils",
    description: "Fonctionne parfaitement sur mobile, tablette et ordinateur.",
  },
  {
    icon: Target,
    title: "Simple à utiliser",
    description: "Un clic suffit pour lancer la pièce et obtenir votre résultat.",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Pile ou Face en Ligne - Simulateur Gratuit"
        description="Lancez une pièce en ligne gratuitement ! Notre simulateur pile ou face vous donne un résultat aléatoire instantanément. Pile ou face, faites votre choix."
        canonicalUrl="/"
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Pile ou Face en Ligne - Simulateur Gratuit"
        description="Lancez une pièce en ligne gratuitement avec notre simulateur pile ou face."
        url="/"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Pile ou Face en Ligne
              <span className="block text-primary mt-2">Simulateur Gratuit</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up">
              Lancez une pièce virtuelle et obtenez un résultat aléatoire instantanément. 
              Simple, rapide et 100% gratuit.
            </p>

            {/* Coin Flip Component */}
            <div className="relative card-glass p-8 md:p-12 max-w-lg mx-auto animate-scale-in">
              <CoinFlip />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Pourquoi utiliser notre simulateur ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Le moyen le plus simple de lancer une pièce en ligne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-glass p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informational Content */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Qu'est-ce que le Pile ou Face ?
            </h2>

            <div className="prose prose-lg max-w-none">
              <div className="card-glass p-8 mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">
                  L'histoire du pile ou face
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Le <strong>pile ou face</strong> est l'un des jeux de hasard les plus anciens au monde. 
                  Utilisé depuis l'Antiquité romaine, ce jeu simple consiste à lancer une pièce de monnaie 
                  en l'air et à deviner sur quelle face elle retombera. Le terme "pile" désigne traditionnellement 
                  le côté de la pièce montrant un chiffre, tandis que "face" représente le côté avec une effigie.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Aujourd'hui, le <strong>jeu pile ou face</strong> reste un moyen populaire et équitable 
                  de prendre des décisions aléatoires ou de départager deux options.
                </p>
              </div>

              <div className="card-glass p-8 mb-8">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Utilisations courantes du pile ou face
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Sports :</strong> Déterminer quelle équipe engage ou choisit son camp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Décisions quotidiennes :</strong> Choisir entre deux options (restaurant, film, activité)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Jeux :</strong> Déterminer qui commence ou départager des joueurs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Divertissement :</strong> S'amuser avec le hasard et tester sa chance</span>
                  </li>
                </ul>
              </div>

              <div className="card-glass p-8">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Pourquoi un simulateur pile ou face en ligne ?
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Notre <strong>simulateur pile ou face</strong> vous permet de <strong>lancer une pièce en ligne</strong> 
                  sans avoir besoin d'une vraie pièce de monnaie. C'est pratique, rapide et accessible depuis 
                  n'importe quel appareil connecté à internet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Que vous cherchiez à <strong>lancer une pièce</strong> pour prendre une décision importante 
                  ou simplement pour vous amuser, notre outil est gratuit et disponible 24h/24.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Prêt à lancer ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Faites défiler vers le haut et lancez votre pièce dès maintenant !
            </p>
            <a
              href="#top"
              className="btn-flip inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              🪙 Lancer la pièce
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
