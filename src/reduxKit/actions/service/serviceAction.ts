import { createAsyncThunk } from "@reduxjs/toolkit";
import { configWithToken,axiosIn } from "../../../config/constants";






export interface Iservice{
    name: string
    nameAr:string 
    icon:File|null
}

export const GetServiceAction = createAsyncThunk(
    "user/getService",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "user get service ");
            const response = await axiosIn.get(`/user/service`,configWithToken());
            console.log("user service data is ", response);
            return response.data.data;
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