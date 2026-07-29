import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CommentLancer from "./pages/CommentLancer";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MultiFlip from "./pages/MultiFlip";
import RandomPicker from "./pages/RandomPicker";
import DiceRoller from "./pages/DiceRoller";
import BlogHistoire from "./pages/blog/BlogHistoire";
import BlogProbabilite from "./pages/blog/BlogProbabilite";
import Blog5050 from "./pages/blog/Blog5050";
import BlogSport from "./pages/blog/BlogSport";
import BlogGoogle from "./pages/blog/BlogGoogle";
import BlogDecider from "./pages/blog/BlogDecider";
import BlogSophisme from "./pages/blog/BlogSophisme";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/comment-lancer-piece-en-ligne" element={<CommentLancer />} />
    <Route path="/a-propos" element={<APropos />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/pile-ou-face-plusieurs-lancers" element={<MultiFlip />} />
    <Route path="/tirage-au-sort" element={<RandomPicker />} />
    <Route path="/de-en-ligne" element={<DiceRoller />} />
    <Route path="/blog/histoire-pile-ou-face" element={<BlogHistoire />} />
    <Route path="/blog/probabilite-pile-ou-face" element={<BlogProbabilite />} />
    <Route path="/blog/pile-ou-face-50-50" element={<Blog5050 />} />
    <Route path="/blog/pile-ou-face-football-rugby" element={<BlogSport />} />
    <Route path="/blog/pile-ou-face-google" element={<BlogGoogle />} />
    <Route path="/blog/comment-decider-quand-on-hesite" element={<BlogDecider />} />
    <Route path="/blog/sophisme-du-joueur" element={<BlogSophisme />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
