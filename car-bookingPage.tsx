import Footer from "./components/footer/footer";
import Header from "./components/header/Header";
import Main_Heading from "./components/Heading/Main_Heading";
import ReservationForm from "./components/Booking/full-reservation-form";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "./Redux_store/store";
import { useNavigate } from "react-router";
import { useEffect,useState } from "react";
import { Car } from "./Redux_store/slices/carCardGridSlice";

const CarBooking: React.FC = () => {
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const car_data = useSelector((state: RootState) => state.carCardGrid.allCars);
  const [selectedCar, setSelectedCar] = useState<Car|null>(null);

  useEffect(() => {
    const isValidCar =
      Array.isArray(car_data) &&
      car_data.some((car) => String(car.carId) === carId);

    if (!isValidCar) {
      navigate("/cars");
    }
    else 
    {
      const foundCar = car_data.find((car) => String(car.carId) === carId);
      if (foundCar) {
        setSelectedCar(foundCar);
      }
    }
  }, []);

  return (
    <>
      <Header />
      <Main_Heading heading="Car Booking" />
      {
        selectedCar&&<ReservationForm car_info={selectedCar} />
      }
      <Footer />
    </>
  );
};

export default CarBooking;
