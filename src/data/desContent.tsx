import { ReactNode } from "react";
import { Link } from "react-router-dom";

// Unique editorial content per dice page. Each die has a genuinely different
// real-world use; the copy leans on that rather than swapping numbers in a template.
export interface DeContent {
  intro: ReactNode;
  usage: ReactNode;
  faqs: { question: string; answer: string }[];
}

export const desContent: Record<string, DeContent> = {
  "de-2-faces": {
    intro: (
      <>
        <p>
          Un dé à deux faces, c'est tout simplement une pièce de monnaie : deux issues, chacune une chance sur deux. Certains jeux de plateau réclament un « dé binaire » pour trancher un déplacement, activer un événement ou décider d'un duel. Plutôt que de chercher une pièce, ce dé virtuel fait le travail.
        </p>
        <p>
          Le résultat tombe sur 1 ou 2, l'équivalent numérique de pile ou face. C'est le plus petit dé possible, et le plus ancien outil de hasard équitable qui soit.
        </p>
      </>
    ),
    usage: (
      <p>
        On l'utilise pour départager deux options, simuler un jet de pièce dans un jeu de rôle, ou remplacer un vrai dé manquant. Pour la version classique avec l'animation de la pièce qui tourne, passez par notre{" "}
        <Link to="/" className="text-primary hover:underline">simulateur de pile ou face</Link>.
      </p>
    ),
    faqs: [
      { question: "Un dé à 2 faces existe-t-il vraiment ?", answer: "Physiquement, un dé à deux faces n'a pas de forme stable de type polyèdre : on utilise donc une pièce de monnaie, qui remplit exactement ce rôle avec ses deux côtés pile et face. Certains fabricants proposent aussi des jetons bicolores. Dans tous les cas, chaque face a une chance sur deux de sortir." },
      { question: "Quelle différence avec un pile ou face ?", answer: "Aucune sur le plan des probabilités : un dé à 2 faces et un pile ou face donnent tous deux 50 % à chaque issue. La seule différence est la présentation, chiffres 1 et 2 d'un côté, pile et face de l'autre. Vous pouvez utiliser l'un ou l'autre selon le jeu." },
    ],
  },
  "de-3-faces": {
    intro: (
      <>
        <p>
          Le dé à trois faces intrigue, car aucun solide régulier ne possède exactement trois faces sur lesquelles se poser. Les fabricants le réalisent sous forme de prisme triangulaire arrondi, qui roule puis s'immobilise sur l'une de ses trois arêtes. Certains jeux de figurines l'emploient pour des résultats de 1 à 3.
        </p>
        <p>
          À défaut d'en posséder un, on le simule très bien : chaque valeur de 1 à 3 a la même probabilité, exactement un tiers.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d3 sert surtout dans les jeux de figurines et de guerre, où l'on tire souvent des petits nombres de dégâts ou de mouvements. À la maison, on l'improvise en lançant un{" "}
        <Link to="/de-en-ligne" className="text-primary hover:underline">dé à six faces</Link>{" "}
        et en divisant le résultat par deux, arrondi au supérieur. Ce simulateur évite ce calcul.
      </p>
    ),
    faqs: [
      { question: "Pourquoi un dé à 3 faces n'est-il pas un solide régulier ?", answer: "Il n'existe pas de polyèdre régulier à trois faces : le plus petit solide de Platon est le tétraèdre, à quatre faces. Le d3 est donc réalisé comme un prisme triangulaire allongé et arrondi aux extrémités, qui ne peut retomber que sur l'une de ses trois faces latérales." },
      { question: "Comment obtenir un résultat de 1 à 3 sans dé spécial ?", answer: "La méthode classique consiste à lancer un dé à six faces puis à diviser par deux en arrondissant vers le haut : 1 et 2 donnent 1, 3 et 4 donnent 2, 5 et 6 donnent 3. Chaque valeur garde bien une chance sur trois. Notre simulateur applique directement ce résultat." },
    ],
  },
  "de-4-faces": {
    intro: (
      <>
        <p>
          Le dé à quatre faces est le tétraèdre, la première des formes régulières. Les joueurs de jeux de rôle le connaissent bien : c'est le dé des petits dégâts, celui de la dague ou du projectile magique. Ils le connaissent aussi pour une autre raison, moins agréable, quand on marche dessus pieds nus la nuit.
        </p>
        <p>
          Sa particularité : il n'a pas de face « du dessus ». Le résultat se lit à la pointe supérieure, là où les chiffres des trois faces visibles se rejoignent.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d4 sert aux dégâts légers dans <em>Donjons &amp; Dragons</em> et la plupart des jeux de rôle, ainsi qu'à générer un nombre de 1 à 4. Pour des tirages plus larges, essayez le{" "}
        <Link to="/de-en-ligne/de-8-faces" className="text-primary hover:underline">dé à huit faces</Link>{" "}
        ou le{" "}
        <Link to="/de-en-ligne/de-20-faces" className="text-primary hover:underline">dé à vingt faces</Link>.
      </p>
    ),
    faqs: [
      { question: "Comment lit-on le résultat d'un dé à 4 faces ?", answer: "Contrairement aux autres dés, le tétraèdre ne présente pas de face horizontale vers le haut : il repose sur une face et pointe vers le ciel. On lit donc le résultat au sommet, où le même chiffre apparaît sur les trois faces visibles. Certains modèles inscrivent plutôt le résultat sur l'arête inférieure." },
      { question: "Pourquoi le d4 fait-il si mal au pied ?", answer: "À cause de sa géométrie : le tétraèdre a toujours une pointe dirigée vers le haut lorsqu'il repose sur une face. Marcher dessus revient à appuyer tout son poids sur cette pointe, ce qui explique sa réputation. C'est une blague récurrente parmi les joueurs de jeux de rôle." },
    ],
  },
  "de-5-faces": {
    intro: (
      <>
        <p>
          Le dé à cinq faces est une rareté. Comme le d3, il n'existe pas de solide régulier à cinq faces, on le fabrique donc en prisme triangulaire, cette fois avec les deux extrémités triangulaires comptées comme faces jouables. Résultat : cinq surfaces, cinq issues possibles.
        </p>
        <p>
          Chaque valeur de 1 à 5 a une chance sur cinq de sortir. On le croise surtout dans des jeux de société spécifiques et chez les collectionneurs de dés exotiques.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d5 rend service quand un jeu demande un tirage de 1 à 5, ou pour choisir au hasard parmi cinq options. Pour tirer un nombre dans un intervalle libre plutôt qu'un dé fixe, notre{" "}
        <Link to="/nombre-aleatoire" className="text-primary hover:underline">générateur de nombre aléatoire</Link>{" "}
        est plus souple.
      </p>
    ),
    faqs: [
      { question: "Comment est fait un dé à 5 faces ?", answer: "Le d5 prend généralement la forme d'un prisme triangulaire : trois faces rectangulaires sur les côtés et deux faces triangulaires aux extrémités, soit cinq faces au total. Sa forme allongée l'empêche de s'arrêter sur une arête, si bien que chacune des cinq faces a la même probabilité de un cinquième." },
      { question: "À quoi sert un dé à 5 faces ?", answer: "Il sert dans certains jeux de société et jeux de rôle qui réclament un tirage équitable de 1 à 5, ainsi que pour départager cinq options. Comme il reste rare dans le commerce, beaucoup de joueurs le remplacent par un simulateur ou par un dé à dix faces divisé par deux." },
    ],
  },
  "de-7-faces": {
    intro: (
      <>
        <p>
          Un dé à sept faces relève presque de la curiosité de collection. Sept étant un nombre premier, il n'existe aucun solide régulier correspondant : on le réalise en prisme à base pentagonale, ou parfois avec des faces d'aires ajustées pour rester équitable. Chaque valeur de 1 à 7 sort une fois sur sept.
        </p>
        <p>
          On le voit surtout dans des jeux de niche et chez les amateurs de dés inhabituels, plus rarement à une table de jeu classique.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d7 sert pour des tirages de 1 à 7, par exemple choisir un jour de la semaine au hasard. Pour ce genre d'usage sans dé physique, un{" "}
        <Link to="/nombre-aleatoire" className="text-primary hover:underline">générateur de nombre aléatoire</Link>{" "}
        fait tout aussi bien l'affaire.
      </p>
    ),
    faqs: [
      { question: "Un dé à 7 faces peut-il être équitable ?", answer: "Oui, à condition d'être bien conçu. Comme aucun solide régulier n'a sept faces, les fabricants utilisent un prisme dont les proportions sont calculées pour que chaque face ait la même probabilité, soit une chance sur sept. Un modèle mal équilibré, en revanche, favoriserait certaines faces." },
      { question: "À quoi sert un dé à 7 faces ?", answer: "Ses usages sont rares : quelques jeux de niche, des tirages de 1 à 7 comme choisir un jour de la semaine, ou la simple collection. Sa forme de prisme pentagonal en fait aussi un objet curieux. La plupart des joueurs lui préfèrent un simulateur pour ces tirages occasionnels." },
    ],
  },
  "de-8-faces": {
    intro: (
      <>
        <p>
          Le dé à huit faces est l'octaèdre, deux pyramides collées base contre base. Dans les jeux de rôle, c'est un dé de dégâts intermédiaire, celui de l'épée longue dans <em>Donjons &amp; Dragons</em>. Sa forme en losange le rend facile à reconnaître et agréable à lancer.
        </p>
        <p>
          Il offre huit résultats équiprobables, de 1 à 8, chacun avec une chance sur huit.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d8 sert aux dégâts d'armes de taille moyenne et à divers tirages de 1 à 8 dans les jeux de rôle. Il complète bien le{" "}
        <Link to="/de-en-ligne/de-4-faces" className="text-primary hover:underline">dé à quatre faces</Link>{" "}
        et le{" "}
        <Link to="/de-en-ligne/de-10-faces" className="text-primary hover:underline">dé à dix faces</Link>{" "}
        dans une panoplie complète.
      </p>
    ),
    faqs: [
      { question: "Quelle forme a un dé à 8 faces ?", answer: "C'est un octaèdre régulier : huit faces triangulaires équilatérales, formées par deux pyramides à base carrée accolées. Sa symétrie vise à donner la même probabilité à chaque face ; l'équilibre réel dépend aussi de la fabrication et de l'usure." },
      { question: "À quoi sert le d8 dans les jeux de rôle ?", answer: "Il sert principalement aux dégâts d'armes intermédiaires, comme l'épée longue à une main dans Donjons & Dragons. On l'utilise aussi pour des effets divers réclamant un tirage de 1 à 8. C'est un dé courant dans toute panoplie de jeu de rôle." },
    ],
  },
  "de-9-faces": {
    intro: (
      <>
        <p>
          Le dé à neuf faces est l'un des plus rares qui soient. Sans solide régulier à neuf faces, on le fabrique en prisme allongé dont les faces sont calibrées pour rester équitables. Neuf issues, de 1 à 9, chacune une chance sur neuf.
        </p>
        <p>
          C'est avant tout un objet de curiosité, apprécié des collectionneurs et de quelques jeux très spécifiques.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d9 dépanne pour un tirage de 1 à 9, mais reste marginal dans les jeux. Pour un chiffre unique de 0 à 9, le{" "}
        <Link to="/de-en-ligne/de-10-faces" className="text-primary hover:underline">dé à dix faces</Link>{" "}
        est bien plus répandu et plus pratique.
      </p>
    ),
    faqs: [
      { question: "Un dé à 9 faces existe-t-il ?", answer: "Oui, mais il est très rare. Comme il n'existe pas de solide régulier à neuf faces, il prend la forme d'un prisme dont les proportions sont ajustées pour l'équité. Chaque face a alors une chance sur neuf de sortir. On le trouve surtout auprès de fabricants spécialisés en dés inhabituels." },
      { question: "Pourquoi préfère-t-on le d10 au d9 ?", answer: "Parce que le dé à dix faces existe sous une forme stable et régulière, le trapézoèdre pentagonal, et qu'il couvre les chiffres de 0 à 9. Il est produit en masse, facile à trouver et sert aux tirages en pourcentage. Le d9, plus difficile à fabriquer équitablement, reste anecdotique." },
    ],
  },
  "de-10-faces": {
    intro: (
      <>
        <p>
          Le dé à dix faces, ou d10, a une silhouette immédiatement reconnaissable : un trapézoèdre pentagonal, comme deux couronnes de cinq losanges emboîtées. Il porte les chiffres de 0 à 9 et joue un rôle central dans de nombreux systèmes de jeu de rôle.
        </p>
        <p>
          Son grand intérêt est de se combiner par paires pour tirer un pourcentage de 1 à 100. Seul, il donne dix résultats équiprobables.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d10 sert aux dégâts, aux tests de compétence dans des systèmes comme <em>Vampire</em> ou <em>L'Appel de Cthulhu</em>, et surtout au tirage en pourcentage lorsqu'on en lance deux. Pour ce dernier usage, voyez directement notre{" "}
        <Link to="/de-en-ligne/de-100-faces" className="text-primary hover:underline">dé à cent faces</Link>{" "}
        et le{" "}
        <Link to="/de-en-ligne/2-des-10-faces" className="text-primary hover:underline">lancer de deux d10</Link>.
      </p>
    ),
    faqs: [
      { question: "Pourquoi un d10 est-il numéroté de 0 à 9 ?", answer: "Cette numérotation permet de combiner deux d10 pour obtenir un pourcentage de 00 à 99, soit 1 à 100. Un dé sert aux dizaines, l'autre aux unités. Seul, le d10 se lit généralement de 1 à 10 en comptant le 0 comme un 10, selon le système de jeu utilisé." },
      { question: "Quelle est la forme d'un dé à 10 faces ?", answer: "C'est un trapézoèdre pentagonal : dix faces en forme de cerf-volant, réparties en deux couronnes de cinq décalées. Ce n'est pas un solide de Platon, mais sa symétrie assure que chaque face a bien une chance sur dix de sortir." },
    ],
  },
  "de-12-faces": {
    intro: (
      <>
        <p>
          Le dé à douze faces est le dodécaèdre, douze pentagones réguliers assemblés en une sphère presque parfaite. C'est sans doute le plus élégant des dés, et paradoxalement l'un des moins utilisés : dans <em>Donjons &amp; Dragons</em>, il ne sert guère qu'aux dégâts de la grande hache.
        </p>
        <p>
          Douze faces, douze résultats équiprobables. Sa forme évoque aussi les douze mois de l'année ou les douze signes du zodiaque.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d12 sert aux dégâts des armes les plus lourdes et à quelques tables de jeu de rôle. On l'emploie aussi hors des jeux pour tirer un mois au hasard. Pour le roi des dés de jeu de rôle, passez au{" "}
        <Link to="/de-en-ligne/de-20-faces" className="text-primary hover:underline">dé à vingt faces</Link>.
      </p>
    ),
    faqs: [
      { question: "Pourquoi le d12 est-il si peu utilisé ?", answer: "Dans la plupart des systèmes de jeu de rôle, peu d'effets réclament un tirage de 1 à 12 : le dé à vingt faces domine les tests, et les d6, d8 ou d10 couvrent la majorité des dégâts. Le d12 reste ainsi cantonné à quelques armes lourdes, ce qui lui vaut une réputation de dé mal-aimé." },
      { question: "Quelle est la forme d'un dé à 12 faces ?", answer: "C'est un dodécaèdre régulier, l'un des cinq solides de Platon, composé de douze faces pentagonales identiques. Sa géométrie symétrique vise une chance sur douze par face ; la fabrication et l'usure peuvent néanmoins influencer un dé physique." },
    ],
  },
  "de-20-faces": {
    intro: (
      <>
        <p>
          Le dé à vingt faces est l'icône absolue du jeu de rôle. Quand un joueur de <em>Donjons &amp; Dragons</em> annonce « je lance le d20 », tout se joue : réussite ou échec d'une action, coup porté, sauvegarde face à un piège. Un 20 naturel déclenche l'euphorie, un 1 le désastre.
        </p>
        <p>
          C'est un icosaèdre à vingt triangles équilatéraux, conçu pour répartir la probabilité entre vingt résultats. Aucun autre dé n'est aussi chargé de tension à chaque lancer.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d20 est au cœur des tests de <em>Donjons &amp; Dragons</em> et de la plupart des jeux de rôle modernes : jets d'attaque, de compétence et de sauvegarde. Pour rejouer la mécanique de l'avantage, lancez-en deux avec notre{" "}
        <Link to="/de-en-ligne/2-des-20-faces" className="text-primary hover:underline">lancer de deux d20</Link>.
      </p>
    ),
    faqs: [
      { question: "Qu'est-ce qu'un 20 naturel ?", answer: "Un 20 naturel désigne le résultat brut de 20 sur le dé, avant tout modificateur. Dans Donjons & Dragons, il correspond souvent à une réussite critique : un jet d'attaque touche automatiquement et inflige des dégâts doublés. À l'inverse, un 1 naturel est un échec critique, la pire issue possible." },
      { question: "Quelle forme a un dé à 20 faces ?", answer: "C'est un icosaèdre régulier, l'un des cinq solides de Platon : vingt faces triangulaires équilatérales identiques. Dans le modèle idéal, chaque face a une chance sur vingt de sortir, soit 5 % ; un dé physique peut toutefois être influencé par sa fabrication et son usure." },
    ],
  },
  "de-100-faces": {
    intro: (
      <>
        <p>
          Le dé à cent faces, ou d100, ne se lance presque jamais comme une vraie boule de cent facettes, difficile à lire et lente à s'immobiliser. En pratique, on le réalise avec deux dés à dix faces : l'un donne les dizaines, l'autre les unités. Résultat, un nombre de 1 à 100.
        </p>
        <p>
          C'est l'outil des tirages en pourcentage : tables aléatoires, chances de réussite exprimées en pour cent, rencontres surprises dans les jeux de rôle.
        </p>
      </>
    ),
    usage: (
      <p>
        Le d100 sert aux tests en pourcentage et aux grandes tables aléatoires des jeux de rôle. Pour lancer les deux d10 séparément et voir dizaines et unités, utilisez notre{" "}
        <Link to="/de-en-ligne/2-des-10-faces" className="text-primary hover:underline">lancer de deux d10</Link>. Pour un intervalle sur mesure, le{" "}
        <Link to="/nombre-aleatoire" className="text-primary hover:underline">générateur de nombre aléatoire</Link>{" "}
        est plus souple.
      </p>
    ),
    faqs: [
      { question: "Comment fonctionne un dé à 100 faces ?", answer: "On le simule presque toujours avec deux dés à dix faces : un dé désigne les dizaines (00, 10, 20… 90) et l'autre les unités (0 à 9). On additionne les deux, un résultat de 00 et 0 valant 100. On obtient ainsi un nombre équiprobable de 1 à 100, soit 1 % par valeur." },
      { question: "Existe-t-il un vrai dé à 100 faces ?", answer: "Oui, le Zocchihedron, une sphère à cent facettes. Mais il roule longtemps, s'arrête difficilement et se lit mal, si bien que les joueurs lui préfèrent presque toujours la paire de d10. C'est pourquoi « lancer un d100 » signifie en pratique lancer deux dés à dix faces." },
    ],
  },

  // Multi-dice
  "2-des-6-faces": {
    intro: (
      <>
        <p>
          Deux dés à six faces, c'est le lancer le plus courant des jeux de plateau : le Monopoly, les petits chevaux, le backgammon, le craps au casino. On additionne les deux dés pour un total de 2 à 12, et ce total ne tombe pas au hasard uniforme.
        </p>
        <p>
          Le 7 est de loin le plus fréquent, car il se compose de six façons différentes, tandis que le 2 et le 12 n'en ont qu'une chacun. C'est la fameuse courbe en cloche des probabilités.
        </p>
      </>
    ),
    usage: (
      <p>
        Le 2d6 anime d'innombrables jeux de société et sert aussi de base à des systèmes de jeu de rôle. Pour comprendre pourquoi le 7 domine, voyez notre{" "}
        <Link to="/probabilite-pile-ou-face" className="text-primary hover:underline">page sur les probabilités</Link>. Le graphique ci-dessus montre la distribution complète des sommes.
      </p>
    ),
    faqs: [
      { question: "Pourquoi le 7 est-il le résultat le plus probable avec 2 dés ?", answer: "Parce qu'il existe six combinaisons qui donnent 7 (1-6, 2-5, 3-4 et leurs symétriques), contre une seule pour le 2 (1-1) ou le 12 (6-6). Sur les 36 combinaisons possibles de deux dés, six mènent à 7, soit une probabilité de 6/36, environ 16,7 %." },
      { question: "Quelle est la somme moyenne de 2d6 ?", answer: "La moyenne est de 7. Chaque dé a une espérance de 3,5 (moyenne de 1 à 6), et deux dés donnent donc 3,5 + 3,5 = 7. C'est aussi le sommet de la courbe en cloche : les sommes proches de 7 sont fréquentes, celles proches de 2 ou 12 très rares." },
    ],
  },
  "3-des-6-faces": {
    intro: (
      <>
        <p>
          Trois dés à six faces, c'est le lancer mythique de la création de personnage dans les premières éditions de <em>Donjons &amp; Dragons</em> : on lance 3d6 pour chaque caractéristique, force, dextérité, constitution. Le total va de 3 à 18, et tout le monde retient le rêve d'un 18 comme le cauchemar d'un 3.
        </p>
        <p>
          Avec trois dés, la courbe en cloche se resserre encore autour de la moyenne, 10,5. Les extrêmes deviennent franchement rares.
        </p>
      </>
    ),
    usage: (
      <p>
        Le 3d6 sert à générer des caractéristiques dans de nombreux jeux de rôle, et à tout tirage réclamant une valeur de 3 à 18 avec une forte tendance vers le centre. Le graphique montre à quel point le 10 et le 11 dominent les extrêmes.
      </p>
    ),
    faqs: [
      { question: "Quelle est la probabilité d'obtenir 18 avec 3d6 ?", answer: "Une seule combinaison donne 18 (6-6-6), sur 216 possibles avec trois dés. La probabilité est donc de 1/216, soit environ 0,46 %. C'est aussi rare que d'obtenir 3, l'autre extrême. Voilà pourquoi un 18 en caractéristique est vécu comme un coup de chance exceptionnel." },
      { question: "Pourquoi lance-t-on 3d6 pour créer un personnage ?", answer: "Parce que la somme de trois dés se concentre autour de la moyenne 10,5, ce qui produit des personnages majoritairement équilibrés, avec de rares valeurs très hautes ou très basses. Cette courbe en cloche rend chaque score exceptionnel réellement marquant, contrairement à un tirage uniforme." },
    ],
  },
  "4-des-6-faces": {
    intro: (
      <>
        <p>
          Quatre dés à six faces, c'est la méthode moderne de création de personnage : la fameuse règle « 4d6, on garde les trois meilleurs ». On lance quatre dés, on écarte le plus faible et on additionne les trois autres. Notre outil affiche ici la somme des quatre ; à vous de retirer le plus petit.
        </p>
        <p>
          Cette méthode pousse les résultats vers le haut et produit des héros un peu plus doués que le classique 3d6.
        </p>
      </>
    ),
    usage: (
      <p>
        Le 4d6 sert surtout à la création de personnage dans les éditions récentes de <em>Donjons &amp; Dragons</em>, où l'on retire le dé le plus bas. Pour comparer avec la méthode d'origine, voyez notre{" "}
        <Link to="/de-en-ligne/3-des-6-faces" className="text-primary hover:underline">lancer de trois d6</Link>.
      </p>
    ),
    faqs: [
      { question: "Comment fonctionne la règle « 4d6 drop lowest » ?", answer: "On lance quatre dés à six faces, on écarte le résultat le plus faible, puis on additionne les trois dés restants. La somme obtenue va de 3 à 18, mais avec une moyenne plus haute qu'un simple 3d6, autour de 12,2. Cette méthode donne des personnages statistiquement plus compétents." },
      { question: "Pourquoi garder seulement trois dés sur quatre ?", answer: "Retirer le dé le plus faible relève la moyenne des scores et réduit le risque de caractéristiques trop basses. Le but est d'obtenir des personnages jouables sans faiblesse rédhibitoire, tout en conservant une part de hasard. C'est un compromis entre l'aléatoire pur du 3d6 et des scores fixes." },
    ],
  },
  "2-des-10-faces": {
    intro: (
      <>
        <p>
          Deux dés à dix faces, c'est la façon classique de tirer un pourcentage. Un dé donne les dizaines, l'autre les unités, et l'on obtient un nombre de 1 à 100. C'est le mécanisme derrière le fameux d100 des jeux de rôle.
        </p>
        <p>
          Additionnés comme deux dés ordinaires, en revanche, ils donnent une somme de 2 à 20 avec une courbe en cloche centrée sur 11.
        </p>
      </>
    ),
    usage: (
      <p>
        On lance deux d10 pour les tests en pourcentage et les grandes tables aléatoires. Pour la lecture directe en pour cent de 1 à 100, voyez notre{" "}
        <Link to="/de-en-ligne/de-100-faces" className="text-primary hover:underline">dé à cent faces</Link>.
      </p>
    ),
    faqs: [
      { question: "Comment obtenir un pourcentage avec deux d10 ?", answer: "On désigne un dé comme celui des dizaines (00 à 90) et l'autre comme celui des unités (0 à 9), puis on additionne. Par exemple 40 et 7 donnent 47. Le résultat 00 et 0 vaut 100. On obtient ainsi un nombre équiprobable de 1 à 100, chaque valeur ayant 1 % de chances." },
      { question: "Quelle est la différence entre additionner et lire en pourcentage ?", answer: "Additionner deux d10 comme des dés ordinaires donne une somme de 2 à 20, avec une courbe en cloche où 11 domine. Les lire en pourcentage, dizaines puis unités, donne au contraire un résultat uniforme de 1 à 100. Le même couple de dés sert donc à deux usages très différents." },
    ],
  },
  "2-des-20-faces": {
    intro: (
      <>
        <p>
          Deux dés à vingt faces, c'est la mécanique de l'avantage et du désavantage, introduite par la cinquième édition de <em>Donjons &amp; Dragons</em>. Avec l'avantage, on lance deux d20 et on garde le meilleur ; avec le désavantage, le pire. Notre outil lance les deux : à vous de choisir lequel retenir.
        </p>
        <p>
          Cette règle simple change beaucoup les probabilités : garder le meilleur de deux d20 fait grimper la moyenne bien au-dessus de 10,5.
        </p>
      </>
    ),
    usage: (
      <p>
        On lance deux d20 pour l'avantage et le désavantage, au cœur du système de <em>Donjons &amp; Dragons</em> moderne. Pour un seul jet classique, revenez au{" "}
        <Link to="/de-en-ligne/de-20-faces" className="text-primary hover:underline">dé à vingt faces</Link>.
      </p>
    ),
    faqs: [
      { question: "Comment marche l'avantage avec deux d20 ?", answer: "Avec l'avantage, on lance deux dés à vingt faces et on retient le meilleur des deux résultats. Cela augmente nettement les chances de réussite : la moyenne passe d'environ 10,5 à près de 13,8. Le désavantage applique l'inverse, on garde le plus faible des deux dés." },
      { question: "L'avantage équivaut-il à un bonus fixe ?", answer: "Pas exactement. En moyenne, l'avantage vaut à peu près un bonus de +3 à +4, mais son effet est le plus fort autour des valeurs moyennes du dé et plus faible aux extrêmes. Contrairement à un bonus fixe, il ne garantit jamais de dépasser 20 ni d'éviter un échec complet." },
    ],
  },
  "2-des-4-faces": {
    intro: (
      <>
        <p>
          Deux dés à quatre faces donnent une somme de 2 à 8, avec un pic sur 5. Les joueurs de <em>Donjons &amp; Dragons</em> connaissent ce lancer par cœur : c'est celui du projectile magique, le sort qui inflige 1d4+1 par trait, souvent lancé en rafale.
        </p>
        <p>
          Deux petits tétraèdres suffisent à créer une modeste courbe en cloche, où les valeurs centrales l'emportent déjà sur les extrêmes.
        </p>
      </>
    ),
    usage: (
      <p>
        Le 2d4 sert aux dégâts de plusieurs sorts et armes légères dans les jeux de rôle. Pour un seul tétraèdre, voyez le{" "}
        <Link to="/de-en-ligne/de-4-faces" className="text-primary hover:underline">dé à quatre faces</Link>.
      </p>
    ),
    faqs: [
      { question: "Quelle est la somme la plus probable avec 2d4 ?", answer: "C'est 5, la valeur centrale. Il existe quatre façons de l'obtenir (1-4, 2-3, 3-2, 4-1) sur seize combinaisons possibles, soit une probabilité de 4/16, 25 %. Les extrêmes 2 et 8 n'ont qu'une combinaison chacun, donc 1/16, environ 6,25 %." },
      { question: "Pourquoi utiliser 2d4 plutôt qu'un seul dé ?", answer: "Additionner deux d4 crée une courbe en cloche centrée sur 5, alors qu'un tirage unique serait uniforme. Les dégâts deviennent plus prévisibles et rarement extrêmes, ce qui convient bien à des sorts réguliers comme le projectile magique. Le hasard reste présent, mais moins brutal qu'avec un gros dé unique." },
    ],
  },
};
