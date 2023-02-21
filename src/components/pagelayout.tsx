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

export const PageLayout = (props: Props) => {
  const [user, setUser] = useState<null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/user", {
          credentials: "include",
        });
        const json = await response.json();
        if (json.errors) console.error("error"); //setErrors(json.errors);
        else {
          console.log(json);
          // setErrors([]);
        }
      } catch (err) {
        console.error("uh oh");
        // setErrors([{ msg: "An unknown error occurred" }]);
      }
    };
    fetchUser();
  }, []);

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
