import { ReactNode } from "react";
import { Link } from "react-router-dom";

// Unique editorial content per published matrix page. One concrete scenario each,
// not a template with the numbers swapped. FAQ answers are plain strings so they
// can feed the FAQPage JSON-LD verbatim.

export interface PageContent {
  intro: ReactNode; // real-world scenario, above the calculation
  interpretation: ReactNode; // what the number means, after the calculation
  faqs: { question: string; answer: string }[];
  lastThing: ReactNode; // conclusion under the "One Last Thing." heading
}

export const probabilitesContent: Record<string, PageContent> = {
  "2-lancers/2-piles": {
    intro: (
      <>
        <p>
          Un ami vous lance un défi au comptoir : deux pièces jetées coup sur coup, et
          si les deux tombent sur pile, la tournée est pour lui. Ça paraît jouable. Sur
          un seul lancer vous avez une chance sur deux, alors deux piles de suite, ça ne
          doit pas être bien sorcier.
        </p>
        <p>
          En réalité, enchaîner deux piles n'arrive qu'une fois sur quatre. C'est le plus
          petit cas où l'on multiplie deux lancers indépendants, et le point de départ de
          toute la logique des séries. Chaque lancer garde ses 50 %, mais les combiner
          fait fondre la probabilité plus vite qu'on ne l'imagine.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Deux lancers donnent quatre issues également probables : pile-pile, pile-face,
        face-pile et face-face. Une seule contient deux piles, d'où 1 chance sur 4. Beaucoup
        de gens répondent « 1 sur 3 » en oubliant que pile-face et face-pile sont deux issues
        distinctes. L'ordre compte, même quand on ne s'y intéresse pas. C'est exactement le
        raisonnement qui fonde le{" "}
        <Link to="/" className="text-primary hover:underline">pile ou face</Link>.
      </p>
    ),
    faqs: [
      {
        question: "Pourquoi la probabilité est-elle de 1 sur 4 et non de 1 sur 3 ?",
        answer:
          "Deux lancers produisent quatre résultats équiprobables : pile-pile, pile-face, face-pile et face-face. On croit souvent qu'il n'y a que trois cas (deux piles, deux faces, un de chaque), mais « un de chaque » regroupe en fait deux résultats distincts selon l'ordre. Il y a donc bien quatre issues, et une seule correspond à deux piles : la probabilité est de 1/4, soit 25 %.",
      },
      {
        question: "Deux piles de suite, est-ce que ça veut dire que la pièce est chanceuse ?",
        answer:
          "Non. Chaque lancer est indépendant du précédent : la pièce n'a aucune mémoire. Après un premier pile, le second lancer reste à 50 % de tomber sur pile. Obtenir deux piles arrive une fois sur quatre en moyenne, ce qui est courant. Sur une soirée de plusieurs paris, la série finit forcément par apparaître.",
      },
    ],
    lastThing: (
      <p>
        La prochaine fois qu'on vous propose ce pari, souvenez-vous que vous partez avec
        trois chances sur quatre de gagner la tournée, pas une sur deux. C'est le genre de
        petit écart qui, répété, sépare les paris malins des mauvais. Pour voir la mécanique
        tourner en vrai, lancez la pièce vous-même sur la{" "}
        <Link to="/" className="text-primary hover:underline">page d'accueil</Link>.
      </p>
    ),
  },

  "3-lancers/2-piles": {
    intro: (
      <>
        <p>
          Trois personnes doivent trancher une décision et personne ne veut céder. On sort
          une pièce : trois lancers, la majorité l'emporte. La question devient alors :
          quelle chance a-t-on de voir exactement deux piles sortir sur les trois jets ?
        </p>
        <p>
          La réponse surprend, car deux piles sur trois est l'un des deux résultats les plus
          fréquents. Avec 37,5 %, il arrive plus d'une fois sur trois, à égalité avec « deux
          faces ». Le hasard, quand on lui laisse un nombre impair de lancers, penche rarement
          vers les extrêmes et concentre ses résultats au milieu.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Pourquoi multiplier par trois ? Parce qu'obtenir deux piles peut se produire de trois
        façons différentes : pile-pile-face, pile-face-pile et face-pile-pile. Chacune vaut
        1/8, et on les additionne pour arriver à 3/8. C'est le coefficient binomial C(3,2) qui
        compte ces arrangements. Confondre « deux piles » avec une seule séquence précise est
        l'erreur la plus fréquente en probabilités.
      </p>
    ),
    faqs: [
      {
        question: "Pourquoi faut-il multiplier par 3 pour obtenir deux piles sur trois lancers ?",
        answer:
          "Parce qu'il existe trois façons d'obtenir exactement deux piles sur trois lancers : PPF, PFP et FPP. Chacune de ces séquences a une probabilité de (1/2)³ = 1/8. Comme ces trois cas sont distincts et incompatibles, on les additionne : 3 × 1/8 = 3/8, soit 37,5 %. Le nombre 3 correspond au coefficient binomial C(3,2).",
      },
      {
        question: "Deux piles sur trois est-il le résultat le plus probable ?",
        answer:
          "Oui, à égalité avec « deux faces sur trois ». Chacun vaut 37,5 %. Les résultats extrêmes (trois piles ou trois faces) ne valent que 12,5 % chacun. Sur un nombre impair de lancers, le hasard concentre ses résultats autour de la moitié plutôt que sur les extrêmes.",
      },
    ],
    lastThing: (
      <p>
        Décider à la majorité sur trois lancers, c'est presque toujours obtenir deux voix
        contre une : les 3-0 sont rares. Si vous voulez comprendre pourquoi le hasard évite
        les extrêmes, notre{" "}
        <Link to="/blog/probabilite-pile-ou-face" className="text-primary hover:underline">
          guide des probabilités
        </Link>{" "}
        détaille la loi binomiale pas à pas.
      </p>
    ),
  },

  "3-lancers/3-piles": {
    intro: (
      <>
        <p>
          Trois piles d'affilée, et déjà quelqu'un lance : « c'est truqué ! ». Dans sa pièce
          de théâtre <em>Rosencrantz et Guildenstern sont morts</em>, Tom Stoppard pousse
          l'idée à l'absurde avec une pièce qui tombe sur pile plus de quatre-vingts fois de
          suite. Trois fois, c'est beaucoup plus modeste, mais l'effet sur l'esprit est déjà là.
        </p>
        <p>
          Obtenir pile trois fois de suite arrive une fois sur huit, soit 12,5 %. Ce n'est ni
          rare ni suspect : sur une poignée de tentatives, la série apparaît naturellement. Notre
          cerveau, lui, y voit un signe alors qu'il n'y en a aucun.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Le calcul est direct : chaque lancer est indépendant, donc on multiplie 1/2 par 1/2 par
        1/2, ce qui donne 1/8. La pièce n'a pas de mémoire. Après deux piles, le troisième lancer
        reste à 50 % de tomber sur pile, ni plus ni moins. Croire qu'une face « est due » est le
        cœur du{" "}
        <Link to="/blog/sophisme-du-joueur" className="text-primary hover:underline">
          sophisme du joueur
        </Link>
        .
      </p>
    ),
    faqs: [
      {
        question: "Trois piles de suite, est-ce que la pièce est truquée ?",
        answer:
          "Pas nécessairement. Trois piles consécutifs arrivent une fois sur huit, soit 12,5 %, ce qui est fréquent. Sur dix séries de trois lancers, il est très probable d'en voir au moins une entièrement pile. Une pièce vraiment biaisée ne se détecte qu'après un très grand nombre de lancers, pas après trois.",
      },
      {
        question: "La pièce se souvient-elle des lancers précédents ?",
        answer:
          "Non. Chaque lancer est un événement indépendant : le résultat ne dépend pas de ce qui s'est passé avant. Après deux piles, la probabilité d'obtenir un troisième pile reste exactement 50 %. Penser le contraire, c'est tomber dans le sophisme du joueur, une erreur de raisonnement bien documentée.",
      },
    ],
    lastThing: (
      <p>
        Une série de trois piles n'est pas un présage, juste de l'arithmétique. La vraie
        leçon est que notre intuition surestime la rareté des séries. Lancez une centaine de
        fois sur notre{" "}
        <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">
          simulateur de lancers multiples
        </Link>{" "}
        et comptez les séries : vous en trouverez plus que prévu.
      </p>
    ),
  },

  "4-lancers/2-piles": {
    intro: (
      <>
        <p>
          « Sur quatre lancers, on tombe sur deux piles et deux faces, c'est logique. » Voilà
          une phrase qu'on entend souvent en classe, et qui est fausse. Un enseignant peut en
          faire une démonstration marquante : demandez à trente élèves de lancer quatre fois et
          de noter le nombre de piles. La plupart n'obtiendront pas le partage parfait attendu.
        </p>
        <p>
          Obtenir exactement deux piles sur quatre ne survient que 37,5 % du temps. C'est
          pourtant le résultat le plus probable de tous, mais il reste minoritaire : près de
          deux fois sur trois, le hasard s'écarte du partage moitié-moitié. L'équilibre parfait
          est l'exception, pas la règle.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Il y a six façons de placer deux piles parmi quatre lancers, comptées par le coefficient
        C(4,2). Chacune vaut 1/16, ce qui donne 6/16, soit 37,5 %. Les autres 62,5 % se répartissent
        entre les cas déséquilibrés : trois piles, un pile, quatre piles ou zéro. Le « moitié-moitié »
        est le pic de la distribution, mais un pic qui ne rassemble qu'une minorité des cas.
      </p>
    ),
    faqs: [
      {
        question: "Est-il normal de ne pas obtenir exactement deux piles sur quatre lancers ?",
        answer:
          "Tout à fait. Exactement deux piles sur quatre n'arrive que 37,5 % du temps. Dans 62,5 % des cas, on obtient un résultat déséquilibré (un, trois, zéro ou quatre piles). Le partage parfait est le résultat le plus probable pris isolément, mais il reste minoritaire face à l'ensemble des autres possibilités.",
      },
      {
        question: "Pourquoi le résultat le plus probable n'arrive-t-il pas la plupart du temps ?",
        answer:
          "Parce qu'il est en concurrence avec plusieurs autres résultats. Deux piles sur quatre est le cas le plus fréquent (37,5 %), mais les cas « un pile » et « trois piles » valent chacun 25 %. Additionnés, les résultats déséquilibrés dépassent le partage parfait. Le mode d'une distribution n'est pas forcément majoritaire.",
      },
    ],
    lastThing: (
      <p>
        Cette page est un bon rappel pour la salle de classe : l'équilibre parfait est ce
        qu'on attend, pas ce qu'on observe le plus souvent. Pour prolonger l'expérience avec de
        vrais tirages et voir la fréquence se stabiliser, passez au{" "}
        <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">
          simulateur de lancers multiples
        </Link>
        .
      </p>
    ),
  },

  "5-lancers/3-piles": {
    intro: (
      <>
        <p>
          Au tennis de table, en boxe ou dans une série éliminatoire de basket, le « meilleur des
          cinq » départage deux adversaires : le premier à trois manches gagne. Si les deux camps
          se valaient parfaitement, chaque manche reviendrait à un simple pile ou face. Gagner
          trois manches à deux revient alors à obtenir exactement trois piles sur cinq lancers.
        </p>
        <p>
          Cette issue précise arrive 31,25 % du temps. C'est le résultat le plus fréquent d'un
          match au meilleur des cinq, à égalité avec le score de deux manches à trois vu de
          l'autre côté. Autrement dit, la victoire serrée est le scénario le plus banal quand
          deux forces égales s'affrontent.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Le coefficient C(5,3) vaut 10 : il y a dix façons d'obtenir trois piles sur cinq lancers.
        Chaque séquence a une probabilité de 1/32, d'où 10/32, soit 31,25 %. Attention à ne pas
        confondre « exactement trois piles » avec « au moins trois piles » : cette dernière inclut
        aussi quatre et cinq piles, et grimpe à 50 %.
      </p>
    ),
    faqs: [
      {
        question: "Pourquoi trois piles est-il le résultat le plus probable sur cinq lancers ?",
        answer:
          "Parce que le hasard concentre ses résultats autour de la moitié. Sur cinq lancers, trois piles (31,25 %) et deux piles (31,25 %) sont les deux cas les plus fréquents. Les résultats extrêmes comme cinq piles ne valent que 3,13 %. C'est le coefficient binomial C(5,3) = 10 qui explique cette concentration au centre.",
      },
      {
        question: "Quelle différence entre exactement trois piles et au moins trois piles ?",
        answer:
          "« Exactement trois piles » ne compte que les tirages avec précisément trois piles : la probabilité est de 31,25 %. « Au moins trois piles » inclut aussi quatre et cinq piles, ce qui donne 16/32, soit 50 %. Cette distinction change complètement le résultat, il faut donc bien lire la question posée.",
      },
    ],
    lastThing: (
      <p>
        Un match au meilleur des cinq entre deux joueurs de même niveau finit le plus souvent
        3 à 2 : le hasard aime les fins serrées. Pour voir la distribution complète des cinq
        lancers et comparer chaque score, la{" "}
        <Link to="/probabilite-pile-ou-face" className="text-primary hover:underline">
          page principale des probabilités
        </Link>{" "}
        rassemble tous les cas.
      </p>
    ),
  },

  "5-lancers/5-piles": {
    intro: (
      <>
        <p>
          Cinq piles d'affilée, et le doute s'installe : la pièce est-elle truquée ? À ce stade,
          le joueur commence à examiner la pièce sous toutes les coutures. Pourtant, cinq piles
          consécutifs arrivent une fois sur trente-deux, soit 3,13 %, ce qui reste possible sur
          une série un peu longue.
        </p>
        <p>
          Là où l'intuition a raison, c'est qu'un vrai pile ou face n'est pas parfaitement
          équilibré. L'étude menée par František Bartoš et son équipe en 2023, portant sur
          350 757 lancers réels, a confirmé un léger biais : une pièce a une petite tendance à
          retomber du côté par lequel elle est partie, un effet déjà prédit par les travaux de
          Persi Diaconis en 2007.
        </p>
      </>
    ),
    interpretation: (
      <p>
        En théorie, cinq piles valent (1/2)⁵ = 1/32. Chaque lancer reste indépendant : après
        quatre piles, le cinquième est toujours à 50 %. Le biais mesuré par Diaconis et Bartoš
        est physique, lié à la manière dont la pièce tourne, et de l'ordre de 50,8 % pour le côté
        de départ. Il est bien trop faible pour expliquer une série de cinq : ici, c'est
        simplement le hasard qui suit son cours.
      </p>
    ),
    faqs: [
      {
        question: "Cinq piles de suite, est-ce que la pièce est truquée ?",
        answer:
          "Probablement pas. Cinq piles consécutifs arrivent une fois sur trente-deux, soit 3,13 %. C'est peu, mais loin d'être impossible : sur plusieurs dizaines de séries, l'événement finit par se produire. Détecter un vrai truquage demande des milliers de lancers, pas cinq. Une série courte ne prouve rien.",
      },
      {
        question: "Un vrai pile ou face est-il exactement 50/50 ?",
        answer:
          "Presque, mais pas tout à fait. L'étude de František Bartoš et son équipe (2023), fondée sur 350 757 lancers, a montré qu'une pièce retombe légèrement plus souvent du côté par lequel elle a démarré, autour de 50,8 %. Ce biais, prédit par Persi Diaconis en 2007, est réel mais minuscule et n'a aucun effet perceptible sur quelques lancers.",
      },
    ],
    lastThing: (
      <p>
        Cinq piles de suite ne condamnent pas la pièce, ils rappellent que le hasard produit des
        séries que notre esprit juge trop belles pour être vraies. Le vrai biais des pièces, lui,
        est réel mais infime. Notre article sur le{" "}
        <Link to="/blog/pile-ou-face-50-50" className="text-primary hover:underline">
          mythe du 50/50
        </Link>{" "}
        détaille l'étude des 350 757 lancers.
      </p>
    ),
  },

  "10-lancers/5-piles": {
    intro: (
      <>
        <p>
          « Sur dix lancers, on obtient cinq piles, non ? » C'est la réponse spontanée de presque
          tout le monde, et elle est trompeuse. Obtenir exactement cinq piles sur dix lancers
          n'arrive qu'environ une fois sur quatre, soit 24,61 %. Trois fois sur quatre, le
          résultat s'écarte du partage parfait.
        </p>
        <p>
          C'est pourtant bien le résultat le plus probable de tous : aucun autre nombre de piles
          n'est aussi fréquent. Mais « le plus probable » ne veut pas dire « attendu la plupart du
          temps ». Cet écart entre l'intuition et le calcul est au cœur de la loi des grands
          nombres, souvent mal comprise.
        </p>
      </>
    ),
    interpretation: (
      <p>
        Le coefficient C(10,5) vaut 252 : il existe 252 façons d'obtenir cinq piles sur dix
        lancers, sur un total de 1 024 séquences possibles. D'où 252/1024, soit 24,61 %. La loi
        des grands nombres dit que la <em>proportion</em> de piles se rapproche de 50 % quand on
        multiplie les lancers, mais elle ne garantit jamais un <em>nombre</em> exact de cinq piles
        sur dix. Proportion et effectif ne se comportent pas de la même façon.
      </p>
    ),
    faqs: [
      {
        question: "Pourquoi n'a-t-on pas 50 % de chances d'obtenir cinq piles sur dix lancers ?",
        answer:
          "Parce que « cinq piles » n'est qu'un résultat parmi onze possibles (de zéro à dix piles). C'est le plus probable, mais il ne vaut que 24,61 %. Les résultats voisins comme quatre ou six piles sont eux aussi fréquents. Additionnés, tous les cas différents de cinq piles l'emportent largement : le partage parfait reste minoritaire.",
      },
      {
        question: "La loi des grands nombres garantit-elle cinq piles sur dix lancers ?",
        answer:
          "Non. La loi des grands nombres concerne la proportion, pas le nombre exact. Elle dit que le pourcentage de piles se rapproche de 50 % quand le nombre de lancers devient très grand. Sur seulement dix lancers, l'écart au partage parfait reste courant : obtenir exactement cinq piles n'est qu'une possibilité sur environ quatre.",
      },
    ],
    lastThing: (
      <p>
        Retenez ceci : cinq piles sur dix est le résultat le plus probable et pourtant minoritaire.
        C'est la meilleure illustration de la différence entre proportion et effectif. Vérifiez-le
        vous-même en lançant dix, cent puis mille fois sur le{" "}
        <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">
          simulateur de lancers multiples
        </Link>{" "}
        : la proportion se stabilise à 50 %, le compte exact, jamais.
      </p>
    ),
  },
};
