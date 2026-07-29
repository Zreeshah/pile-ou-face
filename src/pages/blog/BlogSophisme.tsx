import { BlogPost } from "@/components/BlogPost";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le Sophisme du Joueur Expliqué Simplement",
  description: "Qu'est-ce que le sophisme du joueur ? Découvrez pourquoi croire que le hasard se souvient du passé est une erreur, avec des exemples en roulette, loterie et pile ou face.",
  author: { "@type": "Organization", name: "Pile ou Face" },
  publisher: { "@type": "Organization", name: "Pile ou Face", url: "https://pile-ouface.fr" },
  datePublished: "2026-07-29",
  dateModified: "2026-07-29",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://pile-ouface.fr/blog/sophisme-du-joueur" },
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

const BlogSophisme = () => (
  <BlogPost
    title="Le sophisme du joueur expliqué simplement : pourquoi le hasard n'a pas de mémoire"
    description="Qu'est-ce que le sophisme du joueur ? Découvrez pourquoi croire que le hasard se souvient du passé est une erreur, avec des exemples en roulette, loterie et pile ou face."
    slug="/blog/sophisme-du-joueur"
    articleSchema={ARTICLE_SCHEMA}
    faqItems={FAQ_ITEMS}
  >
    <div className="space-y-4">
      <p>{page.desc}</p>
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

export default BlogSophisme;
