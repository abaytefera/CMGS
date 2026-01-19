import React from "react";
import { useSelector } from "react-redux";

const AdvisoryCouncil = () => {
  const { Language } = useSelector((state) => state.webState);

  const councilMembers = [
    {
      name: "Dr. Samuel Bekele",
      role: Language === "AMH" ? "የምክር ቤቱ ሰብሳቢ" : "Council Chairman",
      bio: Language === "AMH" ? "ስትራቴጂካዊ አቅጣጫዎቻችንን ይመራሉ::" : "Guiding our strategic direction.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827381/SamuelBekele_sbjzkn.png",
    },
    {
      name: "Aisha Ahmed",
      role: Language === "AMH" ? "የአካባቢ ጥበቃ ባለሙያ" : "Environmental Expert",
      bio: Language === "AMH" ? "ከፍተኛ የአካባቢ ጥበቃ ምክሮችን ይሰጣሉ::" : "Providing expert environmental advice.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827357/AishaAhmed_pboc11.png",
    },
    {
      name: "Michael Tesfaye",
      role: Language === "AMH" ? "የሕግ አማካሪ" : "Legal Advisor",
      bio: Language === "AMH" ? "የሕግ እና የደንብ ግንዛቤዎችን ያቀርባሉ::" : "Offering legal and regulatory insights.",
      image: "https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827354/MichaelTesfaye_wjrngo.png",
    },
  ];

  return (
    <section className="flex flex-col py-10">
    
      <h2 className="text-3xl max-md:self-center font-bold text-gray-800 mb-8 border-b-4 border-green-600 w-fit pb-2">
        {Language === "AMH" ? "የአማካሪ ምክር ቤታችን" : "Our Advisory Council"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {councilMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
         
            <img
              src={member.image}
              alt={member.name}
              className="w-full max-md:h-80 h-56 object-cover rounded-lg mb-4 grayscale hover:grayscale-0 transition-all duration-500 shadow-inner"
            />

        
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            
            <p className="text-green-600 font-medium text-sm mt-1">
              {member.role}
            </p>
            
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryCouncil;