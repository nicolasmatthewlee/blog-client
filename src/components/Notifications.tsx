import { Notification } from "./notification";

export const Notifications: Function = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
};
