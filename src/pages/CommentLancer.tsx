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

const LAST_UPDATED = "2026-07-29";
const LAST_UPDATED_LABEL = "29 juillet 2026";

const CommentLancer = () => {
  return (
    <Layout>
      <SEO
        title="Comment lancer une pièce en ligne : tutoriel pas à pas"
        description="Tutoriel pratique : lancer une pièce en ligne en 4 étapes, raccourci clavier, usage mobile et solutions aux problèmes courants du simulateur."
        canonicalUrl="/comment-lancer-piece-en-ligne"
        bareTitle
      />
      <WebPageSchema
        title="Comment lancer une pièce en ligne : tutoriel pas à pas"
        description="Tutoriel pratique pour utiliser le simulateur de pile ou face."
        url="/comment-lancer-piece-en-ligne"
        dateModified={LAST_UPDATED}
      />
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Comment lancer une pièce en ligne : tutoriel pas à pas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Ce tutoriel explique uniquement l'utilisation pratique du simulateur : les 4 étapes,
              le raccourci clavier, l'usage sur mobile et les problèmes courants. Pour la définition,
              l'histoire et les probabilités du jeu, consultez la{" "}
              <Link to="/" className="text-primary hover:underline">
                page du simulateur de pile ou face
              </Link>
              .
            </p>
            <p className="text-sm text-muted-foreground">
              Mis à jour le <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
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
                  id={`etape-${index + 1}`}
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

      {/* Pratique */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Astuces d'utilisation et problèmes courants
            </h2>

            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Lancer la pièce au clavier
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sur ordinateur, la touche Espace déclenche un lancer sans passer par la souris.
                  Pratique pour enchaîner plusieurs tirages, par exemple pour départager une série
                  de matchs ou animer un cours de probabilités.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Utilisation sur mobile et accès rapide
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sur iPhone et Android, ouvrez la page dans votre navigateur puis ajoutez-la à
                  l'écran d'accueil : le simulateur s'ouvre alors comme une application, sans
                  installation ni compte.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  L'animation ne se lance pas
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Si la pièce reste immobile, rechargez la page ou désactivez temporairement un
                  bloqueur de scripts. Si votre système est réglé sur « réduire les animations »,
                  le résultat s'affiche directement, sans rotation : le tirage reste valide.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg mb-3">
                  Le son ne fonctionne pas
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les navigateurs bloquent le son tant que vous n'avez pas interagi avec la page.
                  Un premier clic sur le bouton de lancer suffit à autoriser la lecture audio.
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
              Lancer la pièce
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommentLancer;
