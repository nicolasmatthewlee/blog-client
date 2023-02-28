import { useState } from "react";

interface Props {
  articleId: string | undefined;
  userId: string;
  onUpdate: Function;
  isSaved: Boolean;
}

export const SaveButton = ({ articleId, userId, onUpdate, isSaved }: Props) => {
  const [saved, setSaved] = useState<Boolean>(isSaved);

  const updateSaved = async (articleId: string, toStatus: Boolean) => {
    setSaved(toStatus);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/users/${userId}/saved`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ articleId, toStatus }),
        }
      );
      const json = await response.json();
      if (json.errors) setSaved(!toStatus); // revert status if not saved
      else setSaved(json.result);
      onUpdate();
    } catch {
      setSaved(!toStatus); // revert status if not saved
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className={
        saved
          ? "w-6 h-6 fill-emerald-500 stroke-emerald-500 hover:stroke-emerald-600 hover:fill-emerald-600"
          : "w-6 h-6 stroke-gray-300 hover:fill-emerald-100 hover:stroke-emerald-500 active:fill-emerald-500 active:stroke-emerald-500"
      }
      onClick={() => {
        if (articleId) updateSaved(articleId, !saved);
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};
