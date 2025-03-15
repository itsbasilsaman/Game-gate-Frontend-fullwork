import React from 'react';
import CardOne from '../../../assets/Card/itunesog.png';
import CardTwo from '../../../assets/Card/amazonog.png';
import CardThree from '../../../assets/Card/playproog.png';
import CardFour from '../../../assets/Card/streamog.png';

// Define the type for a card item
interface CardItem {
  bg: string;  
  title: string; 
  offer: string;  
}

export const FeaturedGiftCards: React.FC = React.memo(() => {
 
  const cardItems: CardItem[] = [
      
    {
      bg: CardOne,
      title: 'ITunes', 
      offer: '150 offers',
    },
    {
      bg: CardTwo,
      title: 'Amazon',
      offer: '135 offers',
    },
    {
      bg: CardThree,
      title: 'Play Pro',
      offer: '150 offers',
    },
    {
      bg: CardFour,
      title: 'Steam',
      offer: '150 offers',
    },
  ];

  return (
    <>
        <main className='w-full h-auto card-section text-white pb-[50px] md:px-[80px] px-[20px]'> 
      <div className='lg:flex lg:justify-between lg:items-center lg:mb-[49px]'>
        <h1 className='lg:text-[40px] text-[21px] font-bold pb-[6px] lg:pb-[0px]' style={{fontFamily:'Unbounded'}}>Featured Gift Cards🎁</h1>
        <p className='lg:text-[20px] text-[17px]   pb-[23px] lg:pb-[0px]'>Explore All</p>
      </div>
      <div className='lg:flex lg:justify-between grid grid-cols-2 gap-[14px]'>
      {cardItems.map((item, index) => (
        <section
          key={index}
          className="lg:w-[326px] lg:h-[228px] h-[150px] game-card one relative cursor-pointer"
          style={{justifyContent:'end'}}
        >
          <img
            src={item.bg}
            alt=""
            className="absolute top-0 left-0 w-full h-full  object-cover rounded-[12px]"
            style={{ zIndex: '-10' }}
          />
          {/* <img src={item.img} alt={item.title} className='h-[80px] lg:h-[auto] pt-[20px] lg:pt-[0px] ' /> */}
          <p className="text-center lg:text-[20px] font-bold mt-[10px] pb-[12px]" >{item.title}</p>
          <span className="lg:px-[8px] px-[11px] lg:pl-[16px] py-[3px] lg:py-[8px] lg:w-[126px] lg:h-[45px] offer-menu lg:text-[18px] font-medium rounded-[1000px]">
            {item.offer}
          </span>
        </section>
      ))}
       
      </div>
    </main>
    </>
  );
});
