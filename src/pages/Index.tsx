import { CoinFlip } from "@/components/CoinFlip";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne le simulateur de pile ou face ?",
    answer:
      "Le simulateur de pile ou face génère un résultat numérique, puis l'associe à l'une des deux sorties possibles : pile ou face. Le résultat apparaît immédiatement dans le navigateur. Aucun compte, aucune installation et aucune donnée personnelle ne sont nécessaires pour lancer la pièce.",
  },
  {
    question: "Le résultat est-il vraiment aléatoire ?",
    answer:
      "Oui. Le résultat est généré par une source aléatoire du navigateur, puis converti en pile ou face. Chaque lancer est statistiquement indépendant : le résultat précédent ne change pas les chances du lancer suivant.",
  },
  {
    question: "Peut-on lancer la pièce plusieurs fois de suite ?",
    answer:
      "Oui, vous pouvez relancer la pièce autant de fois que vous le souhaitez. Chaque résultat reste indépendant. Si vous voulez suivre une série, notez simplement vos piles et vos faces après chaque lancer.",
  },
  {
    question: "Le simulateur fonctionne-t-il sur mobile ?",
    answer:
      "Oui. Le pile ou face mobile fonctionne sur iPhone, Android, tablette et ordinateur. Il suffit d'ouvrir la page dans votre navigateur, sans télécharger d'application.",
  },
  {
    question: "Quelle est la différence entre pile et face ?",
    answer:
      "Dans l'usage courant, face correspond à l'avers de la pièce, souvent le côté avec un portrait, un symbole national ou le motif principal. Pile correspond au revers. Le mot monnaie vient du latin moneta, tandis que l'origine précise de pile reste discutée.",
  },
  {
    question: "Peut-on l'utiliser pour des décisions importantes ?",
    answer:
      "Oui, si les deux options sont vraiment équivalentes. Pour une décision importante, le pile ou face doit rester un outil de départage, pas un remplacement de la réflexion. Analysez d'abord les risques, puis utilisez-le seulement si l'égalité persiste.",
  },
  {
    question: "Quelle est la probabilité d'obtenir pile 3 fois de suite ?",
    answer:
      "La probabilité d'obtenir pile trois fois de suite est (1/2)^3, soit 1 chance sur 8 : 12,5 %. On multiplie les probabilités parce que chaque lancer est indépendant du précédent.",
  },
  {
    question: "Existe-t-il une application pile ou face gratuite ?",
    answer:
      "Oui : cette web app pile ou face gratuite fonctionne directement dans votre navigateur. Vous n'avez rien à installer. Ajoutez simplement la page d'accueil à vos favoris pour y accéder rapidement sur mobile.",
  },
];

const LAST_UPDATED = "2026-07-29";
const LAST_UPDATED_LABEL = "29 juillet 2026";

const Index = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pile ou Face en Ligne",
    url: "https://pile-ouface.fr/",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    inLanguage: "fr-FR",
    dateModified: LAST_UPDATED,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <Layout>
      <SEO
        title="Pile ou Face en Ligne – Simulateur Gratuit de Lancer de Pièce"
        description="Lancez une pièce en ligne gratuitement et obtenez pile ou face instantanément. Simulateur 50/50, sans inscription, sur mobile et ordinateur."
        canonicalUrl="/"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Pile ou Face en Ligne – Simulateur Gratuit de Lancer de Pièce"
        description="Simulateur de pile ou face en ligne gratuit et instantané."
        url="/"
        dateModified={LAST_UPDATED}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />


      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Pile ou face en ligne
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Simulateur gratuit et instantané
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up">
              Lancez une pièce virtuelle en un clic et obtenez <strong>pile ou face</strong> immédiatement, sans inscription ni téléchargement.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Mis à jour le <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
            </p>

            <div className="relative card-glass p-8 md:p-12 max-w-lg mx-auto animate-scale-in">
              <CoinFlip />
            </div>
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-6">
              <p className="font-display font-semibold mb-3">Sommaire</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["#definition", "Qu'est-ce que le pile ou face ?"],
                  ["#utilisation", "Comment utiliser notre simulateur ?"],
                  ["#avantages", "Pourquoi jouer en ligne ?"],
                  ["#situations", "Dans quelles situations ?"],
                  ["#histoire", "L'histoire du jeu"],
                  ["#probabilite", "Le hasard est-il équitable ?"],
                  ["#faq", "Questions fréquentes"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-primary hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Définition */}
      <section id="definition" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Qu'est-ce que le pile ou face ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le pile ou face est un jeu de hasard très simple : après avoir lancé une pièce, le résultat ne peut être que <strong>pile</strong> ou <strong>face</strong>. Dans un modèle idéal, chaque côté a la même probabilité, soit une chance sur deux. C'est pour cela que le jeu de pile ou face sert depuis longtemps à prendre une décision impartiale lorsque deux options se valent.
              </p>
              <p>
                Sur une pièce réelle, la <strong>face</strong> désigne généralement l'avers, avec un portrait, un symbole national ou le motif principal. <strong>Pile</strong> désigne l'autre côté, le revers, souvent associé à la valeur ou à un motif secondaire. La version numérique reprend la même logique : lancer une pièce devient instantané, sans avoir besoin d'une vraie pièce dans la poche.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Utilisation */}
      <section id="utilisation" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Comment utiliser notre simulateur de pile ou face ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Jouer à pile ou face en ligne ne demande aucune préparation : l'outil est directement accessible sur la page et fonctionne dans votre navigateur. Vous choisissez simplement de lancer, puis vous laissez le hasard trancher. Pour plus de détails, consultez aussi notre guide&nbsp;: <a href="/comment-lancer-piece-en-ligne" className="text-primary hover:underline">comment lancer une pièce en ligne</a>.
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 1 — Cliquez sur « Lancer »</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le simulateur est immédiatement accessible : aucun compte, aucune application et aucun téléchargement ne sont nécessaires.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 2 — Lisez le résultat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le résultat, pile ou face, s'affiche instantanément, et vous pouvez relancer la pièce autant de fois que nécessaire.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 3 — Prenez votre décision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque lancer est indépendant et conçu pour rester impartial, que votre décision soit légère, pratique ou vraiment importante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Pourquoi jouer à pile ou face en ligne plutôt qu'avec une vraie pièce ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le pile ou face en ligne a un avantage évident : il est toujours disponible. Il fonctionne sur smartphone, tablette ou ordinateur, même quand personne n'a de monnaie sous la main. Il est aussi instantané : ouvrez le simulateur gratuit, cliquez, puis lisez le résultat en quelques millisecondes.
              </p>
              <p>
                Le tirage numérique évite les biais physiques d'une pièce réelle : poids légèrement inégal, surface usée, façon de la lancer ou position de départ. Il permet aussi de répéter l'expérience facilement. Vous pouvez lancer une pièce en ligne dix fois de suite, noter les résultats et l'utiliser pour un jeu, un test de probabilité ou une décision rapide. Le tout reste gratuit, sans inscription, sans publicité intrusive et sans téléchargement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Situations */}
      <section id="situations" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Dans quelles situations utiliser le pile ou face ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Le pile ou face pour décider fonctionne surtout lorsque deux choix sont acceptables et qu'il faut simplement casser l'égalité. Il évite les débats qui tournent en rond et donne un résultat clair en une seconde.
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Décisions du quotidien</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Qui cuisine ce soir, quel film regarder, qui appelle en premier ou quelle activité choisir ? Le pile ou face est parfait quand les deux options sont valables et que vous voulez juste trancher sans y passer dix minutes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Sport et jeux</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le pile ou face sport sert à choisir qui commence : coup d'envoi au football, première équipe à jouer, ordre de départ dans un jeu de société ou choix du camp. Dans un match informel, il remplace très bien la pièce de l'arbitre.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Environnements professionnels</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En réunion, il peut départager deux options équivalentes, fixer un ordre de présentation ou débloquer une décision mineure entre collègues. Il ne remplace pas l'analyse, mais il aide quand les coûts, les risques et les bénéfices sont réellement comparables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section id="histoire" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              L'histoire du jeu de pile ou face
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                L'histoire du pile ou face remonte au moins à la Rome antique. Des sources classiques mentionnent le jeu <em>capita aut navia</em>, souvent traduit par « tête ou navire », car certaines pièces romaines portaient une tête sur un côté et une proue de navire sur l'autre, comme le rappelle une référence à Macrobe citée dans <em>A Dictionary of Greek and Roman Antiquities</em>.
              </p>
              <p>
                En France, l'expression a évolué avec la monnaie. Le Dictionnaire Littré rattache « pile » à l'ancien vocabulaire des monnayeurs et rappelle l'usage de « croix ou pile » avant l'expression moderne. Aujourd'hui, le tirage reste présent dans le sport : coup d'envoi en football, toss au cricket, cérémonial du Super Bowl.
              </p>
              <p>
                Certaines décisions célèbres ont même dépendu d'une pièce : le nom de Portland, Oregon, en 1845 selon <em>The Oregon Encyclopedia</em>, le premier choix de la draft NBA 1969 avec Lew Alcindor selon <em>Sports Illustrated</em>, et le siège de Ritchie Valens lors de la dernière tournée de Buddy Holly selon <em>The Washington Post</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Probabilité */}
      <section id="probabilite" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Le hasard est-il vraiment équitable à 50/50 ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                En théorie, la probabilité pile ou face est simple : une pièce idéale donne 50 % de chances pour pile et 50 % pour face. Pourtant, les pièces physiques ne sont pas toujours parfaitement neutres. Des travaux de Persi Diaconis, Susan Holmes et Richard Montgomery ont modélisé un léger biais vers la face visible au départ ; une étude récente portant sur 350 757 lancers a mesuré un résultat du même côté dans 50,8 % des cas, selon <em>arXiv</em> et <em>Scientific American</em>.
              </p>
              <p>
                Un simulateur numérique évite ce biais mécanique : pas de poids, pas d'axe, pas de geste de lancer et pas de face de départ. Il convertit une valeur aléatoire en deux sorties possibles. Les navigateurs modernes disposent aussi d'API adaptées au hasard fort, comme <code className="px-1 py-0.5 rounded bg-muted text-sm">crypto.getRandomValues()</code>, documentée par MDN. Surtout, chaque lancer reste indépendant : trois piles d'affilée n'augmentent jamais les chances d'obtenir face au lancer suivant.
              </p>
              <p>
                Pour aller plus loin, calculez la probabilité d'obtenir un nombre précis de piles sur plusieurs lancers avec notre <a href="/probabilite-pile-ou-face" className="text-primary hover:underline">calculateur de probabilité au pile ou face</a> : la loi binomiale, expliquée et illustrée cas par cas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Questions fréquentes sur le pile ou face en ligne
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group bg-card rounded-xl px-6 border border-border shadow-sm"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none text-left font-medium py-5 flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium">{item.question}</h3>
                    <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-muted-foreground pb-5 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
