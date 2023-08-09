import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./featured/questionSlice";


export const store = configureStore({
  reducer: {
    question: questionSlice
  },
});
