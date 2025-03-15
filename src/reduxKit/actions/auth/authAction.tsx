
import axios  from "axios";
import { URL, config , configWithToken } from "../../../config/constants";
import { ILoginUser } from "../../../interfaces/user/userLoginInterfaces";
import { IVerifyOtp } from "../../../interfaces/user/userLoginInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSignup } from '../../../interfaces/user/userSignupInterface';


export const axiosIn = axios.create({
    baseURL: URL,
  });

  interface VerifyOtpResponse {
    success: boolean;
    data?: {
      accessToken?: string;
      refreshToken?: string;
    };
    message?: string;
  }
  



  
  export const loginUser = createAsyncThunk( "user/send-otp",
    async (userCredentials:ILoginUser,{rejectWithValue})=>{
        try {
            const response  = await axiosIn.post(`/user/send-otp`,userCredentials, config );
            return response.data
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

  

  export const getATKWithRTKUser = createAsyncThunk( "user/get access with refresh ",
    async (__,{rejectWithValue})=>{
        try {
           const refreshToken = localStorage.getItem("refreshToken");
        
                    // Redirect to user/home if refreshToken is null or undefined
                    if (!refreshToken) {
                      console.log("Refresh Token is missing! Navigating to /user/home...");
                      return; // Stop execution
                    }
           
           const Tdata={
            refreshToken:refreshToken
           }
            const response  = await axiosIn.post(`/admin/refresh-token`,Tdata, config );
            console.log("the ^%^%^%^% ", response );
            
            
            return response
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

  export const verifiyOtpUser = createAsyncThunk( "user/verify-otp",
    async (userCredentials:IVerifyOtp,{rejectWithValue})=>{
        try {
          console.log("this is verify otp action ", userCredentials);
          
          const response = await axiosIn.post<VerifyOtpResponse>(`/user/verify-otp`,userCredentials, config );
           console.log("the status of user ",response.status);
            console.log("verirf action _______sds___***____",response.data);
        
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


  export const SignupUser= createAsyncThunk( "user/SignupUser",
    async (userCredentials:UserSignup,{rejectWithValue})=>{
        try {
          console.log("4444444data for user signup the data ___", userCredentials);
            const  response = await axiosIn.post(`/user/create-account`,userCredentials, config );
            console.log("the filled data of the signup ", response.data );
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





    
export const userLogout = createAsyncThunk(
  "user/logout",
  async (__, { rejectWithValue }) => {
    try {
        const response= await axiosIn.post(`/user/logout`,{}, configWithToken() )
        console.log("the LLLLOOOGGOUT response data 1 ", response.data );
          return response.data
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

 

