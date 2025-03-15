import React from 'react';
 

export const Loading: React.FC = () => {
  return (
    <div className="loading-backdrop w-full h-full loading-bg"   >
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center flex-col">
          <div className="w-12 h-12 border-5 border-t-4 border-t-gray-150 border-gray-100 rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-[22px] font-semibold tracking-wide" style={{ fontFamily: 'Unbounded' }}>
            Loading<span className="dot-animation mr-[6px]">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
          
          <p className="text-sm text-white mt-2 font-semibold">
            Please wait, your content is on the way.
          </p>
        </div>
      </div>
    </div>
  );
};