import React from "react";

const FAQ_shimmer: React.FC = () => {
  return (
    <>
      <div className="flex">
        <div className="p-6 w-[40%]">
          <div className="mb-6 w-24 h-4 bg-gray-300 rounded shimmer" />
        </div>
        <div className="p-6 w-[60%]">
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
                >
                  <div className="w-3/4 h-4 w-full bg-gray-300 rounded shimmer" />
                  <div className="w-6 h-6 bg-gray-300 rounded-full shimmer" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ_shimmer;
