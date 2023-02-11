import { useState } from "react";

const uniqid = require("uniqid");

interface ContentItem {
  type: "header" | "paragraph";
  content: string;
  id: string;
}

export const ArticleForm: Function = () => {
  const [content, setContent] = useState<ContentItem[]>([]);

  const deleteContent: Function = (id: string) => {
    setContent(content.filter((e) => e.id !== id));
  };

  const updateContent: Function = (id: string, value: string) => {
    setContent(
      content.map((e: ContentItem) => {
        if (e.id === id) return { type: e.type, content: value, id: e.id };
        else return e;
      })
    );
    console.log(content);
  };

  const displayContent: Function = (e: ContentItem) => {
    if (e.type === "header") {
      return (
        <div className="relative border-2 border-dashed" key={e.id}>
          <button onClick={() => deleteContent(e.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 absolute right-0 top-0 stroke-gray-300
            hover:stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <textarea
            className="font-bold text-xl leading-6 text-gray-800 w-full"
            placeholder="header"
            rows={2}
            onChange={(event) => updateContent(e.id, event.target.value)}
          />
        </div>
      );
    } else if (e.type === "paragraph") {
      return (
        <div className="relative border-2 border-dashed" key={e.id}>
          <button onClick={() => deleteContent(e.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 absolute right-0 top-0 stroke-gray-300
            hover:stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <textarea
            className="text-md text-gray-800 w-full"
            placeholder="paragraph text"
            onChange={(event) => updateContent(e.id, event.target.value)}
          />
        </div>
      );
    } else {
      return (
        <div
          className="font-bold text-lg text-gray-800 bg-red-500"
          key={uniqid()}
        >
          Unrecognized content type
        </div>
      );
    }
  };

  return (
    <div className="overflow-scroll p-4 flex-1 bg-gray-100">
      <div className="flex justify-center">
        <div
          className="bg-white p-6 rounded-lg space-y-2 shadow max-w-2xl w-full
          sm:p-12
          lg:px-16"
        >
          <div className="flex">
            <textarea
              className="text-2xl text-gray-800 font-bold w-full border-2 border-dashed"
              placeholder="Title"
              rows={1}
            />
          </div>

          <div className="flex space-x-2 items-center pb-2">
            <div>
              <h2 className="text-md font-medium text-gray-500">
                <span className="font-normal">by </span>John Doe
              </h2>
              <p className="text-gray-400">February 9, 2022</p>
            </div>
          </div>

          <div className="container h-72 w-full object-cover rounded-sm border-2 border-dashed relative">
            <div className="absolute w-full h-full top-0 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 stroke-gray-200 fill-gray-200"
              >
                <path
                  fillRule="evenodd"
                  d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-semibold text-lg text-gray-300 ">
                Browse file to upload
              </h3>
              <input
                className="opacity-0 absolute top-0 w-full h-full
                hover:cursor-pointer"
                type="file"
              />
            </div>
          </div>

          <input
            className="pb-2 text-sm text-gray-500 border-2 border-dashed flex w-full align-middle pt-2"
            type="text"
            placeholder="image attribution"
          />

          {content.map((e, i) => displayContent(e, i))}

          {/* add header, paragraph buttons */}
          <div className="flex flex-col">
            <button
              onClick={() =>
                setContent([
                  ...content,
                  { type: "header", content: "", id: uniqid() },
                ])
              }
              className="rounded-lg px-2 py-1 font-medium text-gray-500 text-sm flex items-center space-x-1
            hover:bg-gray-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="truncate">Add header</p>
            </button>
            <button
              onClick={() =>
                setContent([
                  ...content,
                  { type: "paragraph", content: "", id: uniqid() },
                ])
              }
              className="rounded-lg px-2 py-1 font-medium text-gray-500 text-sm flex items-center space-x-1
            hover:bg-gray-500 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="truncate">Add paragraph</p>
            </button>

            <button
              className="border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2
            hover:bg-emerald-500 hover:border-emerald-600 hover:text-white"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
