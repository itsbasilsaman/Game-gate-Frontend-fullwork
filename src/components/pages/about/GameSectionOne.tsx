/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { ChevronDown } from "lucide-react";
import { useDispatch } from 'react-redux';
import { GetOffersByBrand } from '../../../reduxKit/actions/user/userOfferListing';
import { AppDispatch } from '../../../reduxKit/store';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardBackground from '../../../assets/Card/gamecardbg.png';

interface GameSectionOneProps {
  productId: string | null;
  image: string | undefined;
  name: string | null;
  ServiceName: string | null;
}

const SkeletonOffer: React.FC = () => {
  return (
    <section className="lg:h-[125px] rounded-[16px] top-up-box p-[19px] flex flex-col justify-between bg-gray-800 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r animate-[shimmer_2s_infinite]"></div>
      <div className="flex justify-between relative z-10">
        <div className="w-[150px] h-[24px] bg-grayShade rounded-md animate-pulse"></div>
        <div className="w-[44px] h-[44px] bg-grayShade rounded-full animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center relative z-10">
        <div className="w-[80px] h-[24px] bg-grayShade rounded-md animate-pulse"></div>
        <div className="w-[60px] h-[24px] bg-grayShade rounded-md animate-pulse"></div>
      </div>
    </section>
  );
};

const GameSectionOne: React.FC<GameSectionOneProps> = React.memo(({ productId, image, name, ServiceName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [openIndex, setOpenIndex] = useState<null | number>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [deliveryMethod, setDeliveryMethods] = useState<string[]>([]);
  // const [filteredOffers, setFilteredOffers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<string>("");

  const handleOutsideClick = (event: { target: any; }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenIndex(null);
    }
  };

  const toggleDropdown = (index: null | number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // const handleItemClick = (item: any) => {
  //   const matchingOffers = offers?.filter(
  //     (offerItem) =>
  //       Array.isArray(offerItem.deliveryMethods) &&
  //       offerItem.deliveryMethods.includes(item)
  //   );

  //   console.log("Matching Offers:", matchingOffers);
  //   setFilteredOffers(matchingOffers);
  //   setOpenIndex(null);
  //   setSelectedDeliveryMethod(item); // Update the button text
  // };

  const handleItemClick = (item: string) => {
    console.log(item);
    setOpenIndex(null);
    setSelectedDeliveryMethod(item);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const GetOffersByProduct = async () => {
      try {
        console.log(productId);
        setLoading(true);
        if (productId) {
          const response = await dispatch(GetOffersByBrand({productId,deliveryMethod:selectedDeliveryMethod }));
          const data = response.payload as { data: { data: any } };
          console.log("response of the GetOffersByBrand ", data.data.data.data);
          const result = data.data.data.data.offers;
          setOffers(data.data.data.data.offers);
          const deliveryMethods = new Set<string>(
            result.flatMap((offer: { deliveryMethods: string[] }) => offer.deliveryMethods)
          );
          const deliveryMethodsArray: string[] = [...deliveryMethods];
          setDeliveryMethods(deliveryMethodsArray);
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message || "Offer Not Fetched",
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
      } finally {
        setLoading(false);
      }
    };
    GetOffersByProduct();
  }, [dispatch, productId,selectedDeliveryMethod]);

  const handleOfferDetails = async (id: string) => {
    try {
      console.log("peera id ", id);
      if (id) {
        navigate(`/user/Category?offerId=${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const displayedOffers = filteredOffers.length > 0 ? filteredOffers : offers;

  const filteredOffersBySearch = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='w-full h-auto text-white md:px-[80px] px-[20px] flex flex-col lg:items-center pb-[40px]'>
      <p className='lg:pt-[130px] pt-[110px] lg:pb-[40px] pb-[20px] text-[14px] lg:text-[16px] text-left w-[100%]'>
        Home /{' '} {ServiceName} /{' '}{name}
      </p>
      <div className='w-[100%] lg:h-[182px] h-[154px] gamecard-box rounded-[13px] relative lg:px-[15px] flex lg:justify-between'>
        <img src={CardBackground} className='object-cover absolute top-[0px] left-[0px] w-[100%] h-[100%] rounded-[12px]' style={{ zIndex: '-10', objectFit: 'cover' }} />
        <div className='flex lg:flex-row flex-col justify-center lg:items-center pb-[25px] lg:pt-[0px] pt-[18px] lg:pb-[0px] lg:gap-[25px] gap-[12px] w-[100%] lg:w-auto px-[20px] lg:px-[0px]'>
          <h1 className='lg:text-[40px] px-2 text-[28px] font-bold' style={{ fontFamily: 'Unbounded' }}>{name}</h1>
          <p className='offer-box px-[18px] py-[8px] cursor-pointer w-fit'> {offers.length} Offers</p>
        </div>
        <div className='flex justify-center items-center h-full'>
          <img src={image} alt="" className='lg:h-[140px] hidden lg:block rounded-[13px]' />
        </div>
      </div>

      <div className='w-full h-auto mt-12 text-white'>
        <div className='flex lg:justify-between items-center lg:flex-row flex-col gap-[20px] lg:gap-[0px]'>
          <div className='relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]'>
            <input
              type="text"
              className='extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%]'
              placeholder='Search for'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoSearchSharp className='absolute right-[14px] text-[22px] top-[13px]' />
          </div>
          <div className='flex lg:gap-[20px] w-[100%] lg:w-auto justify-between lg:justify-normal'>
            <span className='relative'>
              {offers.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => toggleDropdown(0)}
                    className="blur-button flex items-center justify-between w-full px-[19px] py-[9px] pr-[35px] lg:text-[17px] rounded-[1000px] hover:bg-grayShade transition-all duration-200"
                  >
                    {selectedDeliveryMethod == "" ? 'Delivery Method' : selectedDeliveryMethod }
                    <ChevronDown className="absolute right-3 w-5 h-5" />
                  </button>

                  {openIndex === 0 && (
                    <div className="absolute top-[42px] z-10 mt-1 w-full rounded-[5px] bg-blue-900 text-white shadow-lg space-y-1">
                      {deliveryMethod?.map((method: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleItemClick(method)}
                          className="w-full text-left hover:bg-blue-950 rounded-[5px] hover:text-white transition-all duration-150 px-4 py-2"
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </span>
          </div>
        </div>

        <div className='lg:flex lg:justify-between lg:pt-[55px] pt-[40px]'>
          <h1 style={{ fontFamily: 'Unbounded' }} className='text-[20px] py-2 lg:py-0'> {offers.length} Offers</h1>
          <div className='flex lg:gap-[50px] lg:flex-row justify-between lg:justify-normal py-[11px] py-[6px]'>
            <p className='lg:text-[18px]'>Sort by</p>
            <div className='flex lg:gap-[20px] gap-[9px]'>
              <label className='lg:text-[18px] cursor-pointer'>
                <input
                  type="radio"
                  value="Option 1"
                  checked={selectedOption === "Option 1"}
                  onChange={handleChange}
                  className='mr-[5px]'
                />
                Lowest Price
              </label>
              <label className='lg:text-[18px] cursor-pointer'>
                <input
                  type="radio"
                  value="Option 2"
                  checked={selectedOption === "Option 2"}
                  onChange={handleChange}
                  className='mr-[5px]'
                />
                Trending
              </label>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="top-up-section lg:gap-[19px] lg:pt-[25px] pt-[5px] pb-[25px]">
            <SkeletonOffer />
            <SkeletonOffer />
            <SkeletonOffer />
          </div>
        ) : (
          <div className='top-up-section lg:gap-[19px] lg:pt-[25px] pt-[5px] pb-[25px]'>
            {filteredOffersBySearch.map((MyOffer, index) => (
              <section
                className="rounded-[16px] top-up-box px-[19px] py-[15px] cursor-pointer flex flex-col justify-between"
                onClick={() => handleOfferDetails(MyOffer.id)}
                key={index}
              >
                <div className="flex justify-between">
                  <h1 className="text-[18px] font-medium">{MyOffer.title}</h1>
                  <CiHeart className="text-[44px]" />
                </div>
                <div className="flex justify-between items-center">
                  <p className="game-offer-button py-[6px] px-[8px] my-1 rounded-[8px]">
                    {MyOffer.apiQty} Offer
                  </p>
                  <p className="font-semibold text-[18px]" style={{ color: "rgba(0, 255, 121, 1)" }}>
                    {MyOffer.unitPriceUSD} USD
                  </p>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
});

export default GameSectionOne;