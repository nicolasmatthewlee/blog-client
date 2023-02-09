import { SideBar } from "./components/sidebar";
import { Header } from "./components/header";

export const App: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar></SideBar>
      <Header></Header>
    </div>
  );
};
