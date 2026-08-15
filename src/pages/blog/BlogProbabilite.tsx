import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Probabilité pile ou face : le calcul expliqué simplement",
  description: "Comprendre la probabilité pile ou face en 5 minutes. Calcul simple des chances, séries de lancers, loi des grands nombres. Explications claires avec exemples.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29", dateModified: "2026-08-14",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/probabilite-pile-ou-face/" },
  inLanguage: "fr-FR",
};

const FAQ_ITEMS = [
  {
    question: "Quelle est la probabilité d'obtenir pile au premier lancer ?",
    answer: "Dans le modèle d'une pièce équilibrée, la probabilité d'obtenir pile au premier lancer est de 1/2, soit 50 %. Pour des lancers indépendants suivant ce modèle, elle reste la même au deuxième, au dixième ou au centième lancer.",
  },
  {
    question: "Comment calcule-t-on la probabilité d'une série de lancers ?",
    answer: "Pour calculer la probabilité d'une série de lancers indépendants, on multiplie les probabilités de chaque lancer entre elles. Pour trois piles d'affilée, le calcul est : (1/2) × (1/2) × (1/2) = 1/8 = 12,5 %. La formule générale est P(série) = (1/2)ⁿ, où n est le nombre de lancers.",
  },
  {
    question: "Pourquoi dit-on que chaque lancer est indépendant ?",
    answer: "Un lancer de pièce est indépendant parce que le résultat d'un lancer n'affecte pas le résultat du suivant. La pièce ne possède pas de mémoire. Même après 10 piles consécutifs, la probabilité d'obtenir pile au onzième lancer reste de 50 %. Cette indépendance est la base de tous les calculs de probabilité.",
  },
  {
    question: "La probabilité pile ou face est-elle vraiment de 50/50 dans la réalité ?",
    answer: "Dans un modèle théorique, oui. Diaconis, Holmes et Montgomery ont prédit en 2007 un léger biais vers le côté de départ. Une étude distincte de Bartoš et al. (2023), fondée sur 350 757 lancers, a ensuite mesuré un retour au côté de départ dans environ 50,8 % des cas.",
  },
  {
    question: "Qu'est-ce que la loi des grands nombres ?",
    answer: "La loi des grands nombres stipule que plus on répète une expérience aléatoire, plus la moyenne des résultats se rapproche de la probabilité théorique. Sur 10 lancers, vous pouvez obtenir 80 % de piles. Sur 10 000 lancers, la proportion sera très proche de 50 %. Cette loi, formulée par Jakob Bernoulli au XVIIIe siècle, est l'un des piliers des statistiques modernes.",
  },
  {
    question: "Quelle est la probabilité d'obtenir au moins un pile en trois lancers ?",
    answer: "Il est plus simple de calculer la probabilité de l'événement inverse : n'obtenir aucun pile en trois lancers, c'est-à-dire trois faces d'affilée. P(trois faces) = (1/2)³ = 1/8 = 12,5 %. La probabilité d'obtenir au moins un pile est donc le complément : 1 − 1/8 = 7/8 = 87,5 %. Dans 87,5 % des cas, vous obtiendrez au moins un pile en trois lancers.",
  },
];

const BlogProbabilite = () => (
  <BlogPost
    title="Probabilité pile ou face : le calcul expliqué simplement"
    description="Comprendre la probabilité pile ou face en 5 minutes. Calcul simple des chances, séries de lancers, loi des grands nombres. Explications claires avec exemples."
    slug="/blog/probabilite-pile-ou-face"
    featuredImage="https://images.pexels.com/photos/6990181/pexels-photo-6990181.jpeg"
    articleSchema={ARTICLE_SCHEMA}
    faqItems={FAQ_ITEMS}
    dateModified="2026-08-14"
    sources={[
      {
        label: "Diaconis, Holmes et Montgomery (2007) — Dynamical Bias in the Coin Toss",
        href: "https://epubs.siam.org/doi/abs/10.1137/S0036144504446436",
      },
      {
        label: "Bartoš et al. (2023) — étude de 350 757 lancers",
        href: "https://arxiv.org/abs/2310.04153",
      },
    ]}
  >
    <p>
      Obtenir pile trois fois de suite, c'est une chance sur huit. Soit 12,5 %. Obtenir pile dix fois de suite, c'est une chance sur 1 024. Soit moins de 0,1 %. Ces chiffres ne sortent pas de nulle part : ils découlent d'une règle mathématique simple que n'importe qui peut comprendre en cinq minutes.
    </p>
    <p>
      Cet article explique la <strong>probabilité pile ou face</strong> sans jargon, avec des exemples concrets et des calculs que vous pourrez refaire vous-même. Que vous soyez étudiant, enseignant ou simplement curieux, vous allez découvrir que les maths du hasard sont bien plus accessibles qu'on ne le croit.
    </p>

    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Situation</th><th className="text-left py-2 px-3 font-semibold">Calcul</th><th className="text-left py-2 px-3 font-semibold">Probabilité</th></tr></thead>
        <tbody>
          <tr className="border-b border-border"><td className="py-2 px-3">Un seul lancer (pile)</td><td className="py-2 px-3 font-mono">1/2</td><td className="py-2 px-3">50 %</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3">Deux piles d'affilée</td><td className="py-2 px-3 font-mono">(1/2)²</td><td className="py-2 px-3">25 %</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3">Trois piles d'affilée</td><td className="py-2 px-3 font-mono">(1/2)³</td><td className="py-2 px-3">12,5 %</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3">Cinq piles d'affilée</td><td className="py-2 px-3 font-mono">(1/2)⁵</td><td className="py-2 px-3">3,125 %</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3">Dix piles d'affilée</td><td className="py-2 px-3 font-mono">(1/2)¹⁰</td><td className="py-2 px-3">0,098 %</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Qu'est-ce qu'une probabilité ?</h2>
    <p>
      Une probabilité mesure la chance qu'un événement se produise. Elle s'exprime toujours par un nombre entre 0 et 1, où 0 signifie « impossible » et 1 signifie « certain ». On peut aussi l'écrire en pourcentage : 0,5 = 50 %, 0,25 = 25 %. Dans le modèle d'une pièce équilibrée, les deux issues sont équiprobables. On écrit alors : <strong>P(pile) = 1/2 = 0,5 = 50 %</strong>. Le « P » signifie « probabilité de ». Une pièce physique peut s'écarter légèrement de ce modèle selon sa forme et la façon de la lancer.
    </p>
    <p>
      Cette simplicité fait du pile ou face le modèle parfait pour comprendre les bases des probabilités. Contrairement à un dé à six faces ou à un jeu de cartes, le pile ou face n'a que deux issues possibles, ce qui rend tous les calculs immédiatement vérifiables.
    </p>

    <h2>Pourquoi chaque lancer est indépendant</h2>
    <p>
      Une notion essentielle en probabilité est <strong>l'indépendance des événements</strong>. Dans le modèle habituel, chaque lancer est indépendant du précédent : le résultat observé n'influence pas le suivant. Si vous obtenez pile trois fois de suite, la probabilité modélisée au quatrième lancer reste de 50 %. La pièce ne « compense » pas la série passée.
    </p>
    <p>
      Cette idée est souvent contre-intuitive. Notre cerveau cherche naturellement des motifs et s'attend à ce que le hasard alterne régulièrement. Mais le vrai hasard produit des séries, des répétitions, des écarts qui nous paraissent « anormaux » alors qu'ils sont parfaitement naturels. C'est précisément cette confusion qui alimente le{" "}
      <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">sophisme du joueur</a>, que nous explorons dans un article dédié.
    </p>

    <h2>Calculer une série de lancers</h2>
    <p>
      Pour calculer la probabilité d'obtenir plusieurs résultats spécifiques à la suite, il suffit de multiplier les probabilités entre elles. Cette règle s'applique parce que chaque lancer est indépendant. La <strong>formule générale</strong> est : <strong>P(A puis B) = P(A) × P(B)</strong>. Appliquons cette règle à notre pièce.
    </p>
    <p>
      <strong>Exemple 1 : Deux piles d'affilée.</strong> P(pile puis pile) = 1/2 × 1/2 = 1/4 = 25 %. Vous avez donc une chance sur quatre d'obtenir deux piles consécutifs.
    </p>
    <p>
      <strong>Exemple 2 : Trois piles d'affilée.</strong> P(trois piles) = (1/2)³ = 1/8 = 12,5 %. C'est le calcul qui donne le célèbre 12,5 % que l'on retrouve dans tous les cours de maths.
    </p>
    <p>
      <strong>Exemple 3 : N'importe quelle séquence spécifique.</strong> Que vous cherchiez « pile-pile-pile » ou « pile-face-pile », la probabilité reste de 12,5 %. Chaque séquence de trois résultats est équiprobable. C'est un point important : il n'y a pas de séquence « plus probable » qu'une autre. Pile-Face-Pile a exactement la même probabilité que Pile-Pile-Pile.
    </p>

    <h2>La loi des grands nombres</h2>
    <p>
      Si vous lancez une pièce 10 fois, il est tout à fait possible d'obtenir 7 piles et 3 faces. Le hasard produit naturellement des écarts sur de petits échantillons. Mais si vous lancez la pièce 1 000 fois, la proportion de piles se rapprochera de 50 %. Et à 10 000 lancers, elle sera encore plus proche. Cette observation fondamentale s'appelle la <strong>loi des grands nombres</strong>.
    </p>
    <p>
      Formulée par le mathématicien suisse <strong>Jakob Bernoulli</strong> au début du XVIIIe siècle, elle stipule que plus le nombre d'essais augmente, plus la moyenne des résultats se rapproche de la probabilité théorique. C'est l'une des lois les plus importantes des statistiques modernes. Elle explique pourquoi les casinos gagnent toujours à long terme, et pourquoi les sondages fonctionnent mieux avec de grands échantillons.
    </p>
    <p>
      Pour observer cette loi en action, rien de tel que notre{" "}
      <a href="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">outil de lancers multiples</a>{" "}
      qui permet de lancer 10, 100 ou 1 000 fois et d'afficher les statistiques en direct. Vous verrez la proportion de piles converger vers 50 % sous vos yeux.
    </p>

    <h2>L'espérance mathématique : à quoi s'attendre ?</h2>
    <p>
      L'espérance mathématique permet de prévoir le résultat moyen d'une expérience aléatoire. Pour un seul lancer de pile ou face, l'espérance de pile est de 0,5. Pour 100 lancers, l'espérance est de 50 piles. Attention : obtenir exactement 50 piles n'est pas garanti — la probabilité d'obtenir exactement 50 piles sur 100 lancers est d'environ 8 %. Mais si vous répétez l'expérience des centaines de fois, la moyenne de vos résultats sera très proche de 50.
    </p>

    <h2>Le sophisme du joueur : l'erreur classique</h2>
    <p>
      Le sophisme du joueur consiste à croire que les événements passés influencent les probabilités futures. Par exemple, penser qu'après cinq piles d'affilée, face a « plus de chances » de sortir au prochain lancer. Cette idée est mathématiquement fausse. La probabilité de face au sixième lancer reste exactement de 50 %, quels que soient les cinq résultats précédents. La pièce n'a pas de mémoire. Elle ne compense pas les écarts passés.
    </p>
    <p>
      Ce sophisme a ruiné des joueurs à Monte Carlo en 1913, quand la roulette est tombée 26 fois sur le noir — et que les joueurs ont continué à miser sur le rouge, persuadés qu'il était « dû ». Pour approfondir ce biais fascinant, lisez notre{" "}
      <a href="/blog/sophisme-du-joueur" className="text-primary hover:underline">article complet sur le sophisme du joueur</a>.
    </p>

    <div className="mt-8 p-4 bg-gold-50/30 rounded-xl border border-gold-200">
      <strong>Passez de la théorie à la pratique !</strong> Testez tous ces calculs avec notre{" "}
      <a href="/" className="text-primary hover:underline font-medium">simulateur de pile ou face</a>{" "}
      et notre{" "}
      <a href="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline font-medium">outil de lancers multiples</a>{" "}
      qui affiche les statistiques en direct. La loi des grands nombres n'attend que vous.
    </div>
  </BlogPost>
);

export default BlogProbabilite;
