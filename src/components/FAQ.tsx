import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Comment fonctionne le simulateur pile ou face ?",
    answer:
      "Notre simulateur utilise un algorithme de génération de nombres aléatoires pour garantir un résultat 50/50 parfaitement équilibré. Chaque lancer est indépendant et totalement aléatoire, comme une vraie pièce de monnaie.",
  },
  {
    question: "Le résultat est-il vraiment aléatoire ?",
    answer:
      "Oui, absolument ! Nous utilisons la fonction Math.random() de JavaScript qui génère des nombres pseudo-aléatoires de haute qualité. Chaque lancer a exactement 50% de chances de tomber sur pile et 50% sur face.",
  },
  {
    question: "Puis-je utiliser ce simulateur pour prendre des décisions ?",
    answer:
      "Bien sûr ! Le pile ou face est utilisé depuis des siècles pour prendre des décisions. Que ce soit pour choisir qui commence un match, décider d'un restaurant, ou simplement trancher entre deux options, notre simulateur est parfait.",
  },
  {
    question: "Le simulateur fonctionne-t-il sur mobile ?",
    answer:
      "Oui, notre simulateur est entièrement responsive et optimisé pour tous les appareils : smartphones, tablettes et ordinateurs. Vous pouvez lancer une pièce n'importe où, n'importe quand.",
  },
  {
    question: "Combien de fois puis-je lancer la pièce ?",
    answer:
      "Il n'y a aucune limite ! Vous pouvez lancer la pièce autant de fois que vous le souhaitez. Le compteur de lancers vous permet de suivre votre historique.",
  },
  {
    question: "Qu'est-ce que le jeu pile ou face ?",
    answer:
      "Pile ou face est un jeu de hasard simple consistant à lancer une pièce de monnaie en l'air et à deviner sur quelle face elle retombera. C'est l'un des moyens les plus anciens et les plus équitables pour prendre une décision aléatoire.",
  },
];

export const FAQ = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground text-lg">
              Tout ce que vous devez savoir sur notre simulateur pile ou face
            </p>
          </div>

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

      {/* FAQ Schema Markup */}
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
    </section>
  );
};
