import { configureStore, createSlice } from '@reduxjs/toolkit';
import {flightDataSlice} from './flightSlice'

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: null, 
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload; 
    },
    clearData: (state) => {
      state.value = null; 
    },
  },
});


export const { setData, clearData } = dataSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    flightData: flightDataSlice.reducer
  },
});

export default store;
