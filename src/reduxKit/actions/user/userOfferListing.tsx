/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";


  
export const GetBrandsWithService = createAsyncThunk(
    "user/GetBrandsWithService",
    async (ServiceId:string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/products?page=1&limit=10&search&serviceId=${ServiceId}&subServiceId`,configWithToken());
       console.log("response GetBrandsWithService ", response.data);
        return response.data; 
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

  export interface OfferResponse {
    data: {
      data: {
        data: {
          offers: any[]; // Replace `any[]` with the correct type of offers if known
        };
      };
    };
  }

export const GetOffersByBrand = createAsyncThunk(
    "user/GetOffersByBrand",
    async (productId:string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/products/offers?productId=${productId}&deliveryTypes=EMAIL`,configWithToken());

        return response; 
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
  
export const GetOffersDetail = createAsyncThunk(
    "user/GetOffersDetail",
    async (offerId:string|undefined, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/offer-details?offerId=${offerId}`,configWithToken());
       console.log("response of the GetOffersDetail ", response);
        return response.data; 
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
  