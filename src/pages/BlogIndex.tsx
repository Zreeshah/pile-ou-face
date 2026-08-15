import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";
import { BookOpen, Calculator, Dices, HelpCircle, Brain, ScrollText } from "lucide-react";

const LAST_UPDATED = "2026-08-14";

const articles = [
  {
    slug: "/blog/histoire-pile-ou-face",
    title: "Histoire du pile ou face : 5 faits surprenants",
    description: "Découvrez l'histoire fascinante du pile ou face, de la Rome antique au Super Bowl. 5 anecdotes historiques surprenantes.",
    icon: ScrollText,
    date: "14 août 2026",
  },
  {
    slug: "/blog/probabilite-pile-ou-face",
    title: "Probabilité pile ou face : le calcul expliqué simplement",
    description: "Comprendre la probabilité pile ou face en 5 minutes. Calcul simple des chances, séries de lancers, loi des grands nombres.",
    icon: Calculator,
    date: "14 août 2026",
  },
  {
    slug: "/blog/pile-ou-face-50-50",
    title: "Pile ou face 50/50 : la vérité que la science révèle",
    description: "Le modèle de Diaconis et une étude de 350 757 lancers révèlent un biais insoupçonné. Le pile ou face est-il vraiment 50/50 ?",
    icon: Dices,
    date: "14 août 2026",
  },
  {
    slug: "/blog/pile-ou-face-football-rugby",
    title: "Pile ou face au football et au rugby : le règlement",
    description: "Loi 8 de l'IFAB, Loi 6 de World Rugby, toss NFL et cricket. Tout savoir sur le tirage au sort dans le sport.",
    icon: BookOpen,
    date: "14 août 2026",
  },
  {
    slug: "/blog/pile-ou-face-google",
    title: "Pile ou face Google : comment ça marche",
    description: "Découvrez comment fonctionne le simulateur de Google, ses limites et pourquoi un outil dédié offre plus.",
    icon: HelpCircle,
    date: "14 août 2026",
  },
  {
    slug: "/blog/comment-decider-quand-on-hesite",
    title: "Comment décider quand on hésite : 7 méthodes",
    description: "Pile ou face, matrice d'Eisenhower, règle des 10-10-10 : 7 techniques pour prendre une décision sans stress.",
    icon: Brain,
    date: "14 août 2026",
  },
  {
    slug: "/blog/sophisme-du-joueur",
    title: "Le sophisme du joueur expliqué simplement",
    description: "Pourquoi croire que le hasard a de la mémoire est une erreur. De Monte Carlo 1913 à la psychologie cognitive.",
    icon: Brain,
    date: "14 août 2026",
  },
];

const BlogIndex = () => {
  return (
    <Layout>
      <SEO
        title="Blog Pile ou Face – Articles, Guides et Probabilités"
        description="Découvrez tous nos articles sur le pile ou face : histoire, probabilités, sophisme du joueur, méthodes de décision et plus. Guides gratuits en français."
        canonicalUrl="/blog"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title="Blog Pile ou Face"
        description="Articles et guides sur le pile ou face, les probabilités et la prise de décision."
        url="/blog"
        dateModified={LAST_UPDATED}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              Blog Pile ou Face
              <span className="block text-primary mt-2 text-3xl md:text-4xl lg:text-5xl">
                Articles, guides et probabilités
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up">
              Explorez nos articles sur l'histoire du pile ou face, les probabilités, 
              le hasard et les méthodes de décision. Tout pour comprendre le jeu le plus simple du monde.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article) => {
                const Icon = article.icon;
                return (
                  <Link
                    key={article.slug}
                    to={article.slug}
                    className="group card-glass p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {article.description}
                        </p>
                        <p className="text-xs text-muted-foreground/60">{article.date}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <div className="card-glass p-8 max-w-lg mx-auto">
                <h3 className="font-display font-semibold text-xl mb-3">
                  Essayez nos outils gratuits
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Mettez la théorie en pratique avec nos simulateurs en ligne.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/" className="btn-flip text-sm">
                    🪙 Pile ou face
                  </Link>
                  <Link to="/pile-ou-face-plusieurs-lancers" className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm font-medium transition-colors">
                    Lancers multiples
                  </Link>
                  <Link to="/de-en-ligne" className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm font-medium transition-colors">
                    🎲 Dé en ligne
                  </Link>
                  <Link to="/tirage-au-sort" className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-sm font-medium transition-colors">
                    🎯 Tirage au sort
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndex;
