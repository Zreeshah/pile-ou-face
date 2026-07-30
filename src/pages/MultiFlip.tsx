import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { ConvergenceChart } from "@/components/ConvergenceChart";
import { BarChart3, Zap, RotateCcw, Download, TrendingUp } from "lucide-react";

type Result = "pile" | "face";

const LAST_UPDATED = "2026-07-29";

const faqItems = [
  {
    question: "Quelle est la probabilité d'obtenir pile 3 fois de suite ?",
    answer:
      "La probabilité d'obtenir pile trois fois de suite est (1/2)^3 = 1/8, soit 12,5 %. On multiplie les probabilités parce que chaque lancer est indépendant du précédent. Pour 5 piles d'affilée, la probabilité tombe à (1/2)^5 = 1/32 ≈ 3,13 %. Pour 10 piles consécutives, elle n'est plus que de 1/1024 ≈ 0,098 %.",
  },
  {
    question: "Comment fonctionne le simulateur de lancers multiples ?",
    answer:
      "Le simulateur lance la pièce le nombre de fois que vous choisissez (10, 100 ou 1000). Chaque lancer est indépendant et utilise le générateur aléatoire du navigateur. Les résultats s'affichent en temps réel avec des statistiques détaillées : pourcentage pile/face, série la plus longue et historique complet. Utilisez-le pour observer la loi des grands nombres en action.",
  },
  {
    question: "Qu'est-ce que la loi des grands nombres ?",
    answer:
      "La loi des grands nombres, formulée par Jakob Bernoulli au XVIIIe siècle, stipule que plus on répète une expérience aléatoire, plus la moyenne des résultats se rapproche de la probabilité théorique. Sur 10 lancers, vous pouvez obtenir 80 % de piles. Sur 10 000 lancers, la proportion sera extrêmement proche de 50 %. Notre simulateur vous permet de le vérifier visuellement.",
  },
  {
    question: "Quelle est la différence entre fréquence et probabilité ?",
    answer:
      "La probabilité (50 % pour pile) est la valeur théorique calculée avant l'expérience. La fréquence (par exemple 53 % de piles sur 100 lancers) est le résultat observé après l'expérience. La loi des grands nombres garantit que la fréquence converge vers la probabilité quand le nombre de lancers augmente. C'est exactement ce que montre notre simulateur.",
  },
  {
    question: "À quoi sert le suivi des séries (streaks) ?",
    answer:
      "Le compteur de séries affiche la plus longue suite de piles ou de faces consécutifs dans votre session. Les séries longues sont plus fréquentes que l'intuition ne le suggère : sur 100 lancers, il est très probable d'observer une série de 6 ou 7 résultats identiques. Observer les séries aide à comprendre le sophisme du joueur : après 5 piles, la probabilité de face reste 50 %.",
  },
  {
    question: "Qu'est-ce que la loi binomiale ?",
    answer:
      "La loi binomiale modélise le nombre de succès (par exemple, nombre de piles) dans une série de n lancers indépendants. La probabilité d'obtenir exactement k piles sur n lancers est donnée par la formule C(n,k) × (1/2)^n. Par exemple, la probabilité d'obtenir exactement 5 piles sur 10 lancers est C(10,5) × (1/2)^10 ≈ 24,6 %. Notre simulateur permet de vérifier expérimentalement ces calculs théoriques.",
  },
  {
    question: "Le générateur aléatoire est-il vraiment fiable ?",
    answer:
      "Oui. Notre simulateur utilise Math.random() du navigateur, un générateur pseudo-aléatoire éprouvé. Pour les applications nécessitant un hasard cryptographique, les navigateurs modernes proposent crypto.getRandomValues(), documenté par MDN. Les deux méthodes garantissent l'indépendance statistique des lancers. Chaque tirage est rigoureusement indépendant du précédent.",
  },
  {
    question: "Peut-on utiliser ce simulateur pour un exercice de maths ?",
    answer:
      "Absolument. Ce simulateur est conçu pour l'enseignement des probabilités. Les élèves peuvent lancer 100 ou 1000 fois, noter les fréquences, tracer des graphiques et comparer avec les probabilités théoriques. La visualisation des séries et de la convergence vers 50 % rend la loi des grands nombres concrète et compréhensible.",
  },
];

