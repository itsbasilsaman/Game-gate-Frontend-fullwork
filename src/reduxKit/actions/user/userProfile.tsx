import { createAsyncThunk } from "@reduxjs/toolkit";
import axios  from "axios";
import { URL,configWithToken,configWithTokenMultiPart } from "../../../config/constants";
export const axiosIn = axios.create({
    baseURL: URL,
  });

  
export const getUserProfile = createAsyncThunk(
    "user/userProfile",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosIn.get(`/user/profile`,configWithToken());
        console.log("user profile response : ",response);
        
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
  
export const PutUserProfilePic = createAsyncThunk(
    "user/PutUserProfilePic",
    async (image:FormData, { rejectWithValue }) => {
      try {
        const response = await axiosIn.put(`/user/profile/avatar`,image, configWithTokenMultiPart());
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

export const PutUserCoverPic = createAsyncThunk(
    "user/PutUserCoverPic",
    async (image:FormData, { rejectWithValue }) => {
      try {
        const response = await axiosIn.put(`/user/profile/cover-pic`,image, configWithTokenMultiPart());
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