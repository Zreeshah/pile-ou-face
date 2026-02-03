import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Ouvrez le simulateur",
    description: "Rendez-vous sur notre page d'accueil pour accéder au simulateur pile ou face.",
  },
  {
    number: "2",
    title: "Cliquez sur le bouton",
    description: "Appuyez sur \"Lancer la pièce\" ou utilisez la touche Espace de votre clavier.",
  },
  {
    number: "3",
    title: "Attendez le résultat",
    description: "La pièce virtuelle tourne pendant quelques secondes avec une animation réaliste.",
  },
  {
    number: "4",
    title: "Découvrez le résultat",
    description: "Le résultat s'affiche clairement : Pile ou Face. Vous pouvez relancer autant de fois que vous voulez !",
  },
];

const useCases = [
  "Décider qui commence une partie ou un jeu",
  "Choisir entre deux options quand on hésite",
  "Déterminer l'équipe qui engage au sport",
  "Trancher un débat de manière équitable",
  "S'amuser et tester sa chance",
  "Apprendre les probabilités aux enfants",
];

const CommentLancer = () => {
  return (
    <Layout>
      <SEO
        title="Comment Lancer une Pièce en Ligne - Guide Complet"
        description="Découvrez comment utiliser notre simulateur pile ou face en ligne. Guide étape par étape pour lancer une pièce virtuellement et obtenir un résultat aléatoire."
        canonicalUrl="/comment-lancer-piece-en-ligne"
      />
      <WebPageSchema
        title="Comment Lancer une Pièce en Ligne"
        description="Guide complet pour utiliser notre simulateur pile ou face en ligne."
        url="/comment-lancer-piece-en-ligne"
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Comment Lancer une Pièce en Ligne
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Guide complet pour utiliser notre <strong>simulateur pile ou face</strong> 
              et obtenir un résultat aléatoire en quelques secondes.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              4 étapes simples pour lancer une pièce
            </h2>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="card-glass p-6 flex gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold text-secondary">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/" className="btn-flip inline-flex items-center gap-2">
                Essayer maintenant <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Quand utiliser le pile ou face ?
            </h2>

            <div className="card-glass p-8">
              <ul className="grid gap-4">
                {useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Pourquoi le pile ou face en ligne est-il fiable ?
            </h2>

            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Un algorithme vraiment aléatoire
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Notre <strong>simulateur pile ou face</strong> utilise un générateur de nombres 
                  pseudo-aléatoires de haute qualité. Contrairement à une vraie pièce qui peut être 
                  légèrement déséquilibrée, notre outil garantit exactement 50% de chances pour 
                  chaque résultat.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Indépendance des lancers
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque <strong>lancer de pièce</strong> est complètement indépendant du précédent. 
                  Même si vous obtenez "Pile" dix fois de suite, le prochain lancer aura toujours 
                  exactement 50% de chances de tomber sur l'une ou l'autre face.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Accessible partout
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pas de pièce sous la main ? Pas de problème ! Notre outil vous permet de 
                  <strong> lancer une pièce en ligne</strong> depuis votre smartphone, tablette ou 
                  ordinateur, à tout moment et n'importe où.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Prêt à lancer votre pièce ?
            </h2>
            <p className="text-secondary-foreground/80 mb-8">
              Essayez notre simulateur maintenant et obtenez un résultat instantané !
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-primary text-secondary font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              🪙 Lancer la pièce
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommentLancer;
