// src/pages/CarsPage.tsx
import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Main_Heading from "./components/Heading/Main_Heading";
import CarSelector from "./components/CarSelector/CarSelector";
import CarCardGrid from "./components/CarCards/CarCardGrid";
import Pagination from "./components/CarCards/Pagination";
import CarSelection from "./components/car-selection-components/CarSelection";
import Footer from "./components/footer/footer";
// import { carList } from "./config";
// import { usePagination } from "./hooks/usePagination";
import { setCars,toggleModal } from "./Redux_store/slices/carCardGridSlice";
import { RootState } from "./Redux_store/store";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const CarsPage: React.FC = () => {
  const car_data = useSelector((state: RootState) => state.carCardGrid.allCars);
  const page_data = useSelector((state: RootState)=> state.carCardGrid.paginationData)

  const showModal = useSelector((state: RootState) => state.carCardGrid.showModal);

  // const location = useLocation();
  const dispatch=useDispatch();

  // const {
  //   currentPage,
  //   totalPages,
  //   currentItems: currentCars,
  //   handlePageChange,
  // } = usePagination(car_data, 8);

  //  function handlePageChange(){
  //    set
  //  }


  useEffect(() => {
    dispatch(setCars(car_data));
  }, [car_data]);
  


  return (
    <>
      <Header />
      <Main_Heading heading="Choose a car for rental" />
      <CarSelector/>
      <CarCardGrid/>
      <Pagination
        currentPage={page_data[0]}
        totalPages={page_data[2]}
        // onPageChange={handlePageChange}
      />
      {showModal && <CarSelection onClose={() => dispatch(toggleModal(false))} />}
      <Footer />
    </>
  );
};

export default CarsPage;