const MultiFlip = () => {
  // Cumulative counters, not a full per-flip array: stays O(1) memory even after
  // repeated 10 000× runs. Only the last 100 results are kept for the strip.
  const [piles, setPiles] = useState(0);
  const [faces, setFaces] = useState(0);
  const [recent, setRecent] = useState<Result[]>([]);
  const [longest, setLongest] = useState<{ type: "Pile" | "Face" | "-"; count: number }>({ type: "-", count: 0 });
  const [freqSeries, setFreqSeries] = useState<{ x: number; value: number; piles: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [batchSize, setBatchSize] = useState<10 | 100 | 1000 | 10000>(100);
  // Longest streak is carried across batches, so it survives cumulative runs.
  const streakRef = useRef({ cur: null as Result | null, curCount: 0, maxType: "-" as "Pile" | "Face" | "-", maxCount: 0 });

  const total = piles + faces;
  const pct = (part: number) => (total > 0 ? ((part / total) * 100).toFixed(1) : "0");
  const stats = { total, piles, faces, pilePercent: pct(piles), facePercent: pct(faces) };
  const streak = longest;

  const runBatch = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    const s = streakRef.current;
    let p = piles;
    let f = faces;
    const points = [...freqSeries];
    const rec = [...recent];
    const sampleEvery = Math.max(1, Math.floor(batchSize / 50));
    for (let i = 0; i < batchSize; i++) {
      const result: Result = Math.random() < 0.5 ? "pile" : "face";
      if (result === "pile") p++;
      else f++;
      if (result === s.cur) s.curCount++;
      else { s.cur = result; s.curCount = 1; }
      if (s.curCount > s.maxCount) { s.maxCount = s.curCount; s.maxType = result === "pile" ? "Pile" : "Face"; }
      rec.push(result);
      if (i % sampleEvery === 0) points.push({ x: p + f, value: (p / (p + f)) * 100, piles: p });
    }
    points.push({ x: p + f, value: (p / (p + f)) * 100, piles: p });
    setPiles(p);
    setFaces(f);
    setRecent(rec.slice(-100));
    setLongest({ type: s.maxType, count: s.maxCount });
    setFreqSeries(points.slice(-200));
    setIsRunning(false);
  }, [isRunning, piles, faces, freqSeries, recent, batchSize]);

  const reset = () => {
    setPiles(0);
    setFaces(0);
    setRecent([]);
    setFreqSeries([]);
    setLongest({ type: "-", count: 0 });
    streakRef.current = { cur: null, curCount: 0, maxType: "-", maxCount: 0 };
  };

  const exportCsv = () => {
    const header = "lancer;piles;faces;frequence_pile_%";
    const body = freqSeries.map((pt) => `${pt.x};${pt.piles};${pt.x - pt.piles};${pt.value.toFixed(3).replace(".", ",")}`);
    const csv = [header, ...body].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "pile-ou-face-frequences.csv";
    a.click();
    URL.revokeObjectURL(url);
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

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simulateur de lancers multiples de pile ou face",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: "https://pile-ouface.fr/pile-ou-face-plusieurs-lancers/",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <Layout>
      <SEO
        title="Probabilité Pile ou Face – Simulation Lancer de Pièce (10, 100, 1000 fois)"
        description="Simulez 10, 100 ou 1000 lancers de pièce. Statistiques en direct, série la plus longue, loi des grands nombres. Idéal pour les cours de probabilité et les exercices de maths."
        canonicalUrl="/pile-ou-face-plusieurs-lancers"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Probabilité Pile ou Face – Simulation Lancer de Pièce"
        description="Simulation de lancers multiples de pile ou face avec statistiques, fréquence, loi des grands nombres et loi binomiale."
        url="/pile-ou-face-plusieurs-lancers"
        dateModified={LAST_UPDATED}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Probabilité pile ou face
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Simulation de lancers (10, 100, 1000)
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up">
              Simulez <strong>10, 100 ou 1000 lancers de pièce</strong> et observez la loi des grands nombres en action. Statistiques en direct, fréquence, séries et convergence vers 50 %.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Mis à jour le <time dateTime={LAST_UPDATED}>29 juillet 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-6 md:p-10">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                {([10, 100, 1000, 10000] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setBatchSize(size)}
                    disabled={isRunning}
                    className={`px-4 sm:px-6 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all ${
                      batchSize === size
                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                    } disabled:opacity-50`}
                  >
                    {size.toLocaleString("fr-FR")}×
                  </button>
                ))}
              </div>

              {total > 0 && (
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

              {total > 0 && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary font-medium">Pile {stats.pilePercent}%</span>
                    <span className="text-navy-400 font-medium">Face {stats.facePercent}%</span>
                  </div>
                  <div className="h-4 rounded-full bg-muted overflow-hidden flex">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${stats.pilePercent}%` }} />
                    <div className="h-full bg-navy-400 transition-all duration-300" style={{ width: `${stats.facePercent}%` }} />
                  </div>
                </div>
              )}

              {total > 0 && (
                <div className="mb-8 animate-fade-in">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Fréquence de pile — convergence vers 50 %
                  </h3>
                  <ConvergenceChart data={freqSeries} target={50} targetLabel="50 %" yLabel="Fréquence de pile" />
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <button onClick={runBatch} disabled={isRunning} className="btn-flip flex items-center gap-2 disabled:opacity-50">
                  <Zap className="w-5 h-5" /> Lancer {batchSize.toLocaleString("fr-FR")} fois
                </button>
                {total > 0 && (
                  <>
                    <button onClick={exportCsv} className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" /> Exporter en CSV
                    </button>
                    <button onClick={reset} className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" /> Réinitialiser
                    </button>
                  </>
                )}
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Pour le calcul exact d'un nombre de piles donné, voir la{" "}
                <Link to="/probabilite-pile-ou-face" className="text-primary hover:underline">probabilité au pile ou face</Link>.
              </p>

              {total > 0 && (
                <div className="animate-fade-in">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Historique des {Math.min(total, 100)} derniers lancers
                  </h3>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 bg-muted/30 rounded-xl">
                    {recent.slice().reverse().map((r, i) => (
                      <span key={i} className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                        r === "pile" ? "bg-primary/20 text-primary" : "bg-navy-400/20 text-navy-400"
                      }`}>
                        {r === "pile" ? "P" : "F"}
                      </span>
                    ))}
                  </div>
                  {total > 100 && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Affichage des 100 derniers lancers sur {total} au total
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-6">
              <p className="font-display font-semibold mb-3">Sommaire</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["#probabilite", "La probabilité pile ou face expliquée"],
                  ["#loi-grands-nombres", "La loi des grands nombres en action"],
                  ["#loi-binomiale", "Loi binomiale et simulation"],
                  ["#series", "Séries de piles consécutives"],
                  ["#frequence", "Fréquence et probabilité : la différence"],
                  ["#exercices", "Exercices de probabilité corrigés"],
                  ["#faq", "Questions fréquentes"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Probabilité expliquée */}
      <section id="probabilite" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              La probabilité pile ou face expliquée simplement
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                La <strong>probabilité pile ou face</strong> est le premier exemple que l'on rencontre en cours de mathématiques, et pour cause : c'est le modèle probabiliste le plus simple qui soit. Une pièce équilibrée possède deux faces. Chaque face a donc une chance sur deux de sortir. On écrit : <strong>P(pile) = 1/2 = 50 %</strong>.
              </p>
              <p>
                Cette simplicité apparente cache une richesse mathématique considérable. En lançant une pièce <strong>10 fois, 100 fois ou 1000 fois</strong>, on peut observer des phénomènes fascinants : la convergence des fréquences vers 50 %, l'apparition de longues séries consécutives, et la vérification expérimentale de la loi binomiale.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Nombre de lancers</th><th className="text-left py-2 px-3 font-semibold">Probabilité de n piles consécutifs</th><th className="text-left py-2 px-3 font-semibold">Pourcentage</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">1</td><td className="py-2 px-3 font-mono">(1/2)¹</td><td className="py-2 px-3">50 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">2</td><td className="py-2 px-3 font-mono">(1/2)²</td><td className="py-2 px-3">25 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">3</td><td className="py-2 px-3 font-mono">(1/2)³</td><td className="py-2 px-3">12,5 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">5</td><td className="py-2 px-3 font-mono">(1/2)⁵</td><td className="py-2 px-3">3,13 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">10</td><td className="py-2 px-3 font-mono">(1/2)¹⁰</td><td className="py-2 px-3">0,098 %</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Pour calculer la <strong>probabilité d'obtenir pile 3 fois de suite</strong>, on multiplie simplement : (1/2) × (1/2) × (1/2) = 1/8 = 12,5 %. Cette règle de multiplication fonctionne parce que chaque lancer est <strong>indépendant</strong> : le résultat d'un lancer n'influence jamais le résultat du suivant. C'est cette indépendance qui est au cœur de tous les calculs de probabilité, et c'est aussi la raison pour laquelle le{" "}
                <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">sophisme du joueur</a>{" "}
                est une erreur : après 5 piles d'affilée, la probabilité de face au sixième lancer reste exactement de 50 %.
              </p>
              <p>
                Pour approfondir ces notions, lisez notre article complet sur la{" "}
                <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">probabilité pile ou face : le calcul expliqué simplement</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loi des grands nombres */}
      <section id="loi-grands-nombres" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              La loi des grands nombres en action
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                La <strong>loi des grands nombres</strong> est l'un des théorèmes les plus importants des probabilités. Formulée par le mathématicien suisse <strong>Jakob Bernoulli</strong> au début du XVIIIe siècle, elle stipule que lorsqu'on répète une expérience aléatoire un grand nombre de fois, la fréquence observée se rapproche de la probabilité théorique.
              </p>
              <p>
                Concrètement, si vous lancez une pièce <strong>10 fois</strong>, il est tout à fait possible d'obtenir 7 piles et 3 faces (soit 70 % de piles). Sur <strong>100 lancers</strong>, l'écart-type diminue et la proportion se rapproche de 50 %. Sur <strong>1000 lancers</strong>, la fréquence sera extrêmement proche de la probabilité théorique de 50 %.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Nombre de lancers</th><th className="text-left py-2 px-3 font-semibold">Écart-type attendu</th><th className="text-left py-2 px-3 font-semibold">Intervalle de confiance (95 %)</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">10</td><td className="py-2 px-3 font-mono">±15,8 %</td><td className="py-2 px-3">19 % à 81 % de piles</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">100</td><td className="py-2 px-3 font-mono">±5,0 %</td><td className="py-2 px-3">40 % à 60 % de piles</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">1 000</td><td className="py-2 px-3 font-mono">±1,6 %</td><td className="py-2 px-3">46,8 % à 53,2 % de piles</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">10 000</td><td className="py-2 px-3 font-mono">±0,5 %</td><td className="py-2 px-3">49,0 % à 51,0 % de piles</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Utilisez le simulateur ci-dessus pour vérifier cette loi par vous-même. Lancez <strong>1000 fois</strong> et observez la barre de progression : elle sera très proche de 50/50. Relancez plusieurs fois pour constater que les résultats sont toujours dans l'intervalle prédit par la théorie.
              </p>
              <p>
                Cette convergence est au cœur de notre compréhension du hasard. Elle explique pourquoi les casinos gagnent toujours à long terme (leur avantage statistique se matérialise sur des millions de parties), et pourquoi un simulateur comme le nôtre produit des résultats de plus en plus équilibrés avec le nombre de lancers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loi binomiale */}
      <section id="loi-binomiale" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Loi binomiale et simulation en ligne
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                La <strong>loi binomiale</strong> est le modèle mathématique qui décrit le nombre de succès dans une série d'épreuves indépendantes. Dans le cas du pile ou face, un « succès » peut être défini comme l'obtention de pile. La probabilité d'obtenir exactement k piles sur n lancers est donnée par la formule :
              </p>
              <p className="text-center font-mono text-lg py-4 bg-muted/30 rounded-xl">
                P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
              </p>
              <p>
                Où C(n,k) est le coefficient binomial (« k parmi n ») et p = 0,5 pour une pièce équilibrée. Par exemple, la <strong>probabilité d'obtenir exactement 5 piles sur 10 lancers</strong> est C(10,5) × (0,5)^10 = 252/1024 ≈ 24,6 %. C'est le résultat le plus probable, mais il ne se produit que dans un quart des séries de 10 lancers.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">k (nombre de piles)</th><th className="text-left py-2 px-3 font-semibold">Probabilité sur 10 lancers</th><th className="text-left py-2 px-3 font-semibold">Probabilité sur 100 lancers</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">0</td><td className="py-2 px-3">0,10 %</td><td className="py-2 px-3">≈ 0 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">1</td><td className="py-2 px-3">0,98 %</td><td className="py-2 px-3">≈ 0 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">3</td><td className="py-2 px-3">11,7 %</td><td className="py-2 px-3">≈ 0 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">5</td><td className="py-2 px-3 font-bold">24,6 %</td><td className="py-2 px-3">≈ 0 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">50</td><td className="py-2 px-3">-</td><td className="py-2 px-3 font-bold">8,0 %</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Notre <strong>simulation loi binomiale en ligne</strong> vous permet de vérifier expérimentalement ces probabilités théoriques. Lancez 100 fois et comptez le nombre de piles : vous obtiendrez rarement exactement 50, mais la valeur observée sera généralement comprise entre 40 et 60, conformément à la loi binomiale. Pour les exercices de probabilité au lycée, cette simulation est un complément idéal au calcul théorique.
              </p>
              <p>
                Cette approche est directement applicable aux <strong>exercices de probabilité pile ou face en 3ème et en seconde</strong>. Les élèves peuvent d'abord calculer la probabilité théorique avec un arbre de probabilité, puis vérifier le résultat avec le simulateur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Séries */}
      <section id="series" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Séries de piles consécutives : probabilité et psychologie
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Les <strong>séries de piles consécutives</strong> sont l'un des aspects les plus contre-intuitifs du hasard. Sur 100 lancers, quelle est la plus longue série de piles à laquelle vous pouvez vous attendre ? La réponse est environ 6 ou 7 — bien plus que ce que l'intuition suggère.
              </p>
              <p>
                La probabilité d'observer une série d'au moins k piles consécutifs sur n lancers est donnée par une formule plus complexe faisant intervenir les nombres de Fibonacci. Mais on peut retenir une règle simple : sur n lancers, la plus longue série attendue est d'environ log₂(n). Ainsi :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sur <strong>10 lancers</strong> : série attendue d'environ 3</li>
                <li>Sur <strong>100 lancers</strong> : série attendue d'environ 6 à 7</li>
                <li>Sur <strong>1000 lancers</strong> : série attendue d'environ 9 à 10</li>
              </ul>
              <p>
                Le simulateur affiche automatiquement la <strong>série la plus longue</strong> de votre session. Utilisez-le pour vérifier ces prédictions : lancez 100 fois et vous verrez presque toujours apparaître une série de 5 piles ou faces consécutifs, parfois 6 ou 7.
              </p>
              <p>
                C'est précisément cette abondance de séries qui alimente le <strong>sophisme du joueur</strong>. Quand un joueur voit 5 rouges d'affilée à la roulette, il pense que le noir est « dû » — alors que les séries longues sont parfaitement normales dans un processus aléatoire. Pour comprendre ce biais cognitif en détail, lisez notre article sur le{" "}
                <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">sophisme du joueur expliqué simplement</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fréquence vs probabilité */}
      <section id="frequence" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Fréquence et probabilité : comprendre la différence
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                La <strong>différence entre fréquence et probabilité</strong> est une notion fondamentale en statistiques, souvent source de confusion chez les élèves.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>La probabilité</strong> est une valeur théorique, calculée avant l'expérience. Pour une pièce équilibrée, P(pile) = 0,5. C'est un nombre fixe, déterminé par la structure du problème.</li>
                <li><strong>La fréquence</strong> est une valeur observée, calculée après l'expérience. Si vous obtenez 53 piles sur 100 lancers, la fréquence est de 0,53. Elle varie d'une expérience à l'autre.</li>
              </ul>
              <p>
                La loi des grands nombres établit le pont entre ces deux notions : quand le nombre de lancers tend vers l'infini, la fréquence converge vers la probabilité. C'est exactement ce que vous pouvez observer avec notre simulateur : après 10 lancers, la fréquence peut être loin de 50 % ; après 1000 lancers, elle en est très proche.
              </p>
              <p>
                Cette distinction est cruciale pour comprendre pourquoi <strong>pile ou face 1000 lancers statistiques</strong> donnent des résultats bien plus fiables que 10 lancers. Pour les travaux pratiques de mathématiques, nous recommandons de toujours effectuer au moins 100 lancers pour obtenir des fréquences significatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercices */}
      <section id="exercices" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Exercices de probabilité pile ou face corrigés
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Voici trois exercices de probabilité que vous pouvez résoudre avec l'aide du simulateur. Ces exercices sont adaptés au niveau <strong>3ème et seconde</strong>.
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Exercice 1 — Arbre de probabilité</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  On lance une pièce 3 fois de suite. Dessinez l'arbre de probabilité et calculez la probabilité d'obtenir exactement 2 piles.
                </p>
                <p className="text-sm text-muted-foreground/70 bg-muted/30 p-3 rounded-lg">
                  <strong>Corrigé :</strong> L'arbre compte 8 branches (2³). Les combinaisons avec exactement 2 piles sont : PPF, PFP, FPP. Soit 3 cas sur 8. Probabilité = 3/8 = 37,5 %. Vérifiez avec le simulateur : lancez 1000 fois et comptez le nombre de séries de 3 lancers contenant exactement 2 piles.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Exercice 2 — Loi des grands nombres</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Utilisez le simulateur pour lancer une pièce 10 fois, puis 100 fois, puis 1000 fois. Notez la fréquence de pile à chaque étape. Que constatez-vous ?
                </p>
                <p className="text-sm text-muted-foreground/70 bg-muted/30 p-3 rounded-lg">
                  <strong>Corrigé :</strong> Après 10 lancers, la fréquence peut être très éloignée de 50 % (par exemple 70 %). Après 100 lancers, elle se rapproche (par exemple 53 %). Après 1000 lancers, elle est très proche de 50 % (par exemple 50,3 %). C'est l'illustration de la loi des grands nombres : plus n augmente, plus la fréquence converge vers la probabilité théorique.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Exercice 3 — Simulation loi binomiale</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Calculez la probabilité théorique d'obtenir exactement 5 piles sur 10 lancers, puis vérifiez avec le simulateur en répétant l'expérience 10 fois (soit 100 lancers au total).
                </p>
                <p className="text-sm text-muted-foreground/70 bg-muted/30 p-3 rounded-lg">
                  <strong>Corrigé :</strong> Probabilité théorique = C(10,5) × (0,5)^10 = 252/1024 ≈ 24,6 %. Avec le simulateur, lancez 10 fois le batch de 10 lancers et comptez combien de séries contiennent exactement 5 piles. Sur 10 séries, attendez-vous à en voir 2 ou 3 (environ 24,6 % de 10).
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Pour plus d'exercices et une explication détaillée des calculs, consultez notre{" "}
                <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">guide complet sur la probabilité pile ou face</a>.
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
              Questions fréquentes sur la probabilité pile ou face
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details key={index} className="group bg-card rounded-xl px-6 border border-border shadow-sm" open={index === 0}>
                  <summary className="cursor-pointer list-none text-left font-medium py-5 flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium">{item.question}</h3>
                    <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                  </summary>
                  <p className="text-muted-foreground pb-5 leading-relaxed">{item.answer}</p>
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
