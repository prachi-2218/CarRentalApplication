// redux/locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Location {
  id:string;
  locationName: string;
  locationAddress: string;
  locationImageUrl: string;
}

const initialState: Location[] = [];

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (_state, action: PayloadAction<Location[]>) => {
      return action.payload; // replaces the whole array
    },
    // set_state_to_old_locationslice(){
    //   return []
    // }
  },
});


export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;
