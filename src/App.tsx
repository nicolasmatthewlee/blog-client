import { SideBar } from "./components/sidebar";
import { Header } from "./components/header";
import { Content } from "./components/content";
import { Recommended } from "./components/recommended";

export const App: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Content />
          <Recommended />
        </div>
      </div>
    </div>
  );
};
