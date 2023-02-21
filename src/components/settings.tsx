import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  user: {
    _id: string;
    username: string;
  };
}

export const Settings: Function = ({ user }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/signin");
  }, []);

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
          <h2 className="font-normal text-gray-400 flex-1">John Doe</h2>
        </div>

        <div className="flex space-x-2">
          <h2 className="flex-1">Password</h2>
          <h2 className="font-normal text-gray-400 flex-1">**********</h2>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* <button
                className="flex-1 border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2 px-4
              hover:bg-emerald-500 hover:border-emerald-500 hover:text-white w-100
              active:bg-emerald-600 active:border-emerald-600"
              >
                Save
              </button> */}
        <button
          className="flex-1 border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2 px-4
              hover:bg-red-500 hover:border-red-500 hover:text-white w-100
              active:bg-red-600 active:border-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
