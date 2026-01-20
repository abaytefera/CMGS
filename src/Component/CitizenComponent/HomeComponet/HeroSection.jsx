import { faChevronRight, faSearch, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = () => {

  const { Language } = useSelector((state) => state.webState);

 
  const content = {
    title: Language === "AMH" 
      ? "እንኳን ወደ አካባቢ ጥበቃ ቅሬታና አቤቱታ ማስተዳደሪያ ሥርዓት በደህና መጡ" 
      : "Welcome to the Environmental Complaints & Grievance Management System",
    description: Language === "AMH"
      ? "ተፈጥሮንና ማህበረሰባችንን ለመጠበቅ የአካባቢ ጉዳዮችን በቀላሉ ያሳውቁ እና ይከታተሉ"
      : "Easily report and track environmental issues to protect our nature and community",
    submitBtn: Language === "AMH" ? "አቤቱታ ያቅርቡ" : "Submit a Complaint",
    trackBtn: Language === "AMH" ? "አቤቱታዎን ይከታተሉ" : "Track Your Complaint"
  };

  return (
    <section className="relative h-96 mt-40 items-center justify-center">
      <div className="bg-opacity-40 rounded text-center text-white">
      
        <h1 className="text-3xl md:text-5xl md:w-[800px] mx-auto font-bold leading-tight">
          {content.title}
        </h1>
        
        <p className="mt-4 text-lg md:w-[600px] mx-auto md:text-xl opacity-90">
          {content.description}
        </p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
       
          <Link
            to="/submit-complaint"
            className="px-6 py-3 bg-green-600 space-x-3 text-white flex items-center rounded-md shadow-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faBullhorn} className="text-xl" />
            <span className="font-bold">{content.submitBtn}</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </Link>

       
          <Link
            to="/TrackComplaintPage"
            className="px-6 py-3 bg-[#467976] space-x-3 text-white flex items-center rounded-md shadow-lg hover:bg-teal-700 transition transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
            <span className="font-bold">{content.trackBtn}</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;