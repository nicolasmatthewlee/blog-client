import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderType {
  text: null | string;
}

export const Header: Function = (props: HeaderType) => {
  const [user, setUser] = useState<null>(null);

  return (
    <div
      className="h-16 flex border-b-2 border-gray-200 min-w-0
    sm:h-20"
    >
      {props.text !== undefined ? (
        <div className="items-center flex-1 pl-6 pr-4 flex">
          <h1 className="text-4xl font-medium text-gray-400">{props.text}</h1>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center p-6 relative">
          <label className="absolute left-9" htmlFor="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6  stroke-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </label>

          <input
            className="pl-10 w-full h-10 border-2 max-w-sm rounded-full"
            type="text"
            id="search"
            placeholder="Search..."
          />
        </div>
      )}
      {user ? (
        <div className="flex-1 flex pr-4 space-x-2 items-center justify-end min-w-0">
          <div className="flex items-center min-w-0">
            <h3 className="text-2xl text-center font-medium text-gray-600 truncate min-w-0">
              John Doe
            </h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 fill-slate-400
                      sm:h-14 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <div className="flex-1 flex pr-4 space-x-2 items-center justify-end min-w-0">
          <Link to="/signin">
            <button
              className="px-4 py-1 rounded-lg font-medium text-gray-500
            hover:underline
            active:text-gray-800"
            >
              Sign in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
