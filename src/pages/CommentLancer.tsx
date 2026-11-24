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

const LAST_UPDATED = "2026-11-24";
const LAST_UPDATED_LABEL = "24 novembre 2026";

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

      {/* Lancer plusieurs fois */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Lancer plusieurs fois d'affilée
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Un seul lancer suffit pour trancher entre deux options, mais certaines situations
                demandent une série : départager trois équipes, simuler un match en plusieurs manches
                ou observer la fréquence des résultats. Après chaque lancer, cliquez de nouveau sur
                le bouton ou appuyez sur Espace : chaque tirage est indépendant, le précédent
                n'influence jamais le suivant.
              </p>
              <p>
                Pour les séries longues, utilisez plutôt notre page{" "}
                <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">
                  lancers multiples
                </Link>{" "}
                : elle répète le tirage jusqu'à dix mille fois et affiche la fréquence de piles en
                direct. C'est la façon la plus parlante de voir la loi des grands nombres à l'œuvre :
                sur dix lancers, la proportion peut s'écarter nettement de 50 % ; sur dix mille, elle
                s'en rapproche presque toujours.
              </p>
              <p>
                Attention à une erreur fréquente : après plusieurs piles d'affilée, on s'attend à ce
                que face « compense ». Il n'en est rien. La pièce n'a pas de mémoire et la
                probabilité reste de 50 % à chaque lancer. Notre article sur le{" "}
                <Link to="/blog/sophisme-du-joueur" className="text-primary hover:underline">
                  sophisme du joueur
                </Link>{" "}
                explique ce piège en détail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Utiliser le résultat */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Utiliser le résultat pour décider
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Le pile ou face fonctionne mieux quand les deux options sont vraiment équivalentes :
                deux restaurants, deux films, qui commence une partie. Avant de lancer, nommez
                clairement ce que vaut pile et ce que vaut face, et engagez-vous à respecter le
                résultat. Sans cet engagement, le tirage ne sert à rien.
              </p>
              <p>
                Observez aussi votre réaction au résultat : si face sort et que vous êtes déçu,
                c'est que vous préfériez pile — le tirage vient de révéler votre vraie préférence.
                C'est l'usage le plus utile du pile ou face, et notre article{" "}
                <Link to="/blog/comment-decider-quand-on-hesite" className="text-primary hover:underline">
                  comment décider quand on hésite
                </Link>{" "}
                le décrit comme l'une des sept méthodes pour sortir d'une indécision.
              </p>
              <p>
                En revanche, ne confiez pas au hasard une décision aux conséquences importantes ou
                irréversibles : un tirage ne remplace ni une réflexion, ni un avis professionnel.
                Pour les choix qui comptent, utilisez-le comme un révélateur de préférence, pas
                comme un arbitre final.
              </p>
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

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Questions fréquentes sur le lancer en ligne
            </h2>
            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Faut-il créer un compte pour lancer la pièce ?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Non. Le simulateur est gratuit, sans inscription et sans téléchargement. Ouvrez la
                  page, cliquez sur le bouton, le résultat s'affiche immédiatement.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Le résultat est-il vraiment aléatoire ?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Oui. Chaque lancer utilise l'API cryptographique du navigateur
                  (crypto.getRandomValues), qui produit des valeurs uniformes et imprévisibles. Le
                  site ne conserve aucun historique de vos tirages et ne peut pas influencer un résultat.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Puis-je lancer la pièce avec une pièce physique à la place ?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bien sûr, mais le simulateur est plus pratique quand vous n'avez pas de pièce sous
                  la main, quand vous êtes en visioconférence ou quand vous voulez enchaîner beaucoup
                  de tirages. Le modèle mathématique est le même : une chance sur deux pour chaque face.
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Que faire si le résultat ne s'affiche pas ?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rechargez la page, puis vérifiez qu'aucun bloqueur de scripts ne bloque le site.
                  Si le problème persiste, décrivez-le depuis la{" "}
                  <Link to="/contact" className="text-primary hover:underline">page contact</Link>{" "}
                  en précisant votre navigateur et votre appareil.
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
