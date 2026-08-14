import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const CommentLancer = lazy(() => import("./pages/CommentLancer"));
const APropos = lazy(() => import("./pages/APropos"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MultiFlip = lazy(() => import("./pages/MultiFlip"));
const RandomPicker = lazy(() => import("./pages/RandomPicker"));
const DiceRoller = lazy(() => import("./pages/DiceRoller"));
const NombreAleatoire = lazy(() => import("./pages/NombreAleatoire"));
const ProbabiliteHub = lazy(() => import("./pages/ProbabiliteHub"));
const ProbabiliteMatrix = lazy(() => import("./pages/ProbabiliteMatrix"));
const DePage = lazy(() => import("./pages/DePage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogHistoire = lazy(() => import("./pages/blog/BlogHistoire"));
const BlogProbabilite = lazy(() => import("./pages/blog/BlogProbabilite"));
const Blog5050 = lazy(() => import("./pages/blog/Blog5050"));
const BlogSport = lazy(() => import("./pages/blog/BlogSport"));
const BlogGoogle = lazy(() => import("./pages/blog/BlogGoogle"));
const BlogDecider = lazy(() => import("./pages/blog/BlogDecider"));
const BlogSophisme = lazy(() => import("./pages/blog/BlogSophisme"));

export const AppRoutesClient = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/comment-lancer-piece-en-ligne" element={<CommentLancer />} />
      <Route path="/a-propos" element={<APropos />} />
      <Route path="/contact" element={<Contact />} />
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
