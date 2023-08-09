import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: null,
  questionsSelect: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setQuestionsSelect: (state, action) => {
      state.questionsSelect = action.payload;
    },
  },
});

export const { setQuestion, setQuestionsSelect } = questionSlice.actions;
export const selectQuestion = (state) => state.question.question;
export const selectQuestionsSelect = (state) => state.question.questionsSelect;
export default questionSlice.reducer;
