import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useSubmitComplaintMutation } from "../../Redux/citizenApi";
import { Loader2, CheckCircle } from "lucide-react";

import Header from "../../Component/CitizenComponent/Header";
import PageHero from "../../Component/CitizenComponent/SubmitComplaintComponent/PageHero";
import ComplaintForm from "../../Component/CitizenComponent/SubmitComplaintComponent/ComplaintForm";
import Footer from "../../Component/CitizenComponent/Footer";

export default function SubmitComplaint() {
  const { Language } = useSelector((state) => state.webState);
  
  // 1. Initialize Mutation
  const [submitComplaint, { isLoading, isSuccess, error, reset }] = useSubmitComplaintMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    title: Language === "AMH" ? "አቤቱታ ያቅርቡ" : "Submit a Complaint",
    subtitle: Language === "AMH" 
      ? "የሚከተለውን ቅጽ በመሙላት የአካባቢ ብክለት ጉዳዮችን በቀላሉ ያሳውቁ።" 
      : "Report environmental issues easily by filling out the form below.",
    successMsg: Language === "AMH" ? "ሪፖርትዎ በተሳካ ሁኔታ ተልኳል!" : "Report submitted successfully!",
    btnReturn: Language === "AMH" ? "ሌላ ሪፖርት ያቅርቡ" : "Submit another report"
  };

  // 2. Form Submission Handler
  const handleFormSubmit = async (formData) => {
    try {
      await submitComplaint(formData).unwrap();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-slate-50">
        <PageHero
          title={content.title}
          subtitle={content.subtitle}
        />
        
        <main className="max-w-4xl mx-auto px-4 py-12 relative">
          
          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-emerald-100 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">{content.successMsg}</h2>
              <p className="text-slate-500 mb-8">Tracking ID: <span className="font-bold text-slate-800">#EPA-{Math.floor(Math.random() * 10000)}</span></p>
              <button 
                onClick={() => reset()}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
              >
                {content.btnReturn}
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
              <ComplaintForm 
                onSubmit={handleFormSubmit} 
                isLoading={isLoading} 
                serverError={error}
              />
            </div>
          )}

          {/* LOADING OVERLAY */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl flex flex-col items-center">
                <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                <p className="text-sm font-black text-slate-700 uppercase tracking-widest">Uploading Evidence...</p>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}