/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GrWaypoint } from "react-icons/gr";
import { Offer, validateOffer, ValidationErrors } from "./validation";
import { GetProducetsForCreateOffer, CreateOfferWithProduct } from "../../../reduxKit/actions/offer/serviceSubServiceBrandSelection";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners"; // Import a loading spinner
import { Link } from "react-router-dom";

export interface getProduct {
  SelectedServiceId: string;
  SelectedSubServiceId?: string;
  selectedBrandId?: string;
}

const OfferDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SelectedServiceId = queryParams.get("SelectedServiceId") || "";
  const SelectedSubServiceId = queryParams.get("SelectedSubServiceId") || "";
  const selectedBrandId = queryParams.get("selectedBrandId") || "";
  console.log('selectedBrandId',selectedBrandId, 'SelectedServiceId',SelectedServiceId,'SelectedSubServiceId',SelectedSubServiceId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productData, setProductData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const navigate = useNavigate();


  const [offer, setOffer] = useState<Offer>({
    productId: "",
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    unitPriceUSD: 0,
    unitPriceSAR: 0,
    minQty: 0,
    apiQty: 0,
    lowStockAlertQty: 1,
    deliveryMethods: [], // Initialize as empty array
    salesTerritory: {
      settingsType: "GLOBAL",
      countries: [],
    },
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      try {
        const data: getProduct = {
          SelectedServiceId,
          SelectedSubServiceId,
          selectedBrandId,
        };
        console.log('The Data', data);
        
        const response = await dispatch(GetProducetsForCreateOffer(data));
        console.log('The Response Data',response?.payload.data);
        const filteredData = response?.payload.data.filter((item: { serviceId: string; subServiceId: string; brandId: string; }) => {
          return (
            (!SelectedServiceId || item.serviceId === SelectedServiceId) &&
            (!SelectedSubServiceId || item.subServiceId === SelectedSubServiceId) &&
            (!selectedBrandId || item.brandId === selectedBrandId)
          );
        });
        
        console.log("The Filtered Data:", filteredData);
        
        
        
        
        await setProductData(filteredData[0]);
   
        
        if (response.payload.success) {
          
          
          // Set deliveryMethods based on API response
          if (response.payload.data[0]?.deliveryTypes) {
            setOffer((prev) => ({
              ...prev,
              deliveryMethods: response.payload.data[0].deliveryTypes,
            }));
          }
        } else {
          toast.error(response.payload.message);
        }
      } catch (error: any) {
        console.log(error);
        
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
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    getProductDetails();
  }, [dispatch, SelectedServiceId, SelectedSubServiceId, selectedBrandId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "deliveryMethods") {
      setOffer((prev) => ({ ...prev, deliveryMethods: [value] })); // Ensure this is an array
    } else {
      setOffer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateOffer(offer);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("productId", productData?.id || "");
        formData.append("title", offer.title);
        formData.append("titleAr", offer.titleAr);
        formData.append("description", offer.description);
        formData.append("descriptionAr", offer.descriptionAr);
        formData.append("unitPriceUSD", String(offer.unitPriceUSD));
        formData.append("unitPriceSAR", String(offer.unitPriceSAR));
        formData.append("minQty", String(offer.minQty));
        formData.append("apiQty", String(offer.apiQty));
        formData.append("lowStockAlertQty", String(offer.lowStockAlertQty));
        formData.append("deliveryMethods", JSON.stringify(offer.deliveryMethods));  
        formData.append("salesTerritory", JSON.stringify(offer.salesTerritory));

        const response = await dispatch(CreateOfferWithProduct(formData));
        console.log('Response Data',response);
        
        if (response.payload.success) {
          toast.success(response.payload.message);
          navigate("/seller/offer");
          setOffer({
            productId: "",
            title: "",
            titleAr: "",
            description: "",
            descriptionAr: "",
            unitPriceUSD: 0,
            unitPriceSAR: 0,
            minQty: 0,
            apiQty: 0,
            lowStockAlertQty: 1,
 
            deliveryMethods: [], // Reset to empty array
 
            salesTerritory: {
              settingsType: "GLOBAL",
              countries: [],
            },
          });

        } else {
          console.log('Error Message', response);
          
          toast.error(response.payload.message);
        }
      } catch (error: any) {
        console.log('Eroor showing Message',error);
        
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
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log("Validation errors:", validationErrors);
    }
  };

  return (

    <div className="  pt-[120px] px-4 sm:px-6  lg:px-24 w-full mx-auto flex flex-col lg:flex-row gap-6 bg-gray-100 h-auto pb-[150px] lato-font">
      <div className="order-1 w-full p-4 lg:w-1/4 sm:px-6 lg:order-2">
        <ul className="flex flex-col gap-2 space-y-3 text-xs text-gray-700 sm:text-sm">
          <li className="flex items-start justify-center gap-2">
            <GrWaypoint className="text-[28px]" /> Ensure the product specifications are clearly and accurately stated.
          </li>
          <div className="flex items-start justify-center gap-2">
            <GrWaypoint className="text-[28px]" />
            <li>Use bullet points to keep descriptions short and concise.</li>
          </div>
        </ul>
      </div>

      <div className="order-2 w-full p-4 bg-white rounded-lg lg:w-3/4 sm:p-6 lg:shadow-md lg:order-1">
        <h3 className="  text-xl sm:text-[25px] font-medium mb-2 lato-font" style={{ fontFamily: "Unbounded" }}>Offer Details</h3>
        

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <ClipLoader color="#101441" size={40} />
          </div>
        ) : (
          <div className="space-y-3">
            {productData?.service && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Service</span>
                <span>{productData?.service?.name}</span>
              </div>
            )}
            {productData?.subService && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Sub Service</span>
                <span>{productData?.subService?.name}</span>
              </div>
            )}
            {productData?.brand && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Brand</span>
                <span>{productData?.brand?.name}</span>
              </div>
            )}
            {productData?.brand?.name?.region && (
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Region</span>
                <span>{productData?.brand?.name?.region}</span>
              </div>
            )}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={offer.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Title (Arabic)</label>
              <input
                type="text"
                name="titleAr"
                value={offer.titleAr}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.titleAr && <p className="mt-1 text-sm text-red-500">{errors.titleAr}</p>}
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={offer.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              <p className="mt-2 text-sm text-gray-500">
                Do not include URLs or contact information in the description box. URLs will be removed for safety
                reasons.  
              </p>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Description (Arabic)</label>
              <textarea
                name="descriptionAr"
                value={offer.descriptionAr}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              {errors.descriptionAr && <p className="mt-1 text-sm text-red-500">{errors.descriptionAr}</p>}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Unit Price (USD)</label>
                <input
                  type="number"
                  name="unitPriceUSD"
                  value={offer.unitPriceUSD}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.unitPriceUSD && <p className="mt-1 text-sm text-red-500">{errors.unitPriceUSD}</p>}
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Unit Price (SAR)</label>
                <input
                  type="number"
                  name="unitPriceSAR"
                  value={offer.unitPriceSAR}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.unitPriceSAR && <p className="mt-1 text-sm text-red-500">{errors.unitPriceSAR}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Min Quantity</label>
                <input
                  type="number"
                  name="minQty"
                  value={offer.minQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.minQty && <p className="mt-1 text-sm text-red-500">{errors.minQty}</p>}
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  name="apiQty"
                  value={offer.apiQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.apiQty && <p className="mt-1 text-sm text-red-500">{errors.apiQty}</p>}
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Low Stock Alert Quantity</label>
                <input
                  type="number"
                  name="lowStockAlertQty"
                  value={offer.lowStockAlertQty}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lowStockAlertQty && <p className="mt-1 text-sm text-red-500">{errors.lowStockAlertQty}</p>}
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Delivery Method</label>
              <select
                name="deliveryMethods"
                value={offer.deliveryMethods[0]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                {productData?.deliveryTypes?.map((method: string, index: number) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              {errors.deliveryMethods && <p className="mt-1 text-sm text-red-500">{errors.deliveryMethods}</p>}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
         <Link to={'/user/selectDetailsOffer'}> <button className="px-6 py-3 text-gray-700 bg-gray-300 hover:bg-gray-100">Discard</button></Link>
          <button
          
  className="px-6 py-3 text-white primary-background hover:bg-blue-950"
  onClick={handleSubmit}
  disabled={isSubmitting} // Disable the button when submitting
>
  {isSubmitting ? (
    <ClipLoader color="#ffffff" size={20} /> // Show loading spinner
  ) : (
    "Finish"
  )}
</button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;