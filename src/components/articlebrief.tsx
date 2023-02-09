import CELLS_IMG from "../assets/cells.jpg";

export const ArticleBrief: Function = () => {
  return (
    <div
      className="bg-white shadow-lg p-4 rounded
    sm:flex sm:space-x-4"
    >
      {/* article image */}
      <div
        className="flex-1
      sm:flex-none"
      >
        <img
          className="rounded h-48 w-full object-cover
          sm:w-48"
          src={CELLS_IMG}
          alt="researcher working at a lab bench"
        />
      </div>

      {/* title and description */}
      <div
        className="flex-1 space-y-1
      sm:flex flex-col"
      >
        <div className="sm:flex-1 space-y-1">
          <h1
            className="capitalize text-lg font-semibold mt-4 leading-6 line-clamp-2
            sm:mt-0"
          >
            Conducting Research: A Guide to Effective and Efficient Research
          </h1>
          <p className="line-clamp-3 leading-5 text-gray-500">
            Research is a critical component in many fields, providing a
            systematic and thorough method for exploring, discovering, and
            understanding new information. Whether it's for academic,
            scientific, or commercial purposes, conducting research is a crucial
            step in solving problems and making informed decisions.
          </p>
          {/* author */}
          <div
            className="flex items-center space-x-2 
          sm:pt-2"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 fill-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="font-medium text-gray-500">John Doe</h3>
          </div>
        </div>

        {/* time posted, save */}
        <div className="flex">
          <p className="flex-1 text-gray-500">32m ago</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 stroke-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
