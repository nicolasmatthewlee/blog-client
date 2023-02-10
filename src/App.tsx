import { Routes, Route } from "react-router-dom";
import { ArticlePage } from "./components/articlepage";
import { Home } from "./components/home";

export const App: Function = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<ArticlePage />} />
    </Routes>
  );
};
