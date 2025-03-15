import React, { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    id: 1,
    username: "AbsoluteGold",
    level: 163,
    content:
      "100% Legit! Friendly, fast responding support. Years go by and this is still the best platform to buy and sell your virtual goods.",
  },
  {
    id: 2,
    username: "Mrak",
    level: 134,
    content:
      "Working on g2g since the very first day has given us a great pleasure and privilege to grow our businesses hand in hand.",
  },
];

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className=" py-16 px-8 background-gradient"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Header and Intro */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? "animate-slideInLeft" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white" style={{fontFamily:'Unbounded'}}>
            What our happy user says
          </h2>
          <p className="text-gray-400 text-[17px]">
            Discover the smiles behind our success - straight from the word of
            our happy sellers!
          </p>
        </div>

        {/* Right Side: Testimonials */}
        <div className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white primary-color p-6 rounded-lg shadow-lg flex items-start gap-4 transition-all duration-700 ${
                isVisible ? "animate-slideInRight delay-" + index * 100 : "opacity-0"
              }`}
            >
              <div className="w-24 h-12 bg-gray-100 flex items-center justify-center rounded-full">
                <span className="primary-color font-bold">
                  {testimonial.username.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold primary-color text-[18px] " style={{fontFamily:'Unbounded'}}>
                  {testimonial.username}{" "}
                  <span className="text-gray-400">Level {testimonial.level}</span>
                </h3>
                <p className="primary-color mt-2">{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
