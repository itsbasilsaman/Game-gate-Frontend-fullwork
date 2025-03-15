import React from 'react';
import pathofExile from '../../../assets/MainCardImages/pathofexile.png';
import FirstImage from '../../../assets/MainCardImages/1.png';
import SecondImage from '../../../assets/MainCardImages/2.png';
import ThirdImage from '../../../assets/MainCardImages/3.png';
import { FaArrowCircleRight } from "react-icons/fa";

type CollectionItem = {
  offerText: string;
  mainTitle: string;
  contentTitle: string;
  mainImg: string;
  subImgOne: string;
  subImgTwo: string;
  subImgThree: string;
};

const Collection: React.FC = React.memo(() => {
  

  const collectionItems: CollectionItem[] = [
    {
      offerText: '15 Offers',
      mainTitle: 'Path of Exile',
      contentTitle: 'Game Coins',
      mainImg: pathofExile,
      subImgOne: FirstImage,
      subImgTwo: SecondImage,
      subImgThree: ThirdImage,
    },
    {
      offerText: '15 Offers',
      mainTitle: 'Path of Exile',
      contentTitle: 'Game Coins',
      mainImg: pathofExile,
      subImgOne: FirstImage,
      subImgTwo: SecondImage,
      subImgThree: ThirdImage,
    },
    {
      offerText: '15 Offers',
      mainTitle: 'Path of Exile',
      contentTitle: 'Game Coins',
      mainImg: pathofExile,
      subImgOne: FirstImage,
      subImgTwo: SecondImage,
      subImgThree: ThirdImage,
    },
  ];

 

  return (
    <div className='text-white md:px-[80px] px-[20px] w-full h-auto pb-[75px]'>
      <h1
        className='lg:text-[40px] text-[21px] w-[330px] lg:w-auto lg:font-bold lg:pb-[30px]'
        style={{ fontFamily: 'Unbounded' }}
      >
        Top Collections💥
      </h1>
      <p className='lg:text-[20px] text-[17px]   lg:hidden block pb-[25px]'>Explore All</p>
      <div className="grid lg:grid-cols-2 extralg:grid-cols-3 lg:gap-[50px]">
        {collectionItems.map((item, index) => (
          <div key={index} className="grid-container lg:w-[399px] lg:h-[328px] gap-[10px]   lg:pb-[0px]">
            {/* Main Section */}
            <div className="main-child child flex justify-center items-center relative object-cover">
              <img src={item.mainImg} alt={item.mainTitle} />
              <span className="offer-menu lg:px-[17px] px-[12px] py-[4px] lg:py-[8px] rounded-[1000px]">
                {item.offerText}
              </span>
              <p className="absolute lg:text-[21px] lg:font-medium bottom-[25px]">
                {item.mainTitle}
              </p>
            </div>

            {/* Sub Images */}
            <div className="two rounded-[21px] overflow-hidden">
              <img src={item.subImgOne} className="w-full h-full object-cover" alt="Sub Image 1" />
            </div>
            <div className="three rounded-[21px] overflow-hidden">
              <img src={item.subImgTwo} className="w-full h-full object-cover" alt="Sub Image 2" />
            </div>
            <div className="four rounded-[21px] overflow-hidden">
              <img src={item.subImgThree} className="w-full h-full object-cover" alt="Sub Image 3" />
            </div>

            {/* Content and Navigation */}
            <div className="five flex justify-start ">
              <h1 className="lg:text-[29px] text-[17px]">{item.contentTitle}</h1>
            </div>
            <div className="six flex justify-end  ">
              <FaArrowCircleRight
                className={`lg:text-[35px] text-[23px] cursor-pointer
                  `}
          
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Collection;
