import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

interface Props {
  id: string;
  title: string;
  textBrief: string;
  author: string;
  created: string;
  image: Buffer;
  imageAlt: string;
  saved: Boolean;
  userId: string;
}

export const ArticleBrief: Function = (props: Props) => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const [saved, setSaved] = useState<Boolean>(props.saved);

  const convertBufferToImage = () => {
    setImg(
      "data:image/png;base64," + Buffer.from(props.image).toString("base64")
    );
  };
  useEffect(convertBufferToImage, []);

  const formatTimeSince = (milliseconds: number) => {
    var remaining = milliseconds;

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    remaining %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    remaining %= 1000 * 60 * 60;

    const minutes = Math.floor(remaining / (1000 * 60));
    remaining %= 1000 * 60;

    const seconds = Math.floor(remaining / 1000);

    if (days) {
      if (days === 1) return "1 day";
      else return days + " days";
    } else if (hours) {
      if (hours === 1) return "1 hour";
      else return hours + " hours";
    } else if (minutes) {
      if (minutes === 1) return "1 minute";
      else return minutes + " minutes";
    } else {
      if (seconds === 0) return "now";
      if (seconds === 1) return "1 second";
      else return seconds + " seconds";
    }
  };

  const timeSince = (datetime: string) => {
    const now: Date = new Date();
    return formatTimeSince(now.getTime() - Date.parse(datetime));
  };

  const updateSaved = async (articleId: string, toStatus: Boolean) => {
    setSaved(toStatus);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/users/${props.userId}/saved`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ articleId, toStatus }),
        }
      );
      const json = await response.json();
      if (json.errors) setSaved(!toStatus); // revert status if not saved
      else setSaved(json.result);
    } catch {
      setSaved(!toStatus); // revert status if not saved
    }
  };

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={
                saved
                  ? "w-6 h-6 fill-emerald-500 stroke-emerald-500 hover:stroke-emerald-600 hover:fill-emerald-600"
                  : "w-6 h-6 stroke-gray-300 hover:fill-emerald-100 hover:stroke-emerald-500 active:fill-emerald-500 active:stroke-emerald-500"
              }
              onClick={() => {
                updateSaved(props.id, !saved);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          ) : null}
        </div>
      </div>
    </div>
  );
};
