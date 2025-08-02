import React, { useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
import FAQ_shimmer from "../Shimmer_card/FAQ_shimmer";

// Define the types for FAQ data
interface FaqItem {
  question: string;
  answer: string;
}

const MainFaq: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [shimmer, set_shimmer] = useState<boolean>(true);

  const toggle = (i: number) => {
    setSelected((prev) => (prev === i ? null : i));
  };

  // Fetch FAQ data from your deployed Lambda API
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await fetch(
          "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/home/faq"
        );
        const data = await res.json();
        setFaqData(data.content || []);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
      set_shimmer(false);
    };

    fetchFaq();
  }, []);

  return (
    <>
      {shimmer ? (
        <FAQ_shimmer />
      ) : (
        <div className="flex flex-col md:flex-row bg-[#FFFBF3] p-4 font-sans">
          {/* Left Column */}
          <div className="md:w-2/5 w-full text-gray-500 text-sm px-2 md:px-4 mb-2 md:mb-0">
            <p className="text-[18px] text-center md:text-left">(FAQ)</p>
          </div>

          {/* Right Column */}

          <div className="md:w-3/5 w-full px-2 md:px-4">
            {faqData.map((item, i) => (
              <div key={i} className="border-b border-gray-300 py-2">
                {/* Toggle Question */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  <h2 className="font-medium text-[24px]  md:text-[28px]">
                    {item.question}
                  </h2>
                  <span className="ml-2">
                    {selected === i ? (
                      <RxCrossCircled size={24} />
                    ) : (
                      <CgAdd size={24} />
                    )}
                  </span>
                </div>

                {/* Toggle Answer */}
                <div
                  className={`text-[18px] md:text-[24px] text-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
                    selected === i
                      ? "max-h-[500px] opacity-100 py-2"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{ transitionProperty: "max-height, opacity, padding" }}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MainFaq;
