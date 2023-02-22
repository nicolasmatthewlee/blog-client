import { useEffect, useState } from "react";
import { UserInterface } from "../models/user";
import { ArticleBrief } from "./articlebrief";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props extends UserInterface {
  type: string;
}

interface Article {
  _id: string;
  title: string;
  textBrief: string;
  author: string;
  created: Date;
  image: string;
  imageAlt: string;
}

export const Content: Function = ({ type, user }: Props) => {
  const [errors, setErrors] = useState<any>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    if (type === "saved") {
      // todo: get saved articles
      setIsLoading(false);
    } else {
      const getAllArticles = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/articles");
          const json = await response.json();
          if (json.errors) setErrors(json.errors);
          else setArticles(json);
        } catch (err) {
          setErrors([{ message: "An unknown error occurred" }]);
        }
        setIsLoading(false);
      };
      getAllArticles();
    }
  }, [type]);

  const [loading, setIsLoading] = useState<Boolean>(true);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : errors ? (
        errors.map((e: { message: string }) => (
          <h2 key={uniqid()} className="font-bold text-lg text-gray-400">
            {e.message}
          </h2>
        ))
      ) : articles.length === 0 ? (
        <h2 className="font-bold text-lg text-gray-400">Nothing to show</h2>
      ) : (
        <div className="xl:columns-2 space-y-4">
          {articles.map((a) => (
            <ArticleBrief
              key={a._id}
              id={a._id}
              image={a.image}
              imageAlt={a.imageAlt}
              title={a.title}
              textBrief={a.textBrief}
              author={a.author}
              created={a.created}
            />
          ))}
        </div>
      )}
    </div>
  );
};
