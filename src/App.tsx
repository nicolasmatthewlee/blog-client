import { Routes, Route } from "react-router-dom";
import { Article } from "./components/article";
import { Home } from "./components/home";

export const App: Function = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<Article />} />
    </Routes>
  );
};
