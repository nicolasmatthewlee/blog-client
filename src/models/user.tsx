export interface UserInterface {
  user: {
    _id: string;
    username: string;
    saved: string[];
    liked: string[];
    notifications: [
      {
        user: string;
        event: string;
        time: Date;
        resource?: string;
      }
    ];
  } | null;
}
