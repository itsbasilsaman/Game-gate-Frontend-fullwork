import React from 'react';
import { Link } from 'react-router-dom';

export const SellerHome: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center seller-home">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
        {/* Left Section */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4" style={{fontFamily:'Unbounded'}}>
            GO GLOBAL <br /> SELL SMARTER
          </h1>
          <p className="text-white text-[15px] mb-6 uppercase">
            Access millions of users worldwide without any registration costs.
          </p>
        <Link to={'/user/sellerSignup'}>
            <button className="  text-blue-900 bg-white font-semibold px-6 py-4 rounded-full transition duration-300" style={{fontFamily:'Unbounded'}}>
              Register now
            </button>
        </Link>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center relative">
          {/* <img
            src="https://assets.g2g.com/ui/sell/office.svg"
            alt="Placeholder"
            className="w-2/3 lg:w- rounded-lg object-cover"
          />
         */}
        </div>
      </div>
    </div>
  );
};

 
