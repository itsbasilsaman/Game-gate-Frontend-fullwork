/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { GrWaypoint } from "react-icons/gr";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GetServicesWithSubservices, GetBrandsBySubServiceOrService } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";  
import { Navbar } from "../user/Navbar";
import Footer from "../user/Footer";
import { FaBoxArchive } from "react-icons/fa6";
import { Link } from "react-router-dom";


interface Subservice {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
}
 
interface Service {
  id: string;
  name: string;
  nameAr: string;
  iconUrl: string;
  subservices: Subservice[];
}

const AddNewOfferSection = () => {

  const [SelectedServiceId, setSelectedServiceId] = useState("");
  const [SelectedSubServiceId, setSelectedSubServiceId] = useState("");
  const [SelectedSubServiceName, setSelectedSubServiceName] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<any>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<any>(null);
  const [subServiceDropdownOpen, setSubServiceDropdownOpen] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [FetchedService, setFetchedServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const subServiceRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const getServiceWithSubservices = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const response = await dispatch(GetServicesWithSubservices());
        console.log('peeeeeekoooooo',response);
        setFetchedServices(response.payload);
      } catch (error) {
        console.log("getservice with subservice error", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    getServiceWithSubservices();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subServiceRef.current && !subServiceRef.current.contains(event.target as Node)) {
        setSubServiceDropdownOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setBrandDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceClick = async (service: Service) => {
    console.log('Clicked Service', service); 
    setSelectedServiceId(service.id);
    setSelectedService(service);
    console.log('selectedService',selectedService);
    console.log('SelectedServiceId',SelectedServiceId);
  
    if (service.subservices && service.subservices.length > 0) {
      setSelectedSubServiceId("");
      setSelectedSubServiceName("");
      setSubServiceDropdownOpen(false);
      setBrandDropdownOpen(false);
    } else {
      setSelectedSubServiceId("");
      setSubServiceDropdownOpen(false);
      try {
        const response = await dispatch(GetBrandsBySubServiceOrService({ serviceId:  service.id, subServiceId: SelectedSubServiceId }));
        console.log('GetBrandsBySubServiceOrService ',response.payload);
        
        setBrands(response.payload);
        setBrandDropdownOpen(true);
      } catch (error) {
        console.log("Error fetching brands:", error);
      }
    }
  };

  const handleSubServiceClick = async (subservice: Subservice) => {
    setSelectedSubServiceId(subservice.id);
    setSelectedSubServiceName(subservice.name);
    setSubServiceDropdownOpen(false);
    
    
  
    console.log('SelectedServiceId',SelectedServiceId   ,"SelectedSubServiceId",SelectedSubServiceId);
    
  
    try {
      // Ensure the correct parameters are passed
      const response = await dispatch(GetBrandsBySubServiceOrService({ serviceId: SelectedServiceId, subServiceId: subservice.id }));
      console.log('GetBrandsBySubServiceOrService ',response.payload);
      
      setBrands(response.payload);
      // setBrandDropdownOpen(true);
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };

  const handleGetProducetsForCreateOffer = async () => {
    try {

      if (selectedBrandId !== "" && SelectedServiceId !== "") {
        navigate(`/user/offerDetail?SelectedServiceId=${SelectedServiceId}&SelectedSubServiceId=${SelectedSubServiceId}&selectedBrandId=${selectedBrandId}`);

      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "YOU NEED TO SELECT REQUIRED FIELDS SERVICE & BRAND ",
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
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
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
        showClass: { popup: "animate__animated animate__fadeInDown" },
        hideClass: { popup: "animate__animated animate__fadeOutUp" },
      });
    }
  };

  return (
  <>
      <Navbar/>
      <div className="py-20 pt-[120px] px-4 sm:px-6 lg:px-24 w-full mx-auto flex flex-col lg:flex-row gap-6 bg-gray-100 h-auto pb-[150px] lato-font">
        <div className="w-full lg:w-1/4 p-4 sm:px-6 order-1 lg:order-2">
          <ul className="text-xs sm:text-sm text-gray-700 space-y-3 flex flex-col gap-2">
            <li className="flex justify-center items-start gap-2">
              <GrWaypoint className="text-[28px]" /> Select the correct and relevant services or product category so that buyers can find your offers easily.
            </li>
            <div className="flex justify-center items-start gap-2">
              <GrWaypoint className="text-[28px]" />
              <li>Sellers are strictly prohibited from offering any product or services which may violate <a href="#" className="text-blue-500">local laws and regulations</a>.</li>
            </div>
            <div className="flex justify-center items-start gap-2">
              <GrWaypoint className="text-[28px]" />
              <li>To request for a brand or product not listed here, please <a href="#" className="text-blue-500">send a ticket</a> to us and provide the URL to the official brand site.</li>
            </div>
           
            <li className="flex gap-2">
              <GrWaypoint className="text-[12px]" /> Uploading fake codes is strictly prohibited.
            </li>
          </ul>
        </div>
  
        <div className="w-full lg:w-3/4 bg-white p-4 sm:p-6 rounded-lg shadow-md order-2 lg:order-1">
        <div className="w-full flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Unbounded" }}>Add new offer</h2>
            <Link to={'/seller/offer'}><button className="primary-background font-medium rounded-lg px-3 py-3 text-white flex justify-center items-center gap-2 "><FaBoxArchive /> Offer List</button></Link>
        </div>
          <h3 className="text-lg sm:text-xl font-medium mb-2 lato-font">Type of service</h3>
          <p className="text-gray-600 mb-4 lato-font">Select a product or service you want to sell</p>
  
          {isLoading ? (  
            <div className="flex justify-center items-center h-40">
              <ClipLoader color="#101441" size={40} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {FetchedService?.map((service) => (
                <div
                  key={service.id}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 border rounded-lg cursor-pointer transition duration-300 ${
                    selectedService?.id === service.id ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleServiceClick(service)}
                >
                  <img src={service.iconUrl} alt="" className="w-[100px]" />
                  <span className="text-sm sm:text-base font-medium text-center">{service.name}</span>
                </div>
              ))}
            </div>
          )}
  
          <div className="mt-6 primary-background text-white p-3 sm:p-4 rounded-lg flex items-center">
            <span className="mr-2 p-1">⚠</span>
            <p className="text-xs sm:text-sm lato-font">
              Sellers are only permitted to sell this product in code format and must upload genuine codes.
              Uploading fake codes is strictly prohibited. Sales of products that require login access to the buyer's account
              or necessitate visiting external links to retrieve the codes are also prohibited.
            </p>
          </div>
  
          {selectedService && selectedService.subservices && selectedService.subservices.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Sub-services <span className="text-red-500">*</span></label>
              <div className="relative mt-2" ref={subServiceRef}>
                <button
                  className="w-full bg-white border p-3 text-left"
                  onClick={() => setSubServiceDropdownOpen(!subServiceDropdownOpen)}
                >
                  {SelectedSubServiceName || "Select sub-services"}
                  <span className="absolute right-[12px] top-[16px]">{subServiceDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                </button>
                {subServiceDropdownOpen && (
                  <div className="absolute w-full bg-white border z-10">
                    {selectedService.subservices.map((sub, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubServiceClick(sub)}
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
  
          {(SelectedSubServiceId || (selectedService && (!selectedService.subservices || selectedService.subservices.length === 0))) && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Brands <span className="text-red-500">*</span></label>
              <div className="relative mt-2" ref={brandRef}>
                <button
                  className="w-full bg-white border p-3 text-left"
                  onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                >
                  {selectedBrandName || "Select brand"}
                  <span className="absolute right-[12px] top-[16px]">{brandDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
                </button>
                {brandDropdownOpen && (
                  <div className="absolute w-full bg-white border z-10">
                    {brands.map((brand, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedBrandId(brand.id);
                          setBrandDropdownOpen(false);
                          setSelectedBrandName(brand.name);
                        }}
                      >
                        {brand.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
  
          {selectedBrandId && (
            <div className="mt-6 py-6 bg-white">
              <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Unbounded" }}>
                You need to create a offer
              </h2>
              <div className="mt-4 border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold text-gray-800 lato-font">Create single offer</h3>
                  <p className="text-sm text-gray-500 lato-font">Suitable for all sellers.</p>
                </div>
                <button onClick={handleGetProducetsForCreateOffer} className="lato-font text-white px-4 py-2 rounded-md font-medium primary-background">
                  Single offer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
  </>
  );
};

export default AddNewOfferSection;