
import CategorySectionOne from './category/CategorySectionOne'
import CategorySectionTwo from './category/CategorySectionTwo'
import Footer from './user/Footer'
import { Navbar } from './user/Navbar'
import { useLocation } from 'react-router-dom'

function Category() {
  const location = useLocation();
  const queryParams= new URLSearchParams(location.search);
  const offerId= queryParams.get("offerId")?? undefined
  return (
    <>
    <Navbar/>
     <CategorySectionOne offerId={offerId}/> 
     <CategorySectionTwo offerId={offerId} />
     <Footer/>
    </>
  )
}

export default Category