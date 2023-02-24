import { useEffect, useState } from "react";
import { UserInterface } from "../models/user";
import { ArticleBrief } from "./articlebrief";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props extends UserInterface {
  type: string;
  onUpdate: Function;
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

export const Content: Function = ({ type, user, onUpdate }: Props) => {
  const [errors, setErrors] = useState<any>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setIsLoading] = useState<Boolean>(true);
  const [isRetrievingArticles, setIsRetrievingArticles] =
    useState<Boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (type === "saved") {
      const getSavedArticles = async () => {
        setIsLoading(true);
        try {
          const urls = user?.saved.map(
            (id) => "http://127.0.0.1:5000/articles/" + id
          );
          if (!urls) return;

          const requests = urls.map((url) => fetch(url));
          const responses = await Promise.all(requests);
          const jsons = await Promise.all(responses.map((res) => res.json()));

          setArticles(jsons.filter((json) => !json.errors));
        } catch (err) {
          setErrors([{ message: "An unknown error occurred" }]);
        }
        setIsLoading(false);
      };
      getSavedArticles();
    } else {
      const getAllArticles = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:5000/articles");
          const json = await response.json();
          if (json.errors) setErrors(json.errors);
          else {
            const articleIds: string[] = json;
            const retrieveArticles = async () => {
              setIsRetrievingArticles(true);
              const allArticleResponses = articleIds.map((id) =>
                fetch(`http://127.0.0.1:5000/articles/${id}`, {
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
                  .catch((err) => {
                    return "An unknown error occured";
                  })
              );

              await Promise.allSettled(allArticleResponses).then(() =>
                setIsRetrievingArticles(false)
              );
            };
            retrieveArticles();
          }
        } catch (err) {
          setErrors([{ message: "An unknown error occurred" }]);
        }
        setIsLoading(false);
      };
      getAllArticles();
    }

    return () => controller.abort();
  }, [type]);

  return (
    <div className="w-full">
      {loading ? (
        <Spinner />
      ) : errors ? (
        errors.map((e: { message: string }) => (
          <h2 key={uniqid()} className="font-bold text-lg text-gray-400">
            {e.message}
          </h2>
        ))
      ) : !isRetrievingArticles && articles.length === 0 ? (
        <h2 className="font-bold text-lg text-gray-400 w-full text-center">
          Nothing to show
        </h2>
      ) : (
        <div>
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
          {isRetrievingArticles ? (
            <div className="w-full flex justify-center pt-4">
              <Spinner />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
