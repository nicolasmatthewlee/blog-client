import { Routes, Route } from "react-router-dom";
import { ArticlePage } from "./components/articlepage";
import { Home } from "./components/home";
import { Saved } from "./components/saved";
import { Settings } from "./components/settings";
import { Write } from "./components/write";
import { Notifications } from "./components/notifications";

export const App: Function = () => {
  return (
    <Routes>
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/" element={<Home />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/write" element={<Write />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};
