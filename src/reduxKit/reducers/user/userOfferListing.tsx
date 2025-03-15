 
import { GetOffersByBrand,GetBrandsWithService,GetOffersDetail } from "../../actions/user/userOfferListing";
 
 
import { createSlice,  } from "@reduxjs/toolkit";
 

 
 
export interface ProfileLoadingStatus {
  error: string | null;
  OfferListingloading: boolean
}

const initialStateForProfileLoading:ProfileLoadingStatus = {
  error: null,
  OfferListingloading: false,
}

  
 


 export const OfferListing = createSlice({
   name: '/userProfileSlice',
   initialState: initialStateForProfileLoading,
   reducers : {
    updateError : (state, {payload})=> {
      state.error = payload;
    }
   },
   extraReducers : (builder) => {
    builder 
    .addCase(GetBrandsWithService.pending, (state)=> {
      state.OfferListingloading = true;
      state.error = null;
    })
    .addCase(GetBrandsWithService.fulfilled, (state , {payload}) => {
      console.log("Payload after language change:", payload);
      state.OfferListingloading = false;
      state.error = null;
    })
    .addCase(GetBrandsWithService.rejected, (state , {payload}) => {
      state.OfferListingloading= false;
      state.error = payload as string;
    })



    .addCase(GetOffersByBrand.pending, (state)=> {
      state.OfferListingloading = true;
      state.error = null;
    })
    .addCase(GetOffersByBrand.fulfilled, (state , {payload}) => {
      console.log("Payload after language change:", payload);
      state.OfferListingloading = false;
      state.error = null;
    })
    .addCase(GetOffersByBrand.rejected, (state , {payload}) => {
      state.OfferListingloading= false;
      state.error = payload as string;
    })

    .addCase(GetOffersDetail.pending, (state)=> {
      state.OfferListingloading = true;
      state.error = null;
    })
    .addCase(GetOffersDetail.fulfilled, (state , {payload}) => {
      console.log("Payload after language change:", payload);
      state.OfferListingloading = false;
      state.error = null;
    })
    .addCase(GetOffersDetail.rejected, (state , {payload}) => {
      state.OfferListingloading= false;
      state.error = payload as string;
    });
   },
 })

 export default OfferListing.reducer;