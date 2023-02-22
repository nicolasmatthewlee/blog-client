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

interface Props {
  savedList: string[];
  userId: string;
  onToggleSaved: Function;
}

export const Article = (props: Props) => {
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

  const [saved, setSaved] = useState<Boolean>(
    articleId ? props.savedList.includes(articleId) : false
  );

  const updateSaved = async (articleId: string, toStatus: Boolean) => {
    setSaved(toStatus);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/users/${props.userId}/saved`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ articleId, toStatus }),
        }
      );
      const json = await response.json();
      if (json.errors) setSaved(!toStatus); // revert status if not saved
      else setSaved(json.result);
      props.onToggleSaved();
    } catch {
      setSaved(!toStatus); // revert status if not saved
    }
  };

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
              <div className="w-full">
                <h2 className="text-md font-medium text-gray-500">
                  <span className="font-normal">by </span>
                  {article?.author}
                </h2>
                <div className="flex space-x-2 w-full">
                  <p className="text-gray-400 flex-1">
                    {formatDate(article?.created)}
                  </p>
                  {props.userId ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className={
                        saved
                          ? "w-6 h-6 fill-emerald-500 stroke-emerald-500 hover:stroke-emerald-600 hover:fill-emerald-600"
                          : "w-6 h-6 stroke-gray-300 hover:fill-emerald-100 hover:stroke-emerald-500 active:fill-emerald-500 active:stroke-emerald-500"
                      }
                      onClick={() => {
                        if (article?._id) updateSaved(article?._id, !saved);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  ) : null}
                </div>
              </div>
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
            href="#"
          >
            Nicolas Matthew
          </a>{" "}
          on{" "}
          <a
            className="underline"
            href="#"
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
