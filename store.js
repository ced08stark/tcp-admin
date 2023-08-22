import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./featured/questionSlice";
import serieSlice from "./featured/serieSlice";
import userSlice from "./featured/userSlice";
import testSlice from "./featured/testSlice"


export const store = configureStore({
  reducer: {
    question: questionSlice,
    serie: serieSlice,
    user: userSlice,
    test: testSlice
  },
});
