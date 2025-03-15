import React, { useState, useRef } from "react";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { userLogout } from "../../../reduxKit/actions/auth/authAction";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Loading } from "../../../Loading";

const ToggleProfile: React.FC = React.memo(() => {
  const navigate=useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);
 
  const { GetProfileloading, UserProfileData } = useSelector(
    (state: RootState) => state.profile
  );
 

  const formattedDate = UserProfileData?.memberSince
    ? new Date(UserProfileData.memberSince).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : " ";

 

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(userLogout()).unwrap();
      console.log("Toggle Logout response data ", response);
      toast.success(response.message);
      navigate('/')
    } catch (error) {
      console.error("Logout failed: ", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#fff",
        color: "#721c24",
        iconColor: "#f44336",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };
  if (GetProfileloading) {
    <Loading />;
  }

 

  return (
    <>
      <div className="relative  " ref={dropdownRef}>
        <div className="mt-2 py-4 w-[100%] rounded-lg shadow-md">
          <div className="rounded-lg max-w-md mx-auto">
            {/* Header */}
            <div
              className="flex items-center space-x-4 pb-4 mb-4 px-4 cursor-pointer"
              onClick={toggleProfile}
            >
            { UserProfileData?.avatar  ? 
            <div
                className={`   w-12 h-12  rounded-full  `}
              >
             <img 
  src={UserProfileData.avatar instanceof File ? URL.createObjectURL(UserProfileData.avatar) : UserProfileData.avatar} 
  alt="" 
  className="w-full h-full rounded-full object-cover" 
/>

                  
              </div> :  
              <div
              className={` bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
            >
              {UserProfileData?.firstName
                ? UserProfileData.firstName.charAt(0).toUpperCase()
                : "X"}
                
            </div>
              }
              <div>
                <h1
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Unbounded" }}
                >
                  {UserProfileData?.userName || "userName"}
                </h1>
                <p className="text-sm text-gray-400">
                  Level {UserProfileData?.level?.level || "level"}
                </p>
                <p className="text-sm text-gray-400">
                  {UserProfileData?.email || "email"}
                </p>
              </div>
            </div>

            {/* Animated Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isProfileOpen ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {/* Balances */}
              <div className="space-y-4">
                <Link to={"/profile"}>
                  <div className="flex justify-center items-center px-4">
                    <span
                      className="text-[22px] font-medium text-white"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {UserProfileData?.firstName} {UserProfileData?.lastName}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between items-center px-4">
                  <div className="text-sm font-medium text-white  flex flex-col">
                    <span>Followers </span>{" "}
                    <span
                      className="text-center text-[25px] py-2"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {UserProfileData?.followersCount}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-white flex flex-col">
                    <span>Following</span>{" "}
                    <span
                      className="text-center text-[25px] py-2"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {UserProfileData?.folowingCount}
                    </span>
                  </div>
                </div>
 
                <div className="flex justify-between items-center px-4">
                  <span className="text-sm font-medium text-white">
                    Member Since
                  </span>
                  <span className="text-sm text-white">{formattedDate}</span>
                </div>
                <div className="flex justify-between items-center px-4">
                  <span className="text-sm font-medium text-white">
                    Country
                  </span>
                  <span className="text-sm text-white">
                    {UserProfileData?.country}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-4">
                <ul className="space-y-2">
                  <li className="my-4">
                    <button
                      onClick={() => handleLogout}
                      className="w-full text-left text-[16px] font-semibold affiliate-section text-white py-[10px] rounded-full flex justify-center items-center gap-[6px] px-4"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      <MdLogout className="text-[22px]" /> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ToggleProfile;
