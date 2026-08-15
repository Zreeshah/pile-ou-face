import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Heart, Target, Users } from "lucide-react";

const APropos = () => {
  return (
    <Layout>
      <SEO
        title="À Propos - Qui Sommes-Nous"
        description="Découvrez l'histoire de pile-ouface.fr, le simulateur de pile ou face en ligne gratuit. Notre mission : vous aider à prendre des décisions simplement."
        canonicalUrl="/a-propos"
      />
      <WebPageSchema
        title="À Propos - Pile ou Face"
        description="Découvrez l'histoire de pile-ouface.fr."
        url="/a-propos"
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              À Propos de Pile ou Face
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              L'histoire derrière le simulateur de pile ou face le plus simple du web francophone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Notre Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Notre mission est simple : vous offrir le <strong>simulateur pile ou face</strong> le plus 
                rapide, fiable et agréable à utiliser. Nous croyons que parfois, la meilleure façon de 
                prendre une décision est de s'en remettre au hasard. C'est pourquoi nous avons créé 
                <strong> pile-ouface.fr</strong>.
              </p>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Pourquoi ce site ?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Combien de fois vous êtes-vous retrouvé face à un choix difficile entre deux options ? 
                  Parfois, la meilleure solution est de laisser le hasard décider pour nous. C'est 
                  libérateur et souvent, cela nous aide à réaliser ce que nous voulions vraiment.
                </p>
                <p>
                  Nous avons créé ce <strong>jeu pile ou face en ligne</strong> pour que vous puissiez 
                  <strong> lancer une pièce</strong> à tout moment, où que vous soyez, sans avoir 
                  besoin d'une vraie pièce de monnaie.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Pour qui ?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Notre simulateur s'adresse à tous :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les indécis qui ont besoin d'un coup de pouce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les joueurs qui veulent déterminer qui commence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les sportifs pour les tirages au sort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les enseignants pour des exercices de probabilités</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Tous ceux qui aiment s'amuser avec le hasard !</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-12">Nos valeurs</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display font-semibold text-lg mb-2">Simplicité</h3>
                <p className="text-sm text-muted-foreground">
                  Un seul bouton, un résultat clair. Pas de complications inutiles.
                </p>
              </div>
              
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-display font-semibold text-lg mb-2">Équité</h3>
                <p className="text-sm text-muted-foreground">
                  Tirage uniforme via l'API cryptographique du navigateur, adapté aux décisions courantes.
                </p>
              </div>
              
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="font-display font-semibold text-lg mb-2">Gratuité</h3>
                <p className="text-sm text-muted-foreground">
                  100% gratuit, sans inscription, sans publicité intrusive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
