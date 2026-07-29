import { useState, useCallback, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { BarChart3, TrendingUp, Zap, RotateCcw } from "lucide-react";

type Result = "pile" | "face";
type FlipHistory = { result: Result; id: number };

const LAST_UPDATED = "2026-07-29";

const faqItems = [
  {
    question: "Comment fonctionne le simulateur de lancers multiples ?",
    answer:
      "Le simulateur lance la pièce le nombre de fois que vous choisissez (10, 100 ou 1000). Chaque lancer est indépendant et utilise le générateur aléatoire du navigateur. Les résultats s'affichent en temps réel avec des statistiques détaillées : pourcentage pile/face, séquence la plus longue, et historique complet.",
  },
  {
    question: "Les résultats sont-ils vraiment aléatoires ?",
    answer:
      "Oui. Chaque lancer utilise Math.random() du navigateur, ce qui garantit l'indépendance statistique. Obtenir 10 piles d'affilée est rare (1 chance sur 1024) mais possible, et cela ne change jamais les probabilités du lancer suivant.",
  },
  {
    question: "Quelle est la probabilité d'obtenir exactement 5 piles sur 10 lancers ?",
    answer:
      "La probabilité d'obtenir exactement 5 piles sur 10 lancers est d'environ 24,6 %. C'est le résultat le plus probable, mais il ne se produit que dans environ un quart des séries de 10 lancers.",
  },
  {
    question: "À quoi sert le suivi des séries (streaks) ?",
    answer:
      "Le compteur de séries affiche la plus longue suite de piles ou de faces consécutifs dans votre session. C'est utile pour les cours de probabilité, pour visualiser la loi des grands nombres, ou simplement pour observer les patterns du hasard.",
  },
  {
    question: "Puis-je télécharger ou exporter les résultats ?",
    answer:
      "Pour l'instant, les résultats sont affichés directement sur la page. Vous pouvez les copier ou faire une capture d'écran. Une fonction d'export CSV est prévue dans une prochaine mise à jour.",
  },
  {
    question: "Quelle est la différence avec le simulateur simple ?",
    answer:
      "Le simulateur simple permet un lancer à la fois avec une animation de pièce. Le simulateur multiple permet de lancer 10, 100 ou 1000 fois d'un coup, avec des statistiques complètes : pourcentages, graphique, séries et historique. C'est l'outil idéal pour les enseignants, les étudiants en probabilité et les curieux.",
  },
];

const MultiFlip = () => {
  const [history, setHistory] = useState<FlipHistory[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [batchSize, setBatchSize] = useState<10 | 100 | 1000>(10);
  const idRef = useRef(0);

  const stats = {
    total: history.length,
    piles: history.filter((h) => h.result === "pile").length,
    faces: history.filter((h) => h.result === "face").length,
    pilePercent: history.length > 0
      ? ((history.filter((h) => h.result === "pile").length / history.length) * 100).toFixed(1)
      : "0",
    facePercent: history.length > 0
      ? ((history.filter((h) => h.result === "face").length / history.length) * 100).toFixed(1)
      : "0",
  };

  const longestStreak = useCallback(() => {
    if (history.length === 0) return { type: "-", count: 0 };
    let maxStreak = 0;
    let currentStreak = 1;
    let maxType: Result = history[0].result;
    let currentType = history[0].result;

    for (let i = 1; i < history.length; i++) {
      if (history[i].result === currentType) {
        currentStreak++;
      } else {
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
          maxType = currentType;
        }
        currentStreak = 1;
        currentType = history[i].result;
      }
    }
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxType = currentType;
    }
    return { type: maxType === "pile" ? "Pile" : "Face", count: maxStreak };
  }, [history]);

  const streak = longestStreak();

  const runBatch = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);

    const newHistory: FlipHistory[] = [];
    for (let i = 0; i < batchSize; i++) {
      const result: Result = Math.random() < 0.5 ? "pile" : "face";
      newHistory.push({ result, id: idRef.current++ });
    }
    setHistory((prev) => [...prev, ...newHistory]);
    setIsRunning(false);
  }, [batchSize, isRunning]);

  const reset = () => {
    setHistory([]);
    idRef.current = 0;
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
        title="Pile ou Face – Plusieurs Lancers (10, 100, 1000)"
        description="Lancez une pièce 10, 100 ou 1000 fois. Statistiques en direct, suivi des séries, probabilité pile ou face. Idéal pour les cours et les curieux."
        canonicalUrl="/pile-ou-face-plusieurs-lancers"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Pile ou Face – Plusieurs Lancers"
        description="Simulateur de lancers multiples de pile ou face avec statistiques."
        url="/pile-ou-face-plusieurs-lancers"
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
              Pile ou face – Plusieurs lancers
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                10, 100 ou 1000 fois
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up">
              Lancez une pièce en série et obtenez des <strong>statistiques complètes</strong> : pourcentage pile/face, série la plus longue et historique détaillé.
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-6 md:p-10">
              {/* Batch size selector */}
              <div className="flex justify-center gap-3 mb-8">
                {([10, 100, 1000] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setBatchSize(size)}
                    disabled={isRunning}
                    className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all ${
                      batchSize === size
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    } disabled:opacity-50`}
                  >
                    {size}×
                  </button>
                ))}
              </div>

              {/* Stats cards */}
              {history.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 animate-fade-in">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stats.pilePercent}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Pile ({stats.piles})</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-navy-400">{stats.facePercent}%</p>
                    <p className="text-xs text-muted-foreground mt-1">Face ({stats.faces})</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {streak.count > 0 ? streak.count : "-"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Série max ({streak.type})
                    </p>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {history.length > 0 && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary font-medium">Pile {stats.pilePercent}%</span>
                    <span className="text-navy-400 font-medium">Face {stats.facePercent}%</span>
                  </div>
                  <div className="h-4 rounded-full bg-muted overflow-hidden flex">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${stats.pilePercent}%` }}
                    />
                    <div
                      className="h-full bg-navy-400 transition-all duration-300"
                      style={{ width: `${stats.facePercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={runBatch}
                  disabled={isRunning}
                  className="btn-flip flex items-center gap-2 disabled:opacity-50"
                >
                  <Zap className="w-5 h-5" />
                  Lancer {batchSize} fois
                </button>
                {history.length > 0 && (
                  <button
                    onClick={reset}
                    className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* History grid */}
              {history.length > 0 && (
                <div className="animate-fade-in">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Historique des {Math.min(history.length, 100)} derniers lancers
                  </h3>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-muted/30 rounded-xl">
                    {history.slice(-100).reverse().map((flip) => (
                      <span
                        key={flip.id}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                          flip.result === "pile"
                            ? "bg-primary/20 text-primary"
                            : "bg-navy-400/20 text-navy-400"
                        }`}
                      >
                        {flip.result === "pile" ? "P" : "F"}
                      </span>
                    ))}
                  </div>
                  {history.length > 100 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Affichage des 100 derniers lancers sur {history.length} au total
                    </p>
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
              Pourquoi lancer plusieurs fois ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Lancer une pièce une seule fois donne un résultat binaire : pile ou face. Mais quand on lance <strong>10, 100 ou 1000 fois</strong>, on commence à voir émerger les vraies lois du hasard. C'est la <strong>loi des grands nombres</strong> : plus on lance, plus la proportion de piles et de faces se rapproche de 50/50.
              </p>
              <p>
                Ce simulateur de lancers multiples est conçu pour les <strong>enseignants de mathématiques</strong> qui veulent illustrer la probabilité, les <strong>étudiants</strong> qui révisent les statistiques, et tous les <strong>curieux</strong> qui veulent voir le hasard à l'œuvre. Le suivi des séries (streaks) permet aussi d'observer un phénomène fascinant : même avec une probabilité de 50 %, des séries de 5, 6 ou 7 résultats identiques d'affilée sont plus fréquentes qu'on ne le pense.
              </p>
              <p>
                Pour aller plus loin, découvrez notre article complet sur la{" "}
                <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">
                  probabilité du pile ou face expliquée simplement
                </a>{" "}
                et le{" "}
                <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">
                  sophisme du joueur
                </a>{" "}
                qui explique pourquoi on croit à tort qu'après 5 piles, le face est « dû ».
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

export default MultiFlip;
