// import React from "react";

// import { default_price_per_day } from "../../store/Pricing";
// import { Link } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux_store/store";

// // type BookCarButtonProps = {
// // //   onClick?: () => void;
// //   pricePerDay?: number;
// // };

// const price_per_day = useSelector((state:RootState)=>state.carCardGrid.selectedCar)

// const BookCarButton: React.FC<BookCarButtonProps> = () => {
//   return (
//     <Link to="/car-booking">
//     <button
//       type="submit"
//       className="w-full bg-[#CC1D1D] text-white py-3 rounded-3xl text-lg hover:cursor-pointer"
//       // onClick={onClick}
//     >
//       Book the car - ${price_per_day}/day
//     </button>
//     </Link>
//   );
// };

// export default BookCarButton;







import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";

const BookCarButton: React.FC = () => {
  const selectedCar = useSelector((state: RootState) => state.carCardGrid.selectedCar);
  const pricePerDay = selectedCar?.price_per_day ?? 0;

  return (
    <Link to="/car-booking">
      <button
        type="submit"
        className="w-full bg-[#CC1D1D] text-white py-3 rounded-3xl text-lg hover:cursor-pointer"
      >
        Book the car - ${pricePerDay}/day
      </button>
    </Link>
  );
};

export default BookCarButton;
