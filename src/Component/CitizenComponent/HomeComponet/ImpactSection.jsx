import React from 'react';

const ImpactSection = () => {
  const impacts = [
    {
      title: "Complaints received and processed digitally",
      description: "Lorem ipsum dolor sit amet",
      active: false
    },
    {
      title: "Faster response and resolution timelines",
      description: "Lorem ipsum dolor sit amet",
      active: true
    },
    {
      title: "Increased citizen participation and trust",
      description: "Lorem ipsum dolor sit amet",
      active: false
    }
  ];

  return (
    <section className="relative min-h-screen bg-slate-900 flex items-center justify-center p-8 md:p-20 overflow-hidden">
      {/* Blurred Background Image */}
      <div 
        className="absolute inset-0 bg-[url(2a7bc81b7764aee587c4a37803d59c02568946da.jpg)] bg-no-repeat bg-center bg-cover opacity-40 bg-cover  bg-center "

      />
         <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-10 max-w-7xl w-full">
        {/* Header Section */}
        <div className="mb-12 rounded-md">
          <p className="text-gray-300 uppercase tracking-widest text-sm font-semibold mb-4">Our Impact</p>
          <h2 className="text-white  text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
            CGMS Transforms Citizen Concerns Into Actionable Outcomes Through Data-Driven Monitoring And Timely Response.
          </h2>
        </div>

        <div className="flex flex-col  lg:flex-row gap-12 items-start">
          {/* Left Column: Green Content Box */}
          <div className="lg:w-1/3 bg-[#3DAE71] p-10 mt-10">
             <div className="w-16 h-1 bg-[#1E3A8A] mb-8"></div> {/* Blue top accent */}
             <p className="text-white leading-relaxed text-lg font-light">
               CGMS transforms citizen concerns into actionable outcomes by enabling 
               timely responses, structured workflows, and data-driven monitoring 
               that ensures complaints are addressed transparently, efficiently, 
               and in line with established service standards.
             </p>
          </div>

          {/* Middle Column: Impact List */}
          <div className="lg:w-1/3 flex px-10 flex-col justify-center space-y-10 py-10">
            {impacts.map((item, index) => (
              <div key={index} className={`pl-6 ${item.active ? 'border-l-4 border-[#1E3A8A]' : ''}`}>
                <h4 className="text-white text-xl font-bold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm italic">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Right Column: Floating Image */}
          <div className="lg:w-1/3 relative group">
            <div className="absolute -inset-2 bg-white/10 blur-xl group-hover:bg-white/20 transition duration-500"></div>
            <img 
              src="e1f76a060d4463ad6083ab102b3e27e6117263d9.jpg" 
              alt="Community impact" 
              className="relative shadow-2xl border-white border-[12px] object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;