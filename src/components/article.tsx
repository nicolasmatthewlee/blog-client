import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Content {
  type: "paragraph" | "header";
  text: string;
}

interface ArticleInterface {
  _id: string;
  title: string;
  textBrief: string;
  author: string;
  created: string;
  image: string;
  content: { type: string; text: string }[];
  imageAlt: string;
}

export const Article = () => {
  let { articleId } = useParams();

  const [article, setArticle] = useState<ArticleInterface>();
  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/articles/${articleId}`
        );
        const json = await response.json();
        setArticle(json);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getArticle();
  }, []);

  const [img, setImg] = useState<string | undefined>(undefined);

  const convertBufferToImage = () => {
    if (article)
      setImg(
        "data:image/png;base64," + Buffer.from(article.image).toString("base64")
      );
  };
  useEffect(convertBufferToImage, [article]);

  const displayContent: Function = (e: Content, i: number) => {
    if (e.type === "header") {
      if (i === 0) {
        return (
          <div
            className="font-bold text-xl leading-6 text-gray-800"
            key={uniqid()}
          >
            {e.text}
          </div>
        );
      } else {
        return (
          <div
            className="font-bold text-xl leading-6 text-gray-800 pt-4"
            key={uniqid()}
          >
            {e.text}
          </div>
        );
      }
    } else if (e.type === "paragraph") {
      return (
        <div className="text-md text-gray-800" key={uniqid()}>
          {e.text}
        </div>
      );
    } else {
      return (
        <div
          className="font-bold text-lg text-gray-800 bg-red-500"
          key={uniqid()}
        >
          {e.text}
        </div>
      );
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (dateString === undefined) return;
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  };

  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div
            className="bg-white p-6 rounded-lg space-y-2 shadow max-w-2xl
          sm:p-12
          lg:px-16"
          >
            <div className="flex">
              <h1 className="text-2xl text-gray-800 font-bold">
                {article?.title}
              </h1>
            </div>

            <div className="flex space-x-2 items-center pb-2">
              <div>
                <h2 className="text-md font-medium text-gray-500">
                  <span className="font-normal">by </span>
                  {article?.author}
                </h2>
                <p className="text-gray-400">{formatDate(article?.created)}</p>
              </div>
              {/* <FollowButton /> */}
            </div>

            <img
              className="h-72 w-full object-cover rounded-sm"
              src={img}
              alt={article?.imageAlt}
            />
            <p className="pb-2 text-sm text-gray-500">
              {/* Photo by{" "}
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
          </a> */}
            </p>

            {article?.content.map((e, i) => displayContent(e, i))}
          </div>
        </div>
      )}
    </div>
  );
};
