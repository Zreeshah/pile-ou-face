import { useState, useCallback } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { DistributionBars } from "@/components/DistributionBars";
import { ConvergenceChart } from "@/components/ConvergenceChart";
import { ArrowLeft, ArrowRight, Play, RotateCcw } from "lucide-react";
import {
  binomial, getProbabilite, rowsForN, pathFor, LAST_UPDATED,
} from "@/data/probabilites";
import { probabilitesContent } from "@/data/probabilitesContent";

const piles = (x: number) => `${x} pile${x > 1 ? "s" : ""}`;
const parseSeg = (s: string | undefined, suffix: string) =>
  Number(s?.match(new RegExp(`^(\\d+)-${suffix}$`))?.[1]);

const titleFor = (n: number, k: number) => `Probabilité d'obtenir ${piles(k)} sur ${n} lancers`;

// Run one n-flip experiment, return the number of heads.
const experiment = (n: number) => {
  let heads = 0;
  for (let i = 0; i < n; i++) if (Math.random() < 0.5) heads++;
  return heads;
};

const Simulator = ({ n, k, theoreticalPct }: { n: number; k: number; theoreticalPct: number }) => {
  const [total, setTotal] = useState(0);
  const [hits, setHits] = useState(0);
  const [series, setSeries] = useState<{ x: number; value: number }[]>([]);

  const run = useCallback((batch: number) => {
    let newHits = hits;
    let newTotal = total;
    const points = [...series];
    for (let i = 0; i < batch; i++) {
      newTotal++;
      if (experiment(n) === k) newHits++;
      if (i % Math.max(1, Math.floor(batch / 40)) === 0) {
        points.push({ x: newTotal, value: (newHits / newTotal) * 100 });
      }
    }
    points.push({ x: newTotal, value: (newHits / newTotal) * 100 });
    setHits(newHits);
    setTotal(newTotal);
    setSeries(points.slice(-120));
  }, [hits, total, series, n, k]);

  const reset = () => { setTotal(0); setHits(0); setSeries([]); };
  const observedPct = total > 0 ? (hits / total) * 100 : 0;

  return (
    <div className="card-glass p-6 md:p-8">
      <div className="grid sm:grid-cols-3 gap-4 mb-6 text-center">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Expériences</p>
          <p className="text-2xl font-display font-bold tabular-nums">{total.toLocaleString("fr-FR")}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Fréquence observée</p>
          <p className="text-2xl font-display font-bold text-primary tabular-nums">
            {total > 0 ? `${observedPct.toFixed(2).replace(".", ",")} %` : "—"}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Probabilité théorique</p>
          <p className="text-2xl font-display font-bold tabular-nums">
            {theoreticalPct.toFixed(2).replace(".", ",")} %
          </p>
        </div>
      </div>

      <ConvergenceChart
        data={series}
        target={theoreticalPct}
        targetLabel={`${theoreticalPct.toFixed(2).replace(".", ",")} %`}
        yLabel="Fréquence observée"
      />

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button onClick={() => run(100)} className="btn-flip !text-base !py-3 !px-6 flex items-center gap-2">
          <Play className="w-4 h-4" /> 100 expériences
        </button>
        <button onClick={() => run(1000)} className="px-6 py-3 rounded-2xl bg-muted hover:bg-muted/80 font-semibold transition-colors">
          + 1000
        </button>
        <button onClick={reset} className="px-4 py-3 rounded-2xl bg-muted hover:bg-muted/80 text-muted-foreground text-sm transition-colors flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Réinitialiser
        </button>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-4">
        Chaque expérience = {n} lancers. On compte la part qui donne exactement {piles(k)}. Plus vous lancez, plus la fréquence observée se rapproche de {theoreticalPct.toFixed(2).replace(".", ",")} %.
      </p>
    </div>
  );
};

