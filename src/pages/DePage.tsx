import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { De } from "@/components/De";
import { DiceStage } from "@/components/DiceStage";
import {
  parseDeConfig, GEOMETRY_LABEL, geometryFor, sumDistribution,
  publishedSingles, publishedMulti, LAST_UPDATED,
} from "@/data/des";
import { desContent } from "@/data/desContent";

const SumBars = ({ count, faces }: { count: number; faces: number }) => {
  const dist = sumDistribution(count, faces);
  const max = Math.max(...dist.map((d) => d.probability));
  return (
    <figure className="w-full">
      <div className="flex items-end gap-1 overflow-x-auto pb-2" role="img"
        aria-label={`Distribution des sommes de ${count} dés à ${faces} faces`}>
        {dist.map((d) => (
          <div key={d.sum} className="flex flex-col items-center gap-1 min-w-6 flex-1">
            <span className="text-[10px] tabular-nums text-muted-foreground">{d.percentage.replace(" %", "")}</span>
            <div className="w-full flex items-end" style={{ height: 120 }}>
              <div className="w-full rounded-t bg-primary/70" style={{ height: `${(d.probability / max) * 100}%` }} title={`Somme ${d.sum} : ${d.percentage}`} />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">{d.sum}</span>
          </div>
        ))}
      </div>
      <figcaption className="text-center text-sm text-muted-foreground mt-2">
        Probabilité de chaque somme (en abscisse) pour {count} dés à {faces} faces.
      </figcaption>
    </figure>
  );
};

const DePage = () => {
  const { config } = useParams();
  const die = parseDeConfig(config);
  if (!die) return <Navigate to="/de-en-ligne" replace />;

  const content = desContent[die.slug];
  const isMulti = die.kind === "multi";
  const faces = die.faces;
  const count = isMulti ? die.count : 1;
  const geoLabel = GEOMETRY_LABEL[geometryFor(faces)];

  const title = isMulti
    ? `Lancer ${count} dés à ${faces} faces en ligne`
    : `Dé ${faces} faces à lancer en ligne`;
  const description = isMulti
    ? `Lancez ${count} dés à ${faces} faces en ligne. Somme de ${die.min} à ${die.max}, distribution des probabilités et résultat instantané. Gratuit, sans inscription.`
    : `Lancez un dé à ${faces} faces en ligne gratuitement. Dé virtuel ${geoLabel} animé, tirage uniforme de 1 à ${faces}, sur mobile et ordinateur.`;
  const illustrationAlt = isMulti
    ? `${count} dés à ${faces} faces à lancer en ligne`
    : `Dé ${faces} faces à lancer en ligne`;

  const appSchema = {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: title, applicationCategory: "GameApplication", operatingSystem: "Web",
    url: `https://pile-ouface.fr${die.path}/`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };
  return (
    <Layout>
      <SEO title={title} description={description} canonicalUrl={die.path} bareTitle />
      <WebsiteSchema />
      <WebPageSchema title={title} description={description} url={die.path} dateModified={LAST_UPDATED} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      {/* Hero + tool */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/de-en-ligne" className="hover:text-primary">Dé en ligne</Link>
              <span className="mx-2">/</span>
              <span>{isMulti ? `${count} × d${faces}` : `d${faces}`}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-balance">{title}</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isMulti
                ? `Lancez ${count} dés à ${faces} faces et lisez la somme, de ${die.min} à ${die.max}.`
                : `Un dé virtuel ${geoLabel}, uniforme et animé. Résultat de 1 à ${faces}.`}
            </p>
            <div className="card-glass p-6 md:p-10">
              <DiceStage faces={faces} count={count} />
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Mis à jour le <time dateTime={LAST_UPDATED}>30 juillet 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding pt-4">
        <div className="container">
          <div className="max-w-3xl mx-auto card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
            {content?.intro}
          </div>
        </div>
      </section>

      {/* Sum distribution (multi only) */}
      {isMulti && (
        <section className="section-padding pt-0">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">La distribution des sommes</h2>
              <div className="card-glass p-6 md:p-8"><SumBars count={count} faces={faces} /></div>
            </div>
          </div>
        </section>
      )}

      {/* Usage */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">À quoi sert ce dé ?</h2>
            <div className="card-glass p-8 text-muted-foreground leading-relaxed text-lg">{content?.usage}</div>
          </div>
        </div>
      </section>

      {/* Static, indexable illustration */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <figure role="img" aria-label={illustrationAlt} className="card-glass p-8 flex flex-col items-center gap-4">
              <De faces={faces} valeur={faces} rolling={false} size={150} />
              <figcaption className="text-center text-muted-foreground">{illustrationAlt}</figcaption>
            </figure>
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

      {/* All dice */}
      <section className="section-padding pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto card-glass p-6 space-y-4">
            <div>
              <p className="font-display font-semibold mb-3">Tous les dés à lancer</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/de-en-ligne" className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm hover:border-primary/30 transition-colors">d6 (classique)</Link>
                {publishedSingles.map((d) => (
                  <Link key={d.slug} to={d.path}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                      !isMulti && d.faces === faces ? "bg-primary/10 border-primary/30 text-primary font-medium" : "bg-card border-border hover:border-primary/30"
                    }`}>d{d.faces}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display font-semibold mb-3">Lancers de plusieurs dés</p>
              <div className="flex flex-wrap gap-2">
                {publishedMulti.map((d) => (
                  <Link key={d.slug} to={d.path}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                      isMulti && d.count === count && d.faces === faces ? "bg-primary/10 border-primary/30 text-primary font-medium" : "bg-card border-border hover:border-primary/30"
                    }`}>{d.count}d{d.faces}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DePage;
