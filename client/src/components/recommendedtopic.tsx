interface Topic {
  name: string;
}

export const RecommendedTopic: Function = (props: Topic) => {
  return (
    <button className="border-2 rounded-full text-gray-800 font-medium py-0.5 px-2 text-xs">
      {props.name}
    </button>
  );
};