const ProbabiliteMatrix = () => {
  const { flips, heads } = useParams();
  const n = parseSeg(flips, "lancers");
  const k = parseSeg(heads, "piles");
  const data = getProbabilite(n, k);

  // Only published pairs get a real page; anything else goes back to the hub.
  if (!data || !data.publish) return <Navigate to="/probabilite-pile-ou-face" replace />;

  const content = probabilitesContent[data.slug];
  const Cnk = binomial(n, k);
  const denom = Math.pow(2, n);
  const theoreticalPct = data.probability * 100;

  const path = pathFor(n, k);
  const title = titleFor(n, k);
  const description = `La probabilité d'obtenir exactement ${piles(k)} sur ${n} lancers est de ${data.percentage} (${data.fraction}). Calcul détaillé, distribution et simulateur pour le vérifier.`;

  const siblings = rowsForN(n).filter((r) => r.publish);
  const idx = siblings.findIndex((r) => r.k === k);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  const faqSchema = content && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Calculer la probabilité d'obtenir ${piles(k)} sur ${n} lancers`,
    step: [
      { "@type": "HowToStep", name: "Compter les arrangements", text: `Calculer le coefficient binomial C(${n},${k}) = ${n}! / (${k}! × ${n - k}!) = ${Cnk}.` },
      { "@type": "HowToStep", name: "Probabilité d'une séquence", text: `Chaque séquence précise de ${n} lancers a une probabilité de (1/2)^${n} = 1/${denom}.` },
      { "@type": "HowToStep", name: "Multiplier", text: `Multiplier le nombre d'arrangements par la probabilité de chacun : ${Cnk} × 1/${denom} = ${data.fraction} = ${data.percentage}.` },
    ],
  };

  return (
    <Layout>
      <SEO title={title} description={description} canonicalUrl={path} bareTitle />
      <WebsiteSchema />
      <WebPageSchema title={title} description={description} url={path} dateModified={LAST_UPDATED} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Hero + answer above the fold */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/probabilite-pile-ou-face" className="hover:text-primary">Probabilités</Link>
              <span className="mx-2">/</span>
              <span>{n} lancers</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 text-balance">{title}</h1>
            <div className="card-glass inline-flex flex-col items-center px-10 py-8">
              <p className="text-5xl md:text-6xl font-display font-bold text-primary tabular-nums">{data.percentage}</p>
              <p className="text-lg text-muted-foreground mt-2">soit {data.fraction} — une chance sur {(1 / data.probability).toLocaleString("fr-FR", { maximumFractionDigits: 2 })}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Mis à jour le <time dateTime={LAST_UPDATED}>30 juillet 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Intro (unique) */}
      <section className="section-padding pt-4">
        <div className="container">
          <div className="max-w-3xl mx-auto card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
            {content?.intro}
          </div>
        </div>
      </section>

      {/* Calcul étape par étape */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Le calcul étape par étape</h2>
            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="font-display font-semibold mb-1">1. Compter les arrangements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Combien de façons d'obtenir {piles(k)} parmi {n} lancers ? C'est le coefficient binomial :
                </p>
                <p className="mt-2 font-mono text-lg tabular-nums bg-muted/40 rounded-lg px-4 py-3">
                  C({n},{k}) = {n}! / ({k}! × {n - k}!) = <strong className="text-primary">{Cnk}</strong>
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">2. Probabilité d'une séquence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque séquence précise de {n} lancers (indépendants, 50 % chacun) a la même probabilité :
                </p>
                <p className="mt-2 font-mono text-lg tabular-nums bg-muted/40 rounded-lg px-4 py-3">
                  (1/2)<sup>{n}</sup> = 1/{denom}
                </p>
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">3. Multiplier</h3>
                <p className="text-muted-foreground leading-relaxed">
                  On combine les deux : le nombre d'arrangements multiplié par la probabilité de chacun.
                </p>
                <p className="mt-2 font-mono text-lg tabular-nums bg-muted/40 rounded-lg px-4 py-3">
                  {Cnk} × 1/{denom} = <strong className="text-primary">{data.fraction} = {data.percentage}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">La distribution complète sur {n} lancers</h2>
            <div className="card-glass p-6 md:p-8">
              <DistributionBars n={n} highlightK={k} />
            </div>
          </div>
        </div>
      </section>

      {/* Interprétation */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Ce que ce chiffre veut dire</h2>
            <div className="card-glass p-8 text-muted-foreground leading-relaxed text-lg">
              {content?.interpretation}
            </div>
          </div>
        </div>
      </section>

      {/* Simulateur */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Vérifiez-le : le mini-simulateur</h2>
            <p className="text-muted-foreground mb-6">
              La théorie annonce {data.percentage}. Lancez l'expérience un grand nombre de fois et regardez la fréquence observée converger vers cette valeur.
            </p>
            <Simulator n={n} k={k} theoreticalPct={theoreticalPct} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content && content.faqs.length > 0 && (
        <section className="section-padding pt-0">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Questions fréquentes</h2>
              <div className="space-y-4">
                {content.faqs.map((item, i) => (
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
      )}

      {/* One Last Thing. */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">One Last Thing.</h2>
            <div className="card-glass p-8 text-muted-foreground leading-relaxed text-lg">
              {content?.lastThing}
            </div>
          </div>
        </div>
      </section>

      {/* Prev / next + siblings */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between gap-4">
              {prev ? (
                <Link to={pathFor(prev.n, prev.k)} className="card-glass p-4 flex items-center gap-3 hover:border-primary/30 transition-colors flex-1">
                  <ArrowLeft className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm"><span className="block text-muted-foreground">Précédent</span>{piles(prev.k)} sur {prev.n}</span>
                </Link>
              ) : <div className="flex-1" />}
              {next ? (
                <Link to={pathFor(next.n, next.k)} className="card-glass p-4 flex items-center gap-3 justify-end text-right hover:border-primary/30 transition-colors flex-1">
                  <span className="text-sm"><span className="block text-muted-foreground">Suivant</span>{piles(next.k)} sur {next.n}</span>
                  <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                </Link>
              ) : <div className="flex-1" />}
            </div>

            <div className="card-glass p-6">
              <p className="font-display font-semibold mb-3">Toutes les probabilités sur {n} lancers</p>
              <div className="flex flex-wrap gap-2">
                {siblings.map((s) => (
                  <Link key={s.slug} to={pathFor(s.n, s.k)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                      s.k === k ? "bg-primary/10 border-primary/30 text-primary font-medium" : "bg-card border-border hover:border-primary/30"
                    }`}>
                    {piles(s.k)} — {s.percentage}
                  </Link>
                ))}
                <Link to="/probabilite-pile-ou-face" className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm hover:border-primary/30 transition-colors">
                  Toutes les probabilités →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProbabiliteMatrix;
