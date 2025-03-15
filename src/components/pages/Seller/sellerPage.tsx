import React from 'react';
import { SellerHome } from './sellerHome';
import WhySellWithUs from './whySellWithUsPage';
import Testimonials from './Testimonials';
import { Navbar } from '../user/Navbar';
// import Card from './Card';
 

const SellerPage: React.FC = () => {
  return (
     <div className='bg-white '>
      <Navbar/>
     <SellerHome/>
     <WhySellWithUs/>
     <Testimonials/>
     {/* <Card/> */}
     
     </div>
  );
};

export default SellerPage;
