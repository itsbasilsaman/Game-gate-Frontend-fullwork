import React, { useRef } from "react";

const HorizontalScrollSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-64">
      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth space-x-4 w-full h-full px-4"
      >
        {/* Columns */}
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 h-full bg-gray-200 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg"
          >
            Item {index + 1}
          </div>
        ))}
      </div>

      {/* Scroll controls */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
        onClick={scrollLeft}
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
        onClick={scrollRight}
      >
        →
      </button>
    </div>
  );
};

export default HorizontalScrollSection;
