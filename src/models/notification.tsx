export interface NotificationInterface {
  user: { _id: string; username: string };
  event: string;
  time: Date;
  resource?: { _id: string; title: string };
}
