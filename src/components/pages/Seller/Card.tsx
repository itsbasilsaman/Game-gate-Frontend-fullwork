 

const Card = () => {
  return (
    <div className="relative bg-red-500 text-white py-16 px-6 md:px-20 rounded-xl flex flex-col md:flex-row justify-between items-center">
      {/* Background Circles */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 70%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
        }}
      ></div>

      {/* Text Section */}
      <div className="relative z-10 max-w-lg">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          SELLING AS A BUSINESS? IT'S EASY WITH US.
        </h2>
      </div>

      {/* Description Section */}
      <div className="relative z-10 max-w-lg text-right">
        <p className="text-lg mb-6">
          Sign up or upgrade your G2G Business Account for seamless financial management, greater visibility, and compliance. Boost your trust and efficiency today.
        </p>
        <button
          className="bg-white text-red-500 font-medium py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          onClick={() => alert('Learn More Clicked!')}
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default Card;
