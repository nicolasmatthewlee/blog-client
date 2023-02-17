export const Spinner = () => {
  return (
    <div className="flex-col flex items-center">
      <div className="relative animate-spin rounded-full w-14 h-14 bg-gray-300 items-center flex justify-center">
        <div className="h-10 w-10 rounded-full bg-gray-100"></div>
        <div className="h-7 w-7 absolute left-0 top-0 bg-gray-100"></div>
      </div>
      <h1 className="font-bold text-lg text-gray-400 mt-4">LOADING...</h1>
    </div>
  );
};
