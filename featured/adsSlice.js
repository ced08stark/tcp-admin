import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ads: {
    id: null,
    nomPrestataire: null,
    startDate: new Date(),
    endDate: new Date(),
    countClic: 0,
    linkTarget: null,
    adsPicture: null,
    localisation: null
  },
};

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const { setAds } = adsSlice.actions;
export const selectAds = (state) => state.ads.ads;
export default adsSlice.reducer;
