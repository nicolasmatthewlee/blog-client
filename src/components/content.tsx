import { ArticleBrief } from "./articlebrief";

import IMG_1 from "../assets/1.jpg";
import IMG_2 from "../assets/2.jpg";
import IMG_3 from "../assets/3.jpg";
import IMG_4 from "../assets/4.jpg";
import IMG_5 from "../assets/5.jpg";
import IMG_6 from "../assets/6.jpg";

export const Content: Function = () => {
  return (
    <div
      className="flex-1 p-4 space-y-4 bg-gray-100 overflow-scroll 
    xl:columns-2"
    >
      <ArticleBrief img={IMG_1} />
      <ArticleBrief img={IMG_2} />
      <ArticleBrief img={IMG_3} />
      <ArticleBrief img={IMG_4} />
      <ArticleBrief img={IMG_5} />
      <ArticleBrief img={IMG_6} />
    </div>
  );
};
