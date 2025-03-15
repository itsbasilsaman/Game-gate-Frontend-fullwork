/* eslint-disable @typescript-eslint/no-explicit-any */

import { configWithToken,axiosIn } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";


    export const GetOffersFromSeller= createAsyncThunk( "seller/userOfferListing",
      async (__,{rejectWithValue})=>{
          try {
              const  response = await axiosIn.get(`/seller/offer`, configWithToken() );
              console.log("Seller / Offers List  : ", response );
              return response.data;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) { 
              if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message); 
              } else {
                return rejectWithValue({ message: "Something went wrong!" });
              }
            }
      }
    )
  
  


    export const GetOfferByIdFromSeller= createAsyncThunk( "seller/GetOfferById",
      async (id:string | undefined,{rejectWithValue})=>{
          try {
              const  response = await axiosIn.get(`/seller/offer/${id}`,configWithToken());
              console.log("Seller Offer GetBy Id response  : ", response );
              return response.data;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) { 
              if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message); 
              } else {
                return rejectWithValue({ message: "Something went wrong!" });
              }
            }
      }
    )
  
    export const UpdateOfferFromSeller = createAsyncThunk(
      "seller/updateOffer",
      async ({ id, data }: { id: string | undefined; data: any }, { rejectWithValue }) => {
        try {
          const response = await axiosIn.put(
            `/seller/offer/${id}`,
            data, // Pass the updated data here
            configWithToken()
          );
          console.log("Seller Update Offer response: ", response);
          return response.data;
        } catch (error: any) {
          if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue({ message: "Something went wrong!" });
          }
        }
      }
    );
    
  
  