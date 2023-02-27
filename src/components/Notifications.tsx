import { UserInterface } from "../models/user";
import { Notification } from "./notification";
import { NotificationInterface } from "../models/notification";
import { useState, useEffect } from "react";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props {
  user: UserInterface;
  server: string;
}

export const Notifications: Function = ({ user, server }: Props) => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  useEffect(() => {
    const getAllArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${server}/users/${user?._id}/notifications`,
          { credentials: "include" }
        );
        const json = await response.json();
        if (json.errors) setErrors(json.errors);
        else setNotifications(json);
      } catch (err) {
        setErrors([{ message: "An unknown error occurred" }]);
      }
      setIsLoading(false);
    };
    getAllArticles();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : errors.length > 0 ? (
        errors.map((e: { message: string }) => (
          <h2 key={uniqid()} className="font-bold text-lg text-gray-400">
            {e.message}
          </h2>
        ))
      ) : (
        <div className="flex flex-col space-y-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((n) => (
              <Notification
                user={n.user.username}
                userId={n.user._id}
                resource={n.resource?.title}
                resourceId={n.resource?._id}
                event={n.event}
                time={n.time}
                key={uniqid()}
              />
            ))
          ) : (
            <h2 className="font-bold text-lg text-gray-400">Nothing to show</h2>
          )}
        </div>
      )}
    </div>
  );
};
