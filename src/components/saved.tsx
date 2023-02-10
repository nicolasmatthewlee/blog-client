import { SideBar } from "./sidebar";
import { Header } from "./header";

export const Saved: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">Saved</div>
      </div>
    </div>
  );
};
