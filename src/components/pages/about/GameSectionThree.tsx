import React from 'react';
import CardOne from '../../../assets/Card/1.png';
import ImgOne from '../../../assets/Card/imgOneone.png';
import CardTwo from '../../../assets/Card/2.png';
import ImgTwo from '../../../assets/Card/imgTwotwo2.png';
import CardThree from '../../../assets/Card/3.png';
import ImgThree from '../../../assets/Card/imgThreethree.png';
import CardFour from '../../../assets/Card/4.png';
import ImgFour from '../../../assets/Card/imgFour.png';

type CardItem = {
  img: string;
  bg: string;
  title: string;
  offer: string;
};

const GameSectionFour: React.FC = React.memo(() => {
  const cardItems: CardItem[] = [
    {
      img: ImgOne,
      bg: CardOne,
      title: 'Brawl Stars',
      offer: '150 offers',
    },
    {
      img: ImgTwo,
      bg: CardTwo,
      title: 'Clash of Clans',
      offer: '148 offers',
    },
    {
      img: ImgThree,
      bg: CardThree,
      title: 'Lords Mobile',
      offer: '136 offers',
    },
    {
      img: ImgFour,
      bg: CardFour,
      title: 'Star Rail',
      offer: '150 offers',
    },
  ];

  return (
    <main className='w-full h-auto card-section text-white pb-[50px] md:px-[80px] px-[20px] lg:pt-[60px] pt-[50px]'> 
    <div className='lg:flex lg:justify-between lg:items-center lg:mb-[49px]'>
      <h1 className='lg:text-[40px] text-[26px] font-bold pb-[6px] lg:pb-[0px]' style={{fontFamily:'Unbounded'}}>Related Games</h1>
      <p className='lg:text-[20px] text-[17px]  pb-[23px] lg:pb-[0px]'>Explore All</p>
    </div> 
    <div className='lg:flex lg:justify-between grid grid-cols-2 gap-[14px]'>
    {cardItems.map((item, index) => (
      <section
        key={index}
        className="lg:w-[326px] lg:h-[228px] h-[150px] game-card one relative cursor-pointer "
      >
        
        <img
          src={item.bg}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
          style={{ zIndex: '-10' }}
        />
        <img src={item.img} alt={item.title} className='h-[80px] lg:h-[auto] pt-[20px] lg:pt-[0px] ' />
        <p className="text-center lg:text-[20px] font-bold mt-[10px]">{item.title}</p>
        <span className="lg:px-[8px] px-[11px] lg:pl-[16px] py-[3px] lg:py-[8px] lg:w-[126px] lg:h-[45px] offer-menu lg:text-[18px] font-medium rounded-full">
          {item.offer}
        </span>
      </section>
    ))}
      
    </div>
  </main>
  );
});

export default GameSectionFour;
