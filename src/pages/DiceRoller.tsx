import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Dices, RotateCcw, History } from "lucide-react";
import { De } from "@/components/De";
import { publishedSingles, publishedMulti, GEOMETRY_LABEL, geometryFor } from "@/data/des";
import { secureRandomInt } from "@/lib/secureRandom";

const LAST_UPDATED = "2026-11-24";

const faqItems = [
  {
    question: "Comment fonctionne le dé en ligne ?",
    answer:
      "Choisissez le nombre de faces — d2, d6, d20, d100 — puis cliquez sur le dé ou sur le bouton « Lancer le dé » pour obtenir un résultat entre 1 et le nombre de faces choisi. L'outil utilise l'API cryptographique du navigateur et un échantillonnage uniforme : chaque valeur reçoit la même probabilité théorique (1/6 pour un d6, 1/20 pour un d20, 1/100 pour un d100).",
  },
  {
    question: "Le dé en ligne est-il vraiment aléatoire et équitable ?",
    answer:
      "L'outil utilise crypto.getRandomValues() et un échantillonnage sans biais entre les faces choisies. Chaque valeur reçoit donc la même probabilité théorique. Il convient aux jeux et aux usages pédagogiques, mais n'est pas un système certifié pour les jeux d'argent réglementés.",
  },
  {
    question: "Peut-on lancer un dé à 20 faces (d20) ou à 100 faces (d100) ?",
    answer:
      "Oui. Le sélecteur au-dessus du dé propose tous les dés classiques : d2, d3, d4, d5, d6, d7, d8, d9, d10, d12, d20 et d100. Le d20 est le dé de référence des jeux de rôle comme Donjons et Dragons, et le d100 sert aux jets de pourcentage. La forme affichée correspond au vrai dé physique : icosaèdre pour le d20, deux dés à dix faces pour le d100.",
  },
  {
    question: "Peut-on lancer plusieurs dés à la fois ?",
    answer:
      "Oui, sur des pages dédiées : 2 dés à 6 faces, 3 dés à 6 faces, 4 dés à 6 faces, 2 dés à 10 faces, 2 dés à 20 faces et 2 dés à 4 faces, chacune avec la somme, la distribution des totaux et le tableau complet des probabilités. Sur cette page, le sélecteur change le nombre de faces d'un seul dé ; relancez autant de fois que vous voulez, l'historique cumule vos lancers.",
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
      "Le dé en ligne est toujours disponible, n'a pas d'usure mécanique et garde un historique de vos lancers avec statistiques. En revanche, il n'a pas le plaisir tactile d'un vrai dé. Pour les jeux de société, beaucoup de joueurs utilisent les deux selon la situation.",
  },
  {
    question: "Google propose-t-il un lancer de dé ?",
    answer:
      "Oui, Google propose un lancer de dé intégré dans ses résultats de recherche. Tapez « lancer le dé » ou « dice roller » dans Google pour voir apparaître un dé interactif. Cependant, le dé Google ne propose ni historique, ni suivi des statistiques, ni distribution des faces. Notre simulateur offre une expérience plus complète et dédiée.",
  },
  {
    question: "Peut-on truquer le résultat d'un dé en ligne ?",
    answer:
      "Le résultat est calculé localement par le code du site à partir de l'API cryptographique du navigateur. L'outil ne propose pas de réglage permettant de choisir une face, mais une preuve officielle de tirage peut exiger un dispositif audité ou certifié.",
  },
];

