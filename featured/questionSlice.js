import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: {
    numero: null,
    consigne: null,
    libelle:
      "https://uploadthing.com/f/ec7c0678-c83b-4231-b4fb-1196556805fe_im.png",
    discipline: {
      libelle: null,
      duree: null,
    },
    categorie: {
      libelle: null,
      point: null,
    },
    suggestion1: { text: null, isCorrect: false },
    suggestion2: { text: null, isCorrect: false },
    suggestion3: { text: null, isCorrect: false },
    suggestion4: { text: null, isCorrect: false },
    suggestions: [],
    duree: 3,
  },
  EEquestion: {
    numero: null,
    tasks: null,
    typeProduction: null,
  },
  questionsSelect: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setEEQuestion: (state, action) => {
      state.EEquestion = action.payload;
    },
    setQuestionsSelect: (state, action) => {
      state.questionsSelect = action.payload;
    },
  },
});

export const { setQuestion, setQuestionsSelect, setEEQuestion } = questionSlice.actions;
export const selectQuestion = (state) => state.question.question;
export const selectEEQuestion = (state) => state.question.EEquestion;
export const selectQuestionsSelect = (state) => state.question.questionsSelect;
export default questionSlice.reducer;
