import { Layout } from "@/components/Layout";
import { SEO, WebPageSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Heart, Target, Users } from "lucide-react";

const APropos = () => {
  return (
    <Layout>
      <SEO
        title="À propos"
        description="Découvrez pile-ouface.fr, ses outils gratuits de hasard en ligne et sa mission : aider à trancher simplement avec pile ou face, dés et tirages."
        canonicalUrl="/a-propos"
      />
      <WebPageSchema
        title="À Propos - Pile ou Face"
        description="Découvrez l'histoire de pile-ouface.fr."
        url="/a-propos"
      />

      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gold-50/50 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              À Propos de Pile ou Face
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              L'histoire derrière le simulateur de pile ou face le plus simple du web francophone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Notre Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Notre mission est simple : vous offrir le <strong>simulateur pile ou face</strong> le plus 
                rapide, fiable et agréable à utiliser. Nous croyons que parfois, la meilleure façon de 
                prendre une décision est de s'en remettre au hasard. C'est pourquoi nous avons créé 
                <strong> pile-ouface.fr</strong>.
              </p>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Pourquoi ce site ?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Combien de fois vous êtes-vous retrouvé face à un choix difficile entre deux options ? 
                  Parfois, la meilleure solution est de laisser le hasard décider pour nous. C'est 
                  libérateur et souvent, cela nous aide à réaliser ce que nous voulions vraiment.
                </p>
                <p>
                  Nous avons créé ce <strong>jeu pile ou face en ligne</strong> pour que vous puissiez 
                  <strong> lancer une pièce</strong> à tout moment, où que vous soyez, sans avoir 
                  besoin d'une vraie pièce de monnaie.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Notre méthode</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nos tirages utilisent <strong>crypto.getRandomValues()</strong>, l'API de valeurs
                  aléatoires cryptographiquement fortes du navigateur : chaque lancer effectue un
                  nouveau tirage uniforme, sans graine prévisible et sans historique conservé.
                </p>
                <p>
                  Nos probabilités ne sont jamais recopiées : elles sont <strong>calculées</strong> à
                  partir de la loi binomiale (coefficients C(n,k) × (1/2)<sup>n</sup>) et, pour les
                  dés multiples, par convolution des distributions. Chaque page de probabilité
                  montre le calcul étape par étape et propose un mini-simulateur pour vérifier
                  la théorie par l'expérience.
                </p>
                <p>
                  Nos explications s'appuient sur des sources publiées, notamment l'étude de
                  František Bartoš et ses coauteurs (2023, 350 757 lancers réels) et les travaux
                  de Persi Diaconis (2007) sur le léger biais des pièces réelles. Le site est
                  indépendant, gratuit, sans inscription, et ne collecte pas de données
                  personnelles pour fonctionner. Pour nous écrire :{" "}
                  <strong>contact@pile-ouface.fr</strong>.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Qui est derrière le site ?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site est édité par <strong>Morgana F Provencher</strong>, 53 boulevard Albin
                  Durand, 51000 Châlons-en-Champagne, France. C'est elle qui rédige les contenus,
                  vérifie les calculs et répond aux messages des visiteurs. Les informations
                  juridiques complètes figurent dans les{" "}
                  <Link to="/mentions-legales" className="text-primary hover:underline">
                    mentions légales
                  </Link>.
                </p>
                <p>
                  Nous sommes un petit site indépendant, sans équipe marketing et sans investisseurs :
                  les outils sont développés et maintenus directement par leur éditrice, et les
                  articles sont écrits à partir de sources publiées, citées en bas de chaque page
                  concernée. Quand un visiteur signale une erreur — un calcul, une date, un lien —
                  nous la vérifions et la corrigeons, puis nous mettons à jour la date de la page
                  concernée pour que la correction soit visible. Pour nous écrire :{" "}
                  <a href="mailto:contact@pile-ouface.fr" className="text-primary hover:underline">
                    contact@pile-ouface.fr
                  </a>{" "}
                  — nous répondons généralement sous 48h ouvrées.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Pour qui ?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Notre simulateur s'adresse à tous :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les indécis qui ont besoin d'un coup de pouce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les joueurs qui veulent déterminer qui commence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les sportifs pour les tirages au sort</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les enseignants pour des exercices de probabilités</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Tous ceux qui aiment s'amuser avec le hasard !</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Comment le site a grandi</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site a commencé comme un simple simulateur de pile ou face : un bouton, une
                  pièce virtuelle, un résultat. Les visiteurs ont ensuite demandé plus : des lancers
                  multiples pour observer les fréquences, des dés pour les jeux de société, un
                  tirage au sort pour choisir un gagnant, un générateur de nombres pour les tirages
                  quotidiens. Chaque outil a été ajouté en réponse à une demande réelle, et non
                  pour remplir le site.
                </p>
                <p>
                  Le blog est né de la même façon. Les questions revenaient sans cesse — « le pile
                  ou face est-il vraiment 50/50 ? », « pourquoi obtient-on des séries ? », « comment
                  décider quand on hésite ? » — et chaque article y répond avec des calculs
                  vérifiables et des sources citées. Les pages de probabilités, elles, montrent le
                  calcul étape par étape au lieu d'afficher un simple résultat : c'est ce qui
                  distingue un outil pédagogique d'un gadget.
                </p>
                <p>
                  Aujourd'hui, le site réunit cinq outils et sept articles, tous gratuits et sans
                  inscription. La maintenance consiste surtout à vérifier les calculs, à corriger
                  les erreurs signalées par les visiteurs et à garder les contenus à jour quand
                  les sources évoluent. C'est un travail lent, mais c'est celui qui fait la
                  confiance des visiteurs.
                </p>
              </div>
            </div>

            <div className="card-glass p-8 md:p-10 mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold">Ce que propose le site</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Le site réunit cinq outils gratuits et un blog. Le{" "}
                  <Link to="/" className="text-primary hover:underline">
                    simulateur de pile ou face
                  </Link>{" "}
                  lance une pièce virtuelle en un clic ; la page{" "}
                  <Link to="/pile-ou-face-plusieurs-lancers" className="text-primary hover:underline">
                    lancers multiples
                  </Link>{" "}
                  répète le tirage jusqu'à dix mille fois pour observer la fréquence se stabiliser.
                  Le{" "}
                  <Link to="/de-en-ligne" className="text-primary hover:underline">
                    dé en ligne
                  </Link>{" "}
                  couvre les dés de 2 à 100 faces et les combinaisons de plusieurs dés, le{" "}
                  <Link to="/tirage-au-sort" className="text-primary hover:underline">
                    tirage au sort
                  </Link>{" "}
                  choisit un gagnant dans une liste, et le{" "}
                  <Link to="/nombre-aleatoire" className="text-primary hover:underline">
                    générateur de nombre aléatoire
                  </Link>{" "}
                  tire un entier dans l'intervalle de votre choix.
                </p>
                <p>
                  Pour comprendre les maths derrière les tirages, la page{" "}
                  <Link to="/probabilite-pile-ou-face" className="text-primary hover:underline">
                    probabilité pile ou face
                  </Link>{" "}
                  propose un calculateur de loi binomiale, et le{" "}
                  <Link to="/blog" className="text-primary hover:underline">
                    blog
                  </Link>{" "}
                  explique l'histoire du jeu, le sophisme du joueur et les méthodes de décision.
                  Chaque outil fonctionne dans le navigateur, sans envoi de vos tirages vers un
                  serveur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-12">Nos valeurs</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display font-semibold text-lg mb-2">Simplicité</h3>
                <p className="text-sm text-muted-foreground">
                  Un seul bouton, un résultat clair. Pas de complications inutiles.
                </p>
              </div>
              
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-display font-semibold text-lg mb-2">Équité</h3>
                <p className="text-sm text-muted-foreground">
                  Tirage uniforme via l'API cryptographique du navigateur, adapté aux décisions courantes.
                </p>
              </div>
              
              <div className="card-glass p-6">
                <div className="text-4xl mb-4">🆓</div>
                <h3 className="font-display font-semibold text-lg mb-2">Gratuité</h3>
                <p className="text-sm text-muted-foreground">
                  100% gratuit, sans inscription. Le site affiche des publicités discrètes pour financer son hébergement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default APropos;
