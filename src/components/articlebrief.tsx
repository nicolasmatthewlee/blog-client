import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import { LikeButton } from "./likebutton";
import { SaveButton } from "./savebutton";
import { timeSince } from "../timesince";

interface Props {
  id: string;
  title: string;
  textBrief: string;
  author: string;
  authorId?: string;
  created: string;
  image: Buffer;
  imageAlt: string;
  saved: Boolean;
  liked: Boolean;
  userId: string;
  onUpdate: Function;
}

export const ArticleBrief: Function = (props: Props) => {
  const [img, setImg] = useState<string | undefined>(undefined);

  const convertBufferToImage = () => {
    setImg(
      "data:image/png;base64," + Buffer.from(props.image).toString("base64")
    );
  };
  useEffect(convertBufferToImage, []);

  return (
    <div
      className="max-w-sm bg-white shadow rounded
                  sm:max-w-none sm:flex sm:space-x-4 sm:h-48"
    >
      {/* article image */}
      <img
        className="rounded-t h-48 w-full object-cover
          sm:flex-1 sm:rounded-none sm:rounded-l sm:max-w-xs"
        src={img}
        alt={props.imageAlt}
      />

      <div
        className="flex-1 space-y-4 p-6 
      sm:flex sm:flex-col sm:p-4 sm:space-y-0"
      >
        {/* title and description */}
        <div className="space-y-1 flex-1 pr-4">
          <Link to={`/articles/${props.id}`}>
            <h1
              className="capitalize text-lg font-bold leading-6 line-clamp-2 text-gray-800
            hover:underline"
            >
              {props.title}
            </h1>
          </Link>

          <p className="line-clamp-2 leading-5 text-gray-500 text">
            {props.textBrief}
          </p>
          {/* author */}
          <div className="flex items-center space-x-2 ">
            <h3 className="font-medium text-gray-800">
              <span className="text-gray-500 font-normal">by</span>{" "}
              {props.author}
            </h3>
          </div>
        </div>

        {/* time posted, save */}
        <div className="flex">
          <p className="flex-1 text-gray-400">{timeSince(props.created)} ago</p>
          {props.userId ? (
            <div className="flex space-x-2">
              <LikeButton
                articleId={props.id}
                authorId={props.authorId}
                userId={props.userId}
                onUpdate={props.onUpdate}
                isLiked={props.liked}
              />

              <SaveButton
                articleId={props.id}
                userId={props.userId}
                onUpdate={props.onUpdate}
                isSaved={props.saved}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
