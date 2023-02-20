import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleBrief } from "./articlebrief";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props {
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

export const Content: Function = (props: Props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<null>(null);
  useEffect(() => {
    if (props.type === "saved") {
      if (user === null) navigate("/signin");
    }
  }, []);

  const [errors, setErrors] = useState<any>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const getArticles = async () => {
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
    getArticles();
  }, []);

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
