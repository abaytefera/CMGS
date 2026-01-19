import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const AboutAuthority = () => {
 
  const { Language } = useSelector((state) => state.webState);

 
  const content = {
    title: Language === "AMH" ? "ስለ አካባቢ ጥበቃ ባለሥልጣን" : "About Environmental Authority",
    description: Language === "AMH" 
      ? "የአካባቢ ጥበቃ ባለሥልጣናችን አካባቢን ለመጠበቅ እና ዘላቂ ልማትን ለማረጋገጥ በትጋት ይሠራል። የተፈጥሮ ሀብታችንን ለመጠበቅ ብክለትን እንቆጣጠራለን፣ ደንቦችን እናስከብራለን፣ እንዲሁም ለሕዝብ ቅሬታዎች ምላሽ እንሰጣለን።" 
      : "Our Environmental Authority is dedicated to protecting the environment and ensuring sustainable development. We monitor pollution, enforce regulations, and respond to public complaints to safeguard our natural resources.",
    button: Language === "AMH" ? "ተጨማሪ ያንብቡ" : "Learn More"
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-12">
      <div className="flex-1 max-md:flex max-md:flex-col">
     
        <h2 className="text-3xl max-md:self-center font-bold text-gray-800 mb-4">
          {content.title}
        </h2>

     
        <p className="text-gray-700 max-md:self-center max-md:text-center leading-relaxed text-lg">
          {content.description}
        </p>

       
        <button className="mt-6 max-md:self-center cursor-pointer px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center gap-2 group">
          {content.button}
          <FontAwesomeIcon 
            icon={faChevronRight} 
            className="text-sm group-hover:translate-x-1 transition-transform" 
          />
        </button>
      </div>

     
      <div className="flex-1 shadow-xl rounded-xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827347/aboutEnvAuthor_x5zw0k.png"
          alt={content.title}
          className="w-full h-80 object-cover shadow-lg transform hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default AboutAuthority;