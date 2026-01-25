import React from 'react';

const UserRolesSection = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Illustrations Grid */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-8 items-center">
          {/* Top Left: Group of People */}
          <div className="flex justify-center">
            <img 
              src="https://illustrations.popsy.co/gray/team-work.svg" 
              alt="General Users" 
              className="w-full max-w-[200px] h-auto"
            />
          </div>
          
          {/* Top Right: Person at Desk */}
          <div className="flex justify-center">
            <img 
              src="https://illustrations.popsy.co/gray/work-from-home.svg" 
              alt="Admin User" 
              className="w-full max-w-[180px] h-auto"
            />
          </div>
          
          {/* Bottom Left: Tech/Data User */}
          <div className="flex justify-center">
            <img 
              src="https://illustrations.popsy.co/gray/data-analysis.svg" 
              alt="Data Oversight" 
              className="w-full max-w-[180px] h-auto"
            />
          </div>
          
          {/* Bottom Right: Meeting/Support */}
          <div className="flex justify-center">
            <img 
              src="https://illustrations.popsy.co/gray/customer-support.svg" 
              alt="Direct Support" 
              className="w-full max-w-[180px] h-auto"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-gray-400 uppercase tracking-widest text-sm font-bold">
            Who Uses CGMS
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-600 leading-tight">
            CGMS Supports Multiple Users, Each Playing A Key Role In Ensuring Effective Complaint Handling And Oversight.
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

      </div>
    </section>
  );
};

export default UserRolesSection;