import { useState } from "react";
import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a static site, we'll use mailto
    const mailtoLink = `mailto:contact@pile-ou-face.org?subject=Contact depuis pile-ou-face.org&body=Nom: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <SEO
        title="Contact - Nous Contacter"
        description="Contactez l'équipe de pile-ou-face.org. Questions, suggestions ou partenariats, nous sommes à votre écoute."
        canonicalUrl="/contact"
      />
      <WebPageSchema
        title="Contact - Pile ou Face"
        description="Contactez l'équipe de pile-ou-face.org."
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
              {isSubmitted ? (
              <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-2">
                    Merci pour votre message !
                  </h2>
                  <p className="text-muted-foreground">
                    Votre client email devrait s'ouvrir. Si ce n'est pas le cas, 
                    vous pouvez nous écrire directement à contact@pile-ou-face.org
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold">Envoyez-nous un message</h2>
                      <p className="text-sm text-muted-foreground">
                        Nous répondons généralement sous 48h
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
                      className="btn-flip w-full flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Envoyer le message
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
                href="mailto:contact@pile-ou-face.org"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Mail className="w-5 h-5" />
                contact@pile-ou-face.org
              </a>
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
