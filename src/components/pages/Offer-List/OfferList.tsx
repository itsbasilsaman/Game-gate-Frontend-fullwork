import Footer from "../user/Footer"
import GamingExperiencePage from "../user/GamingExperiencePage"
import { Navbar } from "../user/Navbar"
import TopUpSection from "./topupSection"

 const TopUp = () => {
  return (
    <>
    
     <Navbar/>
     <TopUpSection/> 
     
     <div className="py-3 mt-12">
      <GamingExperiencePage/> 
     </div>  
     <Footer/>
    </>
  )
}
  
export default TopUp