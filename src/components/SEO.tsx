import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string | null;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  noFollow?: boolean;
  bareTitle?: boolean;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://pile-ouface.fr/og-image.png",
  ogType = "website",
  noIndex = false,
  noFollow = false,
  bareTitle = false,
}: SEOProps) => {
  const siteName = "Pile ou Face - Simulateur en ligne";
  const fullTitle = bareTitle ? title : `${title} | ${siteName}`;
  const baseUrl = "https://pile-ouface.fr";
  const canonical = canonicalUrl === null
    ? null
    : canonicalUrl
      ? `${baseUrl}${canonicalUrl}${canonicalUrl === "/" ? "" : "/"}`
      : `${baseUrl}/`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="fr-FR" href={canonical} />}
      {canonical && <link rel="alternate" hrefLang="x-default" href={canonical} />}
      <meta
        name="robots"
        content={`${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`}
      />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="language" content="fr" />
      <meta name="geo.region" content="FR" />
    </Helmet>
  );
};

export const WebsiteSchema = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "WebSite",
    "@id": "https://pile-ouface.fr/#website",
    name: "Pile ou Face - Simulateur en ligne",
    description: "Simulateur de pile ou face en ligne gratuit. Lancez une pièce virtuelle et obtenez un résultat aléatoire instantanément.",
    url: "https://pile-ouface.fr/",
    inLanguage: "fr-FR",
    publisher: { "@id": "https://pile-ouface.fr/#organization" },
  }) }} />
);

export const OrganizationSchema = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "Organization",
    "@id": "https://pile-ouface.fr/#organization",
    name: "Pile ou Face",
    url: "https://pile-ouface.fr/",
    logo: {
      "@type": "ImageObject",
      "@id": "https://pile-ouface.fr/#logo",
      url: "https://pile-ouface.fr/og-image.png",
      contentUrl: "https://pile-ouface.fr/og-image.png",
      width: 1200,
      height: 630,
    },
    email: "contact@pile-ouface.fr",
  }) }} />
);

export const WebPageSchema = ({ title, description, url, dateModified }: {
  title: string; description: string; url: string; dateModified?: string;
}) => {
  const pageUrl = url === "/" ? "https://pile-ouface.fr/" : `https://pile-ouface.fr${url}/`;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      name: title, description: description, url: pageUrl,
      inLanguage: "fr-FR",
      ...(dateModified ? { dateModified } : {}),
      isPartOf: { "@id": "https://pile-ouface.fr/#website" },
      publisher: { "@id": "https://pile-ouface.fr/#organization" },
    }) }} />
  );
};

export const BreadcrumbSchema = ({ items }: {
  items: { name: string; url: string }[];
}) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }) }} />
);
