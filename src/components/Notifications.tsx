import { Notification } from "./notification";

interface Props {
  user: {
    _id: string;
    username: string;
  };
}

export const Notifications: Function = ({ user }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <Notification />
      <Notification />
      <Notification />
      <Notification />
    </div>
  );
};
