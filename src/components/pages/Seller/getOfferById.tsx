/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../reduxKit/store"
import { GetOfferByIdFromSeller, UpdateOfferFromSeller } from "../../../reduxKit/actions/seller/offerListing"
import { useEffect, useState } from "react"
import Footer from "../user/Footer"
import { Navbar } from "../user/Navbar"
import { FaEdit } from "react-icons/fa";


const GetOfferById: React.FC = () => {
  const [productItem, setProductItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editingQty, setEditingQty] = useState(false);
  const [newQty, setNewQty] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const GetOfferById = async () => {
      try {
        setLoading(true)
        const response = await dispatch(GetOfferByIdFromSeller(id))
        console.log("Fetched Product:", response.payload.data)
        setProductItem(response.payload.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    GetOfferById()
  }, [dispatch, id])

  const handleUpdateQty = async () => {
    if (newQty !== null && newQty !== productItem.apiQty) {
      try {
        setLoading(true);
        const updatedData = { ...productItem, apiQty: newQty };
        await dispatch(UpdateOfferFromSeller({ id, data: updatedData }));
        setProductItem(updatedData);
        setEditingQty(false);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      } finally {
        setLoading(false);
      }
    }
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

  if (!productItem) {
    return (
      <div className="flex flex-col items-center justify-center h-screen primary-background text-white">
        <h1 className="text-[150px] font-extrabold leading-none text-white flex" >
          <p className="text-sm tracking-widest uppercase py-3" style={{ fontFamily: 'sans-serif' }}>
            Oops! Page Not Found
          </p>
        </h1>
        <p className="text-center text-[14px] uppercase mt-2" style={{ fontFamily: 'sans-serif' }}>
          We are sorry, but the page you requested was <br /> not found
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-[120px] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#191B4B] to-[#191b8d]">
        <div className="max-w-7xl mx-auto">
          <div className="common-background-seller rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:p-8 p-[15px]">
              {/* Left Column - Image */}
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-gray-200 p-4">
                  <img
                    src={productItem.product.image || " "}
                    alt={productItem.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-5">
                <div>
                  <h1 className="text-[18px] tracking-tight text-gray-200">
                    <span className=" text-white"><span style={{ fontFamily: 'Unbounded' }}>Title -</span></span> {productItem.title}
                  </h1>
                  <p className="mt-4 text-[18px] text-gray-200">
                    <span className="  text-white"><span style={{ fontFamily: 'Unbounded' }}>Description -</span></span> {productItem.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] text-gray-200">
                      <span className="  text-white"><span style={{ fontFamily: 'Unbounded' }}>Unit Price -</span></span> {productItem.unitPriceSAR} SAR
                    </span>
                    <span
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        productItem.status === "DRAFT" ? "bg-white text-red-800" : "bg-white text-green-800"
                      }`}
                    >
                      <span className="font-medium text-black uppercase">Status - </span> {productItem.status}
                    </span>
                  </div>
                  <p className="text-gray-200 text-[18px]">
                    <span className=" text-white"><span style={{ fontFamily: 'Unbounded' }}>Quantity Available -</span> </span>
                    {editingQty ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={newQty !== null ? newQty : productItem.apiQty}
                          onChange={(e) => setNewQty(Number(e.target.value))}
                          className="w-20 p-1 border rounded"
                        />
                        <button
                          onClick={handleUpdateQty}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingQty(false)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span>
                       <span> {productItem.apiQty}</span>
                        <button
                          onClick={() => {
                            setNewQty(productItem.apiQty);
                            setEditingQty(true);
                          }}
                          className="ml-5 bg-white p-2 rounded-full text-blue-950 "
                        >
                          <FaEdit />
                        </button>
                      </span>
                    )}
                  </p>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Product Details */}
                <div className="space-y-4">
                  <h3 className="text-[23px] border-b-2 font-semibold text-white inline-block" style={{ fontFamily: 'Unbounded' }}>Product Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-200">
                      <span className="font-medium text-white" style={{ fontFamily: 'Unbounded' }}>Product Title - </span> {productItem.product.title}
                    </p>
                    <p className="text-gray-200">
                      <span className="font-medium text-white" style={{ fontFamily: 'Unbounded' }}>Product Description - </span> {productItem.product.description}
                    </p>
                  </div>
                </div>

                <hr className="border-t border-gray-200 my-6" />

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productItem.product?.brand && (
                    <div className="bg-gray-200 rounded-lg border border-gray-200 p-4 shadow-sm">
                      <p className="text-center font-semibold uppercase" style={{ fontFamily: 'Unbounded' }}>Brand Details</p>
                      <div className="space-y-2">
                        <img
                          src={productItem.product?.brand?.image || "/placeholder.svg"}
                          alt={productItem.product?.brand?.name}
                          className="w-16 h-16 object-contain"
                        />
                        <p className="">
                          <span className="font-medium text-gray-600">Name - </span> {productItem.product?.brand?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {productItem.product?.service && (
                    <div className="bg-gray-200 rounded-lg border border-gray-200 p-4 shadow-sm">
                      <p className="text-center font-semibold uppercase" style={{ fontFamily: 'Unbounded' }}>Service Details</p>
                      <div className="space-y-2">
                        <p className="text-black">
                          <span className="font-medium text-gray-600">Name - </span> {productItem.product?.service?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {productItem.product?.region && (
                    <div className="bg-gray-200 rounded-lg border border-gray-200 p-4 shadow-sm">
                      <p className="text-center font-semibold uppercase" style={{ fontFamily: 'Unbounded' }}>Region Details</p>
                      <div className="space-y-2">
                        <p className="font-medium">Region</p>
                        <p className="text-gray-600"> </p>
                      </div>
                    </div>
                  )}

                  {productItem.product?.subService && (
                    <div className="bg-gray-200 rounded-lg border border-gray-200 p-4 shadow-sm">
                      <p className="text-center font-semibold uppercase" style={{ fontFamily: 'Unbounded' }}>Sub Service Details</p>
                      <div className="space-y-2">
                        <p className="font-medium">Sub Service</p>
                        <p className="text-gray-600"> </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetOfferById;