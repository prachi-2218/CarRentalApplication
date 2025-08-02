import { useDispatch } from "react-redux";
import { toggleModal, setSelectedCar } from "../../Redux_store/slices/carCardGridSlice";

export function useFindCarDetails() {
  const dispatch = useDispatch();

  async function findCarDetailsById(carId: string) {
    const url = `https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/cars/${carId}`;

    try {
      // Step 1: Open the modal
      dispatch(toggleModal(true));

      // Step 2: Fetch car details from the backend
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }

      // Step 3: Parse JSON response
      const data = await response.json();

      // Step 4: Dispatch car data to Redux store
      dispatch(setSelectedCar(data));

    } catch (error) {
      console.error("❌ Error fetching car details:", error);
      dispatch(setSelectedCar(null)); // Optionally reset selected car on error
      dispatch(toggleModal(false));   // Optionally close modal on error
    }
  }

  return { findCarDetailsById };
}
