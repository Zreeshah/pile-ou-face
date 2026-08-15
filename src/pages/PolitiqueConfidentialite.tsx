import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Cookie, Database, Mail, Shield } from "lucide-react";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité de pile-ouface.fr : données collectées, formulaire de contact, cookies, analytics et droits des utilisateurs."
        canonicalUrl="/politique-confidentialite"
      />
      <WebPageSchema
        title="Politique de confidentialité - Pile ou Face"
        description="Données, cookies et droits des utilisateurs sur pile-ouface.fr."
        url="/politique-confidentialite"
        dateModified="2026-08-15"
      />

      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Politique de confidentialité
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Comment pile-ouface.fr traite les données, les messages de contact et les mesures d'audience.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Principes généraux</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Pile ou Face est utilisable sans compte, sans inscription et sans paiement. Les outils
                  principaux fonctionnent directement dans votre navigateur : le résultat d'un lancer de
                  pièce, d'un dé ou d'un tirage n'est pas envoyé à un espace utilisateur du site.
                </p>
                <p>
                  Cette page décrit les traitements actuellement visibles dans le code du site. Elle devra
                  être complétée si le propriétaire ajoute de nouveaux services, formulaires, publicités,
                  espaces membres ou traitements de données.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Messages de contact</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  La page contact ouvre votre application e-mail avec un message prérempli. Les informations
                  saisies dans ce message sont transmises uniquement si vous choisissez d'envoyer l'e-mail.
                </p>
                <p>
                  Les messages reçus peuvent contenir votre nom, votre adresse e-mail et le contenu de votre
                  demande. Ils sont utilisés pour vous répondre, traiter votre demande et conserver un suivi
                  raisonnable des échanges.
                </p>
                <p>
                  Pour toute demande relative à vos données, écrivez à{" "}
                  <a href="mailto:contact@pile-ouface.fr" className="text-primary hover:underline">
                    contact@pile-ouface.fr
                  </a>.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Cookies et mesure d'audience</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site charge Google Analytics avec l'identifiant <strong>G-H4HMS49YQ2</strong> après le
                  chargement de la page afin de mesurer l'audience et d'améliorer les contenus. Google peut
                  alors déposer ou lire des cookies de mesure selon votre navigateur, votre région et vos
                  préférences.
                </p>
                <p>
                  Ces mesures servent à comprendre quelles pages sont consultées, quels outils sont utiles
                  et quelles erreurs doivent être corrigées. Elles ne créent pas de compte utilisateur sur
                  pile-ouface.fr.
                </p>
                <p>
                  Vous pouvez limiter ou bloquer ces cookies depuis les réglages de votre navigateur ou avec
                  les outils proposés par Google pour la gestion de la personnalisation publicitaire et des
                  mesures d'audience.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Données techniques</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Comme la plupart des sites web, l'hébergement peut traiter des données techniques
                  nécessaires à la sécurité et à la livraison des pages, par exemple l'adresse IP, la date
                  de requête, l'URL demandée, le navigateur et les journaux d'erreur.
                </p>
                <p>
                  Ces données sont utilisées pour assurer le fonctionnement, la sécurité, le diagnostic
                  technique et la prévention des abus. Les durées de conservation précises dépendent des
                  paramètres d'hébergement effectivement utilisés par le propriétaire du site.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold mb-6">Vos droits</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Selon le droit applicable à votre situation, vous pouvez demander l'accès, la rectification,
                  la suppression ou la limitation des données personnelles vous concernant.
                </p>
                <p>
                  Pour exercer ces droits ou poser une question, contactez-nous par e-mail à{" "}
                  <a href="mailto:contact@pile-ouface.fr" className="text-primary hover:underline">
                    contact@pile-ouface.fr
                  </a>. Les informations légales générales sont disponibles dans les{" "}
                  <Link to="/mentions-legales" className="text-primary hover:underline">
                    mentions légales
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
