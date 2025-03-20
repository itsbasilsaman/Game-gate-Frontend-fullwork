/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { IoSearchSharp, IoArrowBackCircleSharp, IoArrowForwardCircleSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetBrandsWithService, GetOffersByBrand, GetSubServices, OfferResponse } from '../../../reduxKit/actions/user/userOfferListing';
// import { GetBrandsBySubServiceOrService } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
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
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_BIG_SCREEN);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [allGames, setAllGames] = useState<GameBrands[]>([]);
  const [subserviceNames, setSubserviceNames] = useState<SubserviceArray[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE_BIG_SCREEN,
    totalCount: 0,
    totalPages: 1
  })
  const [selectedSubservice, setSelectedSubService] = useState<string>('All');
  const [offers, setOffers] = useState<{ [key: string]: number }>({});
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleResize = () => {
     const newLimit = window.innerWidth >= 768 ? ITEMS_PER_PAGE_BIG_SCREEN : ITEMS_PER_PAGE_SMALL_SCREEN 
      setItemsPerPage(newLimit)
      setPagination((prev) =>({...prev, limit: newLimit}))
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
 
  const filteredGames = useMemo(() => {
    return allGames.filter(game => 
      game.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allGames, searchTerm]);

  console.log('Filtered Games',filteredGames);
  
   
  const currentItems = useMemo(() => {
    return filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredGames, currentPage, itemsPerPage]);

  useEffect(() => {
    const getOffersByBrandFunction = async () => {
      try {
        const offersMap: { [key: string]: number } = {};
        for (const game of currentItems) {
    
          
          const response = await dispatch(GetOffersByBrand({productId:game.id}));
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

  useEffect(() => {
    const getBrandsWithServiceFunction = async () => {
      try {
        console.log(serviceId, selectedItem ,'ServiceId & SelectedItem');
        
        const response = await dispatch(GetBrandsWithService({ServiceId:serviceId, SubserviceId: selectedItem == '1' ? '' : selectedItem , page:pagination.page , limit: pagination.limit}));
        if (response.payload.success) {
           setAllGames(response.payload.data.data); 
           setPagination(response.payload.data.pagination)
          console.log('GetBrandsWithService and Subservice',response.payload);
            
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    getBrandsWithServiceFunction();
  }, [dispatch, serviceId,selectedItem, pagination.page, pagination.limit]);

  const handleNext = useCallback(() => {
    if (pagination.page < pagination.totalPages) setPagination((prev) => ({...prev, page: prev.page + 1}));
  }, [ pagination.page, pagination.totalPages]);

  const handlePrevious = useCallback(() => {
    if (pagination.page > 1) setPagination((prev) => ({...prev,page:prev.page - 1}));
  }, [pagination.page]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const handleFilter = useCallback((id: string, name: string) => {
    console.log(id);
    
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
            disabled={pagination.page === 1}
            className="disabled:opacity-50"
          >
            <IoArrowBackCircleSharp className="text-[26px] text-white" />
          </button>
          <span className="text-lg font-semibold text-white" style={{ fontFamily: "Unbounded" }}>
            {pagination.page} <span className="mx-1">of</span> {pagination.totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={pagination.page === pagination.totalPages}
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