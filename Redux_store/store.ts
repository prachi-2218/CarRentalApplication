
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";
import userReducer from './slices/userSlice';
import carFilterReducer from './slices/carSlice';
// import selectedCarReducer from './slices/selectedCarSlice';
import setLocations  from "./slices/locationSlice";
import locationMetaReducer from './slices/location_key_value_pair';
import carCardGridReducer from "./slices/carCardGridSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
    booking: bookingReducer,
    carCardGrid:carCardGridReducer,
    carFilter:carFilterReducer,
    locations:setLocations,
    locationMeta: locationMetaReducer,
    // selectedCar: selectedCarReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
