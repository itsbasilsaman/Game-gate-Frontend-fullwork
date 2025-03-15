import { UserProfileData } from './../../../interfaces/user/profile';
 
import { getUserProfile } from "../../actions/user/userProfile";

 
 
import { createSlice,  } from "@reduxjs/toolkit";
 

 
 
export interface ProfileLoadingStatus {
  error: string | null;
  GetProfileloading: boolean
  UserProfileData: UserProfileData | null;
}

const initialStateForProfileLoading:ProfileLoadingStatus = {
  error: null,
  GetProfileloading: false,
  UserProfileData: null,
}
 
 export const ProfileSlice = createSlice({
   name: '/userProfileSlice',
   initialState: initialStateForProfileLoading,
   reducers : {
    updateError : (state, {payload})=> {
      state.error = payload;
    } 
   },
   extraReducers : (builder) => {
    builder 
    .addCase(getUserProfile.pending, (state)=> {
      state.GetProfileloading = true;
      state.error = null;
    })
    .addCase(getUserProfile.fulfilled, (state , {payload}) => {
      console.log("Payload after language change ONE:", payload);
      state.GetProfileloading = false;
      state.error = null;
      state.UserProfileData = payload.data.data as UserProfileData;
    })
    .addCase(getUserProfile.rejected, (state , {payload}) => {
      state.GetProfileloading= false;
      state.error = payload as string;
    });
   },
 })

 export default ProfileSlice.reducer;