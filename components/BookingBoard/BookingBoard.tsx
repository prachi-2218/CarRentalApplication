// src/components/BookingBoard/BookingBoard.tsx
import React, { useEffect } from "react";
import BookingCard from "../BookingCard/BookingCard";
import StatusList from "../StatusList/StausList";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStatus } from "../../Redux_store/slices/bookingSlice";
import type { RootState } from "../../Redux_store/store";
import useFetchBookings from "../API/fetch_bookings";
import Shimmer_card from "../Shimmer_card/Shimmer_card";
import Toast from "../Toast/Toast";
import { useFindCarApi } from "../API/fetch_car";

const allStatuses = [
  "All Bookings",
  "Reserved",
  "Reserved by SA",
  "Service Started",
  "Service Provided",
  "Cancelled",
  "Booking Finished",
];

const BookingBoard: React.FC = () => {
  const { findCarApiCall } = useFindCarApi()
  const {fetchBookingsAndCarNames} = useFetchBookings();
  const is_data_fetched=useSelector((state:RootState)=>state.booking.is_data_fetched)
  useEffect(()=>{
    if(!is_data_fetched)
    {
      findCarApiCall()
      fetchBookingsAndCarNames()
    }
  },[])
  const dispatch = useDispatch();

  const booking_finished_data=useSelector((state:RootState)=>state.booking.booking_toast)

  // Explicitly type state here
  const bookings = useSelector((state: RootState) => state.booking.bookings);
  const data_fetched = useSelector(
    (state: RootState) => state.booking.data_fetched
  );
  const selectedStatus = useSelector(
    (state: RootState) => state.booking.selectedStatus
  );

  const handleStatusClick = (status: string | null) => {
    const newStatus = status === selectedStatus ? "All Bookings" : status;
    dispatch(setSelectedStatus(newStatus || "All Bookings"));
  };

  const normalize = (status: string) => status.trim().toLowerCase();
  const filteredBookings =
    selectedStatus && selectedStatus !== "All Bookings"
      ? bookings.filter(
          (booking) => normalize(booking.status) === normalize(selectedStatus)
        )
      : bookings;


  return (
    <>
      <StatusList
        statuses={allStatuses}
        selectedStatus={selectedStatus}
        onStatusClick={handleStatusClick}
      />

      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {!data_fetched ? (
          Array(4).fill(0).map((_,ind)=>{
            return <Shimmer_card key={ind} />
          })
        ) : filteredBookings.length === 0 ? (
          <div className="w-full flex justify-center py-10">
            <h2 className="text-4xl font-bold dark:text-white">No Bookings</h2>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              carImage={booking.carImage}
              carName={booking.carName}
              order={booking.order}
              status={booking.status}
              id={booking.id}
              carId={booking.carId}
              clientId={booking.clientId}
            />
          ))
        )}
      </div>

      {
        booking_finished_data.status &&
      <Toast type={booking_finished_data.type} message={booking_finished_data.message}/>
      }
    </>
  );
};

export default BookingBoard;
