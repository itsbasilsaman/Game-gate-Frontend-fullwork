import React from 'react';
import { FaTicketAlt, FaShieldAlt, FaGlobe, FaClock, FaTools, FaMoneyBillWave } from 'react-icons/fa';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaTicketAlt className="primary-color text-4xl" />,
    title: "No Registration Fees",
    description: "Start selling with ease without worrying about upfront costs.",
  },
  {
    icon: <FaClock className="primary-color text-4xl" />,
    title: "Comprehensive Seller Assistance",
    description: "Our dedicated support team is available 24/7 to assist you with any queries or concerns.",
  },
  {
    icon: <FaTools className="primary-color text-4xl" />,
    title: "Utilize Tools from the Seller Center",
    description: "Enhance your sales efficiency, customer management, and shop performance tracking.",
  },
  {
    icon: <FaShieldAlt className="primary-color text-4xl" />,
    title: "Seller Protection Guarantee",
    description: "Sell confidently, knowing your transactions are secure and protected.",
  },
  {
    icon: <FaGlobe className="primary-color text-4xl" />,
    title: "Worldwide Exposure",
    description: "Expand your reach to customers in 100 countries with free traffic and enhanced visibility.",
  },
  {
    icon: <FaMoneyBillWave className="primary-color text-4xl" />,
    title: "Convenient Withdrawal Options",
    description: "Choose from 50 withdrawal methods for easy access to your funds.",
  },
];

const WhySellWithUs: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-center text-3xl lg:text-4xl font-bold text-gray-800 mb-12 primary-color" style={{fontFamily:'Unbounded'  }}>
          Why sell with us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center px-6 py-[45px] bg-white primary-border  rounded-lg">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySellWithUs;
