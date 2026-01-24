import { useLocation, Link } from "react-router-dom"; // Add useLocation
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SuccessCard = () => {
  const { Language } = useSelector((state) => state.webState);
  const location = useLocation(); // Hook to access the state passed via navigate
  const [isCopied, setIsCopied] = useState(false);

  // Use the ID from the server, fallback to a placeholder if state is missing
  const referenceNumber = location.state?.referenceNumber || "CGMS-PENDING";

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const t = {
    title: Language === "AMH" ? "አቤቱታዎ በተሳካ ሁኔታ ተልኳል" : "Complaint Submitted",
    refLabel: Language === "AMH" ? "የመለያ ቁጥርዎ፦" : "Your Reference Number:",
    copy: Language === "AMH" ? "ቅዳ" : "Copy",
    copied: Language === "AMH" ? "ተቀድቷል!" : "Copied!",
    mainMessage: Language === "AMH" 
      ? "አቤቱታዎ በትክክል ደርሶናል። ስለ ቅሬታው ሂደት በኤስኤምኤስ (SMS) የምናሳውቅዎ ይሆናል። የመለያ ቁጥርዎን በመጠቀም በማንኛውም ጊዜ ሁኔታውን መከታተል ይችላሉ።" 
      : "Your complaint has been successfully submitted. We’ll notify you about updates by SMS. You can track the status of your complaint anytime using your reference number.",
    howToTrack: Language === "AMH" ? "ቅሬታዎን እንዴት መከታተል ይችላሉ?" : "How to Track Your Complaint:",
    step1: Language === "AMH" ? "ወደ 'ቅሬታ መከታተያ' ገጽ ይሂዱ።" : "Go to the Track Complaint page.",
    step2: Language === "AMH" ? "የመለያ ቁጥርዎን ያስገቡ፦" : "Enter your Reference Number:",
    step3: Language === "AMH" ? "የአቤቱታዎን ወቅታዊ ሁኔታ ይመልከቱ።" : "View the current status of your complaint.",
    smsNote: Language === "AMH" 
      ? "የመለያ ቁጥርዎን የያዘ አጭር የጽሁፍ መልዕክት (SMS) ወደ ስልክዎ ተልኳል። እባክዎ ለምዝገባዎ ደህንነቱን ይጠብቁ።" 
      : "An SMS has been sent to your phone with your reference number. Please keep it safe for your records.",
    trackBtn: Language === "AMH" ? "ቅሬታዎን ይከታተሉ" : "Track Your Complaint"
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 animate-in zoom-in duration-300">
      {/* Icon Section */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 animate-pulse">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">{t.title}</h1>
      
      {/* Dynamic Reference Section */}
      <div className="flex justify-center my-8">
        <div className="relative flex items-center gap-4 border-2 border-dashed border-emerald-200 rounded-xl px-6 py-4 bg-emerald-50/50">
          <div className="flex flex-col">
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                {Language === "AMH" ? "የመለያ ቁጥር" : "Reference ID"}
             </span>
             <span className="font-mono font-bold text-2xl text-slate-800">{referenceNumber}</span>
          </div>
          
          <button 
            onClick={handleCopy}
            className={`ml-4 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              isCopied ? "bg-emerald-500 text-white" : "bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50"
            }`}
          >
            {isCopied ? t.copied : t.copy}
          </button>
        </div>
      </div>

      <p className="text-center text-gray-700 mb-8 leading-relaxed text-lg px-4">
        {t.mainMessage}
      </p>

      {/* Guide Section */}
      <div className="mb-6 bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} className="text-rose-500" /> {t.howToTrack}
        </h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-1 flex-shrink-0">1</div> 
            {t.step1}
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-1 flex-shrink-0">2</div> 
            <span>{t.step2} <code className="bg-white px-2 py-0.5 rounded border font-bold text-emerald-700">{referenceNumber}</code></span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] mt-1 flex-shrink-0">3</div> 
            {t.step3}
          </li>
        </ul>
      </div>

      {/* SMS Note */}
      <div className="bg-amber-50 rounded-xl p-5 flex items-start gap-4 mb-8 border border-amber-100">
        <FontAwesomeIcon icon={faBullhorn} className="text-amber-500 mt-1" />
        <p className="text-sm text-amber-900 leading-relaxed">
          {t.smsNote}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Link to="/TrackComplaintPage" className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-100 transition-all hover:-translate-y-1 active:scale-95">
          {t.trackBtn}
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;