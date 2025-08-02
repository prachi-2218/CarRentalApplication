import React from "react";

const Map_location_shimmer: React.FC = () => {
  return (
    <>
      <div className="flex w-screen flex-col xl:flex-row bg-[#fdf7f0] p-4">
        <div className="w-full xl:w-1/3 space-y-4 pr-4 overflow-y-auto">
          <div className="h-6 w-32 bg-gray-300 rounded shimmer"></div>
          <div className="space-y-3">
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
            <div className="p-4 bg-gray-200 rounded">
              <div className="h-4 w-1/2 bg-gray-300 shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-300 shimmer rounded"></div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[10px] xl:mt-0 xl:w-2/3 bg-gray-300 rounded shimmer relative h-[500px]">
          <div className="absolute top-4 left-4 bg-white p-3 rounded shadow w-64 h-24">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 shimmer"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-1 shimmer"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4 shimmer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map_location_shimmer;