const DiceRoller = () => {
  // Consolidation 2026-11-24 : un seul outil pour tous les dés (d2 à d100).
  // Les anciennes pages /de-en-ligne/de-N-faces redirigent ici (301).
  const [faces, setFaces] = useState(6);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [totalRolls, setTotalRolls] = useState(0);

  const stats = {
    total: totalRolls,
    sum: history.reduce((a, b) => a + b, 0),
    average: history.length > 0 ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1) : "0",
    distribution: Array.from({ length: faces }, (_, i) => ({
      face: i + 1,
      count: history.filter((h) => h === i + 1).length,
    })),
  };

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);
    setTimeout(() => {
      const newResult = secureRandomInt(faces) + 1;
      setResult(newResult);
      setHistory((prev) => [...prev.slice(-49), newResult]);
      setTotalRolls((prev) => prev + 1);
      setIsRolling(false);
    }, 600);
  }, [isRolling, faces]);

  const selectFaces = (n: number) => {
    setFaces(n);
    setResult(null);
    setHistory([]);
    setTotalRolls(0);
  };

  const reset = () => {
    setResult(null);
    setHistory([]);
    setTotalRolls(0);
  };

  return (
    <Layout>
      <SEO
        title="Dé en Ligne – Dé Virtuel Gratuit (d2 à d100)"
        description="Lancez un dé virtuel en ligne : d6, d20, d100 et tous les dés de 2 à 100 faces. Lancer de dés gratuit avec historique et statistiques."
        canonicalUrl="/de-en-ligne"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Dé en Ligne – Dé Virtuel Gratuit (d2 à d100)"
        description="Simulateur de dé virtuel gratuit : lancer de dés de 2 à 100 faces, tirage uniforme, historique et statistiques."
        url="/de-en-ligne"
        dateModified={LAST_UPDATED}
      />
      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Dé en ligne
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Lancez un dé virtuel de 2 à 100 faces
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up">
              Un <strong>dé virtuel gratuit</strong> et toujours disponible : d6 classique, d20 pour les jeux de rôle,
              d100 pour les pourcentages, et tous les dés entre les deux. Chaque face a la même probabilité.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Mis à jour le <time dateTime={LAST_UPDATED}>24 novembre 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-6 md:p-10">
              {/* Sélecteur de dé : tous les dés classiques sur une seule page */}
              <div className="mb-8" id="lancer">
                <p className="text-sm font-medium text-muted-foreground mb-3 text-center">Choisissez votre dé</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Nombre de faces du dé">
                  {publishedSingles.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => selectFaces(d.faces)}
                      aria-pressed={faces === d.faces}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                        faces === d.faces
                          ? "bg-primary/10 border-primary/30 text-primary font-medium"
                          : "bg-card border-border hover:border-primary/30"
                      }`}
                    >
                      d{d.faces}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Dé sélectionné : <strong className="text-foreground">d{faces}</strong> ({GEOMETRY_LABEL[geometryFor(faces)]}) — chaque face : 1/{faces} ({(100 / faces).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %)
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <button onClick={rollDice} disabled={isRolling} className="cursor-pointer disabled:cursor-default" aria-label={`Lancer le dé à ${faces} faces`}>
                  <De faces={faces} valeur={result ?? faces} rolling={isRolling} size={150} />
                </button>
              </div>

              <div className="text-center mb-8 h-16">
                {result && !isRolling && (
                  <div className="animate-scale-in">
                    <p className="text-3xl font-display font-bold text-foreground">{result}</p>
                    <p className="text-sm text-muted-foreground">sur un dé à {faces} faces</p>
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
                    {faces <= 20 ? (
                      <div className="space-y-1.5">
                        {stats.distribution.map(({ face, count }) => {
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
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Avec {faces} faces, chaque valeur a une probabilité théorique de {(100 / faces).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} % : la distribution face par face n'est affichée que jusqu'à 20 faces.
                      </p>
                    )}
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

            {/* Autres dés */}
            <div className="card-glass p-6 mt-6 space-y-4">
              <div>
                <p className="font-display font-semibold mb-3">Dés à lancer par nombre de faces</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tous les dés — d2, d3, d4, d5, d6, d7, d8, d9, d10, d12, d20 et d100 — se lancent
                  avec le sélecteur ci-dessus, sur cette même page.
                </p>
              </div>
              <div>
                <p className="font-display font-semibold mb-3">Lancers de plusieurs dés</p>
                <div className="flex flex-wrap gap-2">
                  {publishedMulti.map((d) => (
                    <Link key={d.slug} to={d.path} className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm hover:border-primary/30 transition-colors">
                      {d.count} dés à {d.faces} faces
                    </Link>
                  ))}
                </div>
              </div>
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
                  ["#tous-les-des", "Tous les dés, un seul lancer"],
                  ["#quel-de", "Lancer de dés : quel dé choisir ?"],
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
                <h3 className="text-xl font-display font-semibold mb-2">Étape 1 — Choisissez votre dé, puis cliquez</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sélectionnez le nombre de faces — d6 classique, d20 pour les jeux de rôle, d100 pour les pourcentages — puis cliquez directement sur le dé affiché à l'écran ou appuyez sur le bouton « Lancer le dé ». Aucune inscription, aucun téléchargement et aucune application ne sont nécessaires. L'outil fonctionne directement dans votre navigateur.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 2 — Lisez le résultat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le résultat s'affiche instantanément avec une animation réaliste. Vous voyez un nombre entre 1 et le nombre de faces choisi, ainsi que la face correspondante du dé. Le résultat est 100 % aléatoire et chaque lancer est indépendant du précédent.
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

      {/* Tous les dés */}
      <section id="tous-les-des" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Tous les dés, un seul lancer
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Un <strong>dé virtuel</strong> ne se limite pas au cube à six faces. Chaque nombre de faces
                correspond à une forme géométrique réelle et à un usage précis : le sélecteur ci-dessus
                passe de l'un à l'autre sans changer de page. Voici tous les dés disponibles sur ce
                simulateur, avec leur forme, la probabilité d'obtenir une face donnée et leur usage typique.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Dé</th><th className="text-left py-2 px-3 font-semibold">Forme réelle</th><th className="text-left py-2 px-3 font-semibold">Probabilité d'une face</th><th className="text-left py-2 px-3 font-semibold">Usage typique</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d2</td><td className="py-2 px-3">Pièce à deux faces</td><td className="py-2 px-3">1/2 — 50 %</td><td className="py-2 px-3">Décision binaire, pile ou face</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d3</td><td className="py-2 px-3">Prisme triangulaire</td><td className="py-2 px-3">1/3 — 33,33 %</td><td className="py-2 px-3">Choix entre trois options</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d4</td><td className="py-2 px-3">Tétraèdre</td><td className="py-2 px-3">1/4 — 25 %</td><td className="py-2 px-3">Jeux de rôle, dégâts légers</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d5</td><td className="py-2 px-3">Prisme triangulaire à 5 faces</td><td className="py-2 px-3">1/5 — 20 %</td><td className="py-2 px-3">Choix entre cinq options</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d6</td><td className="py-2 px-3">Cube</td><td className="py-2 px-3">1/6 — 16,67 %</td><td className="py-2 px-3">Jeux de société, dé classique</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d7</td><td className="py-2 px-3">Prisme pentagonal</td><td className="py-2 px-3">1/7 — 14,29 %</td><td className="py-2 px-3">Choix entre sept options</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d8</td><td className="py-2 px-3">Octaèdre</td><td className="py-2 px-3">1/8 — 12,5 %</td><td className="py-2 px-3">Jeux de rôle, dégâts moyens</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d9</td><td className="py-2 px-3">Prisme à 9 faces</td><td className="py-2 px-3">1/9 — 11,11 %</td><td className="py-2 px-3">Choix entre neuf options</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d10</td><td className="py-2 px-3">Trapézoèdre pentagonal</td><td className="py-2 px-3">1/10 — 10 %</td><td className="py-2 px-3">Pourcentages par dizaines, JDR</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d12</td><td className="py-2 px-3">Dodécaèdre</td><td className="py-2 px-3">1/12 — 8,33 %</td><td className="py-2 px-3">Jeux de rôle, armes lourdes</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d20</td><td className="py-2 px-3">Icosaèdre</td><td className="py-2 px-3">1/20 — 5 %</td><td className="py-2 px-3">Jeux de rôle, test de réussite</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3 font-semibold">d100</td><td className="py-2 px-3">Deux dés à dix faces</td><td className="py-2 px-3">1/100 — 1 %</td><td className="py-2 px-3">Jets de pourcentage, tables aléatoires</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                La forme affichée à l'écran correspond au vrai dé physique : le d4 est un tétraèdre, le d8
                un octaèdre, le d12 un dodécaèdre et le d20 un icosaèdre. Le d100, lui, se lance comme dans
                la vraie vie : avec deux dés à dix faces, l'un pour les dizaines et l'autre pour les unités.
                Dans tous les cas, le tirage reste uniforme — aucune face n'est favorisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quel dé choisir */}
      <section id="quel-de" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Lancer de dés : quel dé choisir ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Le bon dé dépend de ce que vous voulez faire. Voici les quatre situations les plus courantes,
                avec le dé à choisir dans le sélecteur ci-dessus.
              </p>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Jeux de rôle : d20 et d100</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dans Donjons et Dragons et la plupart des jeux de rôle, le <strong>d20</strong> décide de la
                  réussite d'une action : lancez, ajoutez votre bonus, et comparez au seuil de difficulté.
                  Un 20 naturel est une réussite critique, un 1 naturel un échec critique. Le{" "}
                  <strong>d100</strong> sert aux jets de pourcentage — par exemple pour tirer sur une table
                  de rencontres ou déterminer un effet aléatoire. Les dégâts, eux, utilisent les dés plus
                  petits : d4 pour une dague, d8 pour une épée longue, d12 pour une hache à deux mains.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Jeux de société : d6, ou deux dés</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le <strong>d6</strong> reste le dé de référence des jeux de plateau : Monopoly, petits
                  chevaux, jeux de parcours. Quand un jeu demande deux dés — comme au Monopoly ou au
                  backgammon — utilisez nos pages dédiées :{" "}
                  <Link to="/de-en-ligne/2-des-6-faces" className="text-primary hover:underline">2 dés à 6 faces</Link>{" "}
                  affiche la somme et la distribution complète des totaux. La somme 7, avec 6 combinaisons
                  sur 36, est le résultat le plus probable.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">En classe : d6, d10, d20</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pour illustrer les probabilités, le <strong>d6</strong> est le plus parlant : chaque face
                  a une chance sur six, et 100 lancers suffisent pour voir la distribution se stabiliser
                  autour de 16,67 %. Le <strong>d10</strong> montre les probabilités en base dix, et le{" "}
                  <strong>d20</strong> les événements rares — obtenir un 20 n'arrive qu'une fois sur vingt.
                  L'historique et les statistiques de l'outil rendent la loi des grands nombres visible :
                  plus on lance, plus chaque face se rapproche de sa probabilité théorique. Notre outil de{" "}
                  <a href="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">lancers multiples de pile ou face</a>{" "}
                  complète cette approche pour les tirages à deux issues.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Décider : d100 ou d6</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pour un choix entre deux options, le{" "}
                  <a href="/" className="text-primary hover:underline">pile ou face</a> suffit. Pour six
                  options, attribuez un numéro de 1 à 6 à chacune et lancez le d6. Pour un tirage pondéré
                  — par exemple choisir un restaurant avec 70 % de chances pour l'un et 30 % pour l'autre —
                  le <strong>d100</strong> est l'outil idéal : lancez, et lisez le résultat comme un
                  pourcentage. Pour approfondir les méthodes de décision, lisez notre article{" "}
                  <a href="/blog/comment-decider-quand-on-hesite" className="text-primary hover:underline">comment décider quand on hésite</a>.
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
                    <tr className="border-b border-border"><td className="py-2 px-3">Fonctionne hors ligne</td><td className="py-2 px-3">❌</td><td className="py-2 px-3">❌</td></tr>
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
                <li><strong>Tirage uniforme :</strong> Un dé physique peut présenter des imperfections ou de l'usure. Ici, l'échantillonnage attribue à chaque valeur une probabilité théorique de 1/6.</li>
                <li><strong>Statistiques intégrées :</strong> Notre outil enregistre automatiquement chaque lancer et affiche la distribution des faces, le nombre total de lancers, la somme et la moyenne. Idéal pour les exercices de mathématiques ou pour les curieux.</li>
                <li><strong>Silencieux et discret :</strong> Pas de bruit de dé qui roule sur la table. Parfait pour une utilisation en réunion, en classe ou dans un lieu public.</li>
                <li><strong>Gratuit et sans inscription :</strong> Aucun compte n'est nécessaire pour lancer le dé. Le calcul du résultat s'effectue localement dans le navigateur.</li>
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
                  Les joueurs de Donjons et Dragons utilisent souvent plusieurs dés : choisissez d20, d12, d10, d8 ou d4 dans le sélecteur ci-dessus, et l'historique avec les statistiques intégrés permet de suivre facilement une série de lancers pour vos parties de JDR. Pour lancer plusieurs dés à la fois, les pages dédiées (2 dés à 6 faces, 2 dés à 20 faces…) affichent la somme et la distribution des totaux.
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

export default DiceRoller;
