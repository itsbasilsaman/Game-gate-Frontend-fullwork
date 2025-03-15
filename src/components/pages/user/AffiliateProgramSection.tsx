import React from 'react';
import Image from '../../../assets/Images/affiliateimg.png';
import ImageTwo from '../../../assets/Images/affiliateform.png';
import ImageThree from '../../../assets/Images/Scroll.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reduxKit/store';

 

 export const AffiliateProgramSection: React.FC = React.memo(() => {

   const {isLoggedUser, isLoggedUserWithSeller} = useSelector((state:RootState) =>  state.logAuth)

  return (
    <div className='w-full h-auto text-white pt-[30px] pb-[200px]  flex flex-col items-center justify-top  relative'> 
       <section className='lg:w-[90%] lg:h-[446px] h-[700px] affiliate-section rounded-[16px] lg:grid lg:grid-cols-2 overflow-hidden '>
          <div className='flex lg:justify-center lg:items-left flex-col lg:pl-[50px] px-[30px] '>
            <h1 className='lg:text-[54px] text-[40px] lg:font-bold leading-[47px] lg:leading-none pt-[30px] ' style={{fontFamily:'Unbounded'}}>Join Our Affiliate 
            Program Today!</h1>
            <p className='text-[17px] lg:pb-[22px]  pt-[10px] pb-[12px]'>Earn commissions on every referral!</p>
           <Link to={'/user/seller'}> <button  className='text-[20px] lg:font-medium seller-button lg:px-[19px] py-[13px] rounded-[1000px] w-[182px] '>{ isLoggedUser &&  isLoggedUserWithSeller ? 'Create Offer' : 'Become a Seller'}</button></Link>
          </div>
          <div className='relative  pt-[25px] lg:pt-[0px]'>
            <img src={Image} alt="" className='absolute lg:left-[200px] lg:bottom-[0px] left-[-21px] top-[93px]  lg:top-[24px]' style={{zIndex:'-10'}}/>
            <img src={ImageTwo} alt="" style={{zIndex:'11'}} className='absolute lg:top-[316px] lg:right-[200px] top-[250px] right-[20px] w-[300px] lg:w-auto' />
          </div>
       </section>
       <img src={ImageThree} className='absolute  lg:top-[430px] lg:left-[0px] w-[100%]  top-[690px]  h-[100px] lg:h-auto object-cover'   />
    </div>
  );
});



