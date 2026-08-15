import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CommentLancer from "./pages/CommentLancer";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";
import MultiFlip from "./pages/MultiFlip";
import RandomPicker from "./pages/RandomPicker";
import DiceRoller from "./pages/DiceRoller";
import NombreAleatoire from "./pages/NombreAleatoire";
import ProbabiliteHub from "./pages/ProbabiliteHub";
import ProbabiliteMatrix from "./pages/ProbabiliteMatrix";
import DePage from "./pages/DePage";
import BlogIndex from "./pages/BlogIndex";
import BlogHistoire from "./pages/blog/BlogHistoire";
import BlogProbabilite from "./pages/blog/BlogProbabilite";
import Blog5050 from "./pages/blog/Blog5050";
import BlogSport from "./pages/blog/BlogSport";
import BlogGoogle from "./pages/blog/BlogGoogle";
import BlogDecider from "./pages/blog/BlogDecider";
import BlogSophisme from "./pages/blog/BlogSophisme";

export const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/comment-lancer-piece-en-ligne" element={<CommentLancer />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/pile-ou-face-plusieurs-lancers" element={<MultiFlip />} />
      <Route path="/tirage-au-sort" element={<RandomPicker />} />
      <Route path="/de-en-ligne" element={<DiceRoller />} />
      <Route path="/de-en-ligne/:config" element={<DePage />} />
      <Route path="/nombre-aleatoire" element={<NombreAleatoire />} />
      <Route path="/nombre-aleatoire/:tirage/:minimum/:maximum" element={<NombreAleatoire />} />
      <Route path="/probabilite-pile-ou-face" element={<ProbabiliteHub />} />
      <Route path="/probabilite-pile-ou-face/:flips/:heads" element={<ProbabiliteMatrix />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/histoire-pile-ou-face" element={<BlogHistoire />} />
      <Route path="/blog/probabilite-pile-ou-face" element={<BlogProbabilite />} />
      <Route path="/blog/pile-ou-face-50-50" element={<Blog5050 />} />
      <Route path="/blog/pile-ou-face-football-rugby" element={<BlogSport />} />
      <Route path="/blog/pile-ou-face-google" element={<BlogGoogle />} />
      <Route path="/blog/comment-decider-quand-on-hesite" element={<BlogDecider />} />
      <Route path="/blog/sophisme-du-joueur" element={<BlogSophisme />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
