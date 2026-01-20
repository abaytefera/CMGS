import { faBullhorn, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuccessCard = () => {
  const { Language } = useSelector((state) => state.webState);
  const [isCopied, setIsCopied] = useState(false); 

  const referenceNumber = "CGMS-00125";

 
  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber);
    setIsCopied(true);
    

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
     <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-100 animate-pulse">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
            <div className="bg-green-500 w-4 h-4 rounded-full"></div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">{t.title}</h1>
      <p className="text-center text-gray-600 mb-6">
        {t.refLabel} <span className="font-bold text-green-700">{referenceNumber}</span>
      </p>

     
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center gap-4 border-2 border-dashed border-gray-200 rounded-xl px-6 py-3 bg-gray-50">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {Language === "AMH" ? "የመለያ ቁጥር" : "Reference"}:
          </span>
          <span className="font-mono font-bold text-lg">{referenceNumber}</span>
          
          <div className="relative">
            <button 
              onClick={handleCopy}
              className={`text-sm font-bold transition uppercase px-2 py-1 rounded ${
                isCopied ? "text-green-600 bg-green-50" : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {isCopied ? t.copied : t.copy}
            </button>
            
        
            {isCopied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded shadow-md animate-bounce">
                {t.copied}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-center text-gray-700 mb-8 leading-relaxed text-lg">
        {t.mainMessage}
      </p>

   
      <div className="mb-6 bg-blue-50/50 rounded-xl p-6 border border-blue-100">
        <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "red", fontSize: "24px" }} /> {t.howToTrack}
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3 items-center">
            <span className="text-green-500">✔</span> {t.step1}
          </li>
          <li className="flex gap-3 items-center">
            <span className="text-green-500">✔</span> {t.step2} <strong>{referenceNumber}</strong>
          </li>
          <li className="flex gap-3 items-center">
            <span className="text-green-500">✔</span> {t.step3}
          </li>
        </ul>
      </div>

     
      <div className="bg-orange-50 rounded-xl p-5 flex items-start gap-4 mb-8 border border-orange-100">
       <FontAwesomeIcon 
        icon={faBullhorn} 
        style={{ color: '#3b82f6', fontSize: '20px' }} 
      />
        <p className="text-sm text-gray-700 leading-relaxed font-medium">
          {t.smsNote}
        </p>
      </div>

      
      <div className="flex justify-center">
        <Link  to="/TrackComplaintPage" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-200 transition-all hover:-translate-y-1">
          {t.trackBtn}
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;