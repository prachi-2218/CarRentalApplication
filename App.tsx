
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import Sign_up from "./components/signup/Sign_up";
import HomePage from "./HomePage";
import CarsPage from "./CarsPage";
import MyBookings from "./myBookingsPage";
import CarBooking from "./car-bookingPage";
import { useFindCarApi } from "./components/API/fetch_car";
import { userFindLocation } from "./components/API/fetch_location";
import Dashboard from "./components/AdminPage/Dashboard";
import EditBookingPages from "./modifyBooking";
 
const App: React.FC = () => {
  const { findCarApiCall } = useFindCarApi()
  const { fetch_location } = userFindLocation()
  useEffect(()=>{
      findCarApiCall()
      fetch_location()
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/car-booking" element={<Navigate to="/cars" replace />} />
        <Route path="/car-booking/:carId" element={<CarBooking />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/edit-booking/:userId/:bookingId" element={<EditBookingPages />} />
      </Routes>
    </BrowserRouter>
  );
};
 
export default App;