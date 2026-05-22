import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://pile-ou-face.org/og-image.png",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const siteName = "Pile ou Face - Simulateur en ligne";
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = "https://pile-ou-face.org";
  const canonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  // Skip Helmet during SSR; metadata is injected at prerender time.
  if (typeof window === "undefined") return null;



  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional */}
      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
    </Helmet>
  );
};

// WebSite Schema
export const WebsiteSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Pile ou Face - Simulateur en ligne",
        description:
          "Simulateur de pile ou face en ligne gratuit. Lancez une pièce virtuelle et obtenez un résultat aléatoire instantanément.",
        url: "https://pile-ou-face.org",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://pile-ou-face.org/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    }}
  />
);

// WebPage Schema
export const WebPageSchema = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: description,
        url: `https://pile-ou-face.org${url}`,
        isPartOf: {
          "@type": "WebSite",
          name: "Pile ou Face - Simulateur en ligne",
          url: "https://pile-ou-face.org",
        },
      }),
    }}
  />
);
