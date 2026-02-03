import { CoinFlip } from "@/components/CoinFlip";
import { FAQ } from "@/components/FAQ";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { CheckCircle, History, Users, Lightbulb } from "lucide-react";

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
      <section className="relative py-16 md:py-24 overflow-hidden" id="top">
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

      {/* Section 1: Introduction */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Pile ou Face : lancez une pièce en ligne instantanément
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Bienvenue sur notre <strong>simulateur pile ou face en ligne</strong>, un outil simple, rapide et fiable pour lancer une pièce et obtenir un résultat totalement aléatoire : <strong>pile ou face</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Que ce soit pour prendre une décision, jouer, départager deux choix ou simplement vous amuser, notre <strong>jeu pile ou face</strong> est accessible gratuitement, sans inscription, depuis n'importe quel appareil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Comment ça fonctionne */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Pile ou face en ligne : comment ça fonctionne ?
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Notre <strong>pile ou face simulateur</strong> reproduit le principe réel d'un lancer de pièce. En un seul clic sur le bouton « Lancer la pièce », l'algorithme génère un résultat aléatoire avec une probabilité de 50/50, exactement comme dans la réalité.
              </p>
              <div className="bg-primary/10 rounded-lg p-4 my-6">
                <p className="text-foreground font-medium text-center">
                  👉 Aucun trucage, aucun biais : chaque lancer de pièce est indépendant du précédent.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Ce <strong>simulateur pile ou face</strong> est idéal lorsque vous n'avez pas de monnaie sous la main ou que vous souhaitez une réponse immédiate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Qu'est-ce que le jeu pile ou face */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Qu'est-ce que le jeu pile ou face ?
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Le <strong>jeu pile ou face</strong> est l'un des jeux de hasard les plus simples et les plus anciens au monde. Il consiste à lancer une pièce et à deviner quel côté sera visible après la chute.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">🔢</span> Pile
                  </h3>
                  <p className="text-muted-foreground">
                    Côté où figure généralement un chiffre
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">👤</span> Face
                  </h3>
                  <p className="text-muted-foreground">
                    Côté avec un symbole, un portrait ou un dessin
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ce principe universel est aussi connu sous différentes variantes orthographiques comme <strong>pike ou face</strong>, souvent recherchée en ligne.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Pourquoi utiliser un simulateur */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Pourquoi utiliser un simulateur pile ou face en ligne ?
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Utiliser un <strong>pile ou face en ligne</strong> présente de nombreux avantages :
              </p>
              <ul className="grid gap-3 mb-8">
                {[
                  "Résultat instantané",
                  "Aucun objet nécessaire",
                  "Fonctionne sur mobile, tablette et ordinateur",
                  "100 % gratuit",
                  "Parfait pour les décisions rapides",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Notre <strong>jeu pile face</strong> est souvent utilisé pour :
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Choisir entre deux options",
                  "Décider qui commence un jeu",
                  "Départager deux personnes",
                  "S'amuser entre amis ou en famille",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Lancer une pièce pour prendre une décision */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Lancer une pièce pour prendre une décision
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Vous hésitez entre deux choix ? <strong>Lancer une pièce</strong> est une méthode simple et efficace pour avancer sans stress. Le <strong>pile ou face</strong> est souvent utilisé dans la vie quotidienne pour trancher des décisions anodines, mais aussi dans des situations plus symboliques.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Grâce à notre <strong>pile ou face simulateur</strong>, vous pouvez <strong>lancer une pièce en ligne</strong> à tout moment, sans attendre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Jouer à plusieurs */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              Peut-on jouer à pile ou face à plusieurs joueurs ?
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Traditionnellement, le <strong>jeu pile ou face</strong> se joue à deux. Cependant, lorsqu'il y a plus de participants, une alternative consiste à utiliser des outils aléatoires adaptés (comme des dés virtuels à plusieurs faces).
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Notre plateforme se concentre sur l'expérience <strong>pile ou face en ligne</strong>, mais reste idéale pour toutes les situations à deux choix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Le saviez-vous */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center flex items-center justify-center gap-3">
              <Lightbulb className="w-8 h-8 text-primary" />
              Le saviez-vous ? 🪙
            </h2>
            <div className="card-glass p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏆</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Il existe des <strong>compétitions de lancer de pièce</strong> chronométrées dans certains pays
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚽</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Le <strong>pile ou face</strong> est parfois utilisé dans le sport pour décider qui commence un match
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📜</span>
                  <p className="text-muted-foreground leading-relaxed">
                    Certains tirages officiels ont été décidés par <strong>pile ou face</strong>
                  </p>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6 pt-6 border-t border-border">
                Ce jeu, aussi simple soit-il, reste profondément ancré dans la culture populaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: L'histoire du pile ou face */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center flex items-center justify-center gap-3">
              <History className="w-8 h-8 text-primary" />
              L'histoire du pile ou face
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Le <strong>pile ou face</strong> trouve ses origines dans l'Antiquité. Dans la Rome antique, ce jeu était connu sous le nom de "<em>capitis et cauda</em>" (tête et queue). Il servait déjà à résoudre des désaccords de manière équitable.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Au fil des siècles, le <strong>jeu pile ou face</strong> a été mentionné dans la littérature, notamment chez Shakespeare et Jane Austen. Aujourd'hui encore, il demeure un symbole universel de hasard et de décision impartiale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Essayez notre pile ou face simulateur maintenant
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-8">
              Prêt à tenter votre chance ? Cliquez sur « Lancer la pièce » et découvrez immédiatement le résultat.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-block px-8 py-4 bg-primary text-secondary font-semibold rounded-full hover:bg-primary/90 transition-colors text-lg"
            >
              🪙 Lancer la pièce
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
