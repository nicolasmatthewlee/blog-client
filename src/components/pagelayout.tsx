import { SideBar } from "./sidebar";
import { Header } from "./header";
import { ArticleForm } from "./articleform";
import { Settings } from "./settings";
import { Content } from "./content";
import { Notifications } from "./notifications";
import { Article } from "./article";

import { useState } from "react";

interface Props {
  type: "write" | "settings" | "saved" | "notifications" | "home" | "article";
}

export const PageLayout = (props: Props) => {
  const [user, setUser] = useState<null>(null);

  return (
    <div className="absolute h-full w-full flex">
      {user ? <SideBar /> : null}
      <div className="flex-1 flex flex-col">
        <Header text={props.type} />
        <div className="flex-1 flex overflow-scroll bg-gray-100 justify-center items-start p-4">
          {props.type === "write" ? (
            <ArticleForm />
          ) : props.type === "settings" ? (
            <Settings />
          ) : props.type === "saved" ? (
            <Content type="saved" />
          ) : props.type === "notifications" ? (
            <Notifications />
          ) : props.type === "home" ? (
            <Content />
          ) : props.type === "article" ? (
            <Article />
          ) : null}
        </div>
      </div>
    </div>
  );
};
