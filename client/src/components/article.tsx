import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Spinner } from "./spinner";
import { LikeButton } from "./likebutton";
import { SaveButton } from "./savebutton";
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
  authorId?: string;
  created: string;
  image: string;
  content: { type: string; text: string }[];
  imageAlt: string;
}

interface Props {
  savedList: string[];
  likedList: string[];
  userId: string;
  onUpdate: Function;
  server: string;
}

export const Article = (props: Props) => {
  let { articleId } = useParams();

  const [article, setArticle] = useState<ArticleInterface>();
  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await fetch(`${props.server}/articles/${articleId}`);
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
    <div className="w-full">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center">
          <div
            className="bg-white p-6 rounded-lg space-y-2 shadow max-w-2xl w-full
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
                    <div className="flex space-x-2">
                      <LikeButton
                        server={props.server}
                        articleId={articleId}
                        authorId={article?.authorId}
                        userId={props.userId}
                        onUpdate={props.onUpdate}
                        isLiked={
                          articleId
                            ? props.likedList.includes(articleId)
                            : false
                        }
                      />
                      <SaveButton
                        server={props.server}
                        articleId={articleId}
                        userId={props.userId}
                        onUpdate={props.onUpdate}
                        isSaved={
                          articleId
                            ? props.savedList.includes(articleId)
                            : false
                        }
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <img
              className="h-72 w-full object-cover rounded-sm"
              src={img}
              alt={article?.imageAlt}
            />
            <div className="pb-2"></div>

            {article?.content.map((e, i) => displayContent(e, i))}
          </div>
        </div>
      )}
    </div>
  );
};
