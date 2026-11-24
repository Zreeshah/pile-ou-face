import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { FileText, Scale, AlertTriangle } from "lucide-react";

const ConditionsGenerales = () => {
  return (
    <Layout>
      <SEO
        title="Conditions générales d'utilisation"
        description="Conditions générales d'utilisation de pile-ouface.fr : accès au service, règles d'usage des outils gratuits, responsabilités et contact."
        canonicalUrl="/conditions-generales"
      />
      <WebPageSchema
        title="Conditions générales d'utilisation - Pile ou Face"
        description="Règles d'utilisation du service gratuit pile-ouface.fr."
        url="/conditions-generales"
        dateModified="2026-11-24"
      />

      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Conditions générales d'utilisation
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Les règles d'utilisation du service gratuit pile-ouface.fr. Dernière mise à jour :
              24 novembre 2026.
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
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">1. Objet et acceptation</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Les présentes conditions régissent l'accès et l'utilisation du site
                  pile-ouface.fr, édité par Morgana F Provencher, 53 boulevard Albin Durand,
                  51000 Châlons-en-Champagne, France (voir les{" "}
                  <Link to="/mentions-legales" className="text-primary hover:underline">
                    mentions légales
                  </Link>).
                  Le site propose gratuitement des outils de hasard en ligne — simulateur de pile
                  ou face, dés virtuels, tirage au sort, générateur de nombre aléatoire,
                  calculateur de probabilités — ainsi que des articles de blog.
                </p>
                <p>
                  En utilisant le site, vous acceptez ces conditions. Si vous n'êtes pas d'accord
                  avec elles, n'utilisez pas le service. L'accès au site est gratuit, sans
                  inscription et sans compte.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">2. Usages autorisés et interdits</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Les outils sont destinés aux usages ludiques, pédagogiques et décisionnels
                  courants : départager deux options, animer un cours de probabilités, choisir
                  qui commence une partie, organiser un tirage au sort informel.
                </p>
                <p>
                  Ils ne doivent pas être utilisés pour les jeux d'argent réglementés, les
                  concours officiels, la génération de secrets cryptographiques ou toute décision
                  nécessitant un tirage supervisé, audité ou certifié. Les résultats affichés ne
                  remplacent pas un tirage officiel lorsque celui-ci est requis par un règlement.
                </p>
                <p>
                  Il est interdit de tenter de perturber le fonctionnement du site, d'en extraire
                  les contenus de façon automatisée et massive, ou de présenter les outils comme
                  vos propres services.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">3. Responsabilité et disponibilité</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Les outils fonctionnent dans votre navigateur et utilisent l'API
                  cryptographique de celui-ci (crypto.getRandomValues) pour produire des tirages
                  uniformes. L'éditrice s'efforce de maintenir le service disponible et exact,
                  mais ne garantit pas une disponibilité ininterrompue ni l'absence d'erreur.
                </p>
                <p>
                  L'éditrice ne peut être tenue responsable des conséquences d'une décision prise
                  à partir d'un tirage, ni des dommages indirects liés à l'utilisation du site.
                  Les contenus du blog sont fournis à titre informatif et s'appuient sur des
                  sources citées ; ils ne constituent pas un conseil professionnel.
                </p>
                <p>
                  Le site affiche des publicités via Google AdSense et mesure son audience avec
                  Google Analytics. Le détail des données traitées figure dans la{" "}
                  <Link to="/politique-confidentialite" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold mb-6">4. Propriété intellectuelle et contact</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Les textes, interfaces et contenus éditoriaux du site sont protégés par le
                  droit applicable. Toute reproduction substantielle sans autorisation préalable
                  est interdite, sauf courte citation avec mention claire de la source.
                </p>
                <p>
                  Ces conditions peuvent être modifiées à tout moment ; la version en vigueur est
                  celle publiée sur cette page. Pour toute question, pour signaler une erreur ou
                  pour exercer vos droits sur vos données, écrivez à{" "}
                  <a href="mailto:contact@pile-ouface.fr" className="text-primary hover:underline">
                    contact@pile-ouface.fr
                  </a>{" "}
                  — réponse généralement sous 48h ouvrées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConditionsGenerales;
