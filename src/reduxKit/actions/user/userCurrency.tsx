
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userCurrencyChange = createAsyncThunk(
    "user/userCurrencyChange",
    async (currency:string, { rejectWithValue }) => {
      try {
           const currencynOw=currency
        return currencynOw 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "Something went wrong!" });
        }
      }
    }
  );
  
  