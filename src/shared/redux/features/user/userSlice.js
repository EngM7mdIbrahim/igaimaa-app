import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Test User",
    isBlack: true,
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
    }

  },
});

export const { switchTheme,setBlack,setWhite } = userSlice.actions;

export default userSlice.reducer;
