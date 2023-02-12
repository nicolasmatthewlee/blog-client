import { SideBar } from "./sidebar";
import { Header } from "./header";
import { ArticleForm } from "./articleform";

export const Write: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header text="Write" />
        <div className="flex-1 flex overflow-hidden bg-gray-100 justify-center">
          <ArticleForm />
        </div>
      </div>
    </div>
  );
};
