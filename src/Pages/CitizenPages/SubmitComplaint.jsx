import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../Component/CitizenComponent/Header";
import PageHero from "../../Component/CitizenComponent/SubmitComplaintComponent/PageHero";
import ComplaintForm from "../../Component/CitizenComponent/SubmitComplaintComponent/ComplaintForm";
import Footer from "../../Component/CitizenComponent/Footer";

export default function SubmitComplaint() {

  const { Language } = useSelector((state) => state.webState);

    useEffect(()=>{
      
          window.scrollTo(0,0)
      
        },[])
  const content = {
    title: Language === "AMH" ? "አቤቱታ ያቅርቡ" : "Submit a Complaint",
    subtitle: Language === "AMH" 
      ? "የሚከተለውን ቅጽ በመሙላት የአካባቢ ብክለት ጉዳዮችን በቀላሉ ያሳውቁ።" 
      : "Report environmental issues easily by filling out the form below."
  };

  return (
    <>
      <Header />
      <div className="pt-20">
        <PageHero
          title={content.title}
          subtitle={content.subtitle}
        />
        <main className="max-w-4xl mx-auto px-4 py-12">
     
          <ComplaintForm />
        </main>
      </div>
      <Footer />
    </>
  );
}