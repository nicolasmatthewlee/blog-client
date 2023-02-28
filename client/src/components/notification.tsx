import { timeSince } from "./timesince";
import { Link } from "react-router-dom";

interface Props {
  user: string;
  event: string;
  time: string;
  resource?: string;
  resourceId?: string;
}

export const Notification: Function = ({
  user,
  event,
  time,
  resource,
  resourceId,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-2xl items-center">
      <div className="flex space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 flex-shrink-0 stroke-rose-500 fill-rose-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>

        <div className="flex flex-col space-y-1">
          <h2
            className="text font-medium w-full text-gray-800 text-align-middle
        "
          >
            <span>{user}</span>

            <span className="font-normal text-gray-500">
              {event === "like" ? " liked your post " : " ? "}
            </span>
            <Link to={`/articles/${resourceId}`}>
              <span
                className="font-semibold text-gray-800
          hover:underline hover:cursor-pointer"
              >
                {resource}
              </span>
            </Link>
          </h2>
          <p className="text-gray-400 text-sm">{timeSince(time)} ago</p>
        </div>
      </div>
    </div>
  );
};
