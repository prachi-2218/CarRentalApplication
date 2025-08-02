import React from "react";

import CarGallery from "./CarGallery";
import DisplayCarCharacteristics from "./DisplayCarCharacteristics";
import FeedbackSection from "./FeedbackSection";
import See_details_shimmer from "../Shimmer_card/See_details_shimmer";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";

interface CarSelectionProps {
  onClose: () => void;
}

const CarSelection: React.FC<CarSelectionProps> = ({ onClose }) => {
  const selected_car_data_fetched = useSelector(
    (state: RootState) => state.carCardGrid.selectedCar_data_fetched
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {/* Scaled & styled modal container */}
      <div
        className={
          window.innerWidth < 1024 ? `overflow-y-scroll h-[100vh]` : ""
        }
      >
        <div className="transform scale-[0.9] lg:scale-[0.5] 2xl:scale-[0.8] rounded-2xl border border-gray-300 bg-[#fefbf2] shadow-xl p-4">
          {/* Close button */}
          <div className="h-[50px] flex justify-end items-center px-[12px]">
            <button onClick={onClose} className="cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 300 262C 310 262 319 266 327 273C 327 273 500 447 500 447C 500 447 673 273 673 273C 680 266 690 262 699 262C 715 262 729 271 735 285C 741 299 738 316 727 327C 727 327 553 500 553 500C 553 500 727 673 727 673C 736 683 740 697 737 710C 733 723 723 733 710 737C 697 740 683 736 673 727C 673 727 500 553 500 553C 500 553 327 727 327 727C 317 736 303 740 290 737C 277 733 267 723 263 710C 260 697 264 683 273 673C 273 673 447 500 447 500C 447 500 273 327 273 327C 263 316 259 300 265 286C 271 271 284 262 300 262C 300 262 300 262 300 262" />
              </svg>
            </button>
          </div>

          {/* Main content */}
          {/* px-2 */}
          {selected_car_data_fetched ? (
            <div className="w-full px-4">
              <div className="flex flex-col lg:flex-row lg:h-[420px] gap-4">
                <CarGallery />
                <DisplayCarCharacteristics />
              </div>
            </div>
          ) : (
            <See_details_shimmer />
          )}

          {/* Bottom section */}
          <FeedbackSection />
        </div>
      </div>
    </div>
  );
};

export default CarSelection;
