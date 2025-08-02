import React from "react";
import "./Card.css";
import { Link } from "react-router";
import { useFindCarDetails } from "../../components/API/car_specific"; // ✅ use the hook
import { useDispatch } from "react-redux";
import { set_selected_car_data_fetched } from "../../Redux_store/slices/carCardGridSlice";

interface CarCardProps {
  name: string;
  location: string;
  rating: string;
  price: string;
  imageUrl: string;
  id: string;
}

const CarCard: React.FC<CarCardProps> = ({
  name,
  location,
  rating,
  price,
  imageUrl,
  id
}) => {
  const { findCarDetailsById } = useFindCarDetails(); // ✅
  const dispatch = useDispatch()

  const handleSeeMoreDetails = async() => {
    dispatch(set_selected_car_data_fetched(false))
    await findCarDetailsById(id); // ✅ fetch full details and dispatch
    dispatch(set_selected_car_data_fetched(true))
  };

  return (
    <div className="w-full bg-[#f0f0f0] rounded-xl p-2">
      <div className="car-image-container">
        <img src={imageUrl} alt={name} className="car-image" />
        <div className='car-status available'>Available</div>
      </div>

      <div className="car-row space-between">
        <div className="car-name">{name}</div>
        <div className="car-rating">
          ⭐ <span>{rating}.0</span>
        </div>
      </div>

      <div className="car-location">{location}</div>

      <Link to={`/car-booking/${id}`}>
        <button className="book-button">Book the car - ${price}/day</button>
      </Link>

      <button onClick={handleSeeMoreDetails} className="see-more clickable">
        See more details
      </button>
    </div>
  );
};

export default CarCard;

































// function setSelectedCar(arg0: {
//   _id: string; model: string; location: string; carRating: string; pricePerDay: string; imageUrl: string; status: string; // Assuming "Available" status, adjust as necessary
//   serviceRating: string; gearBoxType: string; fuelType: string;
// }): any {
//   throw new Error("Function not implemented.");
// }
