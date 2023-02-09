import { ArticleBrief } from "./articlebrief";
export const Content: Function = () => {
  return (
    <div className="flex-1 p-4 space-y-4 bg-gray-100 overflow-scroll">
      <ArticleBrief />
      <ArticleBrief />
      <ArticleBrief />
      <ArticleBrief />
    </div>
  );
};
