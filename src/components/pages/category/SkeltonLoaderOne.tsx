import React from "react";
const SkeletonLoader: React.FC = () => {
  return (
    <>
  
  
      <main className="w-full h-auto pb-[40px]   text-white">
          <p className="pt-[120px]     md:px-[80px] text-[14px] lg:text-[16px] px-[20px]   ">
          <div className="shimmer  bg-grayShade w-[180px] rounded-md h-8" ></div>
          </p>
          <h1
          
            className="lg:py-[17px]    py-[10px] lg:text-[27px] text-[24px] md:px-[80px] px-[20px]   "
          >
                      <div className="shimmer  bg-grayShade w-[300px]  h-12 rounded-md">
                        </div>
          </h1>
          <div className="flex justify-between  lg:hidden py-[14px] md:px-[80px] px-[20px]">
          <div className="flex gap-[12px]">
          <div className="w-[65px] h-[65px] shimmer bg-grayShade  rounded-full   object-cover  "></div>
              <div>
              <p className="lg:text-[18px] underline w-[120px]  rounded-md shimmer bg-grayShade">
                     <span className="invisible">{'@@@@@@@@@@@@'}</span>
                    </p>
                    <p className="shimmer bg-grayShade rounded-md w-[90px] mt-2"><span className="invisible">{ '@@@@@@@'}</span></p>
              </div>
            </div>
            <div className="flex gap-[12px] shimmer bg-grayShade">
               
            </div>
            <div
          
              className="w-[55px] h-[55px] rounded-[22px] shimmer bg-grayShade  lg:w-auto"
            ></div>
            
          </div>
          <section className="w-[100%] h-auto category-section lg:gap-[25px] md:px-[80px] px-[20px] lg:pt-[18px] ">
            <div className="category-section-one rounded-[16px] lg:px-[34px] px-[16px] py-[36px] w-full my-[15px] lg:my-[0px]  ">
              <h1 className="lg:text-[20px] text-[18px] font-bold">
                
              </h1>
             
              <div className="w-full outline-section py-[20px]">
               
                <h1 className="block lg:hidden font-semibold text-[18px]">
                 
                </h1>
                <div className="flex justify-between lg:items-center">
                  <div className="flex lg:gap-[7px] gap-[5px]">
                    
                    <h1 className="font-semibold">  </h1>
                  </div>
                  <p> </p>
                </div>
              </div>
           
              <h1 className="lg:text-[20px] lg:font-bold lg:py-[14px] hidden lg:block">
            
              </h1>
              <p className="pb-[8px] lg:pb-[0px]">
                
              </p>
              <p>
                
              </p>
              <p>
                 
              </p>
              <p>
                
              </p>
              <p>
                
              </p>
            </div>
            <div className="category-section-two  rounded-[16px] lg:py-[18px]  px-[23px] hidden lg:block">
              <div className="flex justify-between border-b-2 border-grayShade    pb-2">
                <div className="flex gap-[12px]">
                   <div className="lg:w-[65px] lg:h-[65px] shimmer bg-grayShade  rounded-full   object-cover  "></div>
                  <div>
                    <p className="lg:text-[18px] underline w-[120px] rounded-md shimmer bg-grayShade">
                     <span className="invisible">{'@@@@@@@@@@@@'}</span>
                    </p>
                    <p className="shimmer bg-grayShade rounded-md w-[90px] mt-2"><span className="invisible">{ '@@@@@@@'}</span></p>
                  </div>
                </div>
                <div className="lg:w-[65px] lg:h-[65px] shimmer bg-grayShade  rounded-[25px]   object-cover  "></div>
              </div>
              <div className=" justify-center flex  ">
                <div className=" items-center lg:text-[18px] flex    lg:py-[12px] h-10  rounded-lg w-full ">
                 
                   <div className="shimmer mt-3 bg-grayShade  w-[170px] h-7 rounded-md"></div>
                </div>
              </div>
              
              <div
                className="w-[90px] h-10 shimmer rounded-md mt-3 bg-grayShade"
              >
                
              </div>
              <div className="w-full h-[56px] shimmer  bg-grayShade   rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px]">
                 
              </div>
              <button
             
                className="w-full shimmer  bg-grayShade lg:h-[56px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button"
              >
          
              </button>
            </div>
          </section>


          <div
            className="lg:hidden block md:mx-[80px] mx-[20px] px-[10px] py-[22px] flex justify-center items-start flex-col gap-[12px] rounded-[16px]"
            style={{ border: "2px solid rgba(255, 255, 255, 0.214)" }}
          >
            <div className="w-[200px] h-12 rounded-md  shimmer bg-grayShade">
         
            </div>
            <div
             
              className=" w-[100px] h-12 rounded-md  shimmer bg-grayShade"
            >
       
            </div>
            <div className="w-full h-[56px] shimmer bg-grayShade   rounded-[1000px] lg:mt-[23px] flex justify-between items-center px-[8px]">
              
        
             
            </div>
          </div>
          <div
            className="block lg:hidden py-[19px] px-[18px] fixed bottom-[0px] left-[0px] right-[0px] bg-grayShade shimmer"
            style={{ backgroundColor: "#271D8E" }}
          >
          
          <button
       
            className="w-full lg:h-[56px] rounded-[1000px] lg:mt-[18px] text-[18px] font-medium buy-now-button bg-grayShade shimmer"
          >
   
          </button>
    
          </div>
        </main>

    </>

























  );
};

export default SkeletonLoader;
