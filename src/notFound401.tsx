import { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";
 

const NotFound401 = () => {
  const [showFour, setShowFour] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showOne, setShowOne] = useState(false);

  useEffect(() => {
    const handleScrollOrTouch = () => {
      const element = document.querySelector(".primary-background");
      if (element) {
        element.classList.add("darkened");
      }
    };

  
    window.addEventListener("scroll", handleScrollOrTouch);
    window.addEventListener("touchstart", handleScrollOrTouch);
 
    return () => {
      window.removeEventListener("scroll", handleScrollOrTouch);
      window.removeEventListener("touchstart", handleScrollOrTouch);
    };
  }, []);

  
  useEffect(() => {
    setTimeout(() => setShowFour(true), 500);  
    setTimeout(() => setShowIcon(true), 1000);  
    setTimeout(() => setShowOne(true), 1500);  
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen primary-background text-white">
      <p className="text-sm tracking-widest text-center uppercase py-2" style={{ fontFamily: 'sans-serif' }}>
        <span className="text-[18px]">unauthorized</span> 
      </p>
      <h1 className="text-[150px] font-extrabold leading-none text-white flex" >
        <span className={`fade-in ${showFour ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}>4</span>
        <span className={`fade-in ${showIcon ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}>
          <PiSmileySadLight className="icon-bounce" />
        </span>
        <span className={`fade-in ${showOne ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}>1</span>
      </h1>
      <p className="text-center text-[14px] uppercase mt-2" style={{ fontFamily: 'sans-serif' }}>
        Please try refreshing the page and fill in <br /> the correct login details  
      </p>
    </div>
  );
};

export default NotFound401;