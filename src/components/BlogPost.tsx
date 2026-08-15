import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BreadcrumbSchema, SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";

interface BlogPostProps {
  title: string;
  description: string;
  slug: string;
  featuredImage?: string;
  dateModified?: string;
  articleSchema?: Record<string, unknown>;
  faqItems?: { question: string; answer: string }[];
  sources?: { label: string; href: string }[];
  children: ReactNode;
}

const LAST_UPDATED = "2026-07-29";

export const BlogPost = ({
  title,
  description,
  slug,
  featuredImage,
  dateModified = LAST_UPDATED,
  articleSchema,
  faqItems,
  sources,
  children,
}: BlogPostProps) => {
  const articleUrl = `https://pile-ouface.fr${slug}/`;
  const optimizedImage = featuredImage
    ? `${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900`
    : undefined;
  const resolvedArticleSchema = articleSchema
    ? {
        ...articleSchema,
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        dateModified,
        mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
        author: {
          "@type": "Organization",
          "@id": "https://pile-ouface.fr/#organization",
          name: "Rédaction Pile ou Face",
          url: "https://pile-ouface.fr/a-propos/",
        },
        publisher: { "@id": "https://pile-ouface.fr/#organization" },
        ...(optimizedImage ? {
          image: {
            "@type": "ImageObject",
            contentUrl: optimizedImage,
            width: 1600,
            height: 900,
          },
        } : {}),
      }
    : null;

  const breadcrumbs = [
    { name: "Accueil", url: "https://pile-ouface.fr/" },
    { name: "Blog", url: "https://pile-ouface.fr/blog/" },
    { name: title, url: articleUrl },
  ];

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonicalUrl={slug}
        ogType="article"
        ogImage={optimizedImage}
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title={title}
        description={description}
        url={slug}
        dateModified={dateModified}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      {resolvedArticleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resolvedArticleSchema) }}
        />
      )}

      {/* Featured Image */}
      {featuredImage && (
        <section className="relative w-full h-64 md:h-96 overflow-hidden">
          <picture>
            <source
              type="image/avif"
              srcSet={`${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=avif&w=640&h=360 640w, ${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=avif&w=1024&h=576 1024w, ${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=avif&w=1600&h=900 1600w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=webp&w=640&h=360 640w, ${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=webp&w=1024&h=576 1024w, ${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&fm=webp&w=1600&h=900 1600w`}
              sizes="100vw"
            />
            <img
              src={optimizedImage}
              srcSet={`${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&w=640&h=360 640w, ${featuredImage}?auto=compress&cs=tinysrgb&fit=crop&w=1024&h=576 1024w, ${optimizedImage} 1600w`}
              sizes="100vw"
              alt={title}
              width="1600"
              height="900"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </section>
      )}

      {/* Article Header */}
      <section className={`relative ${featuredImage ? '-mt-20' : 'py-16 md:py-20'} overflow-hidden`}>
        {!featuredImage && (
          <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        )}
        <div className="container relative">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Fil d’Ariane" className="mb-5 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="truncate">{title}</li>
              </ol>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in-up">
              {description}
            </p>
            <p className="text-sm text-muted-foreground flex flex-wrap gap-x-2">
              <span>
                Par <Link to="/a-propos" rel="author" className="font-medium text-foreground hover:text-primary">Rédaction Pile ou Face</Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>Mis à jour le{" "}
              <time dateTime={dateModified}>
                {new Date(dateModified).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <article className="card-glass p-8 md:p-12 space-y-6 text-muted-foreground leading-relaxed text-lg">
              {children}
              {sources && sources.length > 0 && (
                <section aria-labelledby="article-sources" className="pt-6 mt-8 border-t border-border">
                  <h2 id="article-sources">Sources</h2>
                  <ul className="space-y-2 text-base">
                    {sources.map((source) => (
                      <li key={source.href}>
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline underline-offset-4"
                        >
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems && faqItems.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-card rounded-xl px-6 border border-border shadow-sm"
                    open={index === 0}
                  >
                    <summary className="cursor-pointer list-none text-left font-medium py-5 flex items-center justify-between gap-4">
                      <h3 className="text-base font-medium">{item.question}</h3>
                      <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none">
                        +
                      </span>
                    </summary>
                    <p className="text-muted-foreground pb-5 leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};
