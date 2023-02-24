import { NotificationInterface } from "./notification";

export interface UserInterface {
  user: {
    _id: string;
    username: string;
    saved: string[];
    liked: string[];
    notifications: [NotificationInterface];
  } | null;
}
