import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { JSX } from "react/jsx-dev-runtime";
import  useRecentFeedbacks  from "../API/fetch_recentFeedbacks";
import Testimonial_shimmer from "../Shimmer_card/Testimonial_shimmer";

// FeedbackCard component
const FeedbackCard = React.memo(
  React.forwardRef<HTMLDivElement, {
    data: {
      carImage: string;
      carName: string;
      buyingYear: string;
      rating: number;
      serviceRating: number;
      feedback: string;
      customerName: string;
      location: string;
      date: string;
    };
    isExpanded: boolean;
    index: number;
    toggleExpanded: (index: number) => void;
    renderStars: (count: number) => JSX.Element[];
  }>(
    ({ data, isExpanded, index, toggleExpanded, renderStars }, ref) => (
      <div
        ref={ref}
        className="bg-[#fffbf3] border border-gray-800 rounded-md shadow-md p-4 flex flex-col md:flex-row min-w-[300px] md:flex-[0_0_calc(33.333%_-_20px)] transition-all duration-300"
        style={{ minHeight: "200px" }}
      >
        <img
          src={data.carImage}
          alt={data.carName}
          className="w-[100px] h-[80px] object-cover rounded-md mb-3 md:mb-0 md:mr-4"
        />
        <div className="flex flex-col justify-between w-full text-sm">
          <div>
            <h4 className="text-base font-semibold mb-1">
              {data.carName} {data.buyingYear}
            </h4>
            <p className="text-gray-500 text-xs mb-1">{data.carName}</p>
            <div
              className="mb-2 cursor-pointer"
              onClick={() => toggleExpanded(index)}
            >
              {!isExpanded ? (
                <div className="flex">{renderStars(data.rating)}</div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Car:</span>
                    <div className="flex">{renderStars(data.rating)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Service:</span>
                    <div className="flex">
                      {renderStars(data.serviceRating)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {data.feedback && (
              <p className="italic text-xs text-gray-700 mb-2">
                "{data.feedback}"
              </p>
            )}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{data.customerName},</span>
            <span>{data.location}</span>
            <span>{data.date}</span>
          </div>
        </div>
      </div>
    )
  )
);

const MainrecentFB: React.FC = () => {
  const { feedbacks, loading, error } = useRecentFeedbacks();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [cardOffset, setCardOffset] = useState(0);
  // const [shimmer,set_shimmer]=useState<boolean>(false)
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth <= 768);
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        const gap = 24;
        setCardOffset(width + gap);
      }
    };

    window.addEventListener("resize", updateLayout);
    updateLayout();
    return () => window.removeEventListener("resize", updateLayout);
  }, [feedbacks]);

  const handleNext = () => {
    if (currentIndex < feedbacks.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleExpanded = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const renderStars = useCallback(
    (count: number) =>
      [...Array(5)].map((_, i) => (
        <FaStar key={i} className="mr-1" color={i < count ? "#ffb400" : "#ccc"} />
      )),
    []
  );

  return (
    <>
    <div className="relative w-full bg-[#fffbf3] py-6 px-4 md:py-10 md:px-8 font-sans overflow-hidden">
      <div className="text-gray-500 text-sm mb-4 md:text-base md:text-left text-center">
        <p>(RECENT FEEDBACK)</p>
      </div>

      {loading ? (
        <Testimonial_shimmer/>
      ) : error ? (
         <Testimonial_shimmer/>
      ) : (
        <div className="relative w-full">
          {!isMobile ? (
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 gap-6"
                style={{ transform: `translateX(-${currentIndex * cardOffset}px)` }}
              >
                {feedbacks.map((data, i) => (
                  <FeedbackCard
                    key={i}
                    data={data}
                    isExpanded={expandedIndex === i}
                    index={i}
                    toggleExpanded={toggleExpanded}
                    renderStars={renderStars}
                    ref={i === 0 ? cardRef : null}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              {feedbacks.map((data, i) => (
                <div className="w-[90%]" key={i}>
                  <FeedbackCard
                    data={data}
                    isExpanded={expandedIndex === i}
                    index={i}
                    toggleExpanded={toggleExpanded}
                    renderStars={renderStars}
                  />
                </div>
              ))}
            </div>
          )}

          {!isMobile && feedbacks.length > 3 && (
            <div className="absolute -bottom-10 right-4 flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-2 border rounded-full bg-[#fffbf3] border-gray-300 ${
                  currentIndex === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                <BsArrowLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + 3 >= feedbacks.length}
                className={`p-2 border rounded-full bg-[#fffbf3] border-gray-300 ${
                  currentIndex + 3 >= feedbacks.length
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
              >
                <BsArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    </>
  );
};

export default MainrecentFB;
