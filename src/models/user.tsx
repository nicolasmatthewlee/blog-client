export interface UserInterface {
  user: {
    _id: string;
    username: string;
    saved: string[];
  } | null;
}
