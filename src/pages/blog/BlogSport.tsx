import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pile ou face au football et au rugby : que dit le règlement officiel ?",
  description: "Que dit le règlement du pile ou face au football et au rugby ? Loi 8 de l'IFAB, Loi 6 de World Rugby, toss NFL et cricket.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29", dateModified: "2026-08-14",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/pile-ou-face-football-rugby/" },
  inLanguage: "fr-FR",
};

const FAQ_ITEMS = [
  {
    question: "Que dit la Loi 8 du football sur le pile ou face ?",
    answer: "La Loi 8, édictée par l'IFAB, prévoit que l'arbitre lance une pièce avant le coup d'envoi. L'équipe qui gagne le tirage choisit le but qu'elle attaquera en première période ou décide de donner le coup d'envoi. L'adversaire obtient l'autre choix.",
  },
  {
    question: "Qui choisit quoi lors du toss au rugby ?",
    answer: "Selon la Loi 6 de World Rugby pour le rugby à XV, le vainqueur du tirage choisit de donner le coup d'envoi ou de choisir un côté du terrain. S'il choisit un côté, l'adversaire donne le coup d'envoi, et inversement.",
  },
  {
    question: "Pourquoi le toss du cricket est-il si important ?",
    answer: "Au cricket, le capitaine qui gagne le toss choisit si son équipe bat ou field en premier. Ce choix peut être important car l'état du terrain, la météo et le format du match influencent les conditions, sans déterminer à eux seuls le résultat.",
  },
  {
    question: "Le vainqueur du toss du Super Bowl gagne-t-il plus souvent ?",
    answer: "Le tirage détermine les choix de début de match, mais il ne décide évidemment pas à lui seul du vainqueur. La suite dépend du jeu, des stratégies et de l'exécution des deux équipes.",
  },
  {
    question: "Le pile ou face est-il obligatoire dans tous les sports ?",
    answer: "Non. Le football et le rugby à XV encadrent un tirage au sort, tandis que d'autres sports utilisent une procédure différente, comme l'entre-deux au basket-ball ou l'engagement au hockey. Il faut consulter le règlement propre à chaque discipline.",
  },
  {
    question: "Peut-on contester le résultat d'un toss officiel ?",
    answer: "Le règlement et l'arbitre déterminent si le lancer a été correctement exécuté. Un lancer invalide peut être recommencé ; pour connaître la procédure exacte, il faut se référer au code de la compétition concernée.",
  },
];

const BlogSport = () => (
  <BlogPost
    title="Pile ou face au football et au rugby : que dit le règlement officiel ?"
    description="Que dit le règlement du pile ou face au football et au rugby ? Loi 8 de l'IFAB, Loi 6 de World Rugby, toss NFL et cricket."
    slug="/blog/pile-ou-face-football-rugby"
    featuredImage="https://images.pexels.com/photos/163528/american-football-american-football-officials-referees-referee-163528.jpeg"
    articleSchema={ARTICLE_SCHEMA}
    faqItems={FAQ_ITEMS}
    dateModified="2026-08-14"
    sources={[
      {
        label: "IFAB — Loi 8 : coup d’envoi et reprise du jeu",
        href: "https://theifab.com/laws/latest/the-start-and-restart-of-play/",
      },
      {
        label: "World Rugby — Loi 6 : officiels de match et tirage au sort",
        href: "https://passport.world.rugby/laws-of-the-game/laws-by-number/6-match-officials/?overridelang=1",
      },
      {
        label: "NFL Football Operations — règlement officiel 2026, règle 6",
        href: "https://operations.nfl.com/rules-officiating/2026-nfl-rulebook",
      },
      {
        label: "MCC — Laws of Cricket, Law 13.4 (The toss)",
        href: "https://www.lords.org/mcc/the-laws/innings",
      },
      {
        label: "World Tennis — Rules of Tennis 2026",
        href: "https://www.itftennis.com/en/about-us/governance/rules-and-regulations/",
      },
    ]}
  >
    <p>
      Avant chaque match de football professionnel, l'arbitre réunit les deux capitaines au centre du terrain. Il lance une pièce. L'un choisit le camp, l'autre donne le coup d'envoi. Ce rituel, filmé par des centaines de caméras et regardé par des milliards de spectateurs, est régi par un texte précis : la <strong>Loi 8 du football</strong>. Et le football n'est pas le seul sport à avoir codifié le pile ou face.
    </p>
    <p>
      Le rugby, le cricket, le football américain et même le tennis ont tous intégré ce geste dans leur règlement officiel. Voici ce que disent les textes, sport par sport, pour que vous sachiez exactement ce qui se joue quand l'arbitre lance sa pièce.
    </p>

    <h2>Football : la Loi 8 de l'IFAB</h2>
    <p>
      Dans le football, le pile ou face est régi par la <strong>Loi 8</strong>, intitulée « Coup d'envoi et reprise du jeu ». Ce texte, publié par l'<strong>International Football Association Board (IFAB)</strong>, est le même pour toutes les compétitions reconnues par la FIFA — de la finale de la Coupe du Monde au match de district du dimanche matin.
    </p>
    <p>
      La procédure officielle laisse deux options à l'équipe qui gagne le tirage : choisir <strong>le but à attaquer en première période</strong> ou prendre le <strong>coup d'envoi</strong>. L'adversaire obtient l'autre choix. L'équipe qui a choisi son but en première période donne le coup d'envoi de la seconde, après le changement de côté.
    </p>
    <p>
      Cette possibilité de choisir directement le coup d'envoi figure dans la Loi 8 depuis la modification entrée en vigueur en 2019. Dire que le vainqueur choisit uniquement son camp n'est donc plus exact.
    </p>

    <h2>Rugby à XV : la Loi 6 de World Rugby</h2>
    <p>
      Le rugby à XV suit un protocole similaire, défini par la <strong>Loi 6 de World Rugby</strong>. L'arbitre organise le tirage : un capitaine lance la pièce et l'autre annonce son choix. Le vainqueur choisit soit le <strong>coup d'envoi</strong>, soit le <strong>côté du terrain</strong>.
    </p>
    <p>
      Dans un stade exposé au vent, à la pluie ou au soleil, choisir le bon côté peut influencer le déroulement de la première période. Cette explication concerne le règlement World Rugby du rugby à XV ; le rugby à XIII suit un code distinct.
    </p>

    <h2>Football américain : le toss du Super Bowl</h2>
    <p>
      Le football américain a élevé le pile ou face au rang de <strong>spectacle médiatique</strong>. Avant chaque match de NFL, et particulièrement avant le Super Bowl, le toss est un événement en soi. Selon la règle 6 de la NFL, le vainqueur peut différer son choix à la seconde mi-temps ou choisir entre le coup d'envoi et sa réception, ou encore le but à défendre.
    </p>
    <p>
      Lors du Super Bowl, la cérémonie bénéficie d'une mise en scène particulière et la pièce devient souvent un objet commémoratif. Le toss règle les choix de début de rencontre ; il ne permet pas, à lui seul, de prédire le vainqueur du match.
    </p>

    <h2>Cricket : le toss, une décision stratégique majeure</h2>
    <p>
      Le cricket mérite une attention particulière. Contrairement à la plupart des autres sports, le toss au cricket n'est pas une formalité : c'est <strong>une décision stratégique de premier ordre</strong>. Les deux capitaines se retrouvent au centre du terrain, l'arbitre lance une pièce, et le vainqueur choisit si son équipe <strong>batte</strong> (joue en attaque) ou <strong>lance</strong> (joue en défense) en premier.
    </p>
    <p>
      Ce choix dépend de nombreux facteurs : l'état du terrain, la météo, l'humidité, l'usure prévisible de la surface et le format de la rencontre. Dans le cricket de test, prévu sur plusieurs jours, ces conditions peuvent évoluer. Le choix du toss fait donc partie de la stratégie, sans déterminer à lui seul l'issue du match.
    </p>

    <h2>Tennis et autres sports</h2>
    <p>
      Tous les sports ne commencent pas par une pièce. Selon la compétition, le tennis peut employer une pièce ou faire tourner une raquette pour attribuer les choix initiaux. Le basket-ball utilise un entre-deux et le hockey un engagement. Ces procédures répondent à des règles différentes ; elles ne doivent pas être présentées comme un même tirage au sort universel.
    </p>

    <h2>Controverses et moments mémorables</h2>
    <p>
      Le pile ou face sportif n'est pas exempt de controverses. En <strong>2016</strong>, lors d'un match de NFL entre les Green Bay Packers et les Arizona Cardinals, le toss des prolongations a dû être <strong>refait</strong> parce que la pièce n'avait pas tourné correctement en l'air. L'incident, abondamment commenté, a relancé le débat sur la meilleure façon d'effectuer un tirage au sort dans le sport professionnel.
    </p>

    <div className="mt-8 p-4 bg-gold-50/30 rounded-xl border border-gold-200">
      <strong>À vous de jouer !</strong> Testez notre{" "}
      <a href="/" className="text-primary hover:underline font-medium">simulateur de pile ou face</a>{" "}
      pour reproduire le geste de l'arbitre. Et pour les décisions de groupe, découvrez notre{" "}
      <a href="/tirage-au-sort" className="text-primary hover:underline font-medium">outil de tirage au sort</a>.
    </div>
  </BlogPost>
);

export default BlogSport;
