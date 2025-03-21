import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/gaminggate-logo.png';
import { loginUser } from "../../../reduxKit/actions/auth/authAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface Country {
  name: string;
  callingCodes: string[];
  flag: string;
}

const UserLogin: React.FC = React.memo(() => {
  const [inputValue, setInputValue] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+966");
  const [inputType, setInputType] = useState<"email" | "phone" | null>(null);
  const [errors, setErrors] = useState<{ input?: string }>({});
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim();
    setInputValue(trimmedValue);

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue.toLowerCase())) {
      setInputType("email");
      setErrors({});
    } else if (/^\d+$/.test(trimmedValue)) {
      setInputType("phone");
      setErrors({});
    } else {
      setInputType(null);
      setErrors({});
    }
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    setShowDropdown(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedInputValue = inputValue.trim();
    if (!trimmedInputValue) {
      setErrors({ input: inputType === "email" ? "Email is required" : "Phone is required" });
      return;
    }

    if (inputType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedInputValue.toLowerCase())) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please enter a valid email address.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",

          
          customClass: {
            popup: "rounded-lg shadow-lg",
            title: "text-xl font-bold",
            confirmButton: "px-4 py-2 rounded-lg",
          },
        });
        return;
      }
    } else if (inputType === "phone") {
      if (!/^\d+$/.test(trimmedInputValue)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Phone Number",
          text: "Please enter a valid phone number.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-lg shadow-lg",
            title: "text-xl font-bold",
            confirmButton: "px-4 py-2 rounded-lg",
          },
        });
        return;
      }
    }
    setErrors({});

    try {
      const payload = {
        contact: inputType === "phone" ? `${countryCode}${trimmedInputValue}` : trimmedInputValue,
        type: inputType === "phone" ? "PHONE" : "EMAIL",
      };

      const Type = payload.type;
      console.log("Payload :", payload, trimmedInputValue);

      const response = await dispatch(loginUser(payload)).unwrap();
      toast.success(response.message);

      navigate(`/user/verification?inputValue=${encodeURIComponent(trimmedInputValue)}&type=${Type}`);
    } catch (error) {
      console.error("Login failed:", error);
       
      console.log('Error Message',(error as Error).message);
      console.log('Error Phone message',(error as Error))
      
      Swal.fire({ 
        text: inputType === "phone" ? String(error) : (error as Error).message, 
        confirmButtonColor: "#040635", 
        confirmButtonText: "OK", 
        showClass: { popup: "animate__animated animate__fadeInDown" }, 
        hideClass: { popup: "animate__animated animate__fadeOutUp" }, 
        customClass: { 
          popup: "rounded-lg shadow-xl p-6", 
          title: "text-xl font-bold", 
          confirmButton: "px-5 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300" 
        } 
      });
      
      

    }
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCountry = countries.find(
    (country) => country.callingCodes[0] === countryCode.replace('+', '')
  );
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,callingCodes,flag")
      .then((response) => response.json())
      .then((data: Country[]) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // const isLoginButtonDisabled = !inputValue || !!errors.input || !inputType;

  return (
    <div className="md:h-[100vh] h-full grid grid-rows-5 bg-white">
      <div className="lg:row-span-2 primary-background relative h-[80px] px-2 lg:h-auto flex items-center">
        <div className="flex items-center pl-2 lg:pl-0 lg:justify-center lg:absolute lg:top-16 lg:left-1/2 lg:-translate-x-1/2">
          <img src={Logo} className="w-[80px] h-[60px] object-cover lg:block hidden" />
          <span className="lg:text-[24px]" style={{ fontFamily: "Unbounded", color: "white" }}>GAME GATE</span>
        </div>
      </div>
      <div className="flex items-center justify-center row-span-5 lg:bg-white">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[530px] px-4 sm:px-6 py-12">
          <div className="relative z-10 flex flex-col affiliate-section rounded-[12px] items-center px-4 sm:px-8 pb-[65px] pt-12 w-full bg-white border-gray-300 border">
            <h2
              className="text-[20px] sm:text-[24px] font-bold mb-7 mt-3 text-center primary-color"
              style={{ fontFamily: "Unbounded" }}
            >
              Welcome back!
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="input"
                  className="block text-[15px] sm:text-[17px] text-gray-700 mb-2"
                >
                  {inputType === "phone" ? "Phone Number or Email " : "Email or Phone Number"}
                </label>
                <div className="flex items-center border border-gray-300 rounded-[6px]">
                  {inputType === "phone" && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
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
                      {showDropdown && (
                        <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-[6px] shadow-lg">
                          <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-lg border-b border-gray-300 focus:outline-none"
                          />
                          <div className="overflow-y-auto max-h-48">
                            {filteredCountries.map((country) => (
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
                  )}
                  
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    placeholder={inputType === "phone" ? "Enter phone number " : "Enter email address"}
                    className="w-full px-3 py-3 text-lg rounded-[6px]"
                  />
                </div>
                {errors.input && (
                  <div className="mt-1 text-sm text-red-400">{errors.input}</div>
                )}
              </div>

              <div className="mt-4 text-center">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link to={'/'} className="order-2 w-full sm:order-1">
                    <button
                      className="w-full px-6 py-3 border border-gray-300 rounded-[6px] font-semibold transform transition"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      Later
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-[6px] primary-background text-white font-semibold transform transition order-1 sm:order-2"
                    style={{ fontFamily: "Unbounded" }}
                 
                  >
                    {loading ? "Sending OTP..." : "Login"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default UserLogin;