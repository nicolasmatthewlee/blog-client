import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Content } from "./content";
import { Recommended } from "./recommended";

export const Home: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Content />
          <Recommended />
        </div>
      </div>
    </div>
  );
};
