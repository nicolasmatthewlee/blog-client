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

export const Content: Function = () => {
  return (
    <div
      className="flex-1 p-4  bg-gray-100 overflow-scroll 
    flex flex-col items-center"
    >
      <div className="xl:columns-2 space-y-4">
        <ArticleBrief img={IMG_1} />
        <ArticleBrief img={IMG_2} />
        <ArticleBrief img={IMG_3} />
        <ArticleBrief img={IMG_4} />
        <ArticleBrief img={IMG_5} />
        <ArticleBrief img={IMG_6} />
        <ArticleBrief img={IMG_7} />
        <ArticleBrief img={IMG_8} />
        <ArticleBrief img={IMG_9} />
        <ArticleBrief img={IMG_10} />
        <ArticleBrief img={IMG_11} />
      </div>
    </div>
  );
};
