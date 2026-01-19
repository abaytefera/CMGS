import React from "react";
import { useSelector } from "react-redux";

const MandateServices = () => {
  const { Language } = useSelector((state) => state.webState);

  const services = [
    {
      name: Language === "AMH" ? "የአካባቢ ክትትል" : "Environmental Monitoring",
      description: Language === "AMH" ? "የአየር፣ የውሃ እና የአፈር ጥራትን መከታተል::" : "Tracking air, water, and soil quality.",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827377/EnvironmentalMonitoring_cjztca.png",
    },
    {
      name: Language === "AMH" ? "የብክለት ቁጥጥር" : "Pollution Control",
      description: Language === "AMH" ? "የኢንዱስትሪ ልቀቶችን እና ቆሻሻዎችን መቆጣጠር::" : "Regulating industrial emissions and waste.",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827377/PollutionControl_hsf5zv.png",
    },
    {
      name: Language === "AMH" ? "የተፈጥሮ ጥበቃ ፕሮግራሞች" : "Conservation Programs",
      description: Language === "AMH" ? "የተፈጥሮ መኖሪያዎችን እና የዱር እንስሳትን መጠበቅ::" : "Protecting natural habitats and wildlife.",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827361/ConservationPrograms_zys3z0.png",
    },
    {
      name: Language === "AMH" ? "የቅሬታ አያያዝ" : "Public Complaints Handling",
      description: Language === "AMH" ? "የዜጎችን አቤቱታዎች እና ቅሬታዎች መፍታት::" : "Addressing citizen grievances.",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827379/PublicComplaintsHandling_m5bxxl.png",
    },
  ];

  return (
    <section className="flex flex-col py-10">
     
      <h2 className="text-3xl font-bold max-md:self-center text-gray-800 mb-8 border-b-4 border-green-600 w-fit pb-2">
        {Language === "AMH" ? "ተልዕኮ እና አገልግሎቶቻችን" : "Our Mandate & Services"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-50"
          >
        
            <div className="flex justify-center mb-4">
              <img 
                src={service.icon} 
                alt={service.name} 
                className="w-20 h-20 object-contain"
              />
            </div>

           
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              {service.name}
            </h3>

         
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MandateServices;