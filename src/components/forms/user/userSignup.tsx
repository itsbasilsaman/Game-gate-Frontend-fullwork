/* eslint-disable @typescript-eslint/no-explicit-any */
// UserRegister.tsx

import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { SignupUser } from "../../../reduxKit/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  validatePhone,
  validateCountry,
  validateGender,
} from "../../.././validation/user/userSignUpValidation"; // Import validation functions

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  fcmToken: string;
  phone: string;
  country: string;
  userName: string;
  email: string;
  gender: string;
}

export interface Country {
  name: string;
  callingCodes: string[];
  flag: string;
}

const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const UserRegister: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryCode, setCountryCode] = useState<string>("+966");
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [showPhoneCodeDropdown, setShowPhoneCodeDropdown] = useState<boolean>(false);
  const [searchCountryQuery, setSearchCountryQuery] = useState<string>("");
  const [searchPhoneCodeQuery, setSearchPhoneCodeQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const inputValue = queryParams.get("inputValue") || "";
  const type = queryParams.get("type") || "";

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const phoneCodeDropdownRef = useRef<HTMLDivElement>(null);

  // Formik setup
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      fcmToken: "fcm",
      phone: type === "PHONE" ? inputValue : "",
      country: "",
      userName: "",
      email: type === "EMAIL" ? inputValue : "",
      gender: "",
    },
    onSubmit: async (values: SignupFormValues) => {
      // Validate all fields
      const errors = {
        firstName: validateFirstName(values.firstName),
        lastName: validateLastName(values.lastName),
        userName: validateUsername(values.userName),
        email: validateEmail(values.email),
        phone: validatePhone(values.phone),
        country: validateCountry(values.country),
        gender: validateGender(values.gender),
      };

      // Check if there are any errors
      if (Object.values(errors).some((error) => error !== null)) {
        // Set errors in formik
        formik.setErrors(errors as any);
        return;
      }

      setIsSubmitting(true);
      try {
        const payload = {
          ...values,
          phone: `${countryCode}${values.phone}`,
        };
        const response = await dispatch(SignupUser(payload)).unwrap();
        if (response.success) {
          toast.success(response.message);
          await navigate("/");
        }
      } catch (error: any) {
        console.log('Error',error);
        Swal.fire({
          icon: "error",      
          text: error === "Please Verify OTP" ? error : error.message,
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
        setIsSubmitting(false);
      }
    },
  });

  const selectedGender = genderOptions.find(
    (option) => option.value === formik.values.gender
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    setShowPhoneCodeDropdown(false);
  };

  const handleCountrySelect = (countryName: string) => {
    formik.setFieldValue("country", countryName);
    setShowCountryDropdown(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchCountryQuery.toLowerCase())
  );

  const filteredPhoneCodeCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchPhoneCodeQuery.toLowerCase())
  );

  const selectedCountry = countries.find(
    (country) => country.callingCodes[0] === countryCode.replace("+", "")
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (phoneCodeDropdownRef.current && !phoneCodeDropdownRef.current.contains(event.target as Node)) {
        setShowPhoneCodeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://restcountries.com/v2/all?fields=name,callingCodes,flag")
      .then((response) => response.json())
      .then((data: Country[]) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 user-background sm:px-4 lg:px-8">
      <div className="relative z-10 bg-white px-5 py-7 lg:px-8 lg:py-10 rounded-[24px] w-full max-w-lg md:max-w-3xl lg:max-w-4xl">
        <h2
          className="py-3 mb-6 text-3xl font-bold text-center primary-color"
          style={{ fontFamily: "Unbounded" }}
        >
          SignUp Account
        </h2>

        <form onSubmit={formik.handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { name: "firstName", label: "First Name", placeholder: "Your First Name" },
              { name: "lastName", label: "Last Name", placeholder: "Your Last Name" },
              { name: "userName", label: "Username", placeholder: "Enter Your Username" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium primary-text">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={formik.values[field.name as keyof SignupFormValues]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-3 pl-4 border rounded-[3px] mt-[8px] focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
                {formik.touched[field.name as keyof SignupFormValues] &&
                  formik.errors[field.name as keyof SignupFormValues] && (
                    <p className="text-[14px] text-red-700 mt-1">
                      {formik.errors[field.name as keyof SignupFormValues]}
                    </p>
                  )}
              </div>
            ))}

            {/* Country Select Dropdown with Search and Flag */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium primary-text">
                Country
              </label>
              <div className="relative" ref={countryDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="w-full px-3 py-3 border rounded-[3px] mt-[8px] text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                  {formik.values.country || "Select Country"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {showCountryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-[6px] shadow-lg">
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchCountryQuery}
                      onChange={(e) => setSearchCountryQuery(e.target.value)}
                      className="w-full px-3 py-2 text-lg border-b border-gray-300 focus:outline-none"
                    />
                    <div className="overflow-y-auto max-h-48">
                      {isLoading ? (
                        <div className="flex items-center justify-center p-3">
                          <div className="w-5 h-5 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        filteredCountries.map((country) => (
                          <div
                            key={country.name}
                            onClick={() => handleCountrySelect(country.name)}
                            className="flex items-center px-3 py-2 text-lg cursor-pointer hover:bg-gray-100"
                          >
                            <img src={country.flag} alt="flag" className="w-5 h-5 mr-2" />
                            {country.name}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
                {formik.touched.country && formik.errors.country && (
                  <p className="mt-1 text-sm text-red-800">{formik.errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Gender Selector */}
          <div className="relative">
      <label htmlFor="gender" className="block text-sm font-medium primary-text">
        Gender
      </label>
      <button
        type="button"
        className="w-full px-3 py-3 border rounded-[3px] mt-[8px] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-950"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedGender ? selectedGender.label : "Select Gender"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-[2px] bg-white border border-gray-300 shadow-lg">
          {genderOptions.map((option) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-950 hover:text-white ${
                formik.values.gender === option.value ? "bg-blue-900 text-white" : ""
              }`}
              onClick={() => {
                formik.setFieldValue("gender", option.value);
                setShowDropdown(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {formik.touched.gender && formik.errors.gender && (
        <p className="mt-1 text-sm text-red-800">{formik.errors.gender}</p>
      )}
    </div>

          {/* Show email input only if type is PHONE */}
          {type === "PHONE" && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium primary-text">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="email@example.com"
                className="w-full px-3 py-3 pl-4 border rounded-[3px] mt-[8px] focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-[14px] text-red-400 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
          )}

          {/* Show phone input only if type is EMAIL */}
          {type === "EMAIL" && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium primary-text">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-[6px]">
                <div className="relative" ref={phoneCodeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowPhoneCodeDropdown(!showPhoneCodeDropdown)}
                    className="flex items-center px-4 py-2 text-lg border-r border-gray-300 pr-9 focus:outline-none"
                  >
                    {selectedCountry && (
                      <img
                        src={selectedCountry.flag}
                        alt="flag"
                        className="w-5 h-5 mr-2"
                      />
                    )}
                    {countryCode}
                  </button>
                  {showPhoneCodeDropdown && (
                    <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-[6px] shadow-lg">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchPhoneCodeQuery}
                        onChange={(e) => setSearchPhoneCodeQuery(e.target.value)}
                        className="w-full px-3 py-2 text-lg border-b border-gray-300 focus:outline-none"
                      />
                      <div className="overflow-y-auto max-h-48">
                        {filteredPhoneCodeCountries.map((country) => (
                          <div
                            key={country.name}
                            onClick={() => handleCountryCodeChange(`+${country.callingCodes[0]}`)}
                            className="flex items-center px-3 py-2 text-lg cursor-pointer hover:bg-gray-100"
                          >
                            <img src={country.flag} alt="flag" className="w-5 h-5 mr-2" />
                            {country.name} (+{country.callingCodes[0]})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={formik.values.phone}
                  onChange={(e) => formik.setFieldValue("phone", e.target.value)}
                  onBlur={formik.handleBlur}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-3 text-lg rounded-[6px]"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-[14px] text-red-400 mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full px-4 py-3 bg-blue-950 text-white text-[17px] font-semibold rounded-md hover:bg-blue-900 transition"
            >
              {loading ? "Submitting..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;