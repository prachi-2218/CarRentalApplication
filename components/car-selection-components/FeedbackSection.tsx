import React, { useState } from "react";
import { feedbacks } from "../../store/Feedbacks"; // Import feedback data

const FeedbackSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="px-4">
        <div className="bg-[#F0F0F0] my-4 p-4 rounded-lg">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-lg font-semibold w-full sm:w-auto">Feedback</h2>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <p className="text-sm text-gray-600">Sort by</p>
              <select className="rounded px-2 py-1 text-sm">
                <option>The newest</option>
                <option>The latest</option>
                <option>Rating: low to high</option>
                <option>Rating: high to low</option>
              </select>
            </div>
          </div>

          <hr className="border-t border-gray-300 mb-6" />

          {/* Feedback List */}
          <div className="space-y-6">
            {currentFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="rounded-lg p-4 flex flex-wrap justify-between items-start gap-4"
              >
                {/* Profile */}
                <div className="flex items-center gap-2">
                  <img
                    src={feedback.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-sm">{feedback.name}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col w-full sm:w-2/3">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-2.5 h-2.5"
                      >
                        <path
                          d="M4.04895 0.926638C4.34833 0.00537562 5.65167 0.0053761 5.95105 0.926639L6.34722 2.14577C6.4811 2.55776 6.86502 2.8367 7.29822 2.83672L8.58011 2.83676C9.5488 2.8368 9.95155 4.07635 9.16789 4.64576L8.13085 5.39927C7.78039 5.65391 7.63375 6.10525 7.7676 6.51725L8.16367 7.73641C8.46298 8.65769 7.40855 9.42378 6.62485 8.85443L5.58775 8.10099C5.23728 7.84638 4.76272 7.84638 4.41225 8.10099L3.37515 8.85443C2.59144 9.42378 1.53702 8.65769 1.83633 7.73641L2.23241 6.51725C2.36626 6.10525 2.21961 5.65391 1.86915 5.39927L0.832114 4.64576C0.0484526 4.07635 0.451207 2.8368 1.41989 2.83676L2.70178 2.83672C3.13498 2.8367 3.5189 2.55776 3.65278 2.14577L4.04895 0.926638Z"
                          fill={i < feedback.rating ? "#F8B334" : "#F0F0F0"}
                          stroke="#F8B334"
                          strokeWidth="0.5"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm">{feedback.content}</p>
                </div>

                {/* Date */}
                <div className="text-right text-sm whitespace-nowrap">
                  {feedback.date}
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 px-3 py-1 text-sm rounded-full hover:cursor-pointer ${
                    currentPage === i + 1 ? "bg-black text-white" : "text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Right Arrow */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:cursor-pointer"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.3333 16.0013H6.66663M25.3333 16.0013L20 21.3346M25.3333 16.0013L20 10.668"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
