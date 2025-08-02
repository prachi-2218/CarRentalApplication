// src/pages/HomePage.tsx
import React, { useEffect } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import Main_Heading from "./components/Heading/Main_Heading";
import CarSelector from "./components/CarSelector/CarSelector";
import CarCardGrid from "./components/CarCards/CarCardGrid";
import MainaboutUs from "./components/Main-about-us/MainaboutUs";
import MainMap from "./components/Map-main/MainMap";
import MainrecentFB from "./components/MainRecentFB/MainrecentFB";
import MainFaq from "./components/MainFaq/MainFaq";
import CarSelection from "./components/car-selection-components/CarSelection";
import { setCars,toggleModal } from "./Redux_store/slices/carCardGridSlice";
import { RootState } from "./Redux_store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const HomePage: React.FC = () => {
  // const car_data = useSelector((state: RootState) => state.carFilter.carList);
    const showModal = useSelector((state: RootState) => state.carCardGrid.showModal);
    const car_data = useSelector((state: RootState) => state.carCardGrid.allCars)
    
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(setCars(car_data.slice(0, 4)));
    }, [car_data]);

  return (
    <>
    <Header/>
      <Main_Heading heading="Choose a car for rental" />
      <CarSelector/>
      <CarCardGrid/>
      {showModal && <CarSelection onClose={() => dispatch(toggleModal(false))} />}
      <MainaboutUs />
      <MainMap />
      <MainrecentFB />
      <MainFaq />
      <Footer/>
      
    </>
  );
};

export default HomePage;
