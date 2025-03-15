import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import LanguageSection from "../../Header/LanguageSection";
import { IoCameraOutline } from "react-icons/io5";
import { getUserProfile , PutUserProfilePic , PutUserCoverPic } from "../../../reduxKit/actions/user/userProfile";
import { UserProfileData } from '../../../interfaces/user/profile';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowerModal";
 

 
export const UserProfileResponsive : React.FC  = () => {

  const [profileImage, setProfileImage] = useState<File | null | string>(null);
    const [coverImage, setCoverImage] = useState<File | null | string>(null);
    const [isEditing, setIsEditing] = useState<string | null>(null);
 
    const [profileLoading, setProfileLoading] = useState(false)
    const [formData, setProfiles] = useState<UserProfileData>();
    const [languages, setLanguages] = useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = React.useState(false);
    const openFollowersModal = () => setIsFollowersModalOpen(true);
    const closeFollowersModal = () => setIsFollowersModalOpen(false);
    const dispatch = useDispatch<AppDispatch>();
    // const { GetProfileloading } = useSelector(
    //   (state: RootState) => state.profile
    // );
    const [coverUploadLoad, setCoverUploadLoad] = useState<boolean>(false)
    const [profileUploadLoad, setProfileUploadLoad] = useState<boolean>(false)
  
    
  
    const handleEditClick = (field: string) => {
      setIsEditing(field);
    };
  
    const handleInputChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setProfiles((prev) => ({
        ...(prev as UserProfileData),
        [name]: value,
      }));
    };
  
    const handleSaveClick = () => {
      setIsEditing(null);
      console.log(formData);
    };
  
    const handleCoverUpload = async (
      e: React.ChangeEvent<HTMLInputElement>,
      action: typeof PutUserProfilePic | typeof PutUserCoverPic
    ) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setCoverUploadLoad(true); // Set loading state to true when upload starts
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const resultAction = await dispatch(action(formData));
          if (action.fulfilled.match(resultAction)) {
            console.log("Image uploaded successfully:", resultAction.payload);
    
            // Update the cover image state with the new image URL
            setCoverImage(URL.createObjectURL(file));
          } else {
            console.error("Failed to upload image:", resultAction.error);
          }
        } catch (error) {
          console.error("Unexpected error while uploading image:", error);
        } finally {
          setCoverUploadLoad(false); // Reset loading state after upload completes
        }
      }
    };
  
    const handleProfileChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
   
      action: typeof PutUserProfilePic | typeof PutUserCoverPic
    ) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setProfileUploadLoad(true)
        const formData = new FormData();
        formData.append('file', file);
  
        for(const [key,value] of formData){
         console.log('1111111111111111111111111ww',key,value);
  
        }
        try {
          
          const resultAction = await dispatch(action(formData));
          if (action.fulfilled.match(resultAction)) {
            console.log("Image uploaded successfully:", resultAction.payload);
  
            if(action === PutUserProfilePic){
              setProfileImage(URL.createObjectURL(file))
            } else if(action === PutUserCoverPic){
              setCoverImage(URL.createObjectURL(file))
            }
  
          } else {
            console.error("Failed to upload image:", resultAction.error);
          }
        } catch (error) {
          console.error("Unexpected error while uploading image:", error);
        }  finally {
          setProfileUploadLoad(false)
        } 
      }
    };
  
  
   
  
  
   
  
    // if (GetProfileloading) {
    //   console.log("the data of the content ");
    // }
  
    const getImageSrc = () => {
      if(profileImage instanceof File){
        return URL.createObjectURL(profileImage)
      }
      return profileImage || ""
    };
  
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          setProfileLoading(true)
          const resultAction = await dispatch(getUserProfile());
          if (getUserProfile.fulfilled.match(resultAction)) {
            const { data } = resultAction.payload;
            console.log("kidu profile $#$#$#$#$", data);
         
            setProfiles(data.data);
            setLanguages(data.data.languages);
            console.log(
              "Profile data fetched successfully: ",
              resultAction.payload
            );
          } else {
            console.log(
              "Failed to fetch profile: ",
              resultAction.payload || resultAction.error
            );
          }
        } catch (error) {
          console.error("Unexpected error while fetching the profile: ", error);
        } finally {
          setProfileLoading(false)
        }
      };
      fetchProfile();
    }, [dispatch]);
  
    useEffect(() => {
      console.log("this is my profiles of in page *****************", formData);
      console.log("my languages are", languages);
      if(formData?.coverPic && formData?.avatar) {
        setProfileImage(formData.avatar)
        setCoverImage(formData.coverPic)
      }
    }, [formData]);
  
   
  
    if(profileLoading){
      return (
        <div className="loading-backdrop w-full h-full loading-bg"   >
        <div className="flex justify-center items-center h-screen">
          <div className="flex items-center flex-col">
            <div className="w-12 h-12 border-5 border-t-4 border-t-gray-150 border-gray-100 rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-[22px] font-semibold tracking-wide" style={{ fontFamily: 'Unbounded' }}>
              Loading<span className="dot-animation mr-[6px]">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </p>
            
            <p className="text-sm text-white mt-2 font-semibold">
              Please wait, your content is on the way.
            </p>
          </div>
        </div>
      </div>
      )
    }
   



  return (
    <>
     <section className="lg:hidden block w-[100%] h-[100%] profile-section   pb-[25px]   flex flex-col justify-start items-center gap-[30px]">
        <div>
          <div
            className="flex justify-center mb-4 relative pt-[22px]"
            style={{
              background: coverImage
                ? `url(${coverImage}) center/cover no-repeat`
                : `url('../../../assets/th.jpg')`,
            }}
          >
            {!coverUploadLoad && (
              <div className="cover-pic-button  absolute right-[0px] top-[0px]">
                <label
                  htmlFor="cover"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded   py-1 px-2 text-sm font-medium text-primary hover:bg-opacity-90"
                >
                  <input
                    type="file"
                    id="cover"
                    className="sr-only"
                    onChange={(e) => handleCoverUpload(e,  PutUserCoverPic)}
                  />
                  <span
                    className="text-white px-[6px] text-[18px] py-[6px] rounded-full"
                    style={{ backgroundColor: "#03042F" }}
                  >
                    <IoCameraOutline />
                  </span>
                </label>
              </div>
            )}

           <div className="h-30 rounded-full  bg-gray-50  backdrop-blur sm:p-3">
               <div className="w-[115px] h-[115px] bg-gray-200 text-white flex items-center justify-center rounded-full text-[55px] relative drop-shadow-2">
                 {profileUploadLoad ? (
                   <div className="flex flex-col items-center py-4">
                     <div className="w-9 h-9 border-[5px] border-[#101441] border-t-transparent rounded-full animate-spin shadow-lg"></div>
                   </div>
                 ) : (
                   profileImage ? (
                     <img
                       src={getImageSrc()}
                       alt="Profile"
                       className="w-full h-full rounded-full object-cover"
                     />
                   ) : (
                     <div className="w-full h-full rounded-full bg-red-800 flex items-center justify-center">
                       <span className="  text-[55px]">
                       {formData?.firstName ? formData.firstName.charAt(0).toUpperCase() : ' '}
                       </span>
                     </div>
                   )
                 )}
                 <label
                   htmlFor="profile"
                   className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-primary hover:bg-opacity-90 sm:bottom-2 sm:right-2 p-[8px]"
                 >
                   <svg
                     className="fill-current"
                     width="14"
                     height="14"
                     viewBox="0 0 14 14"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       fillRule="evenodd"
                       clipRule="evenodd"
                       d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                       fill=""
                     />
                     <path
                       fillRule="evenodd"
                       clipRule="evenodd"
                       d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                       fill=""
                     />
                   </svg>
                   <input
                     type="file"
                     name="profile"
                     id="profile"
                     className="sr-only"
                     onChange={(e) => handleProfileChange(e, PutUserProfilePic)}
                   />
                 </label>
               </div>
             </div>
          </div>

          <div className="px-[35px]">
          <div className="text-center mb-4">
          <h2
            className="text-[16px] primary-color"
            style={{ fontFamily: "Unbounded" }}
          >
            {formData?.userName}
          </h2>
          <p>Level {formData?.level.level}</p>
          <div className="mb-4">
            <div className="flex justify-between my-[6px]">
              <p>Level {formData?.level.level}</p>
              <p>
                {formData?.level?.level ? formData.level.level + 1 : "N/A"}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>

       

        <div className="w-full space-y-3">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 w-full ">
              <div className="flex-1">
                <p className="text-sm text-gray-600 w-full flex justify-between"><span className="primary-color font-medium ">Name</span>{formData?.firstName} {formData?.lastName}</p>
              </div>
              {/* <div className="flex-1">
                <p className="text-sm text-gray-600">
                  
                </p>
              </div> */}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="  w-full flex justify-between"><span className="primary-color font-medium mr-3">Email</span></p>
            </div>
            <p className="text-sm text-gray-600">{formData?.email}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-600 w-full flex justify-between">
            <span className="primary-color font-medium mr-3">Gender</span> {formData?.gender}
            </p>
          </div>
          <div className="  w-full">
            <div>
              <p className="text-sm text-gray-600 w-full flex justify-between"> 
              <span className="primary-color font-medium  ">Date of Birth</span>{" "}
               <span>
                  {formData?.dob
                    ? new Date(formData.dob).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
               </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center  mt-2">
          <div>
          <span className="primary-color font-medium mr-3">Description</span>
            {isEditing === "description" ? (
              <textarea
                name="description"
                value={formData?.description ?? ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-2 py-1 my-2"
                rows={3}
                cols={30}
              ></textarea>
            ) : (
              <p className="text-gray-800">{formData?.description}</p>
            )}
          </div>
          <FaEdit
            className="cursor-pointer text-gray-500"
            onClick={() => handleEditClick("description")}
          />
        </div>

        {isEditing && (
          <button
            className="w-full primary-background text-white py-2 px-4 rounded-md font-medium hover:bg-blue-900 mt-4"
            onClick={handleSaveClick}
          >
            Save Changes
          </button>
        )}

        <p className="text-sm text-gray-600 pt-2 pb-2 flex justify-between w-full"><span className="primary-color font-medium mr-3 ">Country</span> {formData?.country}</p>
        <LanguageSection />
       
        
        <div className="text-center mb-4 text-sm text-gray-500 flex justify-between mt-3">
          <p>Member since</p>
          <p className="font-medium">
            {formData?.memberSince
              ? new Date(formData.memberSince).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        
        <hr className="my-4" />
        
        <div className="flex justify-between text-center text-sm text-gray-500">
          <div onClick={openFollowersModal} className="cursor-pointer">
            <p className="font-medium text-gray-800">
              {formData?.followersCount}
            </p>
            <p>Followers</p>
          </div>
          <div onClick={openModal} className="cursor-pointer">
            <p className="font-medium text-gray-800">
              {formData?.folowingCount}
            </p>
            <p>Following</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-center mb-4 flex justify-between">
          <p className="text-sm text-gray-500">Successful delivery</p>
          <div>
            <p className="font-medium text-gray-800">
              {formData?.succesfullDeliveries}
            </p>
           
          </div>
        </div>
          </div>
        </div>
      </section>

      <FollowingModal isOpen={isModalOpen} onClose={closeModal} />
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={closeFollowersModal}
      />

    </>
  )
}