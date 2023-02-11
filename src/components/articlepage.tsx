import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Article } from "./article";
import { Recommended } from "./recommended";

export const ArticlePage: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Article />
        </div>
      </div>
    </div>
  );
};
