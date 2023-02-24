import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { UserInterface } from "../models/user";

const uniqid = require("uniqid");

interface ContentItem {
  type: "header" | "paragraph";
  text: string;
  id: string;
}

export const ArticleForm: Function = ({ user }: UserInterface) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [image, setImage] = useState<string>();
  const [imageData, setImageData] = useState<Uint8Array>();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState<string>("");

  const saveImage: Function = (files: File[] | null) => {
    setImageError(null);
    if (files === null) return;
    const file = files[0];

    // file limit is 1MB (1048576 bytes)
    if (file.size > 1048576) return setImageError("File must not exceed 1MB");

    const reader = new FileReader();
    // onload is called when the read operation is complete
    reader.onload = () => {
      if (reader.result && typeof reader.result === "object") {
        const bytes = new Uint8Array(reader.result);
        setImageData(Buffer.from(bytes));
        setImage(
          "data:image/png;base64," + Buffer.from(bytes).toString("base64")
        );
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const deleteContent: Function = (id: string) => {
    setContent(content.filter((e) => e.id !== id));
  };

  const updateContent: Function = (id: string, value: string) => {
    setContent(
      content.map((e: ContentItem) => {
        if (e.id === id) return { type: e.type, text: value, id: e.id };
        else return e;
      })
    );
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

  const formatDate = (dateString: string | undefined) => {
    if (dateString === undefined) return;
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  };

  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [publishErrors, setPublishErrors] = useState<
    { message?: string; msg?: string }[]
  >([]);

  const handlePublish = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/articles", {
        method: "post",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          image: imageData,
          content,
          author: user?.username,
          imageAlt,
          authorId: user?._id,
        }),
      });
      const json = await response.json();
      if (json.errors) setPublishErrors(json.errors);
      else {
        setPublishErrors([]);
        navigate("/");
      }
    } catch (err) {
      setPublishErrors([{ message: "An unknown error occurred" }]);
    }
    setIsLoading(false);
  };

  return (
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
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 items-center pb-2">
        <div>
          <h2 className="text-md font-medium text-gray-500">
            <span className="font-normal">by </span>
            {user?.username}
          </h2>
          <p className="text-gray-400">{formatDate(String(new Date()))}</p>
        </div>
      </div>

      {/* file upload */}

      {image ? (
        <div className="container h-72 w-full rounded-sm border-2 border-dashed relative">
          <div className="p-2 h-72">
            <input
              className="opacity-0 absolute top-0 w-full h-full z-10
                hover:cursor-pointer peer"
              type="file"
              accept="image/*"
              onChange={(event) => saveImage(event.target.files)}
            />
            <img
              className="w-full h-full object-cover rounded-lg peer-hover:opacity-50"
              src={image}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="container h-72 w-full rounded-sm border-2 border-dashed relative">
          <div className="absolute w-full h-full top-0 flex flex-col items-center justify-center">
            <input
              className="opacity-0 absolute top-0 w-full h-full
                hover:cursor-pointer peer"
              type="file"
              accept="image/*"
              onChange={(event) => saveImage(event.target.files)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 stroke-gray-200 fill-gray-200
                  peer-hover:stroke-gray-400 peer-hover:fill-gray-400 peer-active:fill-gray-500 peer-active:stroke-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <h3
              className="font-semibold text-lg text-gray-300 
                peer-hover:text-gray-400 peer-active:text-gray-500"
            >
              Browse file to upload
            </h3>
          </div>
        </div>
      )}

      {imageError ? (
        <div className="bg-rose-100 text-rose-600 font-medium px-4 py-1.5 text-sm rounded-sm">
          <li className="ml-2">{imageError}</li>
        </div>
      ) : null}

      <input
        className="pb-2 text-sm text-gray-500 border-2 border-dashed flex w-full align-middle pt-2"
        type="text"
        placeholder="image alternate text"
        onChange={(e) => setImageAlt(e.target.value)}
      />

      {content.map((e, i) => displayContent(e, i))}

      {/* add header, paragraph buttons */}
      <div className="flex flex-col">
        <button
          onClick={() =>
            setContent([...content, { type: "header", text: "", id: uniqid() }])
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
              { type: "paragraph", text: "", id: uniqid() },
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

        {publishErrors.length > 0 ? (
          <div className="bg-rose-100 px-4 py-1.5 rounded-sm font-medium text-rose-600 w-full mt-2 text-sm">
            {publishErrors.map((e) => (
              <li className="ml-2" key={uniqid()}>
                {e.msg ? e.msg : e.message}
              </li>
            ))}
          </div>
        ) : null}

        {isLoading ? (
          <button
            className="border-2 font-semibold text-sm py-1 rounded-lg
            bg-emerald-500 border-emerald-500 text-white flex items-center justify-center mt-2"
            disabled
          >
            <div className="animate-spin w-3 h-3 bg-white rounded-full mr-2 relative flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full absolute bg-emerald-500`}
              ></div>
              <div
                className={`w-1.5 h-1.5 absolute top-0 left-0 bg-emerald-500`}
              ></div>
            </div>
            Publishing...
          </button>
        ) : (
          <button
            className="border-2 font-semibold text-sm py-1 rounded-lg text-gray-400 mt-2
            hover:bg-emerald-500 hover:border-emerald-500 hover:text-white active:border-emerald-600 active:bg-emerald-600 active:text-white"
            onClick={handlePublish}
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};
