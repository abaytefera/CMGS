import React from 'react';

const WhyChooseSection = () => {
  const features = [
    { title: "Easy-to-use web and mobile access", primary: true },
    { title: "Transparent complaint tracking", primary: false },
    { title: "Automated SMS and email updates", primary: true },
    { title: "Secure and confidential data handling", primary: false },
    { title: "Supports anonymous reporting", primary: true },
    { title: "Multilingual access (Amharic & English)", primary: false },
  ];

  return (
    <section className="bg-gray-50 md:px-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-gray-400 md:px-10 uppercase tracking-widest text-xs font-bold mb-4">
            Why Choose CGMS
          </p>
          <h2 className="text-4xl md:text-5xl md:px-10 font-extrabold text-gray-700 leading-tight mb-6">
            CGMS Is Designed To Make Environmental Reporting Simple For <br className="hidden md:block" />
            Citizens And Effective For Institutions.
          </h2>
          <p className="text-gray-400 md:px-10 max-w-4xl text-lg italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Alternating Feature List */}
        <div className="flex md:px-10 flex-col w-full">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`w-full py-6 flex justify-center items-center text-center transition-all duration-300 ${
                feature.primary 
                ? 'bg-[#4376B1] text-white font-bold' 
                : 'bg-transparent text-gray-600 font-semibold'
              }`}
            >
              <span className="text-xl md:text-2xl tracking-wide px-4">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;