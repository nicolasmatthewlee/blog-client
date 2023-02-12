import { SideBar } from "./sidebar";
import { Header } from "./header";

export const Settings: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header text="Settings" />
        <div className="flex-1 flex overflow-hidden bg-gray-100 p-4 justify-center">
          <div className="bg-white rounded-lg p-8 flex-1 shadow max-w-xl"></div>
        </div>
      </div>
    </div>
  );
};
