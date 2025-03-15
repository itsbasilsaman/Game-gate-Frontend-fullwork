import { useState } from "react";
import Flag from "../../../assets/Images/saudiaround.webp";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from '../../../reduxKit/store';
import { useDispatch } from "react-redux";
import { userLanguageChange } from "../../../reduxKit/actions/user/userLanguage";
import { userCurrencyChange } from "../../../reduxKit/actions/user/userCurrency";
 
export const LocalizationSetting = () => {
 
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isLocalizationOpen, setIsLocalizationOpen] = useState<boolean>(false);
  
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
     setSelectedItem(event.target.value);
   };

     const handleSelectChange = (
       event: React.ChangeEvent<HTMLSelectElement>
     ): void => {
       setSelectedBoxItem(event.target.value);
       setShowWarning(false);
     };
     const { userCurrency } = useSelector(
      (state: RootState) => state.userCurrency
    );
    const { userLanguage } = useSelector(
      (state: RootState) => state.userLanguage
    );
   
    const handleSave = async () => {
      if (!selectedBoxItem) {
        setShowWarning(true);
        return;
      }
      setIsLoading(true);  
      const currencyCode =
        selectedBoxItem === "United States Dollar (USD)" ? "USD" : "SAR";
  
      console.log("Selected Language:", selectedLanguage);
      console.log("Selected Currency Code:", currencyCode);  
      await dispatch(userLanguageChange(selectedLanguage));
      await dispatch(userCurrencyChange(currencyCode));
      setIsLoading(false);
      setIsLocalizationOpen(!isLocalizationOpen);
    };

    const [selectedLanguage, setSelectedItem] = useState<string>(
      userLanguage || "English"
    );
    const [selectedBoxItem, setSelectedBoxItem] = useState<string>(
      userCurrency === "USD" ? "United States Dollar (USD)" : "Saudi Riyal (SAR)"
    );
 
  const items: string[] = ["English", "Arabic"];
 
  const toggleLocalization = (): void => {
    setIsLocalizationOpen(!isLocalizationOpen);
  };



  return (
    <>
       {
              <div className="flex justify-center items-center">
                <button
                  className="pr-[14px] px-[6px] py-[6px] country-button modal-country-button flex justify-center items-center gap-[10px] rounded-full text-[19px]"
                  onClick={toggleLocalization}
                >
                  <img src={Flag} alt="" className="w-[43px]" /> Localization
                  Setting
                </button>
              </div>
            }

<div
              className={`localization-setting transition-all duration-300 ease-in-out overflow-hidden ${
                isLocalizationOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div>
                <div className="flex justify-between items-center py-[15px]">
                  <label className="block text-sm font-medium">
                    Country / Region  
                  </label>
                  <div className="flex justify-start gap-[8px]">
                    <img src={Flag} alt="" className="w-[25px]" />{" "}
                    <span>Saudi Arabia</span> 
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
                        checked={selectedLanguage === item}
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
                    <option value="">Select Currency</option>
                    <option value="United States Dollar (USD)">
                      United States Dollar (USD)
                    </option>
                    <option value="Saudi Riyal (INR)">Saudi Riyal (INR)</option>
                  </select>
                  {showWarning && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a currency.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end p-4 gap-[6px]">
                <button
                  className="px-4 py-2 text-black bg-white border rounded"
                  onClick={toggleLocalization}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-black bg-white border rounded"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
    </>
  )
}