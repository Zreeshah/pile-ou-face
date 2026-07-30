import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { Shuffle, Trash2, Plus, Users } from "lucide-react";

const LAST_UPDATED = "2026-07-29";

const faqItems = [
  {
    question: "Comment fonctionne le tirage au sort en ligne ?",
    answer:
      "Entrez une liste de noms (un par ligne), cliquez sur « Tirer au sort », et l'outil sélectionne un nom aléatoirement. Chaque nom a exactement la même probabilité d'être choisi. Le tirage est instantané, gratuit et ne conserve aucune donnée personnelle. Tout se passe dans votre navigateur.",
  },
  {
    question: "Le tirage au sort est-il vraiment équitable et transparent ?",
    answer:
      "Oui. L'outil utilise le générateur aléatoire Math.random() du navigateur. Tous les noms ont exactement la même chance d'être tirés, sans aucun biais. Pour garantir la transparence, vous pouvez faire une capture d'écran horodatée du résultat ou filmer votre écran pendant le tirage. Pour les concours officiels, nous recommandons de conserver ces preuves.",
  },
  {
    question: "Puis-je utiliser cet outil pour un concours Instagram ou Facebook ?",
    answer:
      "Absolument. Le tirage au sort est idéal pour les concours sur les réseaux sociaux. Copiez la liste des participants (commentaires Instagram, likes Facebook) dans l'outil, lancez le tirage et publiez une capture d'écran du résultat comme preuve. Pour les concours avec lots importants, vérifiez la réglementation applicable : certains types de concours peuvent nécessiter un huissier.",
  },
  {
    question: "Peut-on tirer plusieurs gagnants sans doublon ?",
    answer:
      "Pour l'instant, l'outil tire un seul nom à la fois. Pour tirer plusieurs gagnants, vous pouvez relancer le tirage en supprimant le gagnant précédent de la liste. Une fonction de tirage multiple sans remise est en développement pour simplifier ce processus.",
  },
  {
    question: "Mes données sont-elles conservées ou partagées ?",
    answer:
      "Non. Tout se passe exclusivement dans votre navigateur. Les noms que vous entrez ne sont jamais envoyés à un serveur, ni stockés, ni partagés avec des tiers. Vous pouvez fermer la page sans laisser de trace. C'est un outil 100 % confidentiel et respectueux de la vie privée.",
  },
  {
    question: "Puis-je utiliser cet outil pour ma classe ?",
    answer:
      "Oui, c'est l'un des usages les plus courants. Les enseignants utilisent le tirage au sort pour désigner un élève au hasard, former des groupes de travail, attribuer des sujets d'exposé ou choisir l'ordre de passage. L'outil fonctionne sur tous les appareils et ne nécessite aucune installation.",
  },
  {
    question: "Le tirage au sort est-il légal pour un concours ?",
    answer:
      "En France, les tirages au sort sont généralement légaux pour les concours gratuits sans obligation d'achat. Pour les jeux avec obligation d'achat, la réglementation est plus stricte et peut nécessiter un dépôt chez un huissier. Nous vous recommandons de consulter les conditions générales de la plateforme concernée (Instagram, Facebook, YouTube) et la législation applicable à votre pays.",
  },
  {
    question: "Quelle est la différence avec le pile ou face ?",
    answer:
      "Le pile ou face permet de choisir entre deux options (50/50). Le tirage au sort permet de choisir parmi autant de noms que vous voulez : 3, 10, 100 ou plus. Pour les décisions binaires, utilisez notre simulateur de pile ou face. Pour les choix multiples, le tirage au sort est l'outil adapté.",
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
    setResult(null);
    let cycles = 0;
    const maxCycles = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setResult(names[randomIndex]);
      cycles++;
      if (cycles >= maxCycles) {
        clearInterval(interval);
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
        title="Tirage au Sort de Noms en Ligne – Générateur Aléatoire Gratuit"
        description="Tirez un ou plusieurs noms au hasard parmi votre liste. Générateur de noms aléatoires gratuit, équitable et transparent. Parfait pour les concours, classes et décisions."
        canonicalUrl="/tirage-au-sort"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Tirage au Sort de Noms en Ligne"
        description="Outil gratuit de tirage au sort aléatoire parmi une liste de noms. Générateur équitable pour concours, classes et jeux."
        url="/tirage-au-sort"
        dateModified={LAST_UPDATED}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden" id="top">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Tirage au sort de noms en ligne
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Générateur aléatoire gratuit
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto animate-fade-in-up">
              Choisissez un nom au hasard parmi votre liste. <strong>Gratuit, équitable et transparent</strong>. Idéal pour les concours, les classes et les jeux de groupe.
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
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Entrez les noms (un par ligne)</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Emma\nLucas\nLéa\nHugo\n..."}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <div className="flex gap-2 mt-3">
                  <button onClick={addNames} disabled={!input.trim()} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                  <button onClick={loadExample} className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium text-sm transition-colors flex items-center gap-2">
                    <Users className="w-4 h-4" /> Exemple
                  </button>
                </div>
              </div>

              {names.length > 0 && (
                <div className="mb-8 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {names.length} nom{names.length > 1 ? "s" : ""} dans la liste
                    </h3>
                    <button onClick={clearAll} className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Tout effacer
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-muted/30 rounded-xl">
                    {names.map((name, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-sm group hover:border-destructive/30 transition-colors">
                        {name}
                        <button onClick={() => removeName(index)} className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                {result && (
                  <div className={`animate-scale-in ${isSpinning ? "animate-pulse" : ""}`}>
                    <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{result}</p>
                    <p className="text-muted-foreground text-sm">{isSpinning ? "Tirage en cours..." : "a été tiré(e) au sort !"}</p>
                  </div>
                )}
                {!result && names.length >= 2 && (
                  <p className="text-lg text-muted-foreground">Prêt à tirer au sort parmi {names.length} noms</p>
                )}
                {names.length < 2 && names.length > 0 && (
                  <p className="text-muted-foreground">Ajoutez au moins 2 noms pour lancer le tirage</p>
                )}
              </div>

              <div className="flex justify-center">
                <button onClick={pickRandom} disabled={names.length < 2 || isSpinning} className="btn-flip flex items-center gap-2 disabled:opacity-50">
                  <Shuffle className="w-5 h-5" /> Tirer au sort
                </button>
              </div>
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
                  ["#definition", "Qu'est-ce qu'un tirage au sort en ligne ?"],
                  ["#utilisation", "Comment utiliser le générateur de noms ?"],
                  ["#concours", "Tirage au sort pour concours Instagram et Facebook"],
                  ["#classe", "Tirage au sort pour la classe et les élèves"],
                  ["#equite", "Équité et transparence du tirage"],
                  ["#reglementation", "Réglementation des tirages au sort"],
                  ["#faq", "Questions fréquentes"],
                ].map(([href, label]) => (
                  <li key={href}><a href={href} className="text-primary hover:underline">{label}</a></li>
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
              Qu'est-ce qu'un tirage au sort de noms en ligne ?
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Un <strong>tirage au sort de noms</strong> est un outil qui sélectionne aléatoirement un ou plusieurs noms parmi une liste. C'est la version numérique du chapeau dans lequel on pioche un papier : chaque participant a exactement la même probabilité d'être choisi, sans favoritisme ni biais.
              </p>
              <p>
                Notre <strong>générateur de noms aléatoires</strong> reproduit ce principe de manière entièrement numérique. Il suffit de coller votre liste de noms (un par ligne), de cliquer sur « Tirer au sort », et le résultat s'affiche instantanément avec une animation visuelle. L'outil est gratuit, fonctionne sur tous les appareils et ne nécessite ni inscription ni téléchargement.
              </p>
              <p>
                Le tirage au sort est utilisé depuis l'Antiquité pour garantir l'impartialité. Les Athéniens tiraient leurs magistrats au sort pour éviter la corruption. Aujourd'hui, les jurys d'assises sont tirés au sort sur les listes électorales. Notre outil applique le même principe d'équité, avec la rapidité et la transparence du numérique.
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
              Comment utiliser le générateur de noms aléatoires ?
            </h2>
            <div className="card-glass p-8 space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 1 — Entrez votre liste de noms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Collez ou saisissez les noms des participants, un par ligne. Vous pouvez copier-coller directement depuis un tableur Excel, un document Word ou une liste d'emails. L'outil accepte n'importe quel format de texte. Utilisez le bouton « Exemple » pour tester avec une liste prête à l'emploi.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 2 — Vérifiez votre liste</h3>
                <p className="text-muted-foreground leading-relaxed">
                  La liste s'affiche sous forme de pastilles. Vous pouvez supprimer un nom en cliquant sur le ×, ou tout effacer avec le bouton dédié. Cette vérification est importante pour éviter les doublons ou les erreurs de saisie avant le tirage officiel.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Étape 3 — Lancez le tirage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Cliquez sur « Tirer au sort ». L'outil fait défiler les noms rapidement avant de s'arrêter sur le gagnant. Pour <strong>tirer au sort un gagnant</strong> supplémentaire, supprimez le nom tiré de la liste et relancez. Pour garantir la transparence, faites une capture d'écran horodatée du résultat ou filmez votre écran.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concours */}
      <section id="concours" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Tirage au sort pour concours Instagram et Facebook
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Les <strong>tirages au sort Instagram</strong> et <strong>tirages au sort Facebook</strong> sont devenus incontournables pour les créateurs de contenu, les marques et les commerces qui souhaitent animer leur communauté. Notre outil est parfaitement adapté à cet usage.
              </p>
              <h3 className="text-xl font-display font-semibold">Comment organiser un tirage au sort sur les réseaux sociaux</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Définissez les règles du concours</strong> : date de début, date de fin, conditions de participation (commenter, liker, partager, suivre le compte).</li>
                <li><strong>Collectez les participants</strong> : copiez la liste des commentaires ou des noms des participants. Sur Instagram, vous pouvez extraire les commentaires manuellement ou utiliser un outil d'export.</li>
                <li><strong>Lancez le tirage au sort</strong> : collez la liste dans notre outil et tirez le gagnant. Faites une <strong>capture d'écran horodatée</strong> du résultat.</li>
                <li><strong>Publiez le résultat</strong> : partagez la capture en story ou en publication pour garantir la transparence auprès de votre communauté.</li>
              </ol>
              <p>
                Pour les concours avec des lots de valeur, nous recommandons de <strong>filmer l'écran</strong> pendant le tirage plutôt que de publier une simple capture. La vidéo constitue une preuve plus solide et renforce la confiance des participants.
              </p>
              <p>
                Pour générer du hasard de manière plus large, découvrez aussi notre{" "}
                <a href="/" className="text-primary hover:underline">simulateur de pile ou face</a>{" "}
                et notre{" "}
                <a href="/de-en-ligne" className="text-primary hover:underline">dé en ligne</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Classe */}
      <section id="classe" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Tirage au sort pour la classe et les élèves
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                Le <strong>tirage au sort élèves classe</strong> est l'un des usages les plus appréciés par les enseignants. Il permet de <strong>choisir un élève au hasard</strong> de manière impartiale, sans que personne ne se sente visé ou oublié.
              </p>
              <h3 className="text-xl font-display font-semibold">Utilisations en classe</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Interroger un élève :</strong> Au lieu de désigner manuellement, laissez le hasard choisir. Les élèves savent que c'est aléatoire et l'acceptent mieux.</li>
                <li><strong>Former des groupes de travail :</strong> Tirez les noms un par un pour constituer des groupes équilibrés. Pour l'instant, supprimez chaque nom tiré de la liste avant de relancer. Une fonction de <strong>tirage au sort groupes de travail</strong> automatique est en développement.</li>
                <li><strong>Attribuer des sujets d'exposé :</strong> Associez chaque sujet à un numéro et tirez les élèves au sort pour déterminer l'ordre de passage ou l'attribution des thèmes.</li>
                <li><strong>Choisir l'ordre de passage :</strong> Pour les présentations orales, le tirage au sort évite les contestations et garantit l'équité.</li>
              </ul>
              <p>
                L'outil fonctionne sur tous les appareils : l'enseignant peut l'utiliser depuis son ordinateur, sa tablette ou même son téléphone, projeté au tableau ou partagé en visioconférence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Équité */}
      <section id="equite" className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Équité et transparence du tirage au sort
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                L'<strong>équité</strong> est au cœur de notre générateur de noms aléatoires. Contrairement à un tirage papier dans un chapeau, notre outil ne peut pas être influencé par la façon de mélanger, la position des papiers ou un choix inconscient.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Algorithme impartial :</strong> Le tirage utilise Math.random(), un générateur pseudo-aléatoire standard. Chaque nom a exactement 1/n chances d'être sélectionné.</li>
                <li><strong>Animation visible :</strong> Les noms défilent rapidement avant le résultat final, ce qui rend le processus visuellement transparent et empêche toute suspicion de résultat pré-déterminé.</li>
                <li><strong>Capture d'écran horodatée :</strong> Pour prouver le résultat, faites une capture d'écran incluant la date et l'heure. Sur Windows (Win+Shift+S) ou Mac (Cmd+Shift+4), l'horodatage est automatique dans le fichier.</li>
                <li><strong>Enregistrement vidéo :</strong> Pour une transparence maximale, filmez votre écran pendant le tirage. C'est la méthode recommandée pour les concours avec des lots importants.</li>
                <li><strong>Aucune donnée conservée :</strong> Les noms ne sont jamais envoyés à un serveur. Tout se passe dans votre navigateur, ce qui élimine tout risque de manipulation externe.</li>
              </ul>
              <p>
                Pour les décisions à deux options, notre{" "}
                <a href="/" className="text-primary hover:underline">simulateur de pile ou face</a>{" "}
                offre une alternative rapide et tout aussi équitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Réglementation */}
      <section id="reglementation" className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Réglementation des tirages au sort : ce qu'il faut savoir
            </h2>
            <div className="card-glass p-8 space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                En France, la réglementation des <strong>tirages au sort concours</strong> dépend de la nature du jeu et de la présence ou non d'une obligation d'achat.
              </p>
              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Type de concours</th><th className="text-left py-2 px-3 font-semibold">Réglementation</th><th className="text-left py-2 px-3 font-semibold">Huissier obligatoire ?</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border"><td className="py-2 px-3">Concours gratuit sans obligation d'achat</td><td className="py-2 px-3">Règlement clair, résultats publiés</td><td className="py-2 px-3">Non</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Jeu avec obligation d'achat</td><td className="py-2 px-3">Loi du 21 mai 1836, dépôt chez un huissier</td><td className="py-2 px-3 font-bold">Oui</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Loterie gratuite (sans achat)</td><td className="py-2 px-3">Règlement déposé, pas de frais pour participer</td><td className="py-2 px-3">Recommandé</td></tr>
                    <tr className="border-b border-border"><td className="py-2 px-3">Concours Instagram / Facebook</td><td className="py-2 px-3">Respecter les CGU de la plateforme + droit français</td><td className="py-2 px-3">Selon la valeur des lots</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                <strong>Bon à savoir :</strong> Instagram et Facebook ont leurs propres conditions d'utilisation concernant les concours. Instagram exige notamment que vous mentionniez que le concours n'est « ni sponsorisé, ni approuvé, ni administré par Instagram ». Pensez à inclure cette mention dans votre publication.
              </p>
              <p className="text-sm text-muted-foreground/70 bg-muted/30 p-4 rounded-lg">
                <strong>Avertissement :</strong> Les informations ci-dessus sont fournies à titre indicatif et ne constituent pas un avis juridique. Pour les concours avec des lots de valeur significative, consultez un professionnel du droit.
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
              Questions fréquentes sur le tirage au sort
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

export default RandomPicker;
