import { Routes, Route } from "react-router-dom";
import { Signin } from "./components/signin";
import { Signup } from "./components/signup";
import { NotFound } from "./components/notfound";
import { PageLayout } from "./components/pagelayout";

export const App: Function = () => {
  const server: string = "http://24.199.116.13:5000";
  return (
    <Routes>
      <Route
        path="/articles/:articleId"
        element={<PageLayout server={server} type="article" />}
      />
      <Route path="/" element={<PageLayout server={server} type="home" />} />
      <Route
        path="/notifications"
        element={<PageLayout server={server} type="notifications" />}
      />
      <Route
        path="/saved"
        element={<PageLayout server={server} type="saved" />}
      />
      <Route
        path="/write"
        element={<PageLayout server={server} type="write" />}
      />
      <Route
        path="/settings"
        element={<PageLayout server={server} type="settings" />}
      />
      <Route path="/signin" element={<Signin server={server} />} />
      <Route path="signup" element={<Signup server={server} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
