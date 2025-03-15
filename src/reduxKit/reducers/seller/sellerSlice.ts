import { createSlice } from '@reduxjs/toolkit';
import { SellerRegistrationAction,GetOtherSellersAction } from '../../actions/seller/seller';



interface ServicesState {

    loading: boolean;
    error: string | null;
  }
  
  const initialState: ServicesState = {
    loading: false,
    error: null,
  };

 export const SellerSlice = createSlice({
    name: 'selling',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder
        .addCase(SellerRegistrationAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })

        .addCase(SellerRegistrationAction.fulfilled, (state, action) => {
          state.error = null;
          state.loading = false;
          console.log("this registration of seller  ", action.payload);
        })
        .addCase(SellerRegistrationAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(GetOtherSellersAction.pending, (state) => {
          state.loading = true;
          state.error = null;
         
        })

        .addCase(GetOtherSellersAction.fulfilled, (state, action) => {
            state.error=null
          state.loading = false;
          console.log("this after get sellers  ", action.payload);
        })
        .addCase(GetOtherSellersAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    }
})

