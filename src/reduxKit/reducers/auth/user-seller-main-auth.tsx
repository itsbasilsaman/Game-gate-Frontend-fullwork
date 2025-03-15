import { createSlice } from "@reduxjs/toolkit";
import { userLoggedAction,userLoggedWithSellerAction } from "../../actions/auth/user-seller-main-auth";
import { userLogout } from "../../actions/auth/authAction";


export interface UserState {
 
    error: string | null;
    loading: boolean;
    isLoggedUser: boolean;
    isLoggedUserWithSeller: boolean;
  }
  
  
  const initialState: UserState = {
   
    error: null,
    loading: false,
    isLoggedUser: (() => {
      try {
        const isLoggedUser = localStorage.getItem("isLoggedUser");
        return isLoggedUser ? JSON.parse(isLoggedUser) : false;
      } catch {
        return false;
      }
    })(),
    isLoggedUserWithSeller: (() => {
      try {
        const isLoggedUserWithSeller = localStorage.getItem("isLoggedUserWithSeller");
        return isLoggedUserWithSeller ? JSON.parse(isLoggedUserWithSeller) : false;
      } catch {
        return false;
      }
    })(),
   
  };
  


  
  export const logAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(userLoggedAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userLoggedAction.fulfilled, (state, { payload }) => {
          console.log("user login payload", payload);
          state.loading = false;
          state.error = null;
          state.isLoggedUser = true;
          state.isLoggedUserWithSeller=false
          localStorage.setItem("isLoggedUser", JSON.stringify(state.isLoggedUser));
        
        })
        .addCase(userLoggedAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.isLoggedUser = false
          state.error = payload as string;
        })
  
        .addCase(userLoggedWithSellerAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        
        .addCase(userLoggedWithSellerAction.fulfilled, (state, { payload }) => {
          console.log("user login payload", payload);
          state.loading = false;
          state.error = null;
          state.isLoggedUser = true;
          state.isLoggedUserWithSeller=true
          localStorage.setItem("isLoggedUser", JSON.stringify(state.isLoggedUser));
          localStorage.setItem("isLoggedUserWithSeller", JSON.stringify(state.isLoggedUserWithSeller));
        
        })
        .addCase(userLoggedWithSellerAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.isLoggedUser = false
          state.error = payload as string;
        })
  
        .addCase(userLogout.fulfilled, (state, { payload }) => {
          console.log("Removing the token from local storage", payload);
          state.loading = false;
          state.error = null;
          state.isLoggedUser = false;
          state.isLoggedUserWithSeller=false  
        })
       
       
  
    },
  });
  
  export const { updateError } = logAuthSlice.actions;
  export default logAuthSlice;
  