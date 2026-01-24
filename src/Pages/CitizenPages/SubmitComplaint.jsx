import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

import { useSubmitComplaintMutation } from "../../Redux/citizenApi";
import { Loader2 } from "lucide-react";


import PageHero from "../../Component/CitizenComponent/SubmitComplaintComponent/PageHero";
import ComplaintForm from "../../Component/CitizenComponent/SubmitComplaintComponent/ComplaintForm";


export default function SubmitComplaint() {
  const { Language } = useSelector((state) => state.webState);
  const navigate = useNavigate(); // 2. Initialize navigate
  
  // Initialize Mutation (Removed isSuccess/reset as we are navigating away)
  const [submitComplaint, { isLoading, error }] = useSubmitComplaintMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    title: Language === "AMH" ? "አቤቱታ ያቅርቡ" : "Submit a Complaint",
    subtitle: Language === "AMH" 
      ? "የሚከተለውን ቅጽ በመሙላት የአካባቢ ብክለት ጉዳዮችን በቀላሉ ያሳውቁ።" 
      : "Report environmental issues easily by filling out the form below.",
    uploading: Language === "AMH" ? "በመጫን ላይ..." : "Uploading Evidence..."
  };

  const handleFormSubmit = async (formData) => {
    try {
      // 3. Execute Mutation and get the result
      const result = await submitComplaint(formData).unwrap();
      
      // 4. Navigate to the new page with the dynamic ID
      // Adjust result.trackingId to match your specific backend response key
      navigate("/ComplaintSubmittedPage", { 
        state: { 
          referenceNumber: result?.ref_number|| "N/A" 
        } 
      }); 
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <>
    
      <div className="pt-20 min-h-screen bg-slate-50">
        <PageHero
          title={content.title}
          subtitle={content.subtitle}
        />
        
        <main className="max-w-4xl mx-auto px-4 py-12 relative">
          
          {/* FORM STATE - We no longer need the isSuccess conditional here */}
          <div className={isLoading ? "opacity-50 pointer-events-none transition-opacity" : ""}>
            <ComplaintForm 
              onSubmit={handleFormSubmit} 
              isLoading={isLoading} 
              serverError={error}
            />
          </div>

          {/* LOADING OVERLAY */}
          {isLoading && (
            <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-slate-900/10 backdrop-blur-[2px]">
              <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
                <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                <p className="text-sm font-black text-slate-700 uppercase tracking-widest">
                   {content.uploading}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
   
    </>
  );
}