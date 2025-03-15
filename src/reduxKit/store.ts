/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import { userLanguageSlice } from "./reducers/user/userLanguage";
import { SellerSlice } from "./reducers/seller/sellerSlice";
import logAuthSlice from "./reducers/auth/user-seller-main-auth";
import { ProfileSlice } from "./reducers/user/profileSlice";
import {ServiceSlice} from "./reducers/services/serviceSlice"
import { userCurrencySlice } from "./reducers/user/userCurrency";
import { SellerOfferListSlice } from "./reducers/seller/sellerOfferListingSlice";



export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        userLanguage:userLanguageSlice.reducer,
        userCurrency:userCurrencySlice.reducer,
        seller:SellerSlice.reducer,
        sellerOfferListing:SellerOfferListSlice.reducer,
        logAuth:logAuthSlice.reducer,
        profile:ProfileSlice.reducer,
        service:ServiceSlice.reducer
        }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;