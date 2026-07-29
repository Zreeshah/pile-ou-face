import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Pile ou face football rugby : que dit le règlement officiel ?",
  description: "Que dit le règlement du pile ou face au football et au rugby ? Loi 8 FIFA, protocole rugby, toss NFL et cricket. Tout savoir sur le tirage au sort sportif.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29",
  dateModified: "2026-07-29",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/pile-ou-face-football-rugby" },
  inLanguage: "fr-FR",
};

const FAQ_ITEMS = [
  {
    question: "Cet article est-il régulièrement mis à jour ?",
    answer: "Oui, nous mettons à jour nos articles régulièrement pour refléter les informations les plus récentes. La date de dernière modification est indiquée en haut de chaque article.",
  },
  {
    question: "Puis-je partager cet article ?",
    answer: "Bien sûr ! Vous pouvez partager cet article sur les réseaux sociaux, par email ou sur votre site. Nous vous demandons simplement de mentionner la source avec un lien vers pile-ouface.fr.",
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
    <div className="space-y-4">
      <p>Que dit le règlement du pile ou face au football et au rugby ? Loi 8 FIFA, protocole rugby, toss NFL et cricket. Tout savoir sur le tirage au sort sportif.</p>
      <p>
        Cet article est en cours de finalisation. Revenez bientôt pour découvrir le contenu complet, 
        ou explorez dès maintenant nos autres articles et outils gratuits.
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        <a href="/blog" className="text-primary hover:underline font-medium">
          ← Retour au blog
        </a>
        <a href="/" className="text-primary hover:underline font-medium">
          🪙 Essayer le simulateur
        </a>
      </div>
    </div>
  </BlogPost>
);

export default BlogSport;
