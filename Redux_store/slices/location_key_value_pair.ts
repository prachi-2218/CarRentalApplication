// redux/locationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from './locationSlice';

interface LocationMetaState {
  [id: string]: Omit<Location, 'id'>;
}

const initialState: LocationMetaState = {};

const locationMetaSlice = createSlice({
  name: 'locationMeta',
  initialState,
  reducers: {
    setMetaFromArray(_, action: PayloadAction<Location[]>) {
      const newState: LocationMetaState = {};
      for (const loc of action.payload) {
        newState[loc.id] = {
          locationName: loc.locationName,
          locationAddress: loc.locationAddress,
          locationImageUrl: loc.locationImageUrl,
        };
      }
      return newState;
    },

    setMeta(state, action: PayloadAction<{ key: string; value: Omit<Location, 'id'> }>) {
      state[action.payload.key] = action.payload.value;
    },

    setBulkMeta(state, action: PayloadAction<LocationMetaState>) {
      return { ...state, ...action.payload };
    },

    resetMeta_locations_key_value() {
      return {};
    },
  },
});

export const { setMetaFromArray, setMeta, setBulkMeta, resetMeta_locations_key_value } = locationMetaSlice.actions;
export default locationMetaSlice.reducer;