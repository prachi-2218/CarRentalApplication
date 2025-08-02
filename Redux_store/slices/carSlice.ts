import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { carList } from "../../config";
// import {Car} from "../../config";
interface CarFilterState {
  // carList: Car[];
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  carCategory: string;
  gearbox: "Automatic" | "Manual" | "";
  engineType: string;
  minPrice: number;
  maxPrice: number;
  // page:number;
  // dropoffOptions: string[];
  krk: boolean;
}
 
// const availableLocations: string[] = ["New York", "Miami", "Los Angeles"];
 


 
const preserved_state: CarFilterState = {
  // carList:carList,
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  dropoffDate: "",
  carCategory: "",
  gearbox: "",
  engineType: "",
  minPrice: 0,
  maxPrice: 10000,
  // page:1,
  // dropoffOptions: availableLocations,
  krk: false,
};

 
const initialState: CarFilterState = {
  // carList:carList,
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  dropoffDate: "",
  carCategory: "",
  gearbox: "",
  engineType: "",
  minPrice: 0,
  maxPrice: 10000,
  // page:1,
  // dropoffOptions: availableLocations,
  krk: false,
};
 
const carFilterSlice = createSlice({
  name: "carFilter",
  initialState,
  reducers: {
    updateFilter<K extends keyof CarFilterState>(
      state: { [x: string]: CarFilterState[K]; },
      action: PayloadAction<{ key: K; value: CarFilterState[K] }>
    ) {
      const { key, value } = action.payload;
      (state[key] as CarFilterState[K]) = value;
    },
    resetFilters() {
      return { ...initialState };
    },
    set_state_to_old_carslice(){
      return JSON.parse(JSON.stringify(preserved_state))
    }
    // setDropoffOptions(state, action: PayloadAction<string[]>) {
    //   state.dropoffOptions = action.payload;
    // },
  },
});

const carFilterReducer=carFilterSlice.reducer
 
export const { updateFilter, resetFilters, set_state_to_old_carslice
  // setDropoffOptions 
} =
  carFilterSlice.actions;
 
export default carFilterReducer;