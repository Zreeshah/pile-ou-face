import { ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebsiteSchema, WebPageSchema } from "@/components/SEO";

interface BlogPostProps {
  title: string;
  description: string;
  slug: string;
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
  articleSchema?: Record<string, unknown>;
  faqItems?: { question: string; answer: string }[];
  children: ReactNode;
}

const LAST_UPDATED = "2026-07-29";

export const BlogPost = ({
  title,
  description,
  slug,
  dateModified = LAST_UPDATED,
  articleSchema,
  faqItems,
  children,
}: BlogPostProps) => {
  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonicalUrl={slug}
        ogType="article"
        bareTitle
      />
      <WebsiteSchema />
      <WebPageSchema
        title={title}
        description={description}
        url={slug}
        dateModified={dateModified}
      />
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Article Header */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-50/50 to-transparent pointer-events-none" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in text-balance">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 animate-fade-in-up">
              {description}
            </p>
            <p className="text-sm text-muted-foreground">
              Mis à jour le{" "}
              <time dateTime={dateModified}>
                {new Date(dateModified).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
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
