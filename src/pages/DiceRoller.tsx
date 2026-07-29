import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Dices, RotateCcw, History } from "lucide-react";

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

const LAST_UPDATED = "2026-07-29";

const DICE_DOTS: Record<DiceFace, number[][]> = {
  1: [[1, 1]],
  2: [[0, 2], [2, 0]],
  3: [[0, 2], [1, 1], [2, 0]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

const faqItems = [
  {
    question: "Comment fonctionne le dé en ligne ?",
    answer:
      "Cliquez sur le dé ou sur le bouton « Lancer le dé » pour obtenir un résultat aléatoire entre 1 et 6. L'outil utilise le générateur aléatoire du navigateur, garantissant que chaque face a exactement 1 chance sur 6 (16,67 %) de sortir. L'animation du dé affiche le résultat visuellement.",
  },
  {
    question: "Le dé est-il équitable ?",
    answer:
      "Oui. Contrairement à un dé physique qui peut avoir des imperfections (poids inégal, coins arrondis), le dé numérique est parfaitement équitable. Chaque face a exactement la même probabilité : 1/6. Le générateur Math.random() du navigateur assure cette équité.",
  },
  {
    question: "Peut-on lancer plusieurs dés à la fois ?",
    answer:
      "Pour l'instant, l'outil lance un seul dé à la fois. Vous pouvez relancer autant de fois que vous voulez. L'historique vous montre la somme cumulée de tous vos lancers. Une version avec plusieurs dés est en développement.",
  },
  {
    question: "Quelle est la probabilité d'obtenir un 6 ?",
    answer:
      "La probabilité d'obtenir un 6 sur un lancer est de 1/6, soit environ 16,67 %. Sur deux lancers, la probabilité d'obtenir au moins un 6 est de 1 - (5/6)² ≈ 30,6 %. Consultez notre article sur les probabilités pour en savoir plus.",
  },
  {
    question: "Le dé en ligne fonctionne-t-il sur mobile ?",
    answer:
      "Oui, le dé en ligne est entièrement responsive. Il fonctionne sur iPhone, Android, tablette et ordinateur. L'interface s'adapte à la taille de votre écran et le lancer se fait d'un simple tap.",
  },
  {
    question: "Quelle est la différence avec un dé physique ?",
    answer:
      "Le dé en ligne est toujours disponible (pas besoin d'avoir un dé sur soi), parfaitement équitable (pas d'usure ou d'imperfection), et garde un historique de vos lancers. En revanche, il n'a pas le plaisir tactile d'un vrai dé. Pour les jeux de société, beaucoup de joueurs utilisent les deux selon la situation.",
  },
];

const DiceRoller = () => {
  const [result, setResult] = useState<DiceFace | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<DiceFace[]>([]);
  const [totalRolls, setTotalRolls] = useState(0);

  const stats = {
    total: totalRolls,
    sum: history.reduce((a, b) => a + b, 0),
    average: history.length > 0 ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1) : "0",
    distribution: {
      1: history.filter((h) => h === 1).length,
      2: history.filter((h) => h === 2).length,
      3: history.filter((h) => h === 3).length,
      4: history.filter((h) => h === 4).length,
      5: history.filter((h) => h === 5).length,
      6: history.filter((h) => h === 6).length,
    },
  };

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    // Animation delay
    setTimeout(() => {
      const newResult = (Math.floor(Math.random() * 6) + 1) as DiceFace;
      setResult(newResult);
      setHistory((prev) => [...prev.slice(-49), newResult]);
      setTotalRolls((prev) => prev + 1);
      setIsRolling(false);
    }, 600);
  }, [isRolling]);

  const reset = () => {
    setResult(null);
    setHistory([]);
    setTotalRolls(0);
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
        title="Dé en Ligne – Lancez un Dé Virtuel Gratuit (1 à 6)"
        description="Lancez un dé en ligne gratuitement. Résultat aléatoire de 1 à 6, animation réaliste, historique des lancers. Fonctionne sur mobile et ordinateur."
        canonicalUrl="/de-en-ligne"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Dé en Ligne – Lancez un Dé Virtuel"
        description="Simulateur de dé en ligne gratuit et équitable de 1 à 6."
        url="/de-en-ligne"
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
              Dé en ligne
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Lancez un dé virtuel de 1 à 6
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up">
              Un <strong>dé virtuel gratuit</strong>, équitable et toujours disponible. Chaque face a exactement 1 chance sur 6.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-6 md:p-10">
              {/* Dice display */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className={`relative w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-white border-2 border-border shadow-xl flex items-center justify-center transition-all ${
                    isRolling ? "animate-bounce" : "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                  }`}
                  aria-label="Lancer le dé"
                >
                  {result && !isRolling ? (
                    <DiceFaceDisplay face={result} />
                  ) : (
                    <Dices className="w-16 h-16 text-muted-foreground/30" />
                  )}
                </button>
              </div>

              {/* Result text */}
              <div className="text-center mb-8 h-16">
                {result && !isRolling && (
                  <div className="animate-scale-in">
                    <p className="text-3xl font-display font-bold text-foreground">
                      {result}
                    </p>
                  </div>
                )}
                {isRolling && (
                  <p className="text-xl text-muted-foreground animate-pulse">
                    Le dé roule...
                  </p>
                )}
                {!result && !isRolling && (
                  <p className="text-lg text-muted-foreground">
                    Cliquez sur le dé pour lancer
                  </p>
                )}
              </div>

              {/* Roll button */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className="btn-flip flex items-center gap-2 disabled:opacity-50"
                >
                  <Dices className="w-5 h-5" />
                  Lancer le dé
                </button>
                {totalRolls > 0 && (
                  <button
                    onClick={reset}
                    className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                )}
              </div>

              {/* Stats */}
              {totalRolls > 0 && (
                <div className="animate-fade-in space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <p className="text-xl font-bold">{stats.total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <p className="text-xl font-bold">{stats.sum}</p>
                      <p className="text-xs text-muted-foreground">Somme</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <p className="text-xl font-bold">{stats.average}</p>
                      <p className="text-xs text-muted-foreground">Moyenne</p>
                    </div>
                  </div>

                  {/* Distribution bars */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Distribution des faces
                    </h3>
                    <div className="space-y-1.5">
                      {([1, 2, 3, 4, 5, 6] as DiceFace[]).map((face) => {
                        const count = stats.distribution[face];
                        const pct = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
                        return (
                          <div key={face} className="flex items-center gap-2">
                            <span className="w-6 text-sm font-mono text-muted-foreground text-right">
                              {face}
                            </span>
                            <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-300 min-w-[2px]"
                                style={{ width: `${Math.max(pct, 1)}%` }}
                              />
                            </div>
                            <span className="w-8 text-xs text-muted-foreground text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent history */}
                  {history.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Derniers lancers
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[...history].reverse().map((h, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 text-sm font-bold"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Pourquoi utiliser un dé en ligne ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le dé est l'un des plus anciens outils de hasard, utilisé depuis des millénaires dans les jeux, les rituels et les prises de décision. Notre <strong>dé en ligne</strong> reprend ce principe universel et le rend accessible partout, tout le temps.
              </p>
              <p>
                Contrairement à un dé physique, le dé virtuel est <strong>parfaitement équitable</strong> : pas d'usure, pas de défaut de fabrication, pas de lancer biaisé. Chaque face a exactement 16,67 % de chances de sortir. De plus, vous pouvez suivre vos statistiques : nombre total de lancers, somme, moyenne et distribution.
              </p>
              <p>
                Cet outil complète notre gamme de simulateurs de hasard. Pour les décisions binaires, utilisez notre{" "}
                <a href="/" className="text-primary hover:underline">
                  simulateur de pile ou face
                </a>. Pour choisir parmi une liste, essayez le{" "}
                <a href="/tirage-au-sort" className="text-primary hover:underline">
                  tirage au sort
                </a>. Et pour comprendre les maths derrière le hasard, lisez notre article sur la{" "}
                <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">
                  probabilité expliquée simplement
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

// Dice face display component
const DiceFaceDisplay = ({ face }: { face: DiceFace }) => {
  const dots = DICE_DOTS[face];
  return (
    <div className="w-full h-full p-4">
      <div className="relative w-full h-full">
        {dots.map(([row, col], i) => (
          <div
            key={i}
            className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full bg-navy-600"
            style={{
              top: `${12.5 + row * 37.5}%`,
              left: `${12.5 + col * 37.5}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DiceRoller;
