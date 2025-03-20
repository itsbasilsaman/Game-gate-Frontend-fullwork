import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  userLogout,
  verifiyOtpUser,
  SignupUser,
  getATKWithRTKUser,
} from "../../actions/auth/authAction";

export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;
  isLogged: boolean;
  _id?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
}

const initialState: UserState = {
  userData: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  error: null,
  loading: false,
  isLogged: (() => {
    try {
      const isLogged = localStorage.getItem("isLogged");
      return isLogged ? JSON.parse(isLogged) : false;
    } catch {
      return false;
    }
  })(),
  _id: (() => {
    try {
      const _id = localStorage.getItem("_id");
      return _id ? JSON.parse(_id) : null;
    } catch {
      return null;
    }
  })(),
  accessToken: (() => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      return accessToken ? JSON.parse(accessToken) : null;
    } catch {
      return null;
    }
  })(),
  refreshToken: (() => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      return refreshToken ? JSON.parse(refreshToken) : null;
    } catch {
      return null;
    }
  })(),
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log("User Login Payload", payload);
        state.loading = false;
        state.error = null;
        state.isLogged = true;
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

      .addCase(verifiyOtpUser.pending, (state) => {
        console.log("the otp verifyng pending ");
        state.loading = true;
        state.error = null;
      })

      .addCase(verifiyOtpUser.fulfilled, (state, { payload }) => {
        console.log("User verify OTP payload:", payload);
        state.loading = false;
        state.error = null;

        if (payload.data) {
          console.log(
            "User verify OTP access token:",
            payload.data.accessToken
          );
          console.log(
            "User verify OTP refresh token:",
            payload.data.refreshToken
          );

          // If tokens exist, update the state
          if (payload.data.accessToken) {
            state.isLogged = true;
            state.accessToken = payload.data.accessToken;
            state.refreshToken = payload.data.refreshToken;

            // Store tokens and login status in local storage
            localStorage.setItem(
              "accessToken",
              JSON.stringify(state.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(state.refreshToken)
            );
            localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
          } else {
            console.warn("Access token is not provided in the response.");
            // Do not mark as logged in if tokens are missing
            state.isLogged = false; 
          }
        } else {
          console.warn("No data received in OTP verification response.");
        }
      })
      .addCase(verifiyOtpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = false;
        state.error = null;
        state.userData = null;
        state.accessToken=null; 
        state.refreshToken=null
        localStorage.removeItem("isLoggedUser")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("isLoggedUserWithSeller")
        localStorage.clear()
        console.log("The user Logouted Successfull ");
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })



      .addCase(getATKWithRTKUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getATKWithRTKUser.fulfilled, (state,{payload}) => {
        state.loading = false;
        state.isLogged = false;
        state.error = null;
        if (payload?.data) {
          console.log(
            "User verify OTP access token:",
            payload.data.data.accessToken
          );
          console.log(
            "User verify OTP refresh token:",
            payload.data.data.refreshToken
          );

          // If tokens exist, update the state
          if (payload.data.data.accessToken) {
            state.isLogged = true;
            state.accessToken = payload.data.data.accessToken;
            state.refreshToken = payload.data.data.refreshToken;
            // Store tokens and login status in local storage
            localStorage.setItem(
              "accessToken",
              JSON.stringify(state.accessToken)
            );
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(state.refreshToken)
            );
            localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
          } else {
            console.warn("Access token is not provided in the response.");
            // Do not mark as logged in if tokens are missing
            state.isLogged = false;
          }
        } else {
          console.warn("No data received in OTP verification response.");
        }
    
      })
      .addCase(getATKWithRTKUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
     
      })
      .addCase(SignupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SignupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.isLogged = true;
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        localStorage.setItem("accessToken", JSON.stringify(state.accessToken));
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(state.refreshToken)
        );
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
      })
      .addCase(SignupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      });
  },
});

export const { updateError } = authSlice.actions;
export default authSlice;
