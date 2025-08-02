import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";
import Map_location_shimmer from "../Shimmer_card/Map_location_shimmer";

const MainMap: React.FC = () => {
  const locations=useSelector((state:RootState)=>state.locations)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [loadingMap, setLoadingMap] = useState<boolean>(false);

  

  const handleLocationClick = (index: number) => {
    setSelectedIndex(index);
    setLoadingMap(true);
  };

  return (
    <>
    {
      locations.length>0?
       <div className="flex flex-col lg:flex-row bg-[#fefaf4] p-4 md:p-6 min-h-screen font-sans box-border">
      {/* Left Side */}
      <div className="w-full lg:w-2/5 lg:pr-6 lg:h-[calc(100vh-3rem)] flex flex-col">
        {/* Static Title */}
        <p className="text-gray-500 text-sm md:text-base mb-2 text-center lg:text-left">
          (OUR LOCATIONS)
        </p>

        {/* Scrollable List */}
        <div className="overflow-y-auto flex-1 space-y-2 pr-1">
          {locations.map((loc, i) => {
            const isSelected = i === selectedIndex;
            return (
              <div
                key={loc.id}
                className={`cursor-pointer border-b border-gray-200 p-3 rounded-md transition-colors duration-200 ${
                  isSelected ? "bg-black text-white" : "hover:bg-gray-100 text-gray-800"
                }`}
                onClick={() => handleLocationClick(i)}
              >
                <strong className={`block ${isSelected ? "text-white" : ""}`}>
                  {loc.locationName}
                </strong>
                <p className={`${isSelected ? "text-white" : "text-gray-600"}`}>
                  {loc.locationAddress}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-3/5 lg:h-[calc(100vh-3rem)] mt-4 relative rounded-lg overflow-hidden">
        {loadingMap && (
          <div className="absolute inset-0 z-10">
            <img
              src="https://via.placeholder.com/600x300?text=Map+Loading"
              alt="Loading map"
              className="w-full h-full object-cover blur-md scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_linear_infinite] opacity-40" />
          </div>
        )}

        {selectedIndex !== null && locations[selectedIndex] && (
          <iframe
            src={locations[selectedIndex].locationImageUrl}
            className="w-full h-[300px] md:h-[400px] lg:h-full rounded-lg border-0 transition-opacity duration-500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Embedded Map"
            onLoad={() => setLoadingMap(false)}
          ></iframe>
        )}
      </div>
    </div>
      :<Map_location_shimmer/>

    }
   
    </>
    
  );
};

export default MainMap;

