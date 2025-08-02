import { useDispatch } from "react-redux";
import { setAllCars } from "../../Redux_store/slices/carCardGridSlice";
import { set_pagination_data } from "../../Redux_store/slices/carCardGridSlice";

export function useFindCarApi() {
  const dispatch = useDispatch();

  async function findCarApiCall(page:number=1,pickupLocation="",dropoffLocation="",pickupDate="",dropoffDate="",carCategory="",gearbox="",engineType="",minPrice=0,maxPrice=10000) {
    const params = new URLSearchParams();

    if (pickupLocation!="") params.append("pickupLocationId", pickupLocation);
    if (dropoffLocation!="") params.append("dropOffLocationId", dropoffLocation);
    if (pickupDate!="") params.append("pickupDateTime", pickupDate);
    if (dropoffDate!="") params.append("dropOffDateTime", dropoffDate);
    if (carCategory!="") params.append("category", carCategory);
    if (gearbox!="") params.append("gear_box_type", gearbox);
    if (engineType!="") params.append("fuel_type", engineType);
    if (minPrice !== 0) params.append("minPrice", minPrice.toString());
    if (maxPrice !== 10000) params.append("maxPrice", maxPrice.toString());
    params.append("page",page.toString())


    const url = `https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/cars?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      dispatch(setAllCars(data.content));
   
      dispatch(set_pagination_data([Number(data.currentPage),8,Number(data.totalPages)]))
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      throw error;
    } 
  };

  return { findCarApiCall };
}