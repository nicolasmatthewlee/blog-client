import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Link } from "react-router-dom";
import { Article } from "./article";

export const Write: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header type="write" />
        <div className="flex-1 flex overflow-hidden bg-gray-100 p-4 justify-center">
          <Article />
          {/* <div className="bg-white rounded-lg p-8 flex-1 shadow max-w-xl"></div> */}
        </div>
      </div>
    </div>
  );
};
