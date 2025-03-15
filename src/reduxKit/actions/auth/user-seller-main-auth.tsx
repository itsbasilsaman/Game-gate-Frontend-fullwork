import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLoggedAction = createAsyncThunk(
    "user/user-logged",
    async (__, { rejectWithValue }) => {
      try {
        console.log("THE USER LOGGED ");
        return 
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
  
export const userLoggedWithSellerAction = createAsyncThunk(
    "user/user-logged-with-selleraction ",
    async (__, { rejectWithValue }) => {
      try {
          console.log("THE USER LOGGED-WITH-SELLER ACTION WORKED");
        return  
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
  
  