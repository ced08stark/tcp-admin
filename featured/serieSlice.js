import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serie: null,
};

export const serieSlice = createSlice({
  name: "serie",
  initialState,
  reducers: {
    setSerie: (state, action) => {
      state.serie = action.payload;
    },
   
  },
});

export const { setSerie } = serieSlice.actions;
export const selectSerie = (state) => state.serie.serie;
export default serieSlice.reducer;
