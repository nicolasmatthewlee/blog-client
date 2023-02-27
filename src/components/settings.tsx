import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../models/user";
const uniqid = require("uniqid");

interface Props {
  user: UserInterface;
  server: string;
}

export const Settings: Function = ({ user, server }: Props) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${server}/users/${user?._id}`, {
        method: "delete",
        credentials: "include",
      });
      const json = await response.json();
      if (json.errors) setErrors(json.errors);
      else navigate("/signin");
    } catch {
      setErrors([{ message: "An unknown error occurred" }]);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="bg-white rounded-lg p-6 shadow max-w-2xl w-100 flex flex-1 flex-col
          sm:p-12
          lg:px-16"
    >
      <div className="font-medium text-gray-500 mb-2">
        <h2 className="text-2xl font-bold w-full mb-2">Profile</h2>
        <div className="flex space-x-2">
          <h2 className="flex-1">Username</h2>
          <h2 className="font-normal text-gray-400 flex-1">{user?.username}</h2>
        </div>

        {/* <div className="flex space-x-2">
          <h2 className="flex-1">Password</h2>
          <h2 className="font-normal text-gray-400 flex-1">**********</h2>
        </div> */}
      </div>
      {errors?.length > 0 ? (
        <div className="bg-rose-100 px-4 py-2 rounded-lg font-medium text-rose-600 w-full">
          {errors?.map((e: { message: string }) => (
            <li className="ml-2" key={uniqid()}>
              {e.message}
            </li>
          ))}
        </div>
      ) : null}
      <div className="flex space-x-4">
        {/* <button
                className="flex-1 border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2 px-4
              hover:bg-emerald-500 hover:border-emerald-500 hover:text-white w-100
              active:bg-emerald-600 active:border-emerald-600"
              >
                Save
              </button> */}
        {isLoading ? (
          <button
            disabled
            className="flex-1 border-2 font-semibold text-sm py-1 rounded-lg mt-2 px-4
              bg-red-400 border-red-400 text-white w-100 flex justify-center items-center"
            onClick={handleDelete}
          >
            <div className="animate-spin w-3 h-3 bg-white rounded-full mr-2 relative flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full absolute bg-red-400`}></div>
              <div
                className={`w-1.5 h-1.5 absolute top-0 left-0 bg-red-400`}
              ></div>
            </div>
            Deleting...
          </button>
        ) : (
          <button
            className="flex-1 border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2 px-4
              hover:bg-red-500 hover:border-red-500 hover:text-white w-100
              active:bg-red-600 active:border-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
