import { Routes, Route } from "react-router-dom";
import { Signin } from "./components/signin";
import { Signup } from "./components/signup";
import { NotFound } from "./components/notfound";
import { PageLayout } from "./components/pagelayout";

export const App: Function = () => {
  return (
    <Routes>
      <Route path="/article" element={<PageLayout type="article" />} />
      <Route path="/" element={<PageLayout type="home" />} />
      <Route
        path="/notifications"
        element={<PageLayout type="notifications" />}
      />
      <Route path="/saved" element={<PageLayout type="saved" />} />
      <Route path="/write" element={<PageLayout type="write" />} />
      <Route path="/settings" element={<PageLayout type="settings" />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
