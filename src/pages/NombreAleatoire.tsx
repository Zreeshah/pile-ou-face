import { useState, useCallback } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Dices, RotateCcw } from "lucide-react";
import {
  PRESETS,
  DEFAULT_CONFIG,
  RandomConfig,
  parseParams,
  metaFor,
  slugFor,
  drawNumbers,
} from "@/lib/random";

const LAST_UPDATED = "2026-08-15";

const faqItems = [
  {
    question: "Comment tirer un nombre au hasard en ligne ?",
    answer:
      "Indiquez la valeur minimum, la valeur maximum et le nombre de tirages souhaités, puis cliquez sur « Tirer ». Le générateur de nombre aléatoire sélectionne instantanément un ou plusieurs nombres compris entre vos deux bornes (incluses). Chaque nombre de l'intervalle a exactement la même probabilité d'être choisi. L'outil est gratuit, sans inscription et fonctionne sur mobile comme sur ordinateur.",
  },
  {
    question: "Le générateur de nombre aléatoire est-il vraiment aléatoire ?",
    answer:
      "L'outil utilise crypto.getRandomValues(), l'API cryptographique du navigateur, puis un échantillonnage sans biais dans l'intervalle demandé. Il convient aux usages ludiques, éducatifs et décisionnels, mais n'est pas certifié pour les jeux d'argent réglementés ni destiné à générer des secrets.",
  },
  {
    question: "Comment tirer un nombre aléatoire entre 1 et 10 ?",
    answer:
      "Réglez le minimum sur 1, le maximum sur 10, laissez le nombre de tirages sur 1, puis cliquez sur « Tirer ». Vous pouvez aussi ouvrir directement la page préconfigurée « tirer un nombre entre 1 et 10 » depuis la liste des tirages populaires plus bas. Le résultat est un entier de 1 à 10 inclus.",
  },
  {
    question: "Peut-on tirer plusieurs nombres d'un coup ?",
    answer:
      "Oui. Augmentez simplement le champ « Nombre de tirages ». L'outil génère alors une série de nombres aléatoires successifs dans le même intervalle. Chaque tirage est indépendant : un même nombre peut donc réapparaître (tirage avec remise), ce qui est utile pour simuler des lancers répétés ou des expériences avec remise.",
  },
  {
    question: "Les résultats sont-ils truqués ou stockés ?",
    answer:
      "Le code de l'outil calcule le tirage localement dans votre navigateur et n'envoie pas le nombre obtenu au serveur du site. Une capture ou une vidéo peut documenter l'écran, mais ne remplace pas un dispositif audité lorsque le règlement d'un concours l'exige.",
  },
  {
    question: "Quelle différence avec un dé ou un pile ou face ?",
    answer:
      "Un dé tire un nombre de 1 à 6 et un pile ou face tranche entre deux options (50/50). Le générateur de nombre aléatoire est plus souple : vous choisissez vous-même l'intervalle, de 1 à 10, 1 à 100, 1 à 49 ou n'importe quelle plage. Pour une décision binaire, préférez le pile ou face ; pour un jeu de société, le dé en ligne.",
  },
  {
    question: "Le générateur peut-il tirer les numéros du loto ?",
    answer:
      "Non, pas comme grille officielle complète. L'outil tire avec remise : un nombre peut apparaître plusieurs fois, et il ne génère pas de numéro Chance séparé. Il peut illustrer des tirages indépendants, mais utilisez les règles et canaux officiels pour constituer ou valider une grille de loterie.",
  },
];

const NumberTool = ({ config }: { config: RandomConfig }) => {
  const [draws, setDraws] = useState(config.draws);
  const [min, setMin] = useState(config.min);
  const [max, setMax] = useState(config.max);
  const [results, setResults] = useState<number[] | null>(null);
  const [rolling, setRolling] = useState(false);

  const valid = Number.isInteger(min) && Number.isInteger(max) && min < max && draws >= 1;

  const roll = useCallback(() => {
    if (!valid || rolling) return;
    setRolling(true);
    setResults(null);
    setTimeout(() => {
      setResults(drawNumbers({ draws, min, max }));
      setRolling(false);
    }, 500);
  }, [valid, rolling, draws, min, max]);

  const reset = () => {
    setDraws(config.draws);
    setMin(config.min);
    setMax(config.max);
    setResults(null);
  };

  return (
    <div className="card-glass p-6 md:p-10 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Minimum</span>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value, 10))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Maximum</span>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value, 10))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Nombre de tirages</span>
          <input
            type="number"
            min={1}
            value={draws}
            onChange={(e) => setDraws(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>
      </div>

      <div className="min-h-24 flex items-center justify-center text-center mb-6">
        {rolling && <p className="text-lg text-muted-foreground animate-pulse">Tirage en cours...</p>}
        {!rolling && results && (
          <div className="animate-scale-in">
            <div className="flex flex-wrap gap-3 justify-center">
              {results.map((n, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center min-w-16 h-16 px-4 rounded-xl bg-primary/10 border border-primary/20 text-3xl md:text-4xl font-display font-bold text-primary"
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              {results.length > 1 ? `${results.length} nombres tirés` : "Nombre tiré au hasard"} entre {min} et {max}
            </p>
          </div>
        )}
        {!rolling && !results && (
          <p className="text-lg text-muted-foreground">
            {valid ? `Prêt à tirer entre ${min} et ${max}` : "Le minimum doit être inférieur au maximum"}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <button onClick={roll} disabled={!valid || rolling} className="btn-flip flex items-center gap-2 disabled:opacity-50">
          <Dices className="w-5 h-5" /> Tirer
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium text-sm transition-colors flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Réinitialiser
        </button>
      </div>
    </div>
  );
};

const GENERIC_META = {
  h1: "Générateur de nombre aléatoire",
  title: "Générateur de Nombre Aléatoire Gratuit",
  description:
    "Tirez un ou plusieurs nombres au hasard entre un minimum et un maximum. Générateur uniforme, gratuit et instantané, sans inscription.",
};

const NombreAleatoire = () => {
  const { tirage, minimum, maximum } = useParams();
  const isPreset = Boolean(tirage);
  const parsed = isPreset ? parseParams(tirage, minimum, maximum) : null;

  // Bad preset URL → send back to the generic tool rather than index a junk page.
  if (isPreset && !parsed) return <Navigate to="/nombre-aleatoire" replace />;

  const config = parsed ?? DEFAULT_CONFIG;
  const routePath = parsed ? slugFor(parsed) : "/nombre-aleatoire";
  const canonicalUrl = "/nombre-aleatoire";
  const meta = parsed ? metaFor(parsed) : GENERIC_META;

  return (
    <Layout>
      <SEO
        title={meta.title}
        description={meta.description}
        canonicalUrl={canonicalUrl}
        noIndex={Boolean(parsed)}
        bareTitle
      />
      <WebsiteSchema />
      {!parsed && (
        <WebPageSchema
          title={meta.title}
          description={meta.description}
          url={canonicalUrl}
          dateModified={LAST_UPDATED}
        />
      )}

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              {meta.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              {parsed
                ? "Outil préconfiguré : cliquez sur « Tirer » pour obtenir votre résultat, ou ajustez les bornes à votre besoin."
                : "Choisissez un intervalle et tirez un ou plusieurs nombres au hasard. "}
              {!parsed && <strong>Gratuit, uniforme et instantané.</strong>}
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Mis à jour le <time dateTime={LAST_UPDATED}>15 août 2026</time>
            </p>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section className="py-4">
        <div className="container">
          <NumberTool key={routePath} config={config} />
        </div>
      </section>

      {/* Tirages populaires */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto card-glass p-6">
            <p className="font-display font-semibold mb-3">Tirages populaires</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <Link
                  key={slugFor(p)}
                  to={slugFor(p)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    routePath === slugFor(p)
                      ? "bg-primary/10 border-primary/30 text-primary font-medium"
                      : "bg-card border-border hover:border-primary/30"
                  }`}
                >
                  {p.draws > 1 ? `${p.draws} nombres ` : ""}
                  {p.min}–{p.max}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sommaire */}
      <section className="py-4">
        <div className="container">
          <div className="max-w-3xl mx-auto card-glass p-6">
            <p className="font-display font-semibold mb-3">Sommaire</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              {[
                ["#definition", "Qu'est-ce qu'un générateur de nombre aléatoire ?"],
                ["#utilisation", "Comment tirer un nombre au hasard ?"],
                ["#usages", "À quoi sert le tirage d'un nombre aléatoire ?"],
                ["#limites", "Quelles sont les limites de l'outil ?"],
                ["#aleatoire", "Le tirage est-il vraiment aléatoire ?"],
                ["#difference", "Nombre, dé ou pile ou face : lequel choisir ?"],
                ["#faq", "Questions fréquentes"],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Définition */}
      <section id="definition" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Qu'est-ce qu'un générateur de nombre aléatoire ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Un <strong>générateur de nombre aléatoire</strong> est un outil qui choisit un nombre au hasard dans un intervalle que vous définissez. Vous fixez une borne minimum et une borne maximum, et l'outil renvoie un entier compris entre les deux, chaque valeur ayant exactement la même probabilité de sortir. C'est la version numérique du tirage dans un chapeau, mais appliqué à des nombres.
              </p>
              <p>
                Notre <strong>générateur aléatoire</strong> va plus loin qu'un simple dé : vous n'êtes pas limité à 1–6. Vous pouvez <strong>tirer un nombre au hasard</strong> entre 1 et 10, entre 1 et 100, entre 0 et 9 ou dans une autre plage d'entiers. Il est aussi possible de générer plusieurs résultats indépendants en un seul clic, avec répétitions possibles.
              </p>
              <p>
                L'outil est gratuit, instantané et ne demande aucune inscription. Tout le calcul se fait dans votre navigateur : rien n'est envoyé sur un serveur. C'est l'outil idéal pour départager, décider, jouer ou enseigner le hasard sans dé physique ni papier.
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
              Comment tirer un nombre au hasard ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 1 — Définissez l'intervalle</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Saisissez la valeur <strong>minimum</strong> et la valeur <strong>maximum</strong>. Les deux bornes sont incluses : un tirage entre 1 et 10 peut donc renvoyer 1 comme 10. L'intervalle accepte aussi des nombres négatifs ou zéro selon votre besoin.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 2 — Choisissez le nombre de tirages</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Laissez « Nombre de tirages » sur 1 pour un seul nombre, ou augmentez-le pour obtenir une série. Chaque tirage est indépendant et se fait <strong>avec remise</strong> : un même nombre peut réapparaître, comme lorsqu'on relance un dé plusieurs fois.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 3 — Cliquez sur « Tirer »</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Le résultat s'affiche instantanément. Une capture ou une vidéo peut documenter ce qui apparaît à l'écran, mais ne remplace pas un dispositif audité lorsque le règlement l'exige. Vous pouvez relancer autant de fois que vous le souhaitez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usages */}
      <section id="usages" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              À quoi sert le tirage d'un nombre aléatoire ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le <strong>tirage au sort d'un nombre</strong> répond à une foule de situations du quotidien. Voici les usages les plus courants de notre générateur :
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Jeux de société et jeux de rôle :</strong> remplacez un dé perdu, tirez un nombre entre 1 et 20 pour un jet de D20, ou générez plusieurs dés d'un coup.</li>
                <li><strong>Exercices de combinatoire :</strong> générez plusieurs valeurs avec remise pour observer les répétitions possibles et comparer le résultat à un tirage sans remise.</li>
                <li><strong>En classe :</strong> désignez un élève par son numéro, formez des groupes ou tirez l'ordre de passage de façon impartiale.</li>
                <li><strong>Concours et réseaux sociaux :</strong> attribuez un numéro à chaque participant, puis tirez le gagnant au hasard.</li>
                <li><strong>Décisions du quotidien :</strong> qui commence, qui débarrasse, quel restaurant… laissez le hasard trancher sans discussion.</li>
                <li><strong>Sport et équipes :</strong> déterminez un ordre, un couloir, un tour de jeu ou constituez des équipes équilibrées.</li>
              </ul>
              <p>
                Pour choisir non pas un nombre mais un nom parmi une liste, utilisez plutôt notre{" "}
                <Link to="/tirage-au-sort" className="text-primary hover:underline">tirage au sort de noms</Link>. Et pour un simple 1 à 6, notre{" "}
                <Link to="/de-en-ligne" className="text-primary hover:underline">dé en ligne</Link> avec animation fait parfaitement l'affaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Limites */}
      <section id="limites" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Limites et erreurs fréquentes
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Vérifiez d'abord si votre usage demande un tirage <strong>avec remise</strong> ou <strong>sans remise</strong>. Cet outil effectue des tirages indépendants avec remise : lorsque vous demandez plusieurs nombres, une même valeur peut réapparaître.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Ne confondez pas plage et quantité :</strong> « 1 à 49 » définit les valeurs possibles; le champ « Nombre de tirages » définit combien de résultats sont produits.</li>
                <li><strong>Ne supprimez pas un doublon après coup sans refaire le tirage :</strong> remplacer manuellement une répétition modifie la procédure initiale.</li>
                <li><strong>Ne présentez pas une capture comme un audit :</strong> elle documente l'écran, mais ne certifie ni la configuration ni le code exécuté.</li>
              </ul>
              <p>
                Une grille LOTO® simple suit une autre règle : la FDJ indique qu'elle comporte cinq numéros choisis parmi 49 et un numéro Chance choisi parmi 10. Le préréglage « 5 nombres entre 1 et 49 » de ce site peut produire des doublons et n'ajoute pas le numéro Chance; il ne constitue donc pas une grille officielle complète. Consultez les{" "}
                <a
                  href="https://www.fdj.fr/mag/questions/article-quelles-les-chances-de-gagner-loto-120326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  règles présentées par la FDJ
                </a>{" "}
                avant toute participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aléatoire */}
      <section id="aleatoire" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Le tirage est-il vraiment aléatoire et équitable ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Notre outil utilise <strong>crypto.getRandomValues()</strong>, l'API de valeurs aléatoires cryptographiquement fortes intégrée aux navigateurs modernes. Il transforme ces valeurs par échantillonnage sans biais dans l'intervalle choisi :
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Équiprobabilité :</strong> chaque nombre de l'intervalle a strictement la même chance de sortir. Sur 1 à 10, chaque valeur a une probabilité de 1/10.</li>
                <li><strong>Indépendance :</strong> chaque tirage est indépendant des précédents. Le hasard n'a pas de mémoire — croire le contraire, c'est tomber dans le <Link to="/blog/sophisme-du-joueur" className="text-primary hover:underline">sophisme du joueur</Link>.</li>
                <li><strong>Calcul local :</strong> le code de l'outil calcule le résultat dans le navigateur et ne le transmet pas au serveur du site.</li>
              </ul>
              <p>
                Cette méthode est adaptée aux usages courants du site. Elle ne transforme pas l'outil en générateur de clés, en dispositif de tirage certifié ou en système homologué pour des jeux d'argent réglementés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Différence */}
      <section id="difference" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Nombre aléatoire, dé ou pile ou face : lequel choisir ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Ces trois outils peuvent effectuer une sélection uniforme, mais ne servent pas les mêmes situations :
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-semibold">Outil</th>
                      <th className="text-left py-2 px-3 font-semibold">Résultats possibles</th>
                      <th className="text-left py-2 px-3 font-semibold">Idéal pour</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3"><Link to="/" className="text-primary hover:underline">Pile ou face</Link></td><td className="py-2 px-3">2 (50/50)</td><td className="py-2 px-3">Décision binaire, oui/non</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3"><Link to="/de-en-ligne" className="text-primary hover:underline">Dé en ligne</Link></td><td className="py-2 px-3">1 à 6</td><td className="py-2 px-3">Jeux de société, jeux de rôle</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Nombre aléatoire</td><td className="py-2 px-3">Intervalle libre</td><td className="py-2 px-3">Classe, concours, simulations, plages sur mesure</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                En résumé : pour trancher entre deux options, le <Link to="/" className="text-primary hover:underline">pile ou face</Link> est le plus rapide. Pour un classique 1–6, le dé. Et dès que vous avez besoin d'un intervalle personnalisé ou de plusieurs tirages, le générateur de nombre aléatoire est l'outil le plus polyvalent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
              Questions fréquentes sur le générateur de nombre aléatoire
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

export default NombreAleatoire;
