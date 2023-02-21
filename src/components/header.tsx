import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  text: null | string;
  user: null | { username: string };
}

export const Header: Function = (props: Props) => {
  const navigate = useNavigate();

  const [signoutIsLoading, setSignoutIsLoading] = useState<Boolean>(false);

  const handleSignOut = async () => {
    setSignoutIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/signout", {
        method: "post",
        credentials: "include",
      });
      const json = await response.json();
      if (!json.errors) navigate("/signin");
    } catch (err) {}
    setSignoutIsLoading(false);
  };

  return (
    <div
      className="h-16 flex border-b-2 border-gray-200 min-w-0
    sm:h-20"
    >
      {props.text !== undefined ? (
        <div className="items-center flex-1 pl-6 pr-4 flex">
          <h1 className="text-4xl font-medium text-gray-400 capitalize">
            {props.text}
          </h1>
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
      {props.user ? (
        <div className="flex-1 flex pr-4 space-x-2 items-center justify-end min-w-0">
          {signoutIsLoading ? (
            <button
              disabled
              className="px-4 py-1 rounded-lg font-medium text-gray-400 flex items-center"
            >
              <div className="animate-spin w-3 h-3 bg-gray-400 rounded-full mr-2 relative flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full absolute bg-white`}></div>
                <div
                  className={`w-1.5 h-1.5 absolute top-0 left-0 bg-white`}
                ></div>
              </div>
              Signing out...
            </button>
          ) : (
            <button
              className="px-4 py-1 rounded-lg font-medium text-gray-500
            hover:underline
            active:text-gray-800"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          )}
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
