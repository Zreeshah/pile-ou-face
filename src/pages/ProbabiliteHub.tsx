import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { DistributionBars } from "@/components/DistributionBars";
import {
  binomial, probabilityOf, formatPercent, publishedProbabilites,
  N_VALUES, pathFor, LAST_UPDATED,
} from "@/data/probabilites";

const piles = (x: number) => `${x} pile${x > 1 ? "s" : ""}`;

const TITLE = "Probabilité au pile ou face : calculateur et loi binomiale";
const DESCRIPTION =
  "Calculez la probabilité d'obtenir k piles sur n lancers. Loi binomiale, distribution, simulateur et pages détaillées en français.";

const faqItems = [
  {
    question: "Quelle est la formule de la probabilité au pile ou face ?",
    answer:
      "La probabilité d'obtenir exactement k piles sur n lancers est donnée par la loi binomiale : C(n,k) × (1/2)^n. Le terme C(n,k) compte le nombre de façons d'obtenir k piles parmi n lancers, et (1/2)^n est la probabilité d'une séquence précise. Par exemple, 5 piles sur 10 lancers valent C(10,5) × (1/2)^10 = 252/1024, soit 24,61 %.",
  },
  {
    question: "Pourquoi les résultats se concentrent-ils autour de la moitié ?",
    answer:
      "Parce qu'il existe beaucoup plus de façons d'obtenir un partage équilibré qu'un résultat extrême. Il n'y a qu'une seule façon d'obtenir dix piles sur dix lancers, mais 252 façons d'en obtenir cinq. Le coefficient binomial est maximal au centre, ce qui donne à la distribution sa forme en cloche caractéristique.",
  },
  {
    question: "La loi des grands nombres change-t-elle ces probabilités ?",
    answer:
      "Non, elle les complète. La loi des grands nombres, formulée par Jakob Bernoulli, dit que la proportion de piles se rapproche de 50 % quand le nombre de lancers devient très grand. Elle porte sur la fréquence, pas sur le nombre exact de piles d'un tirage donné, qui reste régi par la loi binomiale.",
  },
];

const Calculator = () => {
  const [n, setN] = useState(10);
  const [k, setK] = useState(5);
  const safeK = Math.min(k, n);
  const prob = probabilityOf(n, safeK);

  return (
    <div className="card-glass p-6 md:p-8">
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <label className="block">
          <span className="flex justify-between text-sm font-medium mb-2">
            <span>Nombre de lancers (n)</span><span className="text-primary tabular-nums">{n}</span>
          </span>
          <input type="range" min={1} max={10} value={n}
            onChange={(e) => setN(parseInt(e.target.value, 10))}
            className="w-full accent-primary" />
        </label>
        <label className="block">
          <span className="flex justify-between text-sm font-medium mb-2">
            <span>Nombre de piles (k)</span><span className="text-primary tabular-nums">{safeK}</span>
          </span>
          <input type="range" min={0} max={n} value={safeK}
            onChange={(e) => setK(parseInt(e.target.value, 10))}
            className="w-full accent-primary" />
        </label>
      </div>

      <div className="text-center py-6 border-y border-border mb-6">
        <p className="text-muted-foreground mb-1">Probabilité d'obtenir exactement {piles(safeK)} sur {n} lancers</p>
        <p className="text-4xl md:text-5xl font-display font-bold text-primary tabular-nums">{formatPercent(prob)}</p>
        <p className="text-muted-foreground mt-2 font-mono">
          C({n},{safeK}) × (1/2)<sup>{n}</sup> = {binomial(n, safeK)}/{Math.pow(2, n)}
        </p>
      </div>

      <DistributionBars n={n} highlightK={safeK} />
    </div>
  );
};

const ProbabiliteHub = () => {
  const grouped = useMemo(() => {
    return N_VALUES
      .map((n) => ({ n, rows: publishedProbabilites.filter((p) => p.n === n) }))
      .filter((g) => g.rows.length > 0);
  }, []);

  const appSchema = {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Calculateur de probabilité pile ou face",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web", url: `https://pile-ouface.fr/probabilite-pile-ou-face/`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <Layout>
      <SEO title={TITLE} description={DESCRIPTION} canonicalUrl="/probabilite-pile-ou-face" bareTitle />
      <WebsiteSchema />
      <WebPageSchema title={TITLE} description={DESCRIPTION} url="/probabilite-pile-ou-face" dateModified={LAST_UPDATED} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Probabilité au pile ou face
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">la loi binomiale, sans les maux de tête</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              Combien de chances d'obtenir un nombre précis de piles sur plusieurs lancers ? Réglez n et k, lisez le résultat, puis explorez chaque cas en détail.
            </p>
            <p className="text-sm text-muted-foreground">
              Mis à jour le <time dateTime={LAST_UPDATED}>30 juillet 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-4">
        <div className="container">
          <div className="max-w-3xl mx-auto"><Calculator /></div>
        </div>
      </section>

      {/* Explainer */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Comprendre la probabilité d'un lancer de pièce</h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Un lancer de pièce donne pile ou face, chacun avec une probabilité de 1/2. Dès qu'on enchaîne plusieurs lancers, la question devient plus riche : quelle chance a-t-on d'obtenir un nombre précis de piles ? La réponse tient dans une formule, la loi binomiale.
              </p>
              <p>
                Pour obtenir exactement k piles sur n lancers, on calcule C(n,k) × (1/2)<sup>n</sup>. Le premier terme, le coefficient binomial, compte le nombre de façons de placer les k piles parmi les n lancers. Le second est la probabilité d'une séquence donnée, puisque chaque lancer est indépendant et vaut 1/2.
              </p>
              <p>
                Ce calcul explique pourquoi les résultats se concentrent autour de la moitié. Il n'y a qu'une seule manière d'obtenir dix piles sur dix lancers, mais 252 manières d'en obtenir cinq. La distribution prend alors sa forme en cloche, plus haute au centre et fine sur les bords.
              </p>
              <p>
                Attention à ne pas confondre cette loi avec la loi des grands nombres, qui porte sur la proportion à long terme et non sur un tirage précis. Pour la voir à l'œuvre, notre{" "}
                <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">simulateur de lancers multiples</Link>{" "}
                lance la pièce jusqu'à dix mille fois et montre la fréquence se stabiliser à 50 %. Pour réviser les bases, lisez aussi notre{" "}
                <Link to="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">guide des probabilités</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Toutes les pages */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Toutes les probabilités calculées</h2>
            <div className="space-y-4">
              {grouped.map((g) => (
                <div key={g.n} className="card-glass p-6">
                  <p className="font-display font-semibold mb-3">{g.n} lancers</p>
                  <div className="flex flex-wrap gap-2">
                    {g.rows.map((r) => (
                      <Link key={r.slug} to={pathFor(r.n, r.k)}
                        className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm hover:border-primary/30 transition-colors">
                        {piles(r.k)} — <span className="text-primary font-medium">{r.percentage}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-card rounded-xl px-6 border border-border shadow-sm" open={i === 0}>
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

export default ProbabiliteHub;
