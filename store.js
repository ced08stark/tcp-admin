import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./featured/questionSlice";
import serieSlice from "./featured/serieSlice";


export const store = configureStore({
  reducer: {
    question: questionSlice,
    serie: serieSlice
  },
});
