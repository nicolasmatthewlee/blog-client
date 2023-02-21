import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "./spinner";
const uniqid = require("uniqid");

interface Props {
  type: "signin" | "signup";
  header: string;
  subheader: string;
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  buttonColor: string;
}

export const UserForm: Function = (props: Props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const [errors, setErrors] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleSubmit = () => {
    if (props.type === "signin") {
      const submitSigninForm = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:5000/signin", {
            method: "post",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const json = await response.json();
          if (json.errors) setErrors(json.errors);
          else {
            setErrors([]);
            navigate("/");
          }
        } catch (err) {
          setErrors([{ msg: "An unknown error occurred" }]);
        }
        setIsLoading(false);
      };
      submitSigninForm();
    } else if (props.type === "signup") {
      const submitSignupForm = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:5000/signup", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          const json = await response.json();
          if (json.errors) setErrors(json.errors);
          else {
            setErrors([]);
            navigate("/signin");
          }
        } catch (err) {
          setErrors([{ msg: "An unknown error occurred" }]);
        }
        setIsLoading(false);
      };
      submitSignupForm();
    }
  };

  return (
    <div className="bg-white max-w-md shadow rounded-lg items-center p-16 flex flex-col space-y-4">
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label className="text-gray-800 font-medium" htmlFor="password">
          Password
        </label>
        <input
          className="border rounded-lg px-2 py-1"
          id="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors?.length > 0 ? (
        <div className="bg-rose-100 px-4 py-2 rounded-lg font-medium text-rose-600 w-full">
          {errors?.map((e: { msg: string; message: string }) => (
            <li className="ml-2" key={uniqid()}>
              {e.msg ? e.msg : e.message}
            </li>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <button
          disabled
          className={`${props.buttonColor} text-white px-2 py-1.5 rounded-lg w-full
        transition-colors flex justify-center items-center`}
        >
          <div className="animate-spin w-4 h-4 bg-white rounded-full mr-2 relative flex items-center justify-center">
            <div
              className={`w-3 h-3 rounded-full absolute ${props.buttonColor}`}
            ></div>
            <div
              className={`w-2 h-2 absolute top-0 left-0 ${props.buttonColor}`}
            ></div>
          </div>
          Loading...
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className={`${props.buttonColor} text-white px-2 py-1.5 rounded-lg w-full
        transition-colors`}
        >
          {props.buttonText}
        </button>
      )}

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
