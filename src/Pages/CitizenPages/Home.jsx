// src/pages/Home.jsx
import React, { useEffect } from "react";

import HeaderHome from "../../Component/CitizenComponent/HomeComponet/HeaderHome";
import HeroSection from "../../Component/CitizenComponent/HomeComponet/HeroSection";
import HowItWorks from "../../Component/CitizenComponent/HomeComponet/HowItWorks";
import LatestNews from "../../Component/CitizenComponent/HomeComponet/LatestNews";
import Footer from "../../Component/CitizenComponent/Footer";


const Home = () => {
   useEffect(()=>{
    
        window.scrollTo(0,0)
    
      },[])
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        <div className="bg-[url(https://res.cloudinary.com/dkzvlqjp9/image/upload/v1768827337/natural_pjju9e.jpg)] flex flex-col  bg-not-repeat bg-center bg-cover">
      <HeaderHome />
      <HeroSection />
      </div>
      <div className="pt-16">
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HowItWorks />
          <LatestNews />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
