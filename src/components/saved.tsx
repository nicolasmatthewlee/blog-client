import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Content } from "./content";

export const Saved: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header text="Saved" />
        <div className="flex-1 flex overflow-hidden ">
          <Content />
        </div>
      </div>
    </div>
  );
};
