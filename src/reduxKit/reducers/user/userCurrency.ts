



import { userCurrencyChange } from "../../actions/user/userCurrency";
import { createSlice,  } from "@reduxjs/toolkit";

export interface UserCurrencyState {
    userCurrency:string|null
    error: string | null;
    loading: boolean;
  }
  const initialStateForCurrency: UserCurrencyState = {
    userCurrency:JSON.parse(localStorage.getItem("userCurrency") || `"SAR"`),
    error: null,
    loading: false,
  };
  
export const userCurrencySlice = createSlice({
    name: "/userCurrency",
    initialState: initialStateForCurrency,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
  

    extraReducers: (builder) => {
      builder
        .addCase(userCurrencyChange.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userCurrencyChange.fulfilled, (state, { payload }) => {
          console.log("Current Currency of the user : ", payload);
          state.loading = false;
          state.error = null;
          state.userCurrency = payload;
          localStorage.setItem("userCurrency", JSON.stringify(state.userCurrency));
        })
        .addCase(userCurrencyChange.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        });
    },
  });
  
  