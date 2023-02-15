import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Notification } from "./notification";

export const Notifications: Function = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<null>(null);
  useEffect(() => {
    if (user === null) navigate("/signin");
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
};
