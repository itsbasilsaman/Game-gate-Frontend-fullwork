import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { Link } from "react-router-dom";


function GamingExperiencePage() {
  const {  userLanguage } = useSelector((state: RootState) => state.userLanguage);
  return (
    <div className="w-full h-auto  lg:pt-[40px] pt-[0px] pb-20 flex flex-col justify-center items-center  text-white gap-[15px] md:px-[80px] px-[20px] ">
      <h1 
        className="lg:text-[54px] text-[36px] lg:w-[1000px] text-center leading-[40px] lg:leading-[60px]"
        style={{ fontFamily: "Unbounded" }}
      >
      {userLanguage === "Arabic" ? "هل أنت مستعد للارتقاء بتجربة الألعاب الخاصة بك؟" : "Ready to Elevate Your Gaming Experience?"}
      </h1>
      <p className="lg:text-[18px] text-center text-[16px] ">
       {userLanguage === "Arabic" ? "انضم إلى آلاف اللاعبين الذين يقومون بشراء وبيع منتجات الألعاب الموثوقة اليوم." : "Join thousands of gamers buying and selling trusted gaming productstoday"}
      </p>
     <Link to={'/user/selectDetailsOffer'}>
        <button className="experience-join-button lg:text-[19px] px-[50px] py-[8px] rounded-[1000px] ">
          Join now 
        </button>
     </Link>
    </div>
  );
}
 
export default GamingExperiencePage;
 