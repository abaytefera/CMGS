import React from 'react';

const ApproachSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <div className="lg:w-1/2">
          <h2 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-4">
            Our Approach & Strategies
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-700 leading-tight">
            How We Deliver Effective Results
          </h1>
        </div>
        <div className="lg:w-1/2">
          <p className="text-gray-500 text-lg leading-relaxed">
            We deliver effective results through structured workflows, clear accountability, 
            and timely action. Each complaint is carefully reviewed, prioritized, assigned, 
            and monitored to ensure fair handling, compliance with service standards, and 
            meaningful resolution.
          </p>
        </div>
      </div>

      {/* Cards Section with Background Image */}
      <div className="max-w-7xl mx-auto relative rounded-sm overflow-hidden min-h-[257px]">
        {/* Background Image Container */}
       <div 
        className="absolute inset-0 bg-[url(2a7bc81b7764aee587c4a37803d59c02568946da.jpg)] bg-no-repeat bg-center bg-cover opacity-40 bg-cover  bg-center "

      />

        {/* Cards Overlay */}
        <div className="relative z-10  grid grid-cols-1 md:grid-cols-3 h-full items-end  md:pl-30 md:py-12 gap-0 md:gap-4">
          
          {/* Card 1 */}
          <div className="bg-emerald-600/80 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start border-b md:border-b-0 md:border-r border-emerald-500/30">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              Priority-based complaint handling
            </h3>
            <p className="text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-emerald-700/80 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start border-b md:border-b-0 md:border-r border-emerald-500/30">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              SLA-driven response and resolution timelines
            </h3>
            <p className="text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-emerald-800/80 backdrop-blur-sm p-8 text-white h-full flex flex-col justify-start">
            <h3 className="text-xl font-bold mb-4 leading-snug">
              Continuous service improvement using feedback
            </h3>
            <p className="text-sm opacity-90">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ApproachSection;