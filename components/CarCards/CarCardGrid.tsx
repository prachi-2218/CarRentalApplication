import React from 'react';
import './CarCardGrid.css';
import CarCard from './Card';
import { useLocation, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux_store/store';
//import { toggleModal } from '../../Redux_store/slices/carCardGridSlice';
import Shimmer_card from '../Shimmer_card/Shimmer_card';

const CarCardGrid: React.FC = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const cars = useSelector((state: RootState) => state.carCardGrid.cars);
  const location_key_value=useSelector((state:RootState)=>state.locationMeta)

  // const handleToggle = () => {
  //   dispatch(toggleModal(true));
  // };

  return (
    <>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 mt-[20px]">
          {cars.map((car, index) => (
            <CarCard
              
              key={index}
              imageUrl={car.imageUrl}
              name={car.model}
              location={location_key_value[car?.location]?.locationName}
              rating={car.carRating}
              price={car.pricePerDay}
              id={car.carId}
              
              
            />
          ))}
        </div>
      ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 mt-[20px]">
    {Array.from({ length: location.pathname === "/" ? 4 : 8 }).map((_, index) => (
      <Shimmer_card key={index} />
    ))}
  </div>
      )}

      {location.pathname === '/' && (
        <div className="h-8 flex justify-end items-center px-2">
          <Link className="text-sm font-bold underline font-sans" to="/cars">
            View all cars
          </Link>
        </div>
      )}
    </>
  );
};

export default CarCardGrid;
