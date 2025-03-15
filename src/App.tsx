/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";
import { Loading } from "./Loading";
import { AppDispatch, RootState } from "./reduxKit/store";
import { getUserProfile } from "./reduxKit/actions/user/userProfile";
// import { getATKWithRTKUser } from "./reduxKit/actions/auth/authAction";
import {userLoggedAction, userLoggedWithSellerAction} from "./reduxKit/actions/auth/user-seller-main-auth";
import NotFound404 from "./notFound404";
import NotFound401 from "./notFound401";
import ToggleProfile from "./components/pages/user/ToggleProfile";
import SellerRegistrationForm from "./components/seller/forms/SellerRegistrationForm";
import LanguageSection from "./components/Header/LanguageSection";
import AddNewOfferSection from "./components/pages/Seller/AddNewOfferSection";
import OfferDetailPage from "./components/pages/Seller/offerDetailComponent.tsx";
import GetOffer from "./components/pages/Seller/getOffer.tsx";
import GetOfferById from "./components/pages/Seller/getOfferById.tsx";
import { Profile } from "./components/forms/user/userProfile.tsx";
// import { Services } from './components/pages/user/Services';


const WelcomePage = lazy(() => import("./components/pages/welcome"));
const UserLogin = lazy(() => import("./components/forms/user/userLogin"));
const UserRegister = lazy(() => import("./components/forms/user/userSignup"));
const PasswordChange = lazy(() => import("./components/forms/user/changePassword"));
const Category = lazy(() => import("./components/pages/category"));
const ChatComponent = lazy(() => import("./components/pages/user/chat"));
const About = lazy(() => import("./components/pages/about"));

// const Profile = lazy(() => import("./components/forms/user/userProfile"));
const EmailVerification = lazy(() => import("./components/forms/user/verification.tsx"));
const TopUp = lazy(() => import("./components/pages/Offer-List/OfferList.tsx"));
const SellerPage = lazy(() => import("./components/pages/Seller/sellerPage"));
const SellerVerificationPending = lazy( () => import("./sellerVerificationPendingPage"));

export const App: React.FC = React.memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const [verificationStatus, setVerificationStatus] = useState("");
  const [userSellerProfile, setUserSellerProfile] = useState<any>(null);

  const navigate = useNavigate();
  const { isLoggedUser, isLoggedUserWithSeller } = useSelector(  (state: RootState) => state.logAuth);
  const { userCurrency } = useSelector(  (state: RootState) => state.userCurrency);
  const { userLanguage } = useSelector(  (state: RootState) => state.userLanguage);

  const [formData, setProfiles] = useState<any>(null);


  useEffect(()=>{
    console.log("The current UserLanguage ",userLanguage," Current Currency : ",userCurrency);
    console.log("The current isLoggedUser ",isLoggedUser," Current isLoggedUserWithSeller : ",isLoggedUserWithSeller,"Current user Verification Status: ",verificationStatus);
    },[userCurrency,userLanguage])
    
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const resultAction = await dispatch(getUserProfile());
   
          if (getUserProfile.fulfilled.match(resultAction)) {
            const { data, status } = resultAction.payload;
            if (status === 200 ) {
              await dispatch(userLoggedAction());
              await setProfiles(data);
              if (data.data.sellerProfile === null) {
                setUserSellerProfile(null);
              } else {
                setVerificationStatus(data.data.sellerProfile.verificationStatus);
              }
  
              if (    formData?.data?.sellerProfile?.verificationStatus === "APPROVED"  ) {

                await dispatch(userLoggedWithSellerAction());
              }else{
               console.log("the Status of the seller is ",formData);
                
              }
            }
            }
         
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }, [dispatch, navigate,isLoggedUser]);
  


  if (formData) {
    console.log(
      "App.tsx currend data : ",
      formData,
      "staaaaaaaaatus: ",
      verificationStatus,"maanasam",userSellerProfile
    );
  }


  return (
    <Fragment>
      <Toaster position="top-center" />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/user/login"
            element={isLoggedUser ? <Navigate to="/" /> : <UserLogin />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/user/signup"
            element={isLoggedUser ? <Navigate to="/" /> : <UserRegister />}
          /> 
          <Route
            path="/user/changePassword"
            element={isLoggedUser ? <Navigate to="/" /> : <PasswordChange />}
          />
          <Route path="/user/Category" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<ChatComponent />} />
      
          <Route
            path="/user/verification"
            element={isLoggedUser ? <Navigate to="/" /> : <EmailVerification />}
          />
          <Route path="/user/offer-list" element={<TopUp />} />
          <Route
            path="/user/seller"
            element={ verificationStatus === "PENDING" && isLoggedUser ? ( <SellerVerificationPending />  ) :
               verificationStatus === "APPROVED" &&  isLoggedUserWithSeller ? ( <AddNewOfferSection />) : userSellerProfile===null && isLoggedUser?(<SellerPage/>):
                ( <Navigate to="/" /> )
            }
          />

          {/* SELLER ROUTES */}
          <Route path="/toggle" element={<ToggleProfile />} />

          <Route
            path="/user/sellerSignup"
            element={ isLoggedUser&&userSellerProfile===null ? <SellerRegistrationForm /> : <Navigate to="/" /> }
          />
          <Route path="/user/languageSelect" element={<LanguageSection />} />
          <Route
            path="/user/selectDetailsOffer"
            element={
              verificationStatus === "PENDING" && isLoggedUser ? ( <SellerVerificationPending /> ) :
               verificationStatus === "APPROVED" ||
                isLoggedUserWithSeller ? ( <AddNewOfferSection />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          
          <Route
            path="/user/offerDetail"
            element={
            <OfferDetailPage />
            }
          />

          {/* ERROR HANDLING */}
          <Route path="/*" element={<NotFound404 />} />
          <Route path="/401" element={<NotFound401 />} />
          <Route path="/seller/offer" element={<GetOffer/>} />
          <Route path="/seller/offer/:id" element={<GetOfferById/>} />
          <Route path="/loading" element={<Loading/>} />
        </Routes>
      </Suspense>
     
    </Fragment>
  );
});
