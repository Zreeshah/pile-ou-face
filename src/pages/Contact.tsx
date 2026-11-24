import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Mail, MessageSquare, Send } from "lucide-react";

const SUBJECTS = [
  "Question sur un outil",
  "Signaler un problème",
  "Suggestion d'amélioration",
  "Partenariat",
  "Autre demande",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[pile-ouface.fr] ${formData.subject}`);
    const body = encodeURIComponent(
      `Nom : ${formData.name}\nEmail : ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:contact@pile-ouface.fr?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <Layout>
      <SEO
        title="Contact"
        description="Contactez l'équipe de pile-ouface.fr. Questions, suggestions ou partenariats, nous sommes à votre écoute."
        canonicalUrl="/contact"
      />
      <WebPageSchema
        title="Contact - Pile ou Face"
        description="Contactez l'équipe de pile-ouface.fr."
        url="/contact"
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Nous Contacter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Une question, une suggestion ou simplement envie de dire bonjour ? 
              Nous sommes à votre écoute.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-8 md:p-10">
              {status === "sent" ? (
              <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    Merci pour votre message !
                  </h2>
                  <p className="text-muted-foreground">
                    Votre messagerie vient de s'ouvrir avec un e-mail pré-rempli adressé à
                    contact@pile-ouface.fr : il ne vous reste qu'à l'envoyer. Nous répondons
                    généralement sous 48h ouvrées.
                  </p>
                </div>
              ) : (
                <>
                  {status === "error" && (
                    <p className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      L'envoi n'a pas abouti. Vous pouvez réessayer ou nous écrire directement à{" "}
                      <a href="mailto:contact@pile-ouface.fr" className="underline">contact@pile-ouface.fr</a>.
                    </p>
                  )}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold">Envoyez-nous un message</h2>
                      <p className="text-sm text-muted-foreground">
                        Nous répondons généralement sous 48h ouvrées
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Votre email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="jean@exemple.fr"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Votre message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        placeholder="Écrivez votre message ici..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-flip w-full flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <Send className="w-5 h-5" />
                      {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Alternative contact */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Vous pouvez également nous contacter directement par email :
              </p>
              <a
                href="mailto:contact@pile-ouface.fr"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Mail className="w-5 h-5" />
                contact@pile-ouface.fr
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ contact */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">
              Avant de nous écrire
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Le simulateur est-il vraiment gratuit ?</strong>{" "}
                Oui. Tous les outils du site — pile ou face, dés, tirage au sort, nombre aléatoire —
                sont gratuits et utilisables sans compte ni inscription, sur ordinateur comme sur mobile.
              </p>
              <p>
                <strong className="text-foreground">Les tirages sont-ils truqués ?</strong>{" "}
                Non. Chaque tirage utilise l'API cryptographique du navigateur
                (<code>crypto.getRandomValues()</code>), qui produit des valeurs uniformes et
                imprévisibles. Le site ne conserve aucun historique de vos lancers et ne peut pas
                influencer un résultat.
              </p>
              <p>
                <strong className="text-foreground">Puis-je utiliser le site en classe ou pour un événement ?</strong>{" "}
                Oui, pour les usages pédagogiques, ludiques et décisionnels courants. En revanche, nos
                outils ne sont pas certifiés pour les jeux d'argent réglementés, les concours officiels
                ou la génération de secrets cryptographiques.
              </p>
              <p>
                <strong className="text-foreground">Combien de temps pour une réponse ?</strong>{" "}
                Nous répondons généralement sous 48h ouvrées. Pour un problème technique, décrivez
                votre appareil, votre navigateur et les étapes qui reproduisent le problème : cela
                nous aide à corriger plus vite.
              </p>
              <p>
                <strong className="text-foreground">Proposez-vous un partenariat ou une publicité ?</strong>{" "}
                Écrivez-nous en choisissant le sujet « Partenariat » et en décrivant votre projet.
                Nous étudions chaque proposition et répondons sous 48h ouvrées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold mb-4">
              Vous avez une question fréquente ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Consultez notre FAQ pour trouver rapidement des réponses à vos questions 
              sur le pile ou face en ligne.
            </p>
            <a
              href="/#faq"
              className="text-primary hover:underline font-medium"
            >
              Voir la FAQ →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
