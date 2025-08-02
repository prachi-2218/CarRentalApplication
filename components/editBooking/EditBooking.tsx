// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux_store/store";
// import ReservationForm from "../Booking/full-reservation-form";
// import { Car } from "../../Redux_store/slices/carCardGridSlice";
// import Toast from "../Toast/Toast";

// const EditBookingPage = () => {
//   const { bookingId, userId } = useParams<{ bookingId: string; userId: string }>();
//   const navigate = useNavigate();
//   const loginUser = useSelector((state: RootState) => state.user);
//   const bookings = useSelector((state: RootState) => state.booking.bookings);

//   const booking = bookings.find((b) => b.id === bookingId);
//   const [toast, setToast] = useState({ show: false, message: "", type: "alert" as "alert" | "success" });

//   useEffect(() => {
//     if (!booking) {
//       setToast({ show: true, message: "Booking not found", type: "alert" });
//     } else if (booking.clientId !== userId || loginUser.clientId !== userId) {
//       setToast({ show: true, message: "Unauthorized access", type: "alert" });
//       setTimeout(() => navigate("/mybookings"), 2000);
//     }
//   }, [booking, userId, loginUser, navigate]);

//   const editableStatuses = ["reserved", "service started"];
//   const isEditable = booking && editableStatuses.includes(booking.status.toLowerCase());

//   if (!booking || booking.clientId !== userId || loginUser.clientId !== userId) return null;

//   const carInfo: Car = {
//     carId: booking.carId,
//     model: booking.carName,
//     imageUrl: booking.carImage,
//     location: booking.dropoffLocationId,
//     carRating: "4.5",            // placeholder to match full Car type
//     pricePerDay: "1000",         // ✅ fix: use a string
//     status: "available",         // or "reserved", etc.
//     serviceRating: "4.8"   // fallback value
//   };

//   return (
//     <div className="p-4">
//       {isEditable ? (
//         <ReservationForm car_info={carInfo} isEditMode={true} bookingData={booking} />
//       ) : (
//         <div className="text-xl font-medium text-center mt-20">This booking cannot be edited.</div>
//       )}

//       {toast.show && <Toast type={toast.type} message={toast.message} />}
//     </div>
//   );
// };

// export default EditBookingPage;


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux_store/store";
// import ReservationForm from "../Booking/full-reservation-form";
// import { Car } from "../../Redux_store/slices/carCardGridSlice";
// import Toast from "../Toast/Toast";

// const EditBooking = () => {
//   const { bookingId, userId } = useParams<{ bookingId: string; userId: string }>();
//   const navigate = useNavigate();
//   const loginUser = useSelector((state: RootState) => state.user);
//   const bookings = useSelector((state: RootState) => state.booking.bookings);

//   const [booking, setBooking] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState({
//     show: false,
//     message: "",
//     type: "alert" as "alert" | "success",
//   });

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         let existingBooking = bookings.find((b) => b.id === bookingId);

//         if (existingBooking) {
//           setBooking(existingBooking);
//         } else {
//           const res = await fetch(
//             `https://your-api-id.execute-api.your-region.amazonaws.com/bookings/${bookingId}?userId=${userId}`
//           );
//           const data = await res.json();

//           if (!res.ok) {
//             throw new Error(data.message || "Unable to fetch booking");
//           }

//           setBooking(data);
//         }
//       } catch (err: any) {
//         console.error("Booking fetch error:", err.message);
//         setToast({ show: true, message: err.message, type: "alert" });
//         setTimeout(() => navigate("/mybookings"), 2000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (bookingId && userId) fetchBooking();
//   }, [bookingId, userId, bookings]);

//   if (loading) {
//     return <div className="text-center p-4">Loading booking details...</div>;
//   }

//   // Unauthorized access protection
//   if (!booking || booking.clientId !== userId || loginUser.clientId !== userId) {
//     return null;
//   }

//   const editableStatuses = ["reserved", "service started"];
//   const isEditable = editableStatuses.includes(booking.status.toLowerCase());

//   const carInfo: Car = {
//     carId: booking.carId,
//     model: booking.carName,
//     imageUrl: booking.carImage,
//     location: booking.dropoffLocationId,
//     carRating: "4.5",
//     pricePerDay: "1000",
//     status: "available",
//     serviceRating: "4.8",
//   };

//   return (
//     <div className="p-4">
//       {isEditable ? (
//         <ReservationForm car_info={carInfo} isEditMode={true} bookingData={booking} />
//       ) : (
//         <div className="text-xl font-medium text-center mt-20">
//           This booking cannot be edited.
//         </div>
//       )}
//       {toast.show && <Toast type={toast.type} message={toast.message} />}
//     </div>
//   );
// };

// export default EditBooking;

// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux_store/store";
// import ReservationForm from "../Booking/full-reservation-form";
// import { Car } from "../../Redux_store/slices/carCardGridSlice";
// // import { Booking } from "../../Redux_store/slices/bookingSlice";
// // import { BookingState } from "../../Redux_store/slices/bookingSlice";
// import Toast from "../Toast/Toast";
// import { useEffect, useState } from "react";

// const EditBooking = () => {
//   const { bookingId, userId } = useParams<{ bookingId: string; userId: string }>();
//   const navigate = useNavigate();

//   const loginUser = useSelector((state: RootState) => state.user);
//   const booking = useSelector((state: RootState) => state.booking.selectedBookingForEdit);
//   const locations = useSelector((state: RootState) => state.locationMeta);

//   const [toast, setToast] = useState({
//     show: false,
//     message: "",
//     type: "alert" as "alert" | "success",
//   });

//   const booking = useSelector((state: RootState) => state.booking.selectedBookingForEdit);


//   useEffect(() => {
//     if (!booking) {
//       setToast({ show: true, message: "Booking not found", type: "alert" });
//       setTimeout(() => navigate("/mybookings"), 2000);
//     } else if (booking.clientId !== userId || loginUser.clientId !== userId) {
//       setToast({ show: true, message: "Unauthorized access", type: "alert" });
//       setTimeout(() => navigate("/mybookings"), 2000);
//     }
//   }, [booking, userId, loginUser, navigate]);

//   // Block UI render if booking is invalid
//   if (!booking || booking.clientId !== userId || loginUser.clientId !== userId) return null;

//   const editableStatuses = ["reserved", "service started"];
//   const isEditable = editableStatuses.includes(booking.status.toLowerCase());

//   const carInfo: Car = {
//     carId: booking.carId,
//     model: booking.carName,
//     imageUrl: booking.carImage,
//     location: booking.dropoffLocationId,
//     carRating: "4.5",        // Placeholder for required Car type fields
//     pricePerDay: "1000",     // String as per `Car` interface
//     status: "available",
//     serviceRating: "4.8",
//   };

//   return (
//     <div className="p-4">
//       {isEditable ? (
//         <ReservationForm car_info={carInfo} isEditMode={true} bookingData={booking} />
//       ) : (
//         <div className="text-xl font-medium text-center mt-20">
//           This booking cannot be edited.
//         </div>
//       )}

//       {toast.show && <Toast type={toast.type} message={toast.message} />}
//     </div>
//   );
// };

// export default EditBooking;



import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";
import ReservationForm from "../Booking/full-reservation-form";
import { Car } from "../../Redux_store/slices/carCardGridSlice";
import Toast from "../Toast/Toast";
import { useEffect, useState } from "react";
import useFetchBookings from "../API/fetch_bookings";

const EditBooking = () => {
  const { userId, bookingId } = useParams<{ userId: string; bookingId: string }>();
  const navigate = useNavigate();
  const { fetchBookingsAndCarNames } = useFetchBookings();
const dataFetched = useSelector((state: RootState) => state.booking.data_fetched);

  const loginUser = useSelector((state: RootState) => state.user);
  const allBookings = useSelector((state: RootState) => state.booking.bookings);
const selectedBooking = useSelector((state: RootState) => state.booking.selectedBookingForEdit);



  const booking = selectedBooking ?? allBookings.find((b) => b.id === bookingId);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "alert" as "alert" | "success",
  });

  useEffect(() => {
    if (!booking) {
      setToast({ show: true, message: "Booking not found", type: "alert" });
      setTimeout(() => navigate("/mybookings"), 2000);
    } else if (booking.clientId !== userId || loginUser.clientId !== userId) {
      setToast({ show: true, message: "Unauthorized access", type: "alert" });
      setTimeout(() => navigate("/mybookings"), 2000);
    }
     if (!booking && !dataFetched) {
    fetchBookingsAndCarNames();
  }
  }, [booking, userId, loginUser, navigate, dataFetched, fetchBookingsAndCarNames]);

  if (!booking || booking.clientId !== userId || loginUser.clientId !== userId) return null;

  const status = booking.status.toLowerCase();
  const canEditDropoff = status === "reserved" || status === "service started";
  const canEditPickup = status === "reserved";
  

  const carInfo: Car = {
    carId: booking.carId,
    model: booking.carName,
    imageUrl: booking.carImage,
    location: booking.dropoffLocationId,
    carRating: "4.5",
    pricePerDay: "1000",
    status: "available",
    serviceRating: "4.8",
  };

  return (
    <div className="p-4">
      
      <ReservationForm
        car_info={carInfo}
        isEditMode={true}
        bookingData={booking}
        canEditPickup={canEditPickup}
        canEditDropoff={canEditDropoff}
        defaultPickupDate={new Date(booking.pickupDate)}
        defaultDropoffDate={new Date(booking.dropoffDate)}
        defaultPickupLocationId={booking.pickupLocationId}
        defaultDropoffLocationId={booking.dropoffLocationId}

      />
      {toast.show && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default EditBooking;


 