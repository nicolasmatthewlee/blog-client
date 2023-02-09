interface ArticleProps {
  img: string;
}

export const ArticleBrief: Function = (props: ArticleProps) => {
  return (
    <div
      className="max-w-sm bg-white shadow rounded
                  sm:max-w-none sm:flex sm:space-x-4 sm:h-48"
    >
      {/* article image */}
      <img
        className="rounded-t h-48 w-full object-cover
          sm:flex-1 sm:rounded-none sm:rounded-l sm:max-w-xs"
        src={props.img}
        alt="researcher working at a lab bench"
      />
      {/* title and description */}
      <div
        className="flex-1 space-y-1 p-6
      sm:flex sm:flex-col sm:p-4 sm:flex-1"
      >
        <div className="space-y-1">
          <h1 className="capitalize text-lg font-bold leading-6 line-clamp-2 text-gray-800">
            Conducting Research: A Guide to Effective and Efficient Research
          </h1>
          <p className="line-clamp-2 leading-5 text-gray-500 text">
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
            <h3 className="font-medium text-gray-800">
              <span className="text-gray-500 font-normal">by</span> John Doe
            </h3>
          </div>
        </div>

        {/* time posted, save */}
        <div className="flex">
          <p className="flex-1 text-gray-400">32m ago</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 stroke-gray-800"
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
