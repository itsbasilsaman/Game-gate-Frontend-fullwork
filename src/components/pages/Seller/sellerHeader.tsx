import React, { useEffect, useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

import Flag from "../../../assets/Images/flag.png";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { UserAvatar } from "../user/UserAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
export const SellerHeader: React.FC = React.memo(() => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedBoxItem, setSelectedBoxItem] = useState<string>("");
  // const [searchQuery, setSearchQuery] = useState<string>(""); // State for input value
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const { isLoggedUserWithSeller } = useSelector(
    (state: RootState) => state.logAuth
  );

  const toggleModal = (): void => setIsModalOpen(!isModalOpen);

  const togglePanel = (): void => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedBoxItem(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedItem(event.target.value);
  };

  const items: string[] = ["English", "Arabic"];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    }; 

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the background color based on scroll position
  const background: string =
    scrollY > 0
      ? `linear-gradient(to bottom left, #030535,rgb(22, 26, 73))`
      : "linear-gradient(to bottom left, #030535,rgb(22, 26, 73))";

  return (
    <>
      <div
        className="flex justify-between   fixed items-center text-white md:px-[90px] px-[30px] h-[90px] lg:gap-[20px] gap-[18px] header fixed top-0 left-0 w-full "
        style={{ background, zIndex: "10" }}
      >
        <Link to={"/"}>
          <div
            className="text-[19px] font-semibold"
            style={{ fontFamily: "Unbounded" }}
          >
            GAME GATE
          </div>
        </Link>
        <div>
          <div className="flex  items-center lg:gap-[20px] hidden lg:flex">
            <button
              className="pl-[6px] pr-[16px] lg:h-[56px] country-button modal-country-button flex justify-center items-center gap-[10px] rounded-[1000px] lg:text-[19px]"
              onClick={toggleModal}
            >
              <img src={Flag} alt="" className="w-[43px]" /> IN
            </button>
            {isLoggedUserWithSeller ? (
              <Link to={"/user/selectDetailsOffer"}>
                <button className="px-[20px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px] ">
                  Create Offer
                </button>
              </Link>
            ) : (
              <Link to={"/user/seller"}>
                <button className="px-[20px] lg:h-[56px] country-button rounded-[1000px] lg:text-[19px] ">
                  Shop now
                </button>
              </Link>
            )}
            {/* <Link to={'/user/login'}><button className='lg:w-[228px] lg:h-[56px] login-signup-button rounded-[1000px] lg:text-[19px]'>Login / Signup</button></Link> */}
            <Link to={"/chat"}>
              <div className=" p-[15px] rounded-full country-button cursor-pointer">
                <AiFillMessage className="text-[22px] " />
              </div>
            </Link>
            <div className=" p-[15px] rounded-full country-button cursor-pointer">
              <IoMdNotifications className="text-[22px]" />
            </div>
            <UserAvatar />
          </div>
          <div
            className={`w-[27px] h-[27px] lg:hidden block flex justify-center items-center transition-all duration-300 ease-in-out `}
            onClick={togglePanel}
          >
            <HiMiniBars3 className="text-[29px]" />
          </div>
        </div>

        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out ${
            isModalOpen
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-[29px] py-[25px]  w-[550px] modal-main ">
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
                <div className="flex justify-start gap-[8px] ">
                  <img src={Flag} alt="" className="w-[25px]" />{" "}
                  <span>India</span>
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
                        checked={selectedItem === item}
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
                {selectedItem && <p>You selected: {selectedItem}</p>}
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
                  <option value="">Japanese Yen (JPY)</option>
                  <option value="Item 1">United States Dollar (USD)</option>
                  <option value="Item 2">Indian Rupee (INR)</option>
                  <option value="Item 3">Canadian Dollar (CAD)</option>
                </select>
                {selectedBoxItem && <p>You selected: {selectedBoxItem}</p>}
              </div>
            </section>
            <section className="w-full h-auto flex justify-end my-[25px] gap-[8px]">
              <button
                className="bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button className="bg-white text-black px-[15px] py-[7px] rounded-[10px] font-medium">
                Save
              </button>
            </section>
          </div>
        </div>
      </div>

      {isPanelOpen && (
        <div
          className="fixed inset-0 text-white z-50 flex flex-col shadow-lg animate-slide-in"
          style={{ backgroundColor: "#00002A" }}
        >
          <div
            className="flex items-center justify-between p-4 "
            style={{ backgroundColor: "#000000" }}
          >
            <h2 className="text-lg font-semibold">Localization Setting</h2>
            <IoMdClose onClick={togglePanel} className="text-[22px]" />
          </div>

          <div className="p-[25px] space-y-6">
            <div className="flex justify-center items-center">
              <span className="text-[20px] font-semibold country-button px-[24px] py-[12px] rounded-[1000px]">
                Become a Seller
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center py-[15px]">
                <label className="block text-sm font-medium">
                  Country / Region
                </label>
                <div className="flex justify-start gap-[8px] ">
                  <img src={Flag} alt="" className="w-[25px]" />{" "}
                  <span>India</span>
                </div>
              </div>
              <span className="text-gray-400">
                To change the country, you need a valid mobile number for the
                new country.
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium pb-[19px]">
                Language
              </label>
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
                      checked={selectedItem === item}
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
              <label className="block text-sm font-medium pb-[15px]">
                Currency
              </label>
              <div>
                <select
                  id="items"
                  value={selectedBoxItem}
                  onChange={handleSelectChange}
                  className="text-white py-[8px] px-[12px] rounded-[6px] country-button"
                >
                  <option value="">Japanese Yen (JPY)</option>
                  <option value="Item 1">United States Dollar (USD)</option>
                  <option value="Item 2">Indian Rupee (INR)</option>
                  <option value="Item 3">Canadian Dollar (CAD)</option>
                </select>
                {selectedBoxItem && <p>You selected: {selectedBoxItem}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-4 gap-[6px] ">
            <button
              className="px-4 py-2 text-black bg-white border rounded "
              onClick={togglePanel}
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-black bg-white border rounded ">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
});
