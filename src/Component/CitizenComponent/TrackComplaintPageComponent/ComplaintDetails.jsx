import React from "react";
import { useSelector } from "react-redux";
import { faBuilding, faPhone, faUser ,faCheckDouble} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusHistory from "./StatusHistory";
import { motion } from "framer-motion";
import { Link } from "lucide-react";

const ComplaintDetails = () => {
  const { Language } = useSelector((state) => state.webState);


  const t = {
    header: Language === "AMH" ? "የአቤቱታው ሁኔታ" : "Complaint Status",
    found: Language === "AMH" ? "አቤቱታው ተገኝቷል" : "Complaint Found",
    refNum: Language === "AMH" ? "የመለያ ቁጥር" : "Reference Number",
    category: Language === "AMH" ? "ዘርፍ" : "Category",
    waste: Language === "AMH" ? "የቆሻሻ አወጋገድ" : "Waste Management",
    date: Language === "AMH" ? "የቀረበበት ቀን" : "Submitted On",
    status: Language === "AMH" ? "ሁኔታ" : "Status",
    resolved: Language === "AMH" ? "ተፈትቷል" : "Resolved",
    priority: Language === "AMH" ? "ቅድሚያ የሚሰጠው" : "Priority",
    high: Language === "AMH" ? "ከፍተኛ" : "High",
    citizenDetails: Language === "AMH" ? "የአቤቱታ አቅራቢው ዝርዝር" : "Citizen Details",
    notDisplayed: Language === "AMH" ? "ስልክ እና ኢሜይል፡ ለደህንነት አልተገለጸም" : "Phone & Email: Not Displayed",
    assignedTo: Language === "AMH" ? "ተረካቢ ባለሙያ" : "Assigned User",
    office: Language === "AMH" ? "ቢሮ / ክፍል" : "Office",
    mainOffice: Language === "AMH" ? "ዋናው ቢሮ" : "Main Office",
    phone: Language === "AMH" ? "ስልክ" : "Phone",
    resolvedNote: Language === "AMH" 
      ? "ጉዳዩ ተፈትቷል፤ እንዲሁም የተበከለው አካባቢ እንዲጸዳ ተደርጓል።" 
      : "The issue has been resolved and the affected area has been cleaned."
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{t.header}</h2>

     
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="font-bold text-green-700 text-lg flex items-center gap-2">
            <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
            {t.found}
          </p>
          <p className="text-sm text-gray-600 font-medium">{t.refNum}: CGMS-00125</p>
        </div>
      </div>

 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8 bg-gray-50 p-6 rounded-xl">
        <div>
          <strong className="text-gray-500 block mb-1">{t.category}:</strong>
          <span className="font-bold text-gray-800">{t.waste}</span>
        </div>
        <div>
          <strong className="text-gray-500 block mb-1">{t.date}:</strong>
          <span className="font-bold text-gray-800">{Language === "AMH" ? "ሚያዝያ 14, 2016" : "April 22, 2024"}</span>
        </div>
        <div>
          <strong className="text-gray-500 block mb-1">{t.status}:</strong>
          <span className="font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full text-xs uppercase">{t.resolved}</span>
        </div>
        <div>
          <strong className="text-gray-500 block mb-1">{t.priority}:</strong>
          <span className="font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full text-xs uppercase">{t.high}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
      
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-green-600" />
            {t.citizenDetails}
          </h3>
          <p className="font-bold text-gray-900 mb-1">ዮሐንስ ደበበ</p>
          <p className="text-xs text-gray-500 italic mb-4">{t.notDisplayed}</p>
          <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg border-l-4 border-green-500">
            {Language === "AMH" 
              ? "በሰፈራችን የሚገኙ የሕዝብ የቆሻሻ ማጠራቀሚያዎች ሞልተው በመፍሰሳቸው ከፍተኛ ሽታ እና ቆሻሻ እያስከተሉ ይገኛል።" 
              : "The public trash bins in our neighborhood were overflowing causing bad odor and litter."}
          </p>
        </div>

    
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-50 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.assignedTo}</p>
              <p className="font-bold text-gray-800">{Language === "AMH" ? "ማይክል ደቡብ" : "Michael South"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-50 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faBuilding} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.office}</p>
              <p className="font-bold text-gray-800">{t.mainOffice}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-50 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faPhone} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{t.phone}</p>
              <a href="tel:+251455666" className="font-bold text-blue-600 hover:underline">
                +251 455 666
              </a>
            </div>
          </div>
        </div>
      </div>

   
      <StatusHistory />

     <motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  className="mt-8 bg-green-600 rounded-xl p-5 shadow-lg shadow-green-100 text-white relative overflow-hidden"
>
  {/* Subtle Background Pattern Icon */}
  <FontAwesomeIcon 
    icon={faCheckDouble} 
    className="absolute -right-4 -bottom-4 text-white opacity-10 text-7xl rotate-12" 
  />

  <h4 className="font-bold mb-1 text-lg flex items-center gap-3">
    <motion.div
      animate={{ 
        y: [0, -4, 0],
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faCheckDouble} className="text-white text-sm" />
    </motion.div>
    <span>{t.resolved}</span>
  </h4>

  <p className="text-sm opacity-90 leading-relaxed pl-11">
    {t.resolvedNote}
  </p>
</motion.div>
<Link to={'/FeedbackPage'}
            type="submit"
            disabled={!rating}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
              rating 
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200" 
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            Give Feedback
          </Link>
    </div>
  );
};

export default ComplaintDetails;