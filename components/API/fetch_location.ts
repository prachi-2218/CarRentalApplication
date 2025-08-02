import { useDispatch } from "react-redux";
import { setLocations } from "../../Redux_store/slices/locationSlice";
import { setMetaFromArray } from "../../Redux_store/slices/location_key_value_pair";
export function userFindLocation() {
  const dispatch = useDispatch();

  async function fetch_location(){
    try {
      const res = await fetch('https://436jr2ajxe.execute-api.ap-southeast-2.amazonaws.com/prod/home/locations');
      const data = await res.json();
      dispatch(setLocations(data.content));
      dispatch(setMetaFromArray(data.content))
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  return { fetch_location };
}