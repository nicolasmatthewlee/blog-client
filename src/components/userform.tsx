import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
  header: string;
  subheader: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  buttonColor: string;
}

export const UserForm: Function = (props: Props) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const setUsername = (username: string) => {};

  const setPassword = (password: string) => {};

  return (
    <div className="bg-white max-w-sm shadow rounded-lg items-center p-16 flex flex-col space-y-4">
      <div>
        <h1 className="text-3xl font-medium font-gray-800 text-center">
          {props.header}
        </h1>
        <h2 className="text-gray-500 font-normal text-center">
          {props.subheader}
        </h2>
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-gray-800 font-medium" htmlFor="username">
          Username
        </label>
        <input
          className="border rounded-lg px-2 py-1"
          id="username"
          type="text"
          placeholder="username"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-gray-800 font-medium" htmlFor="password">
          Password
        </label>
        <input
          className="border rounded-lg px-2 py-1"
          id="password"
          type="text"
          placeholder="password"
        />
      </div>
      <button
        className={`${props.buttonColor} text-white px-2 py-1.5 rounded-lg w-full
        transition-colors`}
      >
        {props.buttonText}
      </button>
      <p>
        {props.footerText}
        <Link to={props.footerLinkTo}>
          <span
            className="underline text
            hover:text-blue-500"
          >
            {props.footerLinkText}
          </span>
        </Link>
      </p>
    </div>
  );
};
