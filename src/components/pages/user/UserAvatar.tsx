import { useState, useEffect, useRef } from 'react';
import { MdLogout } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../reduxKit/store';

import { userLogout } from '../../../reduxKit/actions/auth/authAction';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Loading } from '../../../Loading';
 

export const UserAvatar: React.FC = () => {
 
  const [isOpen, setIsOpen] = useState(false);
 const navigate = useNavigate();


  const { GetProfileloading , UserProfileData} = useSelector((state: RootState) => state.profile);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const formattedDate = UserProfileData?.memberSince ?   new Date (UserProfileData.memberSince).toLocaleString("en-US", {
    year:'numeric',
    month: 'long',
    day:'numeric'
  }) : ' '

 
  const handleLogout = async () => {
    try {

      const response=  await dispatch(userLogout()).unwrap();

        toast.success(response.message);
         navigate('/'); // Redirect to login page after logout  
    } catch (error) {
      console.error("Logout failed: ", error);
       const errorMessage = (error instanceof Error) ? error.message : String(error);
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: errorMessage,
              timer: 3000,
              toast: true,
              showConfirmButton: false,
              timerProgressBar: true,
              background: '#fff',
              color: '#721c24',
              iconColor: '#f44336',
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });
    }
  };

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  
   useEffect(() => {
     const fetchProfile = async () => {
       try {
    console.log("ARAVATHAR PROFILE LOADING  and DATA :",UserProfileData);
        
        // await setformData(UserProfileData.)
       } catch (error) {
         console.error("Unexpected error while fetching the profile: ", error);
       }
     };
 
     fetchProfile();
   }, [UserProfileData]);
 
    if (GetProfileloading) {
      <Loading/>
    }
  
  return (
    <>
      
        <div   className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div
            className="relative text-black flex items-center justify-center cursor-pointer"
            onClick={toggleSection}
          >
           { UserProfileData?.avatar ?
            <div
              className={`w-[55px] h-[55px]  rounded-full  `}
            >
               <img 
                src={UserProfileData.avatar instanceof File ? URL.createObjectURL(UserProfileData.avatar) : UserProfileData.avatar} 
                  alt="" 
                className="w-full h-full rounded-full object-cover" 
/>

            </div>
            :
            <div
            className={`w-[55px] h-[55px] bg-red-800 pb-[5px] profile-bar text-white rounded-full flex items-center justify-center text-2xl font-bold`}
          >
             {UserProfileData?.firstName ? UserProfileData.firstName.charAt(0).toUpperCase() : (
              <div className="w-full h-full  shimmer rounded-full"></div>
             )}
          </div>
            
          }
            <div
              className={`absolute bottom-0 right-1 w-4 h-4 userstatus-bar text-black  border-2 border-green-400 bg-green-400 rounded-full`}
            ></div>
          </div>

          {/* Toggle Section */}
          {isOpen && (
            <div className="absolute mt-2 right-0 py-4 text-black w-[370px]  header-dropdown rounded-lg shadow-md">
              <div className="  rounded-lg  max-w-md mx-auto">
                {/* Header */}
                <Link to={'/profile'}>
                  <div className="flex items-center space-x-4 border-b pb-4 mb-4 px-4">
                   {UserProfileData?.avatar ? <div
                      className={`w-12 h-12   rounded-full`}
                    >
                    <img 
                      src={UserProfileData.avatar instanceof File ? URL.createObjectURL(UserProfileData.avatar) : UserProfileData.avatar} 
                      alt="" 
                      className="w-full h-full rounded-full object-cover" 
/>

                    </div>
                    :
                    <div
                      className={`bg-red-800 text-white w-12 h-12 flex items-center justify-center rounded-full text-xl font-bold`}
                    >
                      {UserProfileData?.firstName ? UserProfileData.firstName.charAt(0).toUpperCase() : ' '}
                    </div>
                    }
                    <div>
                      <h1
                        className="text-lg font-semibold primary-color"
                        style={{ fontFamily: 'Unbounded' }}
                      >
                         {UserProfileData?.userName}
                      </h1>

                      <p className="text-sm text-gray-700"> 
                       Level {UserProfileData?.level?.level}
                      </p>
                      <p className="text-sm text-gray-700">
                          {UserProfileData?.email}
                      </p>
                    </div>
                  </div>
                </Link>


                {/* Balances */}
                <div className="space-y-4">
                  <div className="flex justify-center items-center px-4">
                      <span className="text-[20px] font-medium primary-color"   style={{ fontFamily: 'Unbounded' }}>
                        {UserProfileData?.firstName} {UserProfileData?.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div className="text-sm font-medium primary-color  flex flex-col">
                        <span>Followers </span>  <span className='text-center text-[25px] py-2'   style={{ fontFamily: 'Unbounded' }}>{UserProfileData?.followersCount}</span>
                      </div>
                      <div className="text-sm font-medium primary-color flex flex-col">
                        <span>Following</span>  <span className='text-center text-[25px] py-2'   style={{ fontFamily: 'Unbounded' }}>{UserProfileData?.folowingCount}</span>
                      </div>
                    </div>
                   
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium primary-color">
                        Member Since 
                      </span>
                      <span className="text-sm primary-color">
                      {formattedDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm font-medium primary-color">
                        Country 
                      </span>
                      <span className="text-sm primary-color">
                      {UserProfileData?.country}
                      </span>
                    </div>
                  </div>

                {/* Navigation */}
                <div className="mt-3">
                  <ul className="space-y-2">
                    <li>
               
                        <button    onClick={handleLogout}  className="w-full text-left text-sm primary-color hover:bg-gray-200 py-3 rounded-lg flex justifu-center items-center gap-[6px] px-4"   style={{ fontFamily: 'Unbounded' }}>
                          <MdLogout className="text-[19px] "  /> Log Out 
                        </button>
                  
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      
    </>
  );
};
