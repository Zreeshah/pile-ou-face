import { CoinFlip } from "@/components/CoinFlip";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { CheckCircle, Zap, MousePointerClick, RefreshCw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Le jeu est-il vraiment aléatoire ?",
    answer:
      "Oui, notre simulateur de lancer une pièce utilise un algorithme aléatoire pour garantir l'impartialité du résultat.",
  },
  {
    question: "Doit-on s'inscrire pour jouer ?",
    answer:
      "Non, vous pouvez jouer à pile ou face en ligne gratuitement et sans compte.",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="Pile ou Face en Ligne – Jeu Gratuit de Lancer une Pièce"
        description="Jouez à pile ou face en ligne, le jeu simple et rapide de lancer une pièce. Essayez gratuitement pile face en ligne et obtenez un résultat instantané !"
        canonicalUrl="/"
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Pile ou Face en Ligne – Jeu Gratuit de Lancer une Pièce"
        description="Jouez à pile ou face en ligne, le jeu simple et rapide de lancer une pièce."
        url="/"
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Pile ou Face
              <span className="block text-primary mt-2">Jeu en Ligne Simple et Rapide</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up">
              Bienvenue sur la plateforme ultime pour jouer à <strong>pile ou face en ligne</strong>, le célèbre jeu de lancer une pièce adapté au web. Que vous vouliez trancher un choix rapide ou simplement vous amuser, notre simulateur de pile face est instantané, gratuit et facile à utiliser.
            </p>
            <div className="relative card-glass p-8 md:p-12 max-w-lg mx-auto animate-scale-in">
              <CoinFlip />
            </div>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que Pile ou Face */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Qu'est-ce que Pile ou Face ?
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong>Pile ou face</strong> est un jeu de hasard simple consistant à lancer une pièce et à prédire si elle tombera sur pile ou face. Très populaire dans les décisions rapides, ce <strong>jeu pile ou face</strong> est maintenant disponible sur internet sans installation ni inscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi jouer */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Pourquoi jouer à pile ou face ?
            </h2>
            <div className="card-glass p-8">
              <ul className="grid gap-3">
                {[
                  "Aucun téléchargement nécessaire",
                  "Interface intuitive",
                  "Résultat instantané",
                  "Idéal pour trancher des choix rapidement",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Jouez Gratuitement */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Jouez à Pile ou Face en Ligne Gratuitement
            </h2>
            <div className="card-glass p-8">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Avec notre <strong>simulateur pile ou face en ligne</strong>, vous pouvez :
              </p>
              <ul className="grid gap-3 mb-6">
                {[
                  "Lancer une pièce d'un simple clic",
                  "Obtenir un résultat immédiat",
                  "Rejouer autant de fois que vous le souhaitez",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                C'est parfait pour les décisions du quotidien, les jeux entre amis ou juste pour tester votre chance !
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-foreground font-medium text-center">
                  Cliquez sur le bouton <strong>Lancer la pièce</strong> pour commencer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça Marche */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Comment ça Marche ?
            </h2>
            <div className="card-glass p-8">
              <div className="grid gap-4">
                {[
                  { icon: <MousePointerClick className="w-6 h-6" />, step: "1", text: "Choisissez votre côté préféré : pile ou face" },
                  { icon: <Zap className="w-6 h-6" />, step: "2", text: "Cliquez sur Lancer une pièce" },
                  { icon: <RefreshCw className="w-6 h-6" />, step: "3", text: "Le résultat s'affiche : pile ou face" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-4 bg-card border border-border rounded-lg p-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-foreground font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg mt-6">
                C'est aussi simple que ça ! Plus besoin de vraie pièce, le <strong>jeu pile ou face en ligne</strong> le fait pour vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Astuces */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Astuces et Idées d'Utilisation
            </h2>
            <div className="card-glass p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { text: "Décider qui commence un jeu" },
                  { text: "Résoudre une petite dispute" },
                  { text: "Faire un choix sans réfléchir trop longtemps" },
                  { text: "S'entraîner aux probabilités" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              FAQ – Pile ou Face
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 border border-border shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA - Lancez une Pièce */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Lancez une Pièce Maintenant
            </h2>
            <div className="card-glass p-8 text-center">
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                N'attendez plus pour jouer ! Profitez de ce jeu classique de <strong>pile face</strong> sous une forme moderne et accessible depuis tout appareil : ordinateur, tablette ou smartphone.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-lg"
              >
                Lancer la pièce
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dernières paroles */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Dernières paroles
            </h2>
            <p className="text-secondary-foreground/80 text-lg">
              Le <strong>jeu pile ou face en ligne</strong> est simple, rapide, amusant et parfaitement adapté à tous les besoins — décision, hasard ou divertissement. Essayez dès maintenant notre simulateur de <strong>pile ou face en ligne</strong> !
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
