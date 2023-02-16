import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArticleBrief } from "./articlebrief";
import IMG_1 from "../assets/1.jpg";
import IMG_2 from "../assets/2.jpg";
import IMG_3 from "../assets/3.jpg";
import IMG_4 from "../assets/4.jpg";
import IMG_5 from "../assets/5.jpg";
import IMG_6 from "../assets/6.jpg";
import IMG_7 from "../assets/7.jpg";
import IMG_8 from "../assets/8.jpg";
import IMG_9 from "../assets/9.jpg";
import IMG_10 from "../assets/10.jpg";
import IMG_11 from "../assets/11.jpg";

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
          image={a.image}
          imageAlt={a.imageAlt}
          title={a.title}
          textBrief={a.textBrief}
          author={a.author}
          created={a.created}
        />
      ))}
      {/* <ArticleBrief image={IMG_1} />
      <ArticleBrief image={IMG_2} />
      <ArticleBrief image={IMG_3} />
      <ArticleBrief image={IMG_4} />
      <ArticleBrief image={IMG_5} />
      <ArticleBrief image={IMG_6} />
      <ArticleBrief image={IMG_7} />
      <ArticleBrief image={IMG_8} />
      <ArticleBrief image={IMG_9} />
      <ArticleBrief image={IMG_10} />
      <ArticleBrief image={IMG_11} /> */}
    </div>
  );
};
