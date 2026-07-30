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
    question: "Le dé en ligne est-il vraiment aléatoire et équitable ?",
    answer:
      "Oui. Contrairement à un dé physique qui peut avoir des imperfections (poids inégal, coins arrondis, usure), le dé numérique est parfaitement équitable. Chaque face a exactement 1/6 de chances de sortir. Le générateur Math.random() du navigateur assure cette équité mathématique à chaque lancer.",
  },
  {
    question: "Peut-on lancer plusieurs dés à la fois ?",
    answer:
      "Pour l'instant, l'outil lance un seul dé à la fois. Vous pouvez relancer autant de fois que vous voulez. L'historique vous montre la somme cumulée de tous vos lancers. Une version avec plusieurs dés (2 dés, 3 dés) est en développement pour les jeux de société et les jeux de rôle.",
  },
  {
    question: "Quelle est la probabilité d'obtenir un 6 ?",
    answer:
      "La probabilité d'obtenir un 6 sur un lancer est de 1/6, soit environ 16,67 %. Sur deux lancers, la probabilité d'obtenir au moins un 6 est de 1 - (5/6)² ≈ 30,6 %. Sur trois lancers, elle monte à 1 - (5/6)³ ≈ 42,1 %. Consultez notre article sur les probabilités pour approfondir.",
  },
  {
    question: "Le dé en ligne fonctionne-t-il sur mobile ?",
    answer:
      "Oui, le dé en ligne est entièrement responsive. Il fonctionne sur iPhone, Android, tablette et ordinateur. L'interface s'adapte à la taille de votre écran et le lancer se fait d'un simple tap. Aucune application à installer.",
  },
  {
    question: "Quelle est la différence avec un dé physique ?",
    answer:
      "Le dé en ligne est toujours disponible (pas besoin d'avoir un dé sur soi), parfaitement équitable (pas d'usure ni d'imperfection), et garde un historique de vos lancers avec statistiques. En revanche, il n'a pas le plaisir tactile d'un vrai dé. Pour les jeux de société, beaucoup de joueurs utilisent les deux selon la situation.",
  },
  {
    question: "Google propose-t-il un lancer de dé ?",
    answer:
      "Oui, Google propose un lancer de dé intégré dans ses résultats de recherche. Tapez « lancer le dé » ou « dice roller » dans Google pour voir apparaître un dé interactif. Cependant, le dé Google ne propose ni historique, ni suivi des statistiques, ni distribution des faces. Notre simulateur offre une expérience plus complète et dédiée.",
  },
  {
    question: "Peut-on truquer le résultat d'un dé en ligne ?",
    answer:
      "Non. Le résultat est généré par un algorithme mathématique impartial. Contrairement à un dé physique qu'un manipulateur habile pourrait influencer, le dé numérique ne peut pas être truqué. Chaque lancer est strictement indépendant et équiprobable.",
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
        title="Dé en Ligne – Lancez un Dé Virtuel Gratuit"
        description="Simulateur de dé en ligne gratuit et équitable de 1 à 6 avec historique et statistiques."
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
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up">
              Un <strong>dé virtuel gratuit</strong>, équitable et toujours disponible. Chaque face a exactement 1 chance sur 6.
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

              <div className="text-center mb-8 h-16">
                {result && !isRolling && (
                  <div className="animate-scale-in">
                    <p className="text-3xl font-display font-bold text-foreground">{result}</p>
                  </div>
                )}
                {isRolling && (
                  <p className="text-xl text-muted-foreground animate-pulse">Le dé roule...</p>
                )}
                {!result && !isRolling && (
                  <p className="text-lg text-muted-foreground">Cliquez sur le dé pour lancer</p>
                )}
              </div>

              <div className="flex justify-center gap-4 mb-8">
                <button onClick={rollDice} disabled={isRolling} className="btn-flip flex items-center gap-2 disabled:opacity-50">
                  <Dices className="w-5 h-5" /> Lancer le dé
                </button>
                {totalRolls > 0 && (
                  <button onClick={reset} className="px-5 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>

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
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <History className="w-4 h-4" /> Distribution des faces
                    </h3>
                    <div className="space-y-1.5">
                      {([1, 2, 3, 4, 5, 6] as DiceFace[]).map((face) => {
                        const count = stats.distribution[face];
                        const pct = totalRolls > 0 ? (count / totalRolls) * 100 : 0;
                        return (
                          <div key={face} className="flex items-center gap-2">
                            <span className="w-6 text-sm font-mono text-muted-foreground text-right">{face}</span>
                            <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full transition-all duration-300 min-w-[2px]" style={{ width: `${Math.max(pct, 1)}%` }} />
                            </div>
                            <span className="w-8 text-xs text-muted-foreground text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {history.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Derniers lancers</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[...history].reverse().map((h, i) => (
                          <span key={i} className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 text-sm font-bold">{h}</span>
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

      {/* Table of contents */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-6">
              <p className="font-display font-semibold mb-3">Sommaire</p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["#definition", "Qu'est-ce qu'un dé en ligne ?"],
                  ["#utilisation", "Comment utiliser notre dé virtuel ?"],
                  ["#probabilites", "Probabilités du dé : le calcul simple"],
                  ["#google", "Lancer le dé Google vs notre simulateur"],
                  ["#avantages", "Pourquoi utiliser un dé numérique ?"],
                  ["#situations", "Dans quelles situations lancer un dé ?"],
                  ["#faq", "Questions fréquentes"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="text-primary hover:underline">{label}</a>
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
              Qu'est-ce qu'un dé en ligne ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Un <strong>dé en ligne</strong> est un simulateur numérique qui reproduit le lancer d'un dé physique à six faces. Au lieu de jeter un cube en plastique sur une table, vous cliquez sur un bouton et obtenez instantanément un résultat aléatoire entre 1 et 6. Le principe est exactement le même que celui d'un vrai dé : chaque face a une probabilité identique de 1/6, soit environ <strong>16,67 %</strong>.
              </p>
              <p>
                Les dés existent depuis plus de 5 000 ans. Les plus anciens spécimens ont été découverts dans des tombes de la civilisation de l'Indus, au Pakistan actuel, et datent d'environ 3000 avant J.-C. Les Égyptiens, les Grecs et les Romains utilisaient déjà des dés pour jouer et pour prendre des décisions. Le mot « dé » vient du latin <em>datum</em>, qui signifie « donné » — ce qui est donné par le sort.
              </p>
              <p>
                Aujourd'hui, le <strong>dé virtuel</strong> reprend cette tradition millénaire et la rend accessible partout, sur n'importe quel appareil. Plus besoin de chercher un dé dans un tiroir : il suffit d'ouvrir cette page dans votre navigateur. Le résultat est instantané, l'outil est gratuit, et vous pouvez l'utiliser autant de fois que vous le souhaitez.
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
              Comment utiliser notre dé virtuel ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Utiliser notre simulateur de dé en ligne est aussi simple que de lancer un vrai dé — en plus rapide. Voici les trois étapes pour commencer :
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 1 — Cliquez sur le dé</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cliquez directement sur le dé affiché à l'écran ou appuyez sur le bouton « Lancer le dé ». Aucune inscription, aucun téléchargement et aucune application ne sont nécessaires. L'outil fonctionne directement dans votre navigateur.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 2 — Lisez le résultat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le résultat s'affiche instantanément avec une animation réaliste. Vous voyez un nombre entre 1 et 6, ainsi que les points correspondants sur la face du dé. Le résultat est 100 % aléatoire et chaque lancer est indépendant du précédent.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 3 — Consultez vos statistiques</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Après plusieurs lancers, vous pouvez consulter la <strong>distribution des faces</strong>, le nombre total de lancers, la somme et la moyenne. Ces statistiques vous aident à visualiser la loi des grands nombres en action : plus vous lancez, plus chaque face se rapproche de 16,67 %.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Probabilités */}
      <section id="probabilites" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Probabilités du dé : le calcul simple
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Comprendre les <strong>probabilités d'un dé</strong> est encore plus simple que celles du pile ou face. Un dé standard possède six faces numérotées de 1 à 6. Chaque face a exactement la même chance de sortir, soit <strong>1/6</strong> (environ 16,67 %).
              </p>
              <p>
                Voici les probabilités pour les situations les plus courantes :
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Situation</th><th className="text-left py-2 px-3 font-semibold">Calcul</th><th className="text-left py-2 px-3 font-semibold">Probabilité</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">Obtenir un 6</td><td className="py-2 px-3 font-mono">1/6</td><td className="py-2 px-3">16,67 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Obtenir un nombre pair</td><td className="py-2 px-3 font-mono">3/6</td><td className="py-2 px-3">50 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Obtenir un 6 deux fois de suite</td><td className="py-2 px-3 font-mono">(1/6)²</td><td className="py-2 px-3">2,78 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Au moins un 6 en deux lancers</td><td className="py-2 px-3 font-mono">1 - (5/6)²</td><td className="py-2 px-3">30,56 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Faire un double avec deux dés</td><td className="py-2 px-3 font-mono">6/36</td><td className="py-2 px-3">16,67 %</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Somme de 7 avec deux dés</td><td className="py-2 px-3 font-mono">6/36</td><td className="py-2 px-3">16,67 %</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Comme pour le <strong>pile ou face</strong>, chaque lancer de dé est <strong>indépendant</strong>. Obtenir trois 6 d'affilée ne rend pas le 6 moins probable au quatrième lancer : la probabilité reste toujours de 1/6. C'est une erreur classique appelée le{" "}
                <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">sophisme du joueur</a>.
              </p>
              <p>
                Pour approfondir le calcul des probabilités, consultez notre guide complet sur la{" "}
                <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">probabilité expliquée simplement</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Google comparison */}
      <section id="google" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Lancer le dé Google vs notre simulateur
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Saviez-vous que Google propose un <strong>lancer de dé</strong> directement dans ses résultats de recherche ? Tapez « lancer le dé » ou « dice roller » dans la barre de recherche Google, et un dé interactif apparaît en haut des résultats. C'est pratique, rapide et gratuit. Mais comment se compare-t-il à un simulateur dédié comme le nôtre ?
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Fonctionnalité</th><th className="text-left py-2 px-3 font-semibold">Dé Google</th><th className="text-left py-2 px-3 font-semibold">Notre simulateur</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">Lancer unique</td><td className="py-2 px-3">✅</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Animation visuelle</td><td className="py-2 px-3">✅</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Historique des lancers</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Statistiques (distribution)</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Somme et moyenne</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Fonctionne hors ligne</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Sans publicité</td><td className="py-2 px-3">✅</td><td className="py-2 px-3">✅</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Interface en français</td><td className="py-2 px-3">✅</td><td className="py-2 px-3">✅</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Le <strong>lancer le dé Google</strong> est parfait pour un usage ultra-rapide : vous voulez un résultat en deux secondes sans quitter la page de résultats. Mais dès que vous avez besoin de suivre vos lancers, d'analyser la distribution des faces ou d'utiliser le dé pour un exercice de probabilité, notre simulateur offre une expérience nettement plus complète. Pour en savoir plus sur les outils Google, lisez notre article{" "}
                <a href="/blog/pile-ou-face-google" className="text-primary hover:underline">pile ou face Google</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Pourquoi utiliser un dé numérique ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le <strong>dé en ligne</strong> présente plusieurs avantages par rapport à un dé physique traditionnel.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Toujours disponible :</strong> Pas besoin d'avoir un dé dans la poche. Votre navigateur web devient votre dé, accessible sur ordinateur, tablette ou smartphone, à tout moment.</li>
                <li><strong>Parfaitement équitable :</strong> Un dé physique peut présenter des micro-imperfections de fabrication, des coins arrondis par l'usure ou des faces légèrement plus lourdes. Le dé numérique, lui, est mathématiquement parfait : 1/6 pour chaque face, sans exception.</li>
                <li><strong>Statistiques intégrées :</strong> Notre outil enregistre automatiquement chaque lancer et affiche la distribution des faces, le nombre total de lancers, la somme et la moyenne. Idéal pour les exercices de mathématiques ou pour les curieux.</li>
                <li><strong>Silencieux et discret :</strong> Pas de bruit de dé qui roule sur la table. Parfait pour une utilisation en réunion, en classe ou dans un lieu public.</li>
                <li><strong>Gratuit et sans inscription :</strong> Aucun compte à créer, aucune donnée personnelle collectée. L'outil fonctionne directement, gratuitement, pour toujours.</li>
              </ul>
              <p>
                Pour les décisions à deux options, notre{" "}
                <a href="/" className="text-primary hover:underline">simulateur de pile ou face</a>{" "}
                est plus adapté. Pour choisir parmi une liste de noms, essayez le{" "}
                <a href="/tirage-au-sort" className="text-primary hover:underline">tirage au sort en ligne</a>.
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
              Dans quelles situations utiliser un dé en ligne ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Le dé virtuel n'est pas seulement un gadget : c'est un outil pratique dans de nombreuses situations du quotidien.
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Jeux de société</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vous avez perdu le dé de votre Monopoly ? Vous jouez aux petits chevaux et le dé est tombé sous le canapé ? Le dé en ligne est le sauveur des soirées jeux. Il remplace n'importe quel dé standard à six faces et fonctionne sur le téléphone de chaque joueur.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Jeux de rôle (JDR)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les joueurs de Donjons et Dragons utilisent souvent plusieurs dés. Bien que notre outil ne lance qu'un seul dé à la fois, l'historique et les statistiques intégrés permettent de suivre facilement une série de lancers pour vos parties de JDR. Une version avec dés multiples (D4, D8, D10, D12, D20) est en développement.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Éducation et mathématiques</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Les enseignants utilisent le dé en ligne pour illustrer les probabilités en classe. Les élèves peuvent lancer le dé 100 fois en quelques minutes et observer la distribution des faces. C'est une démonstration concrète de la <strong>loi des grands nombres</strong> : plus on lance, plus chaque face se rapproche de 16,67 %. Notre outil de{" "}
                  <a href="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">lancers multiples de pile ou face</a>{" "}
                  est parfait pour compléter cette approche éducative.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Décisions aléatoires</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vous avez six options et ne savez pas laquelle choisir ? Attribuez un numéro de 1 à 6 à chaque option et lancez le dé. C'est une variante du pile ou face pour les choix multiples. Pour approfondir les méthodes de décision, lisez notre article{" "}
                  <a href="/blog/comment-decider-quand-on-hesite" className="text-primary hover:underline">comment décider quand on hésite</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Questions fréquentes sur le dé en ligne
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
