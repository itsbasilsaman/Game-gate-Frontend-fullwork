



import { userLanguageChange } from "../../actions/user/userLanguage";
import { createSlice,  } from "@reduxjs/toolkit";

export interface UserLanguageState {
    userLanguage:string|null
    error: string | null;
    loading: boolean;
  }
  const initialStateForLanguage: UserLanguageState = {
    userLanguage:JSON.parse(localStorage.getItem("userLanguage") || `"English"`),
    error: null,
    loading: false,
  };


  
export const userLanguageSlice = createSlice({
    name: "/userLanguage",
    initialState: initialStateForLanguage,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
  

    extraReducers: (builder) => {
      builder
        .addCase(userLanguageChange.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userLanguageChange.fulfilled, (state, { payload }) => {
          console.log("Payload after language change:", payload);
          state.loading = false;
          state.error = null;
          state.userLanguage = payload;
          localStorage.setItem("userLanguage", JSON.stringify(state.userLanguage));
        })
        .addCase(userLanguageChange.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        });
    },
  });
  
  