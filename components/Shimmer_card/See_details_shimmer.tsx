import React from "react";

const See_details_shimmer: React.FC = () => {
  return (
    <>
       <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md animate-pulse w-full">
      {/* Left image thumbnails */}
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="w-16 h-12 bg-gray-200 rounded-lg shimmer" />
        ))}
      </div>

      {/* Main car image */}
      <div className="flex-1 h-full">
        <div className="w-full h-[280px] bg-gray-200 rounded-lg shimmer" />
      </div>

      {/* Right section */}
      <div className="flex flex-col gap-3 w-80">
        <div className="h-5 w-3/4 bg-gray-200 rounded shimmer" />
        <div className="h-4 w-1/2 bg-gray-200 rounded shimmer" />
        <div className="flex flex-wrap gap-2 mt-2">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i} className="h-4 w-20 bg-gray-200 rounded shimmer" />
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <div className="h-14 flex-1 bg-gray-200 rounded shimmer" />
          <div className="h-14 flex-1 bg-gray-200 rounded shimmer" />
        </div>
        <div className="h-14 w-full bg-gray-300 rounded mt-3 shimmer" />
      </div>
    </div>

    </>
  );
};

export default See_details_shimmer;
