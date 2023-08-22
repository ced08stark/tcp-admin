import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tests: [],
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTests: (state, action) => {
      state.tests = action.payload;
    }
  },
});

export const { setTests } = testSlice.actions;
export const selectTest = (state) => state.test.tests;
export default testSlice.reducer;
