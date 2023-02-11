import { SideBar } from "./sidebar";
import { Header } from "./header";
import { Link } from "react-router-dom";

export const Settings: Function = () => {
  return (
    <div className="absolute h-full w-full flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden bg-gray-100 p-4 justify-center">
          <div className="bg-white rounded-lg p-8 flex-1 shadow max-w-xl">
            <h1 className="text-4xl font-bold text-gray-800">Settings</h1>
            <h2 className="text-3xl font-medium text-gray-400">
              (coming soon!)
            </h2>
            <Link to="/">
              <button
                className="font-medium mt-2 text-gray-800 flex space-x-1 py-1
               hover:text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <p>Back to home</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
