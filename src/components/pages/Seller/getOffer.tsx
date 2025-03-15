/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import Footer from "../user/Footer";
import { GetOffersFromSeller } from "../../../reduxKit/actions/seller/offerListing";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../reduxKit/store';
import { Link } from "react-router-dom";
import { Navbar } from "../user/Navbar";
import NoDataFound from '../../../assets/Images/no-data.png'
interface Product {
  id: string;
  product: {
      image: string;
      title: string;
  };
}


const ITEMS_PER_PAGE_BIG_SCREEN = 12;
const ITEMS_PER_PAGE_SMALL_SCREEN = 8;

const GetOffer: React.FC = () => {
   
  const dispatch = useDispatch<AppDispatch>()
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BIG_SCREEN);
 
  useEffect(()=> {
    const getOffer = async () => {
      try {
        setLoading(true)
        const response = await dispatch(GetOffersFromSeller())
        console.log('Get Offer',response.payload.data);
        setProducts(response.payload.data)
      } catch (error){
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getOffer()
  },[dispatch])
 

  
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(
        window.innerWidth >= 50
          ? ITEMS_PER_PAGE_BIG_SCREEN
          : ITEMS_PER_PAGE_SMALL_SCREEN
      );
    };
    window.addEventListener("resize", handleResize);
    handleResize();  
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
 

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
 
  if (loading) {
    return (
      <div className="loading-backdrop">
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
    );
  }

 

  return (

   <>
       <Navbar/>
      <div className="py-[200px]  bg-gradient-to-b from-[#191B4B] to-[#191b8d]">
        
        <div className="max-w-screen-xl mx-auto common-background lg:px-6 px-4 pb-8 rounded-[15px]">
          <div>
            <div className="flex lg:justify-between items-center lg:flex-row flex-col gap-[20px] lg:gap-[0px] py-[25px]">
              
              <div className="relative extralg:w-[912px] lg:w-[492px] h-[48px] w-[100%]">
                <input
                  type="text"
                  className="extralg:w-[912px] lg:w-[492px] h-[48px] about-inputbox rounded-[1000px] w-[100%] text-white"
                  placeholder="Search for Products"
                />
                <IoSearchSharp className="absolute right-[14px] text-[22px] top-[13px] text-white" />
              </div>
            </div>
            <h2
              className="text-2xl font-bold mb-6 text-white"
              style={{ fontFamily: "Unbounded" }}
            >
               Offer List
            </h2>
          </div>
  
  
          <div className={`grid gap-4 pt-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`}>
  {products.length === 0 ? (
    <div className="flex justify-center items-center flex-col">
      <img src={NoDataFound} alt="" className="w-[200px]" />
      <p style={{ fontFamily: "Unbounded" }} className="text-white text-[20px]">
        No Offers Found
      </p>
    </div>
  ) : (
    products.map((product, index) => (
      <div className="flex flex-col gap-2" key={index}>
        <Link to={`/seller/offer/${product.id}`}>
          <div
            className="relative text-white rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] game-card one flex flex-col items-center justify-center cursor-pointer"
          >
            <img
              src={product.product.image || " "}
              className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
              alt={product.product.title}
              style={{ zIndex: "-10" }}
            />
          </div>
        </Link>
        <h3 className="text-[21px] font-medium text-center text-white">
          {product.product.title}
        </h3>
      </div>



    ))
  )}
</div>
  
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="   disabled:opacity-50"
            >
              <IoArrowBackCircleSharp className="text-[26px] text-white" />
            </button>
            <span
              className="text-lg font-semibold text-white"
              style={{ fontFamily: "Unbounded" }}
            >
              {currentPage} <span className="mx-1">of</span> {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className=" rounded disabled:opacity-50"
            >
              <IoArrowForwardCircleSharp className="text-[26px] text-white" />
            </button>
          </div>
        </div>
      </div>
      <Footer/>
   </>
  );
};

export default GetOffer;
