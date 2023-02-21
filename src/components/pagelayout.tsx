import { SideBar } from "./sidebar";
import { Header } from "./header";
import { ArticleForm } from "./articleform";
import { Settings } from "./settings";
import { Content } from "./content";
import { Notifications } from "./notifications";
import { Article } from "./article";

import { useEffect, useState } from "react";

interface Props {
  type: "write" | "settings" | "saved" | "notifications" | "home" | "article";
}

interface User {
  username: string;
  _id: string;
}

export const PageLayout = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user", {
          credentials: "include",
        });
        const json = await response.json();
        if (!json.errors) setUser(json);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  return (
    <div className="absolute h-full w-full flex">
      {user ? <SideBar /> : null}
      <div className="flex-1 flex flex-col">
        <Header text={props.type} user={user} />
        <div className="flex-1 flex overflow-scroll bg-gray-100 justify-center items-start p-4">
          {props.type === "write" ? (
            <ArticleForm user={user} />
          ) : props.type === "settings" ? (
            <Settings user={user} />
          ) : props.type === "saved" ? (
            <Content type="saved" user={user} key="saved" />
          ) : props.type === "notifications" ? (
            <Notifications user={user} />
          ) : props.type === "home" ? (
            <Content key="home" />
          ) : props.type === "article" ? (
            <Article />
          ) : null}
        </div>
      </div>
    </div>
  );
};
