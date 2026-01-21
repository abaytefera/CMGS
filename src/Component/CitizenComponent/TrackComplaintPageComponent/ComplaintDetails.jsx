import React, { useState } from "react"; 
import { useSelector } from "react-redux";
import { faBuilding, faPhone, faUser ,faCheckDouble} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusHistory from "./StatusHistory";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

const ComplaintDetails = () => {
  const { Language } = useSelector((state) => state.webState);
  
 
  const [rating, setRating] = useState(5); 

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
    feedback: Language === "AMH" ? "አስተያየት ይስጡ" : "Give Feedback",
    resolvedNote: Language === "AMH" 
      ? "ጉዳዩ ተፈትቷል፤ እንዲሁም የተበከለው አካባቢ እንዲጸዳ ተደርጓል።" 
      : "The issue has been resolved and the affected area has been cleaned."
  };

  return (
   
    <div className="bg-[#080d14] border border-white/10 rounded-[2.5rem] shadow-2xl p-8 mt-10 text-slate-300">
      <h2 className="text-2xl font-black mb-6 text-white border-b border-white/5 pb-4 uppercase italic tracking-tighter">
        {t.header}
      </h2>

      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="font-black text-emerald-400 text-lg flex items-center gap-2">
            <span className="bg-emerald-500 text-[#080d14] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">✓</span>
            {t.found}
          </p>
          <p className="text-sm text-slate-400 font-bold mt-1 tracking-widest uppercase">{t.refNum}: CGMS-00125</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8 bg-white/5 p-6 rounded-[2rem] border border-white/5">
        <div>
          <strong className="text-slate-500 block mb-1 uppercase text-[10px] tracking-widest">{t.category}:</strong>
          <span className="font-bold text-white">{t.waste}</span>
        </div>
        <div>
          <strong className="text-slate-500 block mb-1 uppercase text-[10px] tracking-widest">{t.date}:</strong>
          <span className="font-bold text-white">{Language === "AMH" ? "ሚያዝያ 14, 2016" : "April 22, 2024"}</span>
        </div>
        <div>
          <strong className="text-slate-500 block mb-1 uppercase text-[10px] tracking-widest">{t.status}:</strong>
          <span className="font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter">{t.resolved}</span>
        </div>
        <div>
          <strong className="text-slate-500 block mb-1 uppercase text-[10px] tracking-widest">{t.priority}:</strong>
          <span className="font-black text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter">{t.high}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 shadow-sm">
          <h3 className="font-black text-white mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
            <FontAwesomeIcon icon={faUser} className="text-emerald-500" />
            {t.citizenDetails}
          </h3>
          <p className="font-black text-white text-lg mb-1 tracking-tight">ዮሐንስ ደበበ</p>
          <p className="text-[10px] text-slate-500 italic mb-4 uppercase font-bold tracking-widest">{t.notDisplayed}</p>
          <p className="text-slate-300 text-sm leading-relaxed bg-black/40 p-4 rounded-2xl border-l-4 border-emerald-500 italic">
            {Language === "AMH" 
              ? "በሰፈራችን የሚገኙ የሕዝብ የቆሻሻ ማጠራቀሚያዎች ሞልተው በመፍሰሳቸው ከፍተኛ ሽታ እና ቆሻሻ እያስከተሉ ይገኛል።" 
              : "The public trash bins in our neighborhood were overflowing causing bad odor and litter."}
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: t.assignedTo, val: Language === "AMH" ? "ማይክል ደቡብ" : "Michael South", icon: faUser, color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: t.office, val: t.mainOffice, icon: faBuilding, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { label: t.phone, val: "+251 455 666", icon: faPhone, color: "text-purple-400", bg: "bg-purple-500/10", isLink: true }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <FontAwesomeIcon icon={item.icon} className={item.color} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">{item.label}</p>
                {item.isLink ? (
                  <a href={`tel:${item.val}`} className="font-black text-blue-400 hover:underline">{item.val}</a>
                ) : (
                  <p className="font-black text-white">{item.val}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StatusHistory />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-emerald-600 rounded-[2rem] p-6 shadow-2xl shadow-emerald-900/20 text-white relative overflow-hidden"
      >
        <FontAwesomeIcon icon={faCheckDouble} className="absolute -right-6 -bottom-6 text-white opacity-10 text-8xl rotate-12" />
        <h4 className="font-black mb-2 text-xl flex items-center gap-3 uppercase italic tracking-tighter">
          <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">
            <FontAwesomeIcon icon={faCheckDouble} className="text-white text-sm" />
          </div>
          <span>{t.resolved}</span>
        </h4>
        <p className="text-sm font-medium opacity-90 leading-relaxed pl-14">
          {t.resolvedNote}
        </p>
      </motion.div>

      {/* ስህተቱ የተስተካከለበት Link ክፍል */}
      <Link to={'/FeedbackPage'}
        className={`mt-8 w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] text-white shadow-2xl transition-all flex items-center justify-center gap-2 ${
          rating 
            ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 active:scale-[0.98]" 
            : "bg-slate-800 cursor-not-allowed text-slate-500"
        }`}
      >
        {t.feedback}
      </Link>
    </div>
  );
};

export default ComplaintDetails;