/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";


  
export const GetBrandsWithService = createAsyncThunk(
    "user/GetBrandsWithService",
    async ({ServiceId, SubserviceId , page , limit}:{ServiceId: string;  SubserviceId:string; page: number; limit: number}, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/offer-listing/products?page=${page}&limit=${limit}&search&serviceId=${ServiceId}&subServiceId=${SubserviceId}`,configWithToken());
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
    async (
      { productId, deliveryMethod }: { productId: string; deliveryMethod?: string }, 
      { rejectWithValue }
    ) => {
      try {
        // Construct query parameters dynamically
        const queryParams = new URLSearchParams({ productId });
        if (deliveryMethod) {
          queryParams.append("deliveryType", deliveryMethod); // Fixed parameter name
        }
  
        const response = await axiosIn.get(
          `/user/offer-listing/products/offers?${queryParams.toString()}`,
          configWithToken()
        );
  
        return response;
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



  export const GetSubServices = createAsyncThunk(
    "user/GetSubServices",
    async (serviceId: string, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(
          `/user/offer-listing/subservices?serviceId=${serviceId}`,
       
        );
        console.log("response of GetSubServices", response.data);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "Something went wrong!" });
        }
      }
    }
  );
  
  