import { createSlice } from "@reduxjs/toolkit";
import { supportedLanguages } from "../../../strings/strings";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Test User",
    isBlack: true,
    language: supportedLanguages.arabic
  },
  reducers: {
    switchTheme: (state) => {
      return { ...state, isBlack: !state.isBlack };
    },
    setBlack: (state)=>{
      return {...state, isBlack: true}
    },
    setWhite: (state)=>{
      return {...state, isBlack: false}
    },

    changeLanguage: (state, language)=>{
      return {...state, language}
    }

  },
});

export const { switchTheme,setBlack,setWhite, changeLanguage } = userSlice.actions;

export default userSlice.reducer;
