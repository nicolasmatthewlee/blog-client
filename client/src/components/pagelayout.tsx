import { SideBar } from "./sidebar";
import { Header } from "./header";
import { ArticleForm } from "./articleform";
import { Settings } from "./settings";
import { Content } from "./content";
import { Notifications } from "./notifications";
import { Article } from "./article";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "./spinner";

interface Props {
  type: "write" | "settings" | "saved" | "notifications" | "home" | "article";
  server: string;
}

interface User {
  username: string;
  _id: string;
  saved: string[];
  liked: string[];
}

export const PageLayout = ({ server, type }: Props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState<Boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${server}/users/current`, {
        credentials: "include",
      });
      const json = await response.json();
      if (!json.errors) setUser(json);
    } catch (err) {}
    setIsFetching(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isFetching === false) {
      if (
        ["write", "settings", "saved", "notifications"].includes(type) &&
        user === null
      )
        navigate("/signin");
    }
  }, [isFetching, type, user]);

  return (
    <div className="absolute h-full w-full flex overflow-x-hidden min-h-[500px]">
      {user ? <SideBar /> : null}
      <div className="flex-1 flex flex-col">
        <Header server={server} text={type} user={user} />
        <div className="flex-1 flex overflow-scroll bg-gray-100 justify-center items-start p-4">
          {type === "home" ? (
            <Content
              server={server}
              key="home"
              user={user}
              onUpdate={fetchUser}
            />
          ) : isFetching ? (
            <Spinner />
          ) : type === "write" ? (
            <ArticleForm server={server} user={user} />
          ) : type === "settings" ? (
            <Settings server={server} user={user} />
          ) : type === "saved" ? (
            <Content
              server={server}
              type="saved"
              user={user}
              key="saved"
              onUpdate={fetchUser}
            />
          ) : type === "notifications" ? (
            <Notifications server={server} user={user} />
          ) : type === "article" ? (
            <Article
              server={server}
              likedList={user ? user?.liked : []}
              savedList={user ? user?.saved : []}
              userId={user ? user._id : ""}
              onUpdate={fetchUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
