import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleBrief } from "./articlebrief";

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

  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/articles");
        const json = await response.json();
        setArticles(json);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
  }, []);

  return (
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
  );
};
