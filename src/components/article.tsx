import IMG_8 from "../assets/8.jpg";
import articleData from "../assets/article.json";
import { FollowButton } from "./followbutton";

const uniqid = require("uniqid");

interface Content {
  type: "paragraph" | "header";
  content: string;
}

export const Article: Function = () => {
  const displayContent: Function = (e: Content, i: number) => {
    if (e.type === "header") {
      if (i === 0) {
        return (
          <div
            className="font-bold text-xl leading-6 text-gray-800"
            key={uniqid()}
          >
            {e.content}
          </div>
        );
      } else {
        return (
          <div
            className="font-bold text-xl leading-6 text-gray-800 pt-6"
            key={uniqid()}
          >
            {e.content}
          </div>
        );
      }
    } else if (e.type === "paragraph") {
      return (
        <div className="text-md text-gray-800" key={uniqid()}>
          {e.content}
        </div>
      );
    } else {
      return (
        <div
          className="font-bold text-lg text-gray-800 bg-red-500"
          key={uniqid()}
        >
          {e.content}
        </div>
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="bg-white p-6 rounded-lg space-y-2 shadow max-w-2xl
          sm:p-12
          lg:px-16"
      >
        <div className="flex">
          <h1 className="text-2xl text-gray-800 font-bold">
            Unlocking the Secrets of Cows: A Fascinating Look into Bovine
            Behavior and Biology
          </h1>
        </div>

        <div className="flex space-x-2 items-center pb-2">
          <div>
            <h2 className="text-md font-medium text-gray-500">
              <span className="font-normal">by </span>John Doe
            </h2>
            <p className="text-gray-400">February 9, 2022</p>
          </div>
          <FollowButton />
        </div>

        <img
          className="h-72 w-full object-cover rounded-sm"
          src={IMG_8}
          alt=""
        />
        <p className="pb-2 text-sm text-gray-500">
          Photo by{" "}
          <a
            className="underline"
            href="https://unsplash.com/@gabrielizalo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Gabriel Porras
          </a>{" "}
          on{" "}
          <a
            className="underline"
            href="https://unsplash.com/images/animals/cow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </p>

        {articleData.map((e, i) => displayContent(e, i))}
      </div>
    </div>
  );
};
