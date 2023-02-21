import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Notification } from "./notification";

interface Props {
  user: {
    _id: string;
    username: string;
  };
}

export const Notifications: Function = ({ user }: Props) => {
  const navigate = useNavigate();

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
