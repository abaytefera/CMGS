import React, { useEffect } from "react";

import AboutAuthority from "../../Component/CitizenComponent/AboutServiceComponet/AboutAuthority";
import AdvisoryCouncil from "../../Component/CitizenComponent/AboutServiceComponet/AdvisoryCouncil";
import MandateServices from "../../Component/CitizenComponent/AboutServiceComponet/MandateServices";
import LawsRegulations from "../../Component/CitizenComponent/AboutServiceComponet/LawsRegulations";
import Header from "../../Component/CitizenComponent/Header";
import Footer from "../../Component/CitizenComponent/Footer";


const AboutServices = () => {
   useEffect(()=>{
    
        window.scrollTo(0,0)
    
      },[])
  return (
    <div className="min-h-screen flex flex-col gap-20  bg-gray-50 font-sans">
    
        <Header></Header>
        <div className="md:px-40 flex  pt-48 flex-col gap-20">
        <AboutAuthority />
        <AdvisoryCouncil />
        <MandateServices />
        <LawsRegulations />
       
        </div>
         <Footer></Footer>

    </div>
  );
};

export default AboutServices;
