import { useState } from "react";

interface Props {
  onUpdate: Function;
  articleId: string | undefined;
  isLiked: Boolean;
  userId: string;
}

export const LikeButton = ({ onUpdate, articleId, isLiked, userId }: Props) => {
  const [liked, setLiked] = useState<Boolean>(isLiked);

  const updateLiked = async (articleId: string, toStatus: Boolean) => {
    setLiked(toStatus);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/users/${userId}/liked`,
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
      if (json.errors) setLiked(!toStatus); // revert status if not saved
      else setLiked(json.result);
      onUpdate();
    } catch {
      setLiked(!toStatus); // revert status if not saved
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
        liked
          ? "w-6 h-6 fill-rose-500 stroke-rose-500 hover:stroke-rose-600 hover:fill-rose-600"
          : "w-6 h-6 stroke-gray-300 hover:fill-rose-100 hover:stroke-rose-500 active:fill-rose-500 active:stroke-rose-500"
      }
      onClick={() => {
        if (articleId) updateLiked(articleId, !liked);
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
};
