import { useEffect, useState } from "react";
import { UserInterface } from "../models/user";
import { ArticleBrief } from "./articlebrief";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props extends UserInterface {
  type: undefined | "saved";
  onUpdate: Function;
  server: String;
}

interface Article {
  _id: string;
  title: string;
  textBrief: string;
  author: string;
  authorId?: string;
  created: Date;
  image: string;
  imageAlt: string;
}

export const Content: Function = ({ server, type, user, onUpdate }: Props) => {
  const [errors, setErrors] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [allArticlesShown, setAllArticlesShown] = useState<Boolean>(false);

  // 1. first retrieve list of articleIds to fetch details for
  const getArticlesToShow = async (before?: string) => {
    setIsLoading(true);
    try {
      const response = before
        ? await fetch(
            `${server}/articles?` +
              new URLSearchParams({
                before: before,
              })
          )
        : await fetch(`${server}/articles`);

      const json = await response.json();
      if (json.errors) setErrors(json.errors);
      if (json.length === 0) setAllArticlesShown(true);
      else setArticlesToShow(json);
    } catch (err) {
      setErrors([{ message: "An unknown error occurred" }]);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (type !== "saved") getArticlesToShow();
    else setArticlesToShow(user ? user.saved : []);
  }, []);

  // 2. fetch details for each article in articleIds
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const retrieveArticles = async () => {
      setIsLoading(true);
      const allArticleResponses = articlesToShow.map((id) =>
        fetch(`${server}/articles/${id}`, {
          method: "get",
          signal,
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            if (json.errors) throw Error();
            setArticles((articles) => articles.concat(json));
            return true;
          })
          .catch(() => {
            return "An unknown error occured";
          })
      );

      await Promise.allSettled(allArticleResponses).then(() => {
        if (!signal.aborted) setIsLoading(false);
      });
    };
    retrieveArticles();

    // cleanup
    return () => controller.abort();
  }, [articlesToShow]);

  return (
    <div className="w-full">
      {articles.length > 0 ? (
        <div className="xl:columns-2 space-y-4 flex flex-col items-center sm:inline-block">
          {articles.map((a) => (
            <ArticleBrief
              key={a._id}
              id={a._id}
              image={a.image}
              imageAlt={a.imageAlt}
              title={a.title}
              textBrief={a.textBrief}
              author={a.author}
              authorId={a.authorId}
              created={a.created}
              userId={user?._id}
              saved={user?.saved.includes(a._id)}
              liked={user?.liked.includes(a._id)}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      ) : null}
      {isLoading ? (
        <div className="pt-4">
          <Spinner />
        </div>
      ) : errors ? (
        errors.map((e: { message: string }) => (
          <h2 key={uniqid()} className="font-bold text-lg text-gray-400">
            {e.message}
          </h2>
        ))
      ) : articles.length === 0 ? (
        <h2 className="font-bold text-lg text-gray-400 w-full text-center">
          Nothing to show
        </h2>
      ) : !allArticlesShown && type !== "saved" ? (
        <div className="w-full py-8 flex items-center justify-center">
          <button
            className="bg-white font-medium py-1 px-6 text-gray-600 text-lg shadow text-center rounded-full
          hover:bg-gray-50"
            onClick={() => {
              const oldestShown: string = articlesToShow.sort().slice(0, 1)[0];
              getArticlesToShow(oldestShown);
            }}
          >
            more
          </button>
        </div>
      ) : (
        <h2 className="font-bold text-lg text-gray-400 w-full text-center py-4">
          No more to show
        </h2>
      )}
    </div>
  );
};
