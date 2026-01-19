import React from "react";
import { useSelector } from "react-redux";

const HowItWorks = () => {
 
  const { Language } = useSelector((state) => state.webState);


  const steps = [
    {
      title: Language === "AMH" ? "አቤቱታ ያቅርቡ" : "Submit Complaint",
      description: Language === "AMH" 
        ? "እንደ ብክለት፣ ቆሻሻ ወይም ሕገ-ወጥ የቆሻሻ አወጋገድ ያሉ ጉዳዮችን ያሳውቁ" 
        : "Report issues like pollution, waste, or illegal dumping",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827359/Online_world-rafiki_cfma7p.svg",
    },
    {
      title: Language === "AMH" ? "ሂደቱን ይከታተሉ" : "Track Progress",
      description: Language === "AMH" 
        ? "ስለ አቤቱታዎ ወቅታዊ ሁኔታ መረጃ ያግኙ" 
        : "Get updates on the status of your complaint",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827339/chart-6-18_rnaku3.png",
    },
    {
      title: Language === "AMH" ? "መፍትሄ ያግኙ" : "Get Resolution",
      description: Language === "AMH" 
        ? "የሚመለከታቸው አካላት ለጉዳዩ ምላሽ ይሰጣሉ" 
        : "Authorities address the issue and provide feedback",
      icon: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827383/succfully_rizfi1.png",
    },
  ];

  return (
    <section className="mb-16">
    
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        {Language === "AMH" ? "እንዴት ይሰራል?" : "How It Works"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-white rounded-xl items-center flex flex-col shadow-sm p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
           
            <div className="bg-green-50 rounded-full p-4 mb-4">
              <img src={step.icon} alt={step.title} className="w-24 h-24 object-contain" />
            </div>

          
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>

         
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;