import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pile ou face au football et au rugby : que dit le règlement officiel ?",
  description: "Que dit le règlement du pile ou face au football et au rugby ? Loi 8 FIFA, protocole rugby, toss NFL et cricket. Tout savoir sur le tirage au sort sportif.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29", dateModified: "2026-07-29",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/pile-ou-face-football-rugby/" },
  inLanguage: "fr-FR",
};

const FAQ_ITEMS = [
  {
    question: "Que dit la Loi 8 du football sur le pile ou face ?",
    answer: "La Loi 8, édictée par l'IFAB, stipule que l'arbitre lance une pièce avant le coup d'envoi. Le capitaine qui gagne le tirage choisit le côté du terrain pour la première mi-temps. L'autre équipe donne le coup d'envoi. À la mi-temps, les équipes changent de côté et celle qui n'a pas engagé le fait. La procédure est identique pour toutes les compétitions FIFA.",
  },
  {
    question: "Qui choisit quoi lors du toss au rugby ?",
    answer: "Selon la Loi 1 de World Rugby, le capitaine qui remporte le tirage au sort choisit entre le coup d'envoi et le côté du terrain. Ce choix est plus stratégique qu'au football car les conditions météo peuvent fortement influencer le jeu. Le protocole s'applique au rugby à XV et à XIII.",
  },
  {
    question: "Pourquoi le toss du cricket est-il si important ?",
    answer: "Au cricket, le capitaine qui gagne le toss choisit si son équipe batte ou lance en premier. Ce choix est crucial car l'état du terrain évolue au fil des jours. Un terrain frais favorise les lanceurs, un terrain usé favorise les batteurs. Un mauvais choix au toss peut faire perdre un match avant même le premier lancer.",
  },
  {
    question: "Le vainqueur du toss du Super Bowl gagne-t-il plus souvent ?",
    answer: "Non. Statistiquement, le vainqueur du toss du Super Bowl ne gagne le match que dans environ 49 % des cas. Gagner le toss ne confère donc aucun avantage statistique significatif. La pièce du Super Bowl, frappée en or 24 carats par la Highland Mint, est un objet de collection très recherché.",
  },
  {
    question: "Le pile ou face est-il obligatoire dans tous les sports ?",
    answer: "Non, mais il est très répandu. Les sports où deux équipes s'affrontent utilisent presque tous un tirage au sort. Le tennis fait tourner une raquette, ce qui est fonctionnellement équivalent. Le basket-ball et le hockey déterminent souvent le côté par un entre-deux ou un engagement initial.",
  },
  {
    question: "Peut-on contester le résultat d'un toss officiel ?",
    answer: "En principe, non. Le résultat d'un toss officiel est sans appel. L'incident de 2016 en NFL, où le toss a été refait parce que la pièce n'avait pas tourné correctement, est une exception rarissime. Dans le football et le rugby, le toss est effectué une seule fois et son résultat est définitif.",
  },
];

const BlogSport = () => (
  <BlogPost
    title="Pile ou face au football et au rugby : que dit le règlement officiel ?"
    description="Que dit le règlement du pile ou face au football et au rugby ? Loi 8 FIFA, protocole rugby, toss NFL et cricket. Tout savoir sur le tirage au sort sportif."
    slug="/blog/pile-ou-face-football-rugby"
    featuredImage="https://images.pexels.com/photos/163528/american-football-american-football-officials-referees-referee-163528.jpeg"
    articleSchema={ARTICLE_SCHEMA}
    faqItems={FAQ_ITEMS}
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
      La procédure est immuable. L'arbitre lance une pièce en présence des deux capitaines. Le capitaine qui gagne le tirage choisit <strong>le côté du terrain</strong> que son équipe occupera en première mi-temps. L'autre équipe donne le <strong>coup d'envoi</strong>. À la mi-temps, les équipes changent de côté, et l'équipe qui n'a pas donné le coup d'envoi le donne en seconde période. La procédure est parfaitement symétrique et équitable.
    </p>
    <p>
      Une subtilité importante : le vainqueur du toss ne choisit <strong>pas</strong> qui engage. Il choisit uniquement le camp. Cette nuance est régulièrement mal comprise, y compris par certains commentateurs sportifs.
    </p>

    <h2>Rugby : la Loi 1 de World Rugby</h2>
    <p>
      Le rugby suit un protocole similaire, défini par la <strong>Loi 1 de World Rugby</strong> (anciennement International Rugby Board). L'arbitre procède à un tirage au sort en présence des deux capitaines avant le coup d'envoi. Le capitaine qui remporte le tirage choisit soit le <strong>coup d'envoi</strong>, soit le <strong>côté du terrain</strong>.
    </p>
    <p>
      Contrairement au football, le choix est plus large et peut avoir un impact stratégique réel. Dans un stade exposé au vent, à la pluie ou au soleil, choisir le bon côté peut influencer le déroulement de toute la première mi-temps. La procédure est identique pour le rugby à XV et le rugby à XIII, les deux codes utilisant le pile ou face depuis leurs premières codifications à la fin du XIXe siècle.
    </p>

    <h2>Football américain : le toss du Super Bowl</h2>
    <p>
      Le football américain a élevé le pile ou face au rang de <strong>spectacle médiatique</strong>. Avant chaque match de NFL, et particulièrement avant le Super Bowl, le toss est un événement en soi. Le règlement prévoit que le vainqueur peut choisir parmi <strong>trois options</strong> : recevoir le ballon en première mi-temps, donner le coup d'envoi, ou différer son choix à la seconde mi-temps.
    </p>
    <p>
      Pour le Super Bowl, la pièce utilisée est spécialement frappée en <strong>or 24 carats</strong> par la Highland Mint, une entreprise basée en Floride. Ces pièces deviennent ensuite des objets de collection extrêmement recherchés. Une statistique amusante : le vainqueur du toss du Super Bowl n'a remporté le match que dans environ <strong>49 % des cas</strong>. Gagner le toss ne donne donc aucun avantage statistique. Le hasard reste le hasard, même avec une pièce en or.
    </p>

    <h2>Cricket : le toss, une décision stratégique majeure</h2>
    <p>
      Le cricket mérite une attention particulière. Contrairement à la plupart des autres sports, le toss au cricket n'est pas une formalité : c'est <strong>une décision stratégique de premier ordre</strong>. Les deux capitaines se retrouvent au centre du terrain, l'arbitre lance une pièce, et le vainqueur choisit si son équipe <strong>batte</strong> (joue en attaque) ou <strong>lance</strong> (joue en défense) en premier.
    </p>
    <p>
      Ce choix dépend de nombreux facteurs : l'état du terrain, la météo, l'humidité, l'usure prévisible de la pelouse, et même l'heure de la journée. Dans le cricket de test, qui se joue sur <strong>cinq jours</strong>, le choix du toss peut littéralement déterminer l'issue du match. Un capitaine qui se trompe au toss peut perdre la partie avant même que son équipe n'ait joué une seule balle. Cette importance stratégique rend le toss du cricket particulièrement stressant pour les capitaines.
    </p>

    <h2>Tennis et autres sports</h2>
    <p>
      Le tennis n'utilise pas de pièce, mais le principe est identique. Avant un match, l'arbitre fait tourner une raquette pour déterminer qui servira en premier. Le vainqueur choisit de servir, de recevoir ou de choisir son côté. Le volley-ball, le basket-ball et le hockey sur glace utilisent également des tirages au sort avant le match. Dans tous les cas, le principe reste le même : une procédure aléatoire, transparente et équitable pour départager les adversaires.
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
