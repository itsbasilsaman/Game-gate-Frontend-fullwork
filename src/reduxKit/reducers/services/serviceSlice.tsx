import { createSlice } from "@reduxjs/toolkit";
import { userServiceAction } from "../../actions/user/service";

interface Service {
  icon: string;  
  ServiceName: string;
}

interface ServicesState {
  services: Service[];
  Serviceloading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  Serviceloading: false,
  error: null,
};

 export const ServiceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userServiceAction.pending, (state) => {
        state.Serviceloading = true;
        state.error = null;
      })

      .addCase(userServiceAction.fulfilled, (state, action) => {
        state.error = null;
        state.Serviceloading = false;
        state.services = action.payload;
        console.log(
          "this console form service slice , payload ",
          action.payload
        );
      })
      .addCase(userServiceAction.rejected, (state, action) => {
        state.Serviceloading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateError } = ServiceSlice.actions;
export default ServiceSlice; 
