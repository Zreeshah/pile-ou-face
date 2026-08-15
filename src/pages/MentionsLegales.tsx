import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Building2, Mail, ShieldCheck } from "lucide-react";

const MentionsLegales = () => {
  return (
    <Layout>
      <SEO
        title="Mentions légales"
        description="Mentions légales de pile-ouface.fr : éditeur, contact, hébergement, propriété intellectuelle et responsabilités du service."
        canonicalUrl="/mentions-legales"
      />
      <WebPageSchema
        title="Mentions légales - Pile ou Face"
        description="Informations légales et contact du site pile-ouface.fr."
        url="/mentions-legales"
        dateModified="2026-08-15"
      />

      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Mentions légales
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Informations sur l'éditeur, le contact et les conditions d'utilisation de pile-ouface.fr.
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
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Éditeur du site</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site <strong>pile-ouface.fr</strong> est un service en ligne gratuit consacré aux outils
                  de hasard simples : pile ou face, dés virtuels, tirage au sort et générateur de nombres.
                </p>
                <dl className="grid gap-3">
                  <div>
                    <dt className="font-semibold text-foreground">Nom public du service</dt>
                    <dd>Pile ou Face</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Site web</dt>
                    <dd>https://pile-ouface.fr/</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Contact</dt>
                    <dd>
                      <a href="mailto:contact@pile-ouface.fr" className="text-primary hover:underline">
                        contact@pile-ouface.fr
                      </a>
                    </dd>
                  </div>
                </dl>
                <p>
                  Les informations d'identification juridique détaillées de l'entité responsable
                  seront complétées dès leur validation par le propriétaire du site. Aucun nom légal,
                  statut, adresse ou numéro d'immatriculation non vérifié n'est publié ici.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Hébergement et fonctionnement</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site est publié sous forme de pages statiques. Les outils s'exécutent dans le
                  navigateur de l'utilisateur et n'exigent pas de compte, d'inscription ou de paiement.
                </p>
                <p>
                  Les tirages utilisent l'API cryptographique du navigateur avec un échantillonnage
                  uniforme. Ils conviennent aux usages ludiques, pédagogiques et décisionnels courants,
                  mais ne constituent pas un dispositif certifié pour les jeux d'argent réglementés,
                  les concours officiels ou la génération de secrets.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold mb-6">Propriété intellectuelle</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Les textes, interfaces, éléments graphiques et contenus éditoriaux publiés sur
                  pile-ouface.fr sont protégés par le droit applicable. Toute reproduction substantielle
                  sans autorisation préalable est interdite, sauf courte citation avec mention claire
                  de la source.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <h2 className="text-2xl font-display font-bold mb-6">Responsabilité</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Pile ou Face fournit des outils gratuits à titre informatif et pratique. Les résultats
                  affichés ne remplacent pas un tirage supervisé, audité ou prévu par un règlement
                  officiel lorsque celui-ci est requis.
                </p>
                <p>
                  Si vous repérez une erreur factuelle, technique ou juridique, vous pouvez nous écrire
                  depuis la page <Link to="/contact" className="text-primary hover:underline">contact</Link>.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Données personnelles</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Les informations relatives aux données personnelles, aux cookies et aux mesures
                d'audience sont détaillées dans la{" "}
                <Link to="/politique-confidentialite" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
