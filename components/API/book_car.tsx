// book_car.ts
import { useSelector } from "react-redux";
import { RootState } from "../../Redux_store/store";
import useFetchBookings from "./fetch_bookings";

export function useBookingApi() {
  const clientId = useSelector((state: RootState) => state.user.clientId);
  const {fetchBookingsAndCarNames} = useFetchBookings();

  const bookCar = async (
    pickup_date: Date,
    drop_off_date: Date,
    car_id: string,
    pickup_location: string,
    dropoff_location: string,
  ) => {
    try {
      const res = await fetch(
        `https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carId: car_id,
            clientId: clientId,
            pickupLocationId: pickup_location,
            dropOffLocationId: dropoff_location,
            pickupDateTime: pickup_date,
            dropOffDateTime: drop_off_date,
          }),
        }
      );

      const data = await res.json();

      console.log(data,res.status)

      switch (res.status) {
        case 200:
          fetchBookingsAndCarNames();
          return { success: true, message: data.message };
        case 400:
          return { success: false, message: data.message || "Invalid request." };
        case 403:
          return { success: false, message: data.message || "Car unavailable." };
        case 409:
          return { success: false, message: data.message || "Conflict detected." };
        case 500:
          return { success: false, message: data.message || "Server error." };
        default:
          return { success: false, message: data.message || "Unknown error." };
      }
    } catch (error: any) {
      console.error("Booking request failed:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

   // ✅ Update existing booking (edit mode)
//   const updateBooking = async (bookingId: string, clientId: string, updatedData: any) => {
//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/edit-booking/${clientId}/${bookingId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//       }
//     );

//     const data = await res.json();
//     return res.status === 200
//       ? { success: true, message: data.message }
//       : { success: false, message: data.message || "Failed to update." };
//   } catch (error) {
//     return { success: false, message: "Network error." };
//   }
// };



const updateBooking = async ({
  clientId,
  bookingId,
  pickupLocationId,
  dropoffLocationId,
  pickupDate,
  dropoffDate
}: {
  clientId: string;
  bookingId: string;
  pickupLocationId: string;
  dropoffLocationId: string;
  pickupDate: string;
  dropoffDate: string;
}
) => {
  try{
    const res = await fetch("https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/bookings/edit-booking", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId,
        bookingId,
        pickupLocationId,
        dropoffLocationId,
        pickupDate,
        dropoffDate,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { success: false, message: "Network error" };
  }
};


  return { bookCar, updateBooking };
}
