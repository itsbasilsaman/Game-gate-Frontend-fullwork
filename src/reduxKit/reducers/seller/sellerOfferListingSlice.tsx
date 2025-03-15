import { createSlice } from '@reduxjs/toolkit';
import { GetOffersFromSeller,UpdateOfferFromSeller,GetOfferByIdFromSeller } from '../../actions/seller/offerListing';



interface ServicesState {
    OfferListloading: boolean;
    error: string | null;
  }
  
  const initialState: ServicesState = {
    OfferListloading: false,
    error: null,
  };

 export const SellerOfferListSlice = createSlice({
    name: 'OfferListing',
    initialState,
    reducers: {},
     extraReducers: (builder) => {
      builder
        .addCase(GetOffersFromSeller.pending, (state) => {
          state.OfferListloading = true;
          state.error = null;
        })

        .addCase(GetOffersFromSeller.fulfilled, (state, action) => {
            state.error=null
          state.OfferListloading = false;
          
          console.log(" ", action.payload);
        })
        .addCase(GetOffersFromSeller.rejected, (state, action) => {
          state.OfferListloading = false;
          state.error = action.payload as string;
        })
        .addCase(GetOfferByIdFromSeller.pending, (state) => {
          state.OfferListloading = true;
          state.error = null;
        })

        .addCase(GetOfferByIdFromSeller.fulfilled, (state, action) => {
            state.error=null
          state.OfferListloading = false;
          
          console.log("this console getoffer", action.payload);
        })
        .addCase(GetOfferByIdFromSeller.rejected, (state, action) => {
          state.OfferListloading = false;
          state.error = action.payload as string;
        })
        .addCase(UpdateOfferFromSeller.pending, (state) => {
          state.OfferListloading = true;
          state.error = null;
        })

        .addCase(UpdateOfferFromSeller.fulfilled, (state, action) => {
          state.error = null
          state.OfferListloading = false;
          
          console.log("this console getoffer", action.payload);
        })
        .addCase(UpdateOfferFromSeller.rejected, (state, action) => {
          state.OfferListloading = false;
          state.error = action.payload as string;
        });
    }
})

