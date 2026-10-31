import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Histoire du pile ou face : 5 faits marquants",
  description: "Découvrez l'histoire fascinante du pile ou face, de la Rome antique au Super Bowl. 5 anecdotes historiques surprenantes sur ce jeu de hasard universel.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29", dateModified: "2026-10-20",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/histoire-pile-ou-face/" },
  inLanguage: "fr-FR",
};

const FAQ_ITEMS = [
  { question: "Qui a inventé le pile ou face ?", answer: "Aucune personne ne peut être désignée comme son inventeur. Des jeux de décision fondés sur les deux faces d'un objet existent depuis l'Antiquité. Les sources disponibles documentent notamment la pratique romaine appelée capita aut navia." },
  { question: "Pourquoi dit-on « pile ou face » en français ?", answer: "L'expression moderne a succédé à « croix ou pile », attestée dans l'histoire monétaire française. Le mot « pile » a plusieurs sens liés à la monnaie ; son étymologie exacte mérite d'être présentée avec prudence." },
  { question: "Le pile ou face existait-il dans d'autres civilisations antiques ?", answer: "Des pratiques de tirage à deux issues ont existé dans de nombreuses cultures. Elles ne portaient pas toutes le même nom ni ne reposaient toutes sur une pièce, mais elles répondaient au même besoin : départager deux possibilités quand aucun critère ne les distingue." },
  { question: "Quelle est la décision la plus célèbre prise à pile ou face ?", answer: "Le nom de Portland, décidé en 1845, est l’un des exemples les plus souvent cités. Le tirage de la NBA en 1969 et le siège remporté par Ritchie Valens en 1959 comptent aussi parmi les épisodes célèbres documentés dans l’article." },
  { question: "Le pile ou face est-il utilisé dans les compétitions officielles aujourd'hui ?", answer: "Oui. Le football encadre le tirage dans la Loi 8 de l'IFAB et le rugby à XV dans la Loi 6 de World Rugby. Le cricket, le tennis et le football américain utilisent également un tirage avant la rencontre." },
  { question: "L'expression « pile ou face » a-t-elle changé de sens au fil du temps ?", answer: "Son principe est resté le même : départager deux options de manière aléatoire. Le vocabulaire, lui, a évolué : les Romains disaient capita aut navia et les Français de l'Ancien Régime disaient « croix ou pile »." },
];

const BlogHistoire = () => (
  <BlogPost
    title="Histoire du pile ou face : 5 faits marquants"
    description="Découvrez l'histoire du pile ou face, de Rome à Portland, en passant par la NBA, le sport et les décisions célèbres tranchées par une pièce."
    slug="/blog/histoire-pile-ou-face"
    featuredImage="https://images.pexels.com/photos/15954089/pexels-photo-15954089/free-photo-of-ancient-denar-coins.jpeg"
    articleSchema={ARTICLE_SCHEMA}
    faqItems={FAQ_ITEMS}
    dateModified="2026-10-20"
    sources={[
      {
        label: "Odysseum — capita aut navia et les monnaies romaines",
        href: "https://odysseum-biblissima.ens.psl.eu/long-format/capita-aut-navia-mythe-monnaie/",
      },
      {
        label: "Dictionnaire de l’Académie française — pile",
        href: "https://www.dictionnaire-academie.fr/article/A8P1466",
      },
      {
        label: "Encyclopédie de l’Oregon — la pièce de Portland",
        href: "https://www.oregonencyclopedia.org/articles/portland_penny/",
      },
      {
        label: "NBA.com — le tirage de la draft 1969",
        href: "https://www.nba.com/suns/gallery/best-and-worst-suns-draft-order-luck",
      },
      {
        label: "Témoignage de Tommy Allsup dans le Washington Post",
        href: "https://www.washingtonpost.com/archive/lifestyle/1987/09/08/recalling-valens-fatal-coin-flip/708b4b16-5e05-49f2-b8a4-d9c7b9a81b9d/",
      },
      {
        label: "IFAB — Loi 8 : coup d’envoi et reprise du jeu",
        href: "https://theifab.com/laws/latest/the-start-and-restart-of-play/",
      },
      {
        label: "World Rugby — Loi 6 : officiels de match",
        href: "https://passport.world.rugby/laws-of-the-game/laws-by-number/6-match-officials/?overridelang=1",
      },
    ]}
  >
    <p>
      Le pile ou face a décidé du nom d'une ville américaine, attribué le dernier siège d'un vol devenu tragique et déterminé le premier choix d'une draft NBA légendaire. En 1845, une pièce lancée dans la maison de Francis Ermatinger, à Oregon City, a tranché entre « Portland » et « Boston ». Ce jeu, vieux de plus de deux mille ans, a traversé les civilisations sans jamais perdre sa fonction première : départager deux options quand aucun argument ne permet de trancher.
    </p>
    <p>Voici les cinq épisodes les plus marquants de l'histoire du pile ou face, de la Rome antique à nos jours.</p>

    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-border"><th className="text-left py-2 px-3 font-semibold">Époque</th><th className="text-left py-2 px-3 font-semibold">Événement clé</th></tr></thead>
        <tbody>
          <tr className="border-b border-border"><td className="py-2 px-3 font-medium">Rome antique</td><td className="py-2 px-3"><em>Capita aut navia</em> : le pile ou face romain</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3 font-medium">Moyen Âge</td><td className="py-2 px-3"><em>Croix ou pile</em> : l'ancêtre de notre expression</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3 font-medium">1845</td><td className="py-2 px-3">Le nom de Portland décidé à pile ou face</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3 font-medium">1969</td><td className="py-2 px-3">La draft NBA de Lew Alcindor (Kareem Abdul-Jabbar)</td></tr>
          <tr className="border-b border-border"><td className="py-2 px-3 font-medium">1959</td><td className="py-2 px-3">Le dernier siège remporté par Ritchie Valens</td></tr>
        </tbody>
      </table>
    </div>

    <h2>Aux origines : <em>capita aut navia</em>, le pile ou face de la Rome antique</h2>
    <p>L'histoire du pile ou face commence dans la Rome antique. Les Romains pratiquaient un jeu appelé <em>capita aut navia</em>, que l'on peut traduire par « tête ou navire ». L'expression vient du dessin des pièces romaines : un côté portait le profil d'un dieu ou d'un empereur (la tête, <em>caput</em>), et l'autre arborait une proue de navire de guerre (la <em>navis</em>).</p>
    <p>Cette pratique est rapportée par l'écrivain romain Macrobe dans ses <em>Saturnales</em>, une œuvre de l'Antiquité tardive. Une <a href="https://odysseum-biblissima.ens.psl.eu/long-format/capita-aut-navia-mythe-monnaie/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">analyse historique de ces monnaies</a> replace ce témoignage dans son contexte. Les notices lexicographiques françaises conservent aussi la trace des différents sens de « pile » dans l'histoire de la monnaie. <a href="https://www.dictionnaire-academie.fr/article/A8P1466" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir la source lexicographique</a>.</p>

    <h2>Du Moyen Âge à la Renaissance : l'évolution de l'expression en France</h2>
    <p>En France, l'expression « pile ou face » n'a pas toujours existé. Avant la Révolution, les Français parlaient de <strong>« croix ou pile »</strong>. La raison est simple : les pièces de monnaie de l'Ancien Régime portaient une croix sur l'un de leurs côtés, symbole de la monarchie de droit divin. L'autre côté, le revers, était appelé « pile ».</p>
    <p>Le <em>Dictionnaire de la langue française</em> d'Émile Littré, publié entre 1863 et 1872, consacre une entrée à ce terme. Littré explique que le mot « pile » viendrait du latin <em>pila</em>, qui désignait un pilier ou une colonne — peut-être en référence au poinçon qui servait à frapper la monnaie. Les monnayeurs utilisaient un outil appelé « pile » pour marquer le revers des pièces. L'expression « croix ou pile » est donc née dans les ateliers monétaires avant de se répandre dans la langue populaire.</p>
    <p>Après la Révolution française de 1789, la croix disparaît progressivement des pièces républicaines. L'expression évolue alors naturellement vers <strong>« pile ou face »</strong>, la « face » désignant l'avers de la pièce. La formule est définitivement fixée au XIXe siècle et n'a plus changé depuis.</p>

    <h2>Portland, Oregon : quand une pièce décide du nom d'une ville (1845)</h2>
    <p>L'un des exemples les plus célèbres s'est déroulé en 1845, dans ce qui allait devenir l'Oregon. Deux investisseurs, Asa Lovejoy et Francis Pettygrove, venaient d'acquérir un terrain au bord de la rivière Willamette. Lovejoy, originaire de Boston, voulait nommer la nouvelle ville « Boston ». Pettygrove, natif de Portland dans le Maine, militait pour « Portland ».</p>
    <p>Selon l'<a href="https://www.oregonencyclopedia.org/articles/portland_penny/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Encyclopédie de l’Oregon</a>, les deux hommes prirent leur décision pendant un dîner, dans le salon de la maison de Francis Ermatinger à Oregon City. Ils choisirent un format au meilleur des trois lancers : Boston si Lovejoy gagnait, Portland si Pettygrove gagnait. Pettygrove remporta deux des trois lancers, donnant son nom à la future ville.</p>

    <h2>Le pile ou face qui changea l'histoire de la NBA (1969)</h2>
    <p>En 1969, le premier choix de la draft NBA se joua à pile ou face. Les Phoenix Suns et les Milwaukee Bucks avaient terminé la saison avec des bilans identiques. Lew Alcindor — qui deviendra plus tard Kareem Abdul-Jabbar, le meilleur marqueur de l'histoire de la NBA — était le joueur le plus convoité de cette draft.</p>
    <p>Le commissaire de la NBA Walter Kennedy lança la pièce le 19 mars 1969. Phoenix avait choisi pile ; la pièce donna face. Les Bucks obtinrent le premier choix, sélectionnèrent Alcindor et remportèrent le championnat NBA en 1971. Le système de loterie de la draft ne remplaça ce type de départage qu'en 1985. <a href="https://www.nba.com/suns/gallery/best-and-worst-suns-draft-order-luck" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Voir la source de la NBA</a>.</p>

    <h2>Le dernier siège remporté par Ritchie Valens (1959)</h2>
    <p>Dans la nuit du 2 au 3 février 1959, Buddy Holly affréta un petit avion pour éviter un nouveau trajet dans un bus glacial. Il restait deux sièges passagers à attribuer en plus de celui de Holly.</p>
    <p>Selon le <a href="https://www.washingtonpost.com/archive/lifestyle/1987/09/08/recalling-valens-fatal-coin-flip/708b4b16-5e05-49f2-b8a4-d9c7b9a81b9d/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">témoignage de Tommy Allsup</a>, Ritchie Valens et lui tirèrent l'un de ces sièges à pile ou face en coulisses. Valens choisit pile et gagna. Séparément, J. P. « The Big Bopper » Richardson, malade, obtint le siège que Waylon Jennings devait occuper. L'avion s'écrasa peu après le décollage près de Clear Lake, dans l'Iowa, tuant les trois musiciens et le pilote Roger Peterson.</p>

    <h2>Le pile ou face dans le sport moderne</h2>
    <p>Aujourd'hui, le pile ou face conserve une place centrale dans le règlement de nombreux sports. <strong>Le football</strong> suit la <a href="https://theifab.com/laws/latest/the-start-and-restart-of-play/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Loi 8 de l’IFAB</a> : le vainqueur choisit le but à attaquer ou prend le coup d'envoi. <strong>Le rugby à XV</strong> encadre le tirage dans la <a href="https://passport.world.rugby/laws-of-the-game/laws-by-number/6-match-officials/?overridelang=1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Loi 6 de World Rugby</a>. <strong>Le cricket</strong> possède sa propre tradition : un tirage qui détermine quelle équipe commence à battre ou à lancer. Le football américain commence lui aussi par un tirage officiel.</p>

    <div className="mt-8 p-4 bg-gold-50/30 rounded-xl border border-gold-200">
      <strong>Vous voulez essayer par vous-même ?</strong> Notre{" "}
      <a href="/" className="text-primary hover:underline font-medium">simulateur de pile ou face en ligne</a>{" "}
      est gratuit et fonctionne sur tous les appareils. Pour prolonger l'expérience, découvrez aussi notre{" "}
      <a href="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline font-medium">outil de lancers multiples</a>{" "}
      avec statistiques en direct, et lisez notre article sur la{" "}
      <a href="/blog/probabilite-pile-ou-face" className="text-primary hover:underline font-medium">probabilité du pile ou face expliquée simplement</a>.
    </div>
  </BlogPost>
);

export default BlogHistoire;
