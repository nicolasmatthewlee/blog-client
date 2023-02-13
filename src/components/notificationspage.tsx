import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Notification } from "./notification";

export const NotificationsPage: Function = () => {
  return (
    <div className="absolute h-full w-full flex min-w-0">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header text="Notifications" />
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-4 justify-start items-center space-y-4">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </div>
      </div>
    </div>
  );
};
