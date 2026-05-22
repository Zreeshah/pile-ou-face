import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CommentLancer from "./pages/CommentLancer";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/comment-lancer-piece-en-ligne" element={<CommentLancer />} />
    <Route path="/a-propos" element={<APropos />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
