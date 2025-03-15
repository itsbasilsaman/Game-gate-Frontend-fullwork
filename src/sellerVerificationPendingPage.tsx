import { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";

const SellerVerificationPending = () => {
  const [showText, setShowText] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowIcon(true), 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen primary-background text-white">
     
      <span
        className={`mt-2 text-[20px] md:text-[22px] text-gray-300 fade-in ${
          showText ? "visible" : "opacity-0"
        }`}
      >
        PLEASE WAIT SELLER VERIFICATION PROCESSING....
      </span>
      {showIcon && (
        <PiSmileySadLight className="text-[80px] md:text-[100px] mt-4 text-gray-400 icon-bounce" />
      )}
    </div>
  );
};

export default SellerVerificationPending;
