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
}

interface User {
  username: string;
  _id: string;
  saved: string[];
}

export const PageLayout = ({ type }: Props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState<Boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/user", {
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
  }, [isFetching, type]);

  return (
    <div className="absolute h-full w-full flex">
      {user ? <SideBar /> : null}
      <div className="flex-1 flex flex-col">
        <Header text={type} user={user} />
        <div className="flex-1 flex overflow-scroll bg-gray-100 justify-center items-start p-4">
          {type === "home" ? (
            <Content key="home" user={user} onToggleSaved={fetchUser} />
          ) : isFetching ? (
            <Spinner />
          ) : type === "write" ? (
            <ArticleForm user={user} />
          ) : type === "settings" ? (
            <Settings user={user} />
          ) : type === "saved" ? (
            <Content type="saved" user={user} key="saved" />
          ) : type === "notifications" ? (
            <Notifications user={user} />
          ) : type === "article" ? (
            <Article
              savedList={user ? user?.saved : []}
              userId={user ? user._id : ""}
              onToggleSaved={fetchUser}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
