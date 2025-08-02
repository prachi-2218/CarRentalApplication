import React from "react";

const Shimmer_card: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 shimmer">
        <div className="relative w-full h-40 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    </>
  );
};

export default Shimmer_card;
