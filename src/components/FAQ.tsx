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
      "Le simulateur demande une valeur à l'API cryptographique du navigateur, puis utilise un échantillonnage uniforme pour choisir pile ou face. Chaque nouveau lancer effectue un nouveau tirage.",
  },
  {
    question: "Le résultat est-il vraiment aléatoire ?",
    answer:
      "Le site utilise crypto.getRandomValues(), l'API de valeurs aléatoires cryptographiquement fortes du navigateur. L'outil répartit uniformément les valeurs entre pile et face, sans prétendre à une certification pour les jeux d'argent réglementés.",
  },
  {
    question: "Puis-je utiliser ce simulateur pour prendre des décisions ?",
    answer:
      "Oui. Le pile ou face convient aux décisions courantes lorsque deux options se valent : choisir qui commence, un restaurant ou une activité. Pour une décision importante, utilisez-le seulement si vous acceptez d'en laisser l'issue au hasard.",
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
      "Pile ou face est un jeu de hasard simple consistant à lancer une pièce de monnaie en l'air et à observer sur quelle face elle retombe. Dans le modèle théorique d'une pièce équilibrée, les deux résultats ont la même probabilité.",
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

    </section>
  );
};
