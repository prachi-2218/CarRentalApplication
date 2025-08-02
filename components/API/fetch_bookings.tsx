
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../Redux_store/slices/bookingSlice";
import { RootState } from "../../Redux_store/store";
import { set_data_fetched } from "../../Redux_store/slices/bookingSlice";
import { set_is_data_fetched } from "../../Redux_store/slices/bookingSlice";

const API_URL_BOOKINGS = "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/bookings";
const API_URL_CAR_BY_ID = "https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/cars";

const useFetchBookings = () => {
  const dispatch = useDispatch();
  const clientId = useSelector((state: RootState) => state.user.clientId);

  // Function to fetch a single car's details by ID
  const fetchCarById = async (carId: string) => {
    try {
      const res = await fetch(`${API_URL_CAR_BY_ID}/${carId}`);
      if (!res.ok) throw new Error("Car fetch failed");
      return await res.json();
    } catch (err) {
      console.error(`Error fetching car with id ${carId}:`, err);
      return null;
    }
  };

  // useEffect(() => {
    const fetchBookingsAndCarNames = async () => {
      if (!clientId) return;

      try {
        // Step 1: Fetch bookings
        const bookingRes = await fetch(`${API_URL_BOOKINGS}?userId=${clientId}`);
        if (!bookingRes.ok) throw new Error("Failed to fetch bookings");
        const bookingData = await bookingRes.json();

        // Step 2: For each booking, fetch car info individually
        if(bookingData.length>0)
        {
            const transformedBookings = await Promise.all(
          bookingData.map(async (booking: any, index: number) => {
            const car = await fetchCarById(booking.car_id);
            const carName = car?.model || `Car ${index + 1}`;

            return {
              id: booking._id,
              status: booking.status,
              carImage: `https://pbe-team-7-backend-asset-bucket.s3.ap-southeast-2.amazonaws.com/${booking.car_id}/${booking.car_id}_1.jpg`,
              carName,
              order: booking.booking_number ? `ORD-${booking.booking_number}` : `ORD-${1000 + index}`,
              carId: booking.car_id || "",
              clientId: clientId,
              feedbackSubmitted: false,
              pickupDate:   booking.pickup_datetime,
              dropoffDate:  booking.dropoff_datetime,
              pickupLocationId:  booking.pickup_location_id,
              dropoffLocationId: booking.dropoff_location_id,
            };
          })
        );
        dispatch(setBookings(transformedBookings));
        console.log("Transformed bookings:", transformedBookings);
        }
      
        // Step 3: Dispatch transformed bookings to Redux
        dispatch(set_data_fetched(true))
        dispatch((set_is_data_fetched(true)))
      } catch (error) {
        dispatch(setBookings([]))
        dispatch((set_is_data_fetched(true)))
        dispatch(set_data_fetched(true))
        console.error("Error fetching bookings or car details:", error);
      }
    };
    return {fetchBookingsAndCarNames};

  // }, [clientId, dispatch]);
};

export default useFetchBookings;

