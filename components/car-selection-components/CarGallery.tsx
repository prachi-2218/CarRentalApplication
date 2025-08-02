









import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CarImageColumn from "./CarImageColumn";
import DisplayCarImage from "./DisplayCarImage";
import { RootState } from "../../Redux_store/store";

const CarGallery: React.FC = () => {
  const selectedCar = useSelector((state: RootState) => state.carCardGrid.selectedCar);

  // Generate 5 thumbnails using the same image URL
  const carImages = selectedCar?._id
    ? Array.from({ length: 5 }, (_, i) => ({
        id: `${selectedCar._id}_${i + 1}`,
        imageUrl: `https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/${selectedCar._id}/${selectedCar._id}_1.jpg`,
      }))
    : [];

  const [selectedImg, setSelectedImg] = useState<string>("");

  useEffect(() => {
    if (carImages.length > 0) {
      setSelectedImg(carImages[0].imageUrl);
    }
  }, [selectedCar]);

  if (!selectedCar) return null;

  return (
    <div className="lg:w-[60%] flex flex-col lg:flex-row gap-4">
      <CarImageColumn images={carImages} setSelectedImg={setSelectedImg} />
      <DisplayCarImage selectedImg={selectedImg} />
    </div>
  );
};

export default CarGallery;
