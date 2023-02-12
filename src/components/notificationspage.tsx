import { SideBar } from "./sidebar";
import { Header } from "./header";

export const NotificationsPage: Function = () => {
  return (
    <div className="absolute h-full w-full flex min-w-0">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header text="Notifications" />
        <div className="flex-1 flex overflow-hidden bg-gray-100 p-4 justify-center items-start">
          <div
            className="bg-white p-6 rounded-lg space-y-2 shadow max-w-2xl w-full
          sm:p-12
          lg:px-16"
          ></div>
        </div>
      </div>
    </div>
  );
};
