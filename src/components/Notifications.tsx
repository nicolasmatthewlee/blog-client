import { UserInterface } from "../models/user";
import { Notification } from "./notification";
const uniqid = require("uniqid");

export const Notifications: Function = ({ user }: UserInterface) => {
  return (
    <div className="flex flex-col space-y-4">
      {user && user.notifications.length > 0 ? (
        user?.notifications.map((n) => (
          <Notification
            user={n.user}
            event={n.event}
            time={n.time}
            resource={n.resource}
            key={uniqid()}
          />
        ))
      ) : (
        <h2 className="font-bold text-lg text-gray-400">Nothing to show</h2>
      )}
    </div>
  );
};
