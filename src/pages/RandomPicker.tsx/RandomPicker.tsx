import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Shuffle, Trash2, Plus, Users } from "lucide-react";

const LAST_UPDATED = "2026-07-29";

const faqItems = [
  {
    question: "Comment fonctionne le tirage au sort en ligne ?",
    answer:
      "Entrez une liste de noms (un par ligne), cliquez sur « Tirer au sort », et l'outil sélectionne un nom aléatoirement. Chaque nom a exactement la même probabilité d'être choisi. Le tirage est instantané et ne conserve aucune donnée.",
  },
  {
    question: "Le tirage est-il vraiment équitable ?",
    answer:
      "Oui. L'outil utilise le générateur aléatoire du navigateur (Math.random) pour sélectionner un nom. Tous les noms ont exactement la même chance d'être tirés, sans aucun biais. Vous pouvez répéter le tirage autant de fois que vous voulez.",
  },
  {
    question: "Puis-je tirer plusieurs noms à la fois ?",
    answer:
      "Pour l'instant, l'outil tire un seul nom à la fois. Vous pouvez relancer pour obtenir un autre résultat. Une fonction de tirage multiple (par exemple, tirer 3 noms sans remise) est prévue dans une prochaine mise à jour.",
  },
  {
    question: "Mes données sont-elles conservées ?",
    answer:
      "Non. Tout se passe dans votre navigateur. Les noms que vous entrez ne sont jamais envoyés à un serveur, ni stockés, ni partagés. Vous pouvez fermer la page sans laisser de trace.",
  },
  {
    question: "Quelle est la différence avec le pile ou face ?",
    answer:
      "Le pile ou face sert à choisir entre deux options. Le tirage au sort permet de choisir parmi autant de noms que vous voulez : 3, 10, 50 ou plus. C'est l'outil idéal pour les groupes, les classes, les jeux ou les décisions à choix multiples.",
  },
  {
    question: "Puis-je utiliser cet outil pour un jeu en classe ?",
    answer:
      "Absolument. Les enseignants utilisent souvent un tirage au sort pour désigner un élève, former des groupes, ou attribuer des sujets d'exposé. L'outil fonctionne sur tous les appareils et ne nécessite aucune installation.",
  },
];

const exampleNames = [
  "Emma", "Lucas", "Léa", "Hugo", "Chloé",
  "Nathan", "Inès", "Louis", "Camille", "Gabriel",
];

const RandomPicker = () => {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const addNames = useCallback(() => {
    const newNames = input
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (newNames.length > 0) {
      setNames((prev) => [...prev, ...newNames]);
      setInput("");
      setResult(null);
    }
  }, [input]);

  const removeName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const pickRandom = useCallback(() => {
    if (names.length < 2) return;
    setIsSpinning(true);
    setShowAnimation(true);
    setResult(null);

    // Animation: cycle through names quickly then settle
    let cycles = 0;
    const maxCycles = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setResult(names[randomIndex]);
      cycles++;
      if (cycles >= maxCycles) {
        clearInterval(interval);
        // Final result
        const finalIndex = Math.floor(Math.random() * names.length);
        setResult(names[finalIndex]);
        setIsSpinning(false);
      }
    }, 80);
  }, [names]);

  const loadExample = () => {
    setNames([...exampleNames]);
    setResult(null);
  };

  const clearAll = () => {
    setNames([]);
    setResult(null);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Layout>
      <SEO
        title="Tirage au Sort en Ligne – Choisissez un Nom Aléatoirement"
        description="Tirez un nom au hasard parmi votre liste. Outil gratuit, équitable et sans inscription. Parfait pour les classes, les jeux et les décisions de groupe."
        canonicalUrl="/tirage-au-sort"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Tirage au Sort en Ligne"
        description="Outil gratuit de tirage au sort aléatoire parmi une liste de noms."
        url="/tirage-au-sort"
        dateModified={LAST_UPDATED}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Tirage au sort en ligne
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Choisissez un nom aléatoirement
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up">
              Entrez une liste de noms et laissez le hasard décider. <strong>Gratuit, équitable et sans inscription</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-6 md:p-10">
              {/* Input area */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Entrez les noms (un par ligne)
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Emma\nLucas\nLéa\nHugo\n..."}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={addNames}
                    disabled={!input.trim()}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                  <button
                    onClick={loadExample}
                    className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium text-sm transition-colors flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Exemple
                  </button>
                </div>
              </div>

              {/* Name list */}
              {names.length > 0 && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {names.length} nom{names.length > 1 ? "s" : ""} dans la liste
                    </h3>
                    <button
                      onClick={clearAll}
                      className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Tout effacer
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-muted/30 rounded-xl">
                    {names.map((name, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-sm group hover:border-destructive/30 transition-colors"
                      >
                        {name}
                        <button
                          onClick={() => removeName(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              <div className="text-center mb-8">
                {result && (
                  <div className={`animate-scale-in ${isSpinning ? "animate-pulse" : ""}`}>
                    <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                      {result}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {isSpinning ? "Tirage en cours..." : "a été tiré(e) au sort !"}
                    </p>
                  </div>
                )}
                {!result && names.length >= 2 && (
                  <p className="text-lg text-muted-foreground">
                    Prêt à tirer au sort parmi {names.length} noms
                  </p>
                )}
                {names.length < 2 && names.length > 0 && (
                  <p className="text-muted-foreground">
                    Ajoutez au moins 2 noms pour lancer le tirage
                  </p>
                )}
              </div>

              {/* Pick button */}
              <div className="flex justify-center">
                <button
                  onClick={pickRandom}
                  disabled={names.length < 2 || isSpinning}
                  className="btn-flip flex items-center gap-2 disabled:opacity-50"
                >
                  <Shuffle className="w-5 h-5" />
                  Tirer au sort
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Un tirage au sort vraiment aléatoire
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le tirage au sort est l'une des plus anciennes méthodes de décision. Dans la Grèce antique, on tirait déjà les magistrats au sort pour garantir l'impartialité. Aujourd'hui, notre outil reprend ce principe avec la puissance du numérique : chaque nom a <strong>exactement la même probabilité</strong> d'être sélectionné.
              </p>
              <p>
                Contrairement à un tirage papier dans un chapeau, notre simulateur ne peut pas être influencé par la façon de mélanger, la position des papiers ou un choix inconscient. Le générateur aléatoire du navigateur garantit une <strong>équité totale</strong> à chaque tirage.
              </p>
              <p>
                Cet outil est idéal pour les <strong>enseignants</strong> qui veulent interroger un élève au hasard, les <strong>animateurs</strong> qui organisent des jeux, ou tout simplement pour <strong>départager</strong> un groupe quand personne n'arrive à se décider. Pour les décisions à deux options, essayez aussi notre{" "}
                <a href="/" className="text-primary hover:underline">
                  simulateur de pile ou face
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Questions fréquentes
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

export default RandomPicker;
