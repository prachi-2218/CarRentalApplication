




import React from "react";

type CarImageColumnProps = {
  images: { imageUrl: string }[];
  setSelectedImg: (img: string) => void;
};

const CarImageColumn: React.FC<CarImageColumnProps> = ({ images, setSelectedImg }) => {
  return (
    <div className="flex flex-row lg:flex-col basis-full lg:basis-[15%] gap-4 overflow-y-auto max-h-full">
      {images.map((car, index) => (
        <div
          key={index}
          className="h-1/5 overflow-hidden cursor-pointer"
          onClick={() => setSelectedImg(car.imageUrl)}
        >
          <img
            src={car.imageUrl}
            alt={`Car ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default CarImageColumn;
