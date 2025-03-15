import { useEffect, useState } from "react";
import { PiSmileySadLight } from "react-icons/pi";

const NotFound404 = () => {

  const [showFirstFour , setShowFirstFour] = useState(false)
  const [showIcon, setShowIcon] = useState(false);
  const [showThirdFour,setShowThirdFour] = useState(false) 


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
    setTimeout(() => setShowFirstFour(true), 500)
    setTimeout(()=> setShowIcon(true), 1000)
    setTimeout(()=> setShowThirdFour(true),1500 )
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen primary-background text-white">
      <p className="text-sm tracking-widest uppercase py-3" style={{ fontFamily: 'sans-serif' }}>
        Oops! Page Not Found
      </p>
      <h1 className="text-[150px] font-extrabold leading-none text-white flex" >
        <span className={`fade-in ${showFirstFour ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}>4</span>
        <span className={`fade-in ${showIcon ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}><PiSmileySadLight className="icon-bounce" /></span>
        <span className={`fade-in ${showThirdFour ? "visible" : ""}`} style={{ fontFamily: "Unbounded" }}>4</span>
      </h1>
     <p className="text-center text-[14px] uppercase mt-2" style={{ fontFamily: 'sans-serif' }}>
        We are sorry, but the page you requested was <br /> not found
      </p>
    </div>
  );
};

export default NotFound404;