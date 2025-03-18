/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IoSearchSharp, IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetBrandsWithService, GetOffersByBrand, GetSubServices, OfferResponse } from '../../../reduxKit/actions/user/userOfferListing';
import { GetBrandsBySubServiceOrService } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
import NoDataFound from '../../../assets/Images/no-data.png'


interface NestedGameBrands {
  description: string;
  descriptionAr: string;
  image: string;
  name: string;
  nameAr: string;
  id: string;
}


interface Service {
  id: string;
  name: string;
}


interface GameBrands {
  id: string;
  brand: NestedGameBrands;
}

interface SubserviceArray {
  name: string;
  id: string;
}

const ITEMS_PER_PAGE_BIG_SCREEN = 12;
const ITEMS_PER_PAGE_SMALL_SCREEN = 8;

const TopUpSection: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get("serviceId") || "";
  const ServiceName = queryParams.get("name") || "";
  const iconUrl = queryParams.get("iconUrl") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string>("1");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BIG_SCREEN);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allGames, setAllGames] = useState<GameBrands[]>([]);
  const [subserviceNames, setSubserviceNames] = useState<SubserviceArray[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedSubservice, setSelectedSubService] = useState<string>('All');
  const [offers, setOffers] = useState<{ [key: string]: number }>({});
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? ITEMS_PER_PAGE_BIG_SCREEN : ITEMS_PER_PAGE_SMALL_SCREEN);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getServiceWithSubservices = async () => {
      try {
        const response = await dispatch(GetSubServices(serviceId));
        const services = response.payload;
        console.log('sub services are', services.data);
        setSubserviceNames([
          { id: "1", name: "All" },
          ...services.data.map(({ id, name } : Service) => ({ id, name }))
        ]);
        
        setSelectedItem("1");
      } catch (error) {
        console.error("getServiceWithSubservices error", error);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };
    getServiceWithSubservices();
  }, [dispatch, serviceId]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await dispatch(GetBrandsBySubServiceOrService({ serviceId, subServiceId: selectedItem })).unwrap();
        setBrands(response);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (serviceId && selectedItem) {
      fetchBrands();
    }
  }, [dispatch, serviceId, selectedItem]);

  useEffect(() => {
    const getBrandsWithServiceFunction = async () => {
      try {
        const response = await dispatch(GetBrandsWithService(serviceId));
        if (response.payload.success) {
          setAllGames(response.payload.data.data);   
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    getBrandsWithServiceFunction();
  }, [dispatch, serviceId]);



  const filteredGames = useMemo(() => {
    if (selectedItem === "1") {
      return allGames.filter(game => game.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return allGames.filter(game => brands.some(brand => brand.id === game.brand.id) && game.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }, [selectedItem, allGames, brands, searchTerm]);

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const currentItems = useMemo(() => {
    return filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredGames, currentPage, itemsPerPage]);

  useEffect(() => {
    const getOffersByBrandFunction = async () => {
      try {
        const offersMap: { [key: string]: number } = {};
        for (const game of currentItems) {
    
          
          const response = await dispatch(GetOffersByBrand(game.id));
          const result = response.payload as OfferResponse;
          offersMap[game.id] = result.data.data.data.offers.length;
        }
        setOffers(offersMap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getOffersByBrandFunction();
  }, [dispatch, currentItems]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const handleFilter = useCallback((id: string, name: string) => {
    setLoading(true);
    setSelectedItem(id);
    setSelectedSubService(name);
  }, []);

  const handleOfferByProduct = useCallback((game: GameBrands) => {
    try {
      if (game) {
     
        
        navigate(`/about?productId=${game.id}&image=${game.brand.image}&name=${game.brand.name}&description=${game.brand.description}&ServiceName=${ServiceName}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, ServiceName]);

  return (
    <div className="pt-[100px]">
      <div className="flex items-center py-2 px-6 pb-8">
        <img src={iconUrl} alt="Game Icon" className="lg:w-[150px] w-[100px]" />
        <h4 className="text-[27px] text-white" style={{ fontFamily: "Unbounded" }}>
          {ServiceName}
        </h4>
      </div>
      <div className="max-w-screen-xl mx-auto common-background lg:px-6 px-4 pb-8 rounded-[15px]">
        <div>
        <div className="flex flex-wrap lg:flex-nowrap lg:justify-between items-center gap-[10px] py-[25px] w-full">
  <div className="flex flex-wrap lg:flex-nowrap gap-[10px]">
    {subserviceNames.map((item, index) => (
      <button
        key={index}
        onClick={() => handleFilter(item.id, item.name)}
        className={`${selectedItem === item.id ? 'selected-button' : 'blur-button'} whitespace-nowrap px-[19px] py-[9px] lg:px-[29px] lg:text-[17px] text-white rounded-[1000px]`}
      >
        {item.name}
      </button>
    ))}
  </div>
  
  {/* Search bar takes the remaining width on large screens */}
  <div className="relative w-full lg:flex-1 lg:ml-[10px] h-[48px]">
    <input
      type="text"
      className="w-full h-[48px] about-inputbox rounded-[1000px] text-white"
      placeholder="Search for"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={handleKeyPress}
    />
    <IoSearchSharp
      className="absolute right-[14px] text-[22px] top-[13px] text-white cursor-pointer"
      onClick={handleSearch}
    />
  </div>
</div>


          <h2 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: "Unbounded" }}>
            {filteredGames.length} <span className="px-1"></span> {selectedSubservice}
          </h2>
        </div>

        {initialLoading ? (
          <div className="grid gap-4 pt-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="relative rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] animate-pulse flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 bg-grayShade rounded-[12px]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 pt-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="relative rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] animate-pulse flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-grayShade rounded-[12px]"></div>
                  </div>
                ))
              : ( currentItems.length < 0  ? 

                <div className="flex justify-center items-center flex-col">
             <img src={NoDataFound} alt="" className="w-[200px]" />
             <p     style={{ fontFamily: "Unbounded" }} className="text-white text-[20px]">No Offers Found</p>
        </div>
                
              : ( currentItems.map((game, index) => (
                  <div
                    onClick={() => handleOfferByProduct(game)}
                    key={index}
                    className="relative text-white rounded-[12px] overflow-hidden extralg:w-[326px] extralg:h-[228px] h-[170px] game-card one flex flex-col items-center justify-center cursor-pointer"
                  >
                    <img
                      src={game.brand.image}
                      className="absolute inset-0 object-cover w-full h-full rounded-[12px]"
                      alt={game.brand.name}
                      style={{ zIndex: "-10" }}
                    />
                  <p className={`lg:px-[13px] px-[11px] py-[3px] lg:py-[8px] lg:h-[45px] offer-menu lg:text-[18px] font-medium rounded-[1000px] flex items-center justify-center ${offers[game.id] === undefined ? 'skeleton-loader': ''}`} >
  {offers[game.id] === undefined ? (
    <span className="invisible lg:px-[13px] px-[11px] py-[3px] lg:py-[8px]"> </span>
  ) : (
    `${offers[game.id]} Offers`
  )}
</p>

                    <p className="text-center lg:text-[20px] font-bold absolute bottom-3">{game.brand.name}</p>
                  </div>
                ))) 
              
              )
                }
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            <IoArrowBackCircleSharp className="text-[26px] text-white" />
          </button>
          <span className="text-lg font-semibold text-white" style={{ fontFamily: "Unbounded" }}>
            {currentPage} <span className="mx-1">of</span> {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded disabled:opacity-50"
          >
            <IoArrowForwardCircleSharp className="text-[26px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpSection;