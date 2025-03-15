/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Flag from "../../../assets/Images/saudiaround.webp";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/gaminggate-logo.png";
import ToggleProfile from "./ToggleProfile";
import { UserAvatar } from "./UserAvatar";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useDispatch } from "react-redux";
import { GetServiceAction } from "../../../reduxKit/actions/service/serviceAction";
import { userLanguageChange } from "../../../reduxKit/actions/user/userLanguage";
import { userCurrencyChange } from "../../../reduxKit/actions/user/userCurrency";
import { UserProfileData } from "../../../interfaces/user/profile";
import { LocalizationSetting } from "./LocalizationSettingResponsive";

interface Items {
  id: string;
  iconUrl: string;
  name: string;
  nameAr: string;
  rounded?: string;
}

export const Navbar: React.FC = React.memo(() => {
  const { userCurrency } = useSelector(
    (state: RootState) => state.userCurrency
  );
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );

  const [service, setService] = useState<Items[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedItem] = useState<string>(
    userLanguage || "English"
  );
  const [selectedBoxItem, setSelectedBoxItem] = useState<string>(
    userCurrency === "USD" ? "United States Dollar (USD)" : "Saudi Riyal (SAR)"
  );
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [placeholder, setPlaceholder] = useState("Search in Game Gate");
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const { isLoggedUserWithSeller, isLoggedUser } = useSelector(  (state: RootState) => state.logAuth);
  const {UserProfileData}=useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const items: string[] = ["English", "Arabic"];
  const [profile, setProfile]=useState<UserProfileData|null>(null);

  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = (): void => {
    if (!isModalOpen) {
      // Set initial values when modal opens
      setSelectedItem(userLanguage || "English");
      setSelectedBoxItem(
        userCurrency === "USD"
          ? "United States Dollar (USD)"
          : "Saudi Riyal (SAR)"
      );
    }
    setIsModalOpen(!isModalOpen);
  };
  const toggleDropdown = (): void => {
    if (!dropdownOpen) {
      setDropdownOpen(true);
      setShowCategories(false);  
    } else {
      setShowCategories(!showCategories); // Toggle between views
      setDropdownOpen(!dropdownOpen);
    }
  };

useEffect(() => {
  if (UserProfileData) {
    console.log("navbar profile data", UserProfileData);
    setProfile(UserProfileData);
  }
}, [UserProfileData]);

  const togglePanel = (): void => {
    setIsPanelOpen(!isPanelOpen);
  };
if(profile){console.log(" ", profile.sellerProfile?.verificationStatus );
}
 

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedBoxItem(event.target.value);
    setShowWarning(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedItem(event.target.value);
  };

  const handleSave = async () => {
    if (!selectedBoxItem) {
      setShowWarning(true);
      return;
    }
    setIsLoading(true); // Show loader
 
    const currencyCode =
      selectedBoxItem === "United States Dollar (USD)" ? "USD" : "SAR";
 
    console.log("Selected Language:", selectedLanguage);
    console.log("Selected Currency Code:", currencyCode); // Log the currency code
    await dispatch(userLanguageChange(selectedLanguage));
    await dispatch(userCurrencyChange(currencyCode));
    setIsLoading(false);
    toggleModal(); // Close modal after saving
    // 2-second delay for the loader
  };

  // Calculate the background color based on scroll position
  const background: string = `linear-gradient(to bottom left, #030535,rgb(22, 26, 73))`;

  const handleServiceNested = async (item: Items) => {
    try {
      if (item.id) {
        navigate(
          `/user/offer-list?serviceId=${item.id}&name=${item.name}&nameAr=${item.nameAr}&iconUrl=${item.iconUrl}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPanelOpen]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await dispatch(GetServiceAction());
        setService(response.payload);
      } catch (error) {
        console.error("Error fetching services", error);
      } 
    };
    getServices();
  }, [dispatch, profile]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 400) {
        setPlaceholder("");
      } else if (window.innerWidth <= 500) {
        setPlaceholder("Search");
      } else {
        setPlaceholder("Search in Game Gate");
      }
    };

    // Call once to set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    <div
    className="flex justify-center fixed items-center text-white lg:px-[90px] px-[25px] h-[90px] lg:gap-[20px] gap-[10px] header   top-0 left-0 w-full "
        style={{ background, zIndex: "10" }}
      >
        <Link to={"/"}>
          <div className="text-[19px] font-semibold flex justify-center items-center">
            <img src={Logo} alt="" className="w-[60px] hidden lg:block" />
            <span className="text-[17px] " style={{ fontFamily: "Unbounded" }}>
              GATE{" "}
            </span>
          </div>
        </Link>
        <div className="lg:relative w-full lg:mx-[30px] lg:px-0">
          <div ref={searchRef} className="lg:relative w-full">
            <div className="flex items-center rounded-full header-input-section shadow-md p-2 transition-all duration-300 ease-in-out w-full">
              <input
                type="text"
                placeholder={placeholder}
                className="flex-1 header-inputbox pl-[10px] w-full"
              />
              <div
                className="flex header-service-button pl-3 pr-2  py-[7px] cursor-pointer rounded-full"
                onClick={toggleDropdown}
              >
                <span>All services</span>
                <MdOutlineKeyboardArrowDown className="text-[24px]  ml-6  cursor-pointer" />
              </div>
            </div>

            {dropdownOpen && (
              <div
                className={`absolute lg:top-[60px] top-[78px] left-0 right-0 header-dropdown text-white py-6   shadow-lg rounded-lg p-4 z-10 transition-transform duration-300 ease-in-out  
             
                `}
              >
                <div>
                  <h3
                    className="text-lg text-center font-semibold mb-6 primary-color"
                    style={{ fontFamily: "Unbounded" }}
                  >
                    Search in service
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    {service.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          handleServiceNested(item);
                        }}
                        className="flex flex-col items-center cursor-pointer dropdown-box py-3 rounded-lg"
                      >
                        <img
                          src={item.iconUrl}
                          alt=""
                          className="w-[60px] h-[60px]"
                        />
                        <p className="mt-2 text-sm primary-color font-medium">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center lg:gap-[20px] hidden lg:flex">
          <button
            className="w-[99px] pl-2 pr-[10px] lg:h-[56px] country-button modal-country-button flex justify-center items-center gap-[10px] rounded-[1000px] lg:text-[19px]"
            onClick={toggleModal}
          >
            <img src={Flag} alt=""  className="w-[38px]" /> SAU
          </button>
          {(profile?.sellerProfile )?.verificationStatus==="APPROVED" ? (
            <div className="flex gap-[12px]">
              <Link to={"/user/selectDetailsOffer"}>
                <button className="lg:w-[188px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px]">
                  Create Offer
                </button>
              </Link>
              <Link to={"/chat"}>
                <div className="p-[15px] rounded-full country-button cursor-pointer">
                  <AiFillMessage className="text-[22px]" />
                </div>
              </Link>
              <div className="p-[15px] rounded-full country-button cursor-pointer">
                <IoMdNotifications className="text-[22px]" />
              </div>
              <UserAvatar />
            </div>
          ) : (
            <div className="flex gap-[12px]">
              {  profile?.sellerProfile===null ? (
                <div className="flex gap-[12px]">
                  <Link to={"/user/seller"}>
                    <button className="lg:w-[188px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px]">
                      Become a Seller
                    </button>
                  </Link>
                  <Link to={"/chat"}>
                    <div className="p-[15px] rounded-full country-button cursor-pointer">
                      <AiFillMessage className="text-[22px]" />
                    </div>
                  </Link>
                  <div className="p-[15px] rounded-full country-button cursor-pointer">
                    <IoMdNotifications className="text-[22px]" />
                  </div>
                  <UserAvatar />
                </div>
              ) : (
                <Link to={"/user/login"}>
                  <button className="lg:w-[228px] lg:h-[56px] login-signup-button rounded-[1000px] lg:text-[19px]">
                    Login / Signup
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
        <div
          className={`w-[27px] h-[27px] lg:hidden block flex justify-center items-center transition-all duration-300 ease-in-out`}
          onClick={togglePanel}
        >
          <HiMiniBars3 className="text-[29px]" />
        </div>
      </div>

      {/* Localization Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
          isModalOpen
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-[29px] py-[25px] w-[550px] modal-main">
          <section className="w-full flex justify-between items-center pb-[15px]">
            <p
              className="text-[20px] font-semibold"
              style={{ fontFamily: "Unbounded" }}
            >
              Localization setting
            </p>
            <IoClose
              className="text-[23px] cursor-pointer"
              onClick={toggleModal}
            />
          </section>
          <section className="header-modal-section gap-[25px]">
            <div>Country / Region</div>
            <div>
              <div className="flex justify-start gap-[8px]">
                <img src={Flag} alt="" className="w-[25px]" />{" "}
                <span>Saudi Arabia</span>
              </div>
              <p>
                To change the country, you need a valid mobile number for the
                new country.
              </p>
            </div>
            <div>
              <p>Language</p>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {items.map((item) => (
                  <label
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="radio"
                      name="items"
                      value={item}
                      checked={selectedLanguage === item}
                      onChange={handleChange}
                      style={{
                        width: "20px",
                        height: "20px",
                        accentColor: "blue",
                      }}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p>Currency</p>
            </div>
            <div>
              <select
                id="items"
                value={selectedBoxItem}
                onChange={handleSelectChange}
                className="text-white py-[4px] px-[8px] rounded-[6px] country-button"
              >
                <option value="">Select Currency</option>
                <option value="United States Dollar (USD)">
                  United States Dollar (USD)
                </option>
                <option value="Saudi Riyal (SAR)">Saudi Riyal (SAR)</option>
              </select>
              {showWarning && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a currency.
                </p>
              )}
            </div>
          </section>
          <section className="w-full h-auto flex justify-end my-[25px] gap-[8px]">
            <button
              className="bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              className="bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                "Save"
              )}
            </button>
          </section>
        </div>
      </div>

      {/* Mobile Panel */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 text-white z-50 flex flex-col shadow-lg animate-slide-in"
          style={{ backgroundColor: "#00002A" }}
        >
          <div className="flex items-center justify-between p-6 h-[80px] header-background">
            <div className="flex items-center">
              <img src={Logo} alt="" className="w-[55px]" />
              <h2 className="text-[22px] font-semibold">GATE</h2>
            </div>
            <IoMdClose onClick={togglePanel} className="text-[26px]" />
          </div>

          <div className="p-[25px] space-y-6">
            {isLoggedUserWithSeller && isLoggedUser ? (
              <div className="flex justify-center items-center flex-col">
                <ToggleProfile />
                <div>
                  <Link to={"/user/selectDetailsOffer"}>
                    <span className="text-[20px] w-full font-semibold country-button px-[24px] py-[15px] rounded-full">
                      Create Offer
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                {isLoggedUser && isLoggedUserWithSeller === false ? (
                  <div className="flex justify-center items-center flex-col">
                    <ToggleProfile />
                    <div className="">
                      <Link to={"/user/seller"}>
                        <span className="text-[20px] w-full font-semibold country-button px-[24px] py-[12px] rounded-full">
                          Become a Seller
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full justify-center items-center">
                    <Link to={"/user/login"}>
                      <button className="px-[30px] py-[13px] login-signup-button rounded-[1000px] text-[19px]">
                        Login / Signup
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            <LocalizationSetting/>
          </div>
        </div>
      )}
    </>
  );
});
