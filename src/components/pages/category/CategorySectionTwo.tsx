import React, { useEffect, useState } from 'react';
import { GetOtherSellersAction } from '../../../reduxKit/actions/seller/seller';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../reduxKit/store';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Import TransitionGroup and CSSTransition
 

interface CategorySectionTwoProps {
  offerId: string | undefined;
}

interface othersellerdata {
  offerId: string | undefined;
  isOnline: boolean;
}

interface OtherSeller {
  firstName: string;
  lastName: string;
  profileImage: string;
  level: {
    level: string;
  };
}

const CategorySectionTwo: React.FC<CategorySectionTwoProps> = React.memo(({ offerId }) => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [otherSeller, setOtherSeller] = useState<OtherSeller[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
  };

  const toggleHandler = (): void => {
    setIsOn((prevState) => !prevState);
    setIsOnline((prev) => !prev);
    console.log('Check it is online', isOnline);
  };

  const sellerDate: othersellerdata = {
    offerId,
    isOnline: isOnline,
  };

  console.log(sellerDate);

  useEffect(() => {
    const getOtherSeller = async () => {
      try {
        const response = await dispatch(GetOtherSellersAction(sellerDate));
        console.log('Other Seller 1234', response.payload.data);
        setOtherSeller(response.payload.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOtherSeller();
  }, [dispatch, isOnline]);

  return (
    <div className="w-full h-auto text-white md:px-[80px] px-[20px] lg:pt-[30px]">
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between">
        <h1 style={{ fontFamily: 'Unbounded' }} className="lg:py-[17px] py-[10px] lg:text-[27px] text-[24px]">
          Other Sellers ({otherSeller ? otherSeller.length : 0})
        </h1>
        <div className="flex gap-[20px] justify-between">
          <div className="flex gap-[10px] justify-center items-center">
            <div
              className={`toggle-container ${isOn ? 'on' : 'off'}`}
              onClick={toggleHandler}
              style={{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                backgroundColor: isOn ? '#4CAF50' : '#ccc',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              
              <div
                className="toggle-button"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  position: 'absolute',
                  top: '2px',
                  left: isOn ? '12px' : '2px',
                  transition: 'left 0.3s ease',
                }}
              ></div>
            </div>
            <p className="md:text-[17px] text-[15px] lg:mr-[20px]">{isOnline ? 'Online' : 'Offline'}</p>
          </div>
          <div className="flex flex-col sm:flex-row lg:gap-[28px] sm:gap-[15px]">
            <label className="flex justify-start sm:justify-center items-center">
              <input
                type="radio"
                value="Option1"
                checked={selectedOption === 'Option1'}
                onChange={handleChange}
              />
              <span className="ml-[4px] text-[14px] md:text-[16px]">LowestPrice</span>
            </label>
            <label className="flex justify-start sm:justify-center items-center">
              <input
                type="radio"
                value="Option2"
                checked={selectedOption === 'Option2'}
                onChange={handleChange}
              />
              <span className="ml-[4px] text-[14px] md:text-[16px]">Recommended</span>
            </label>
          </div>
        </div>
      </div>

      <div className=" py-[28px] pt-[60px] gap-[45px] lg:gap-[0px]">
        <TransitionGroup className={'category-slider'}>
          {otherSeller.length > 0 &&
            otherSeller.map((item, index) => (
              <CSSTransition
                key={index}  
                timeout={300}  
                classNames="seller-item "  
                unmountOnExit  
              >
                <div className="flex gap-[12px] pb-[12px]">
                  <img
                    src={item.profileImage}
                    alt=""
                    className="lg:w-[70px] lg:h-[70px] w-[62px] h-[62px] object-cover rounded-full"
                  />
                  <div>
                    <p className="text-[18px] underline">{`${item.firstName} ${item.lastName}`}</p>
                    <p>Level {item.level.level}</p>
                  </div>
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </div>
  );
});

export default CategorySectionTwo;