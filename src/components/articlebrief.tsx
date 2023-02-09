interface ArticleProps {
  img: string;
  authorImg: string;
}

export const ArticleBrief: Function = (props: ArticleProps) => {
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
          src={props.img}
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
