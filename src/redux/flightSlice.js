import { createSlice } from '@reduxjs/toolkit';

export const flightDataSlice = createSlice({
  name: 'data',
  initialState: {
    value: [], 
  },
  reducers: {
    addFlightData: (state, action) => {
      state.value.push(action.payload);
    },

    setFlightData: (state, action) => {
      state.value = action.payload; 
    },
    removeFlightData: (state, action) => {
      state.value.splice(action.payload, 1); 
    },
    clearFlightData: (state) => {
      state.value = [];
    },
  },
});

export const { addFlightData, setFlightData, clearFlightData,removeFlightData } = flightDataSlice.actions;
export default flightDataSlice.reducer;
