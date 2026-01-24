import React from "react";
import { useSelector } from "react-redux";
import { faBuilding, faPhone, faUser, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ComplaintDetails = ({ complaint }) => {
  const { Language } = useSelector((state) => state.webState);

  // Fallback to provided data if prop is missing
  const data = complaint || {
    ref_number: "CMP-20260122-4724",
    status: "RESOLVED",
    createdAt: "2026-01-22T14:39:11.884Z",
    Category: { name: "Illegal Dumping" },
  };

  const t = {
    header: Language === "AMH" ? "የአቤቱታው ሁኔታ" : "Complaint Status",
    found: Language === "AMH" ? "አቤቱታው ተገኝቷል" : "Complaint Found",
    refNum: Language === "AMH" ? "የመለያ ቁጥር" : "Reference Number",
    category: Language === "AMH" ? "ዘርፍ" : "Category",
    date: Language === "AMH" ? "የቀረበበት ቀን" : "Submitted On",
    status: Language === "AMH" ? "ሁኔታ" : "Status",
    resolved: Language === "AMH" ? "ተፈትቷል" : "Resolved",
    feedback: Language === "AMH" ? "አስተያየት ይስጡ" : "Give Feedback",
    resolvedNote: Language === "AMH" 
      ? "ጉዳዩ ተፈትቷል፤ እንዲሁም የተበከለው አካባቢ እንዲጸዳ ተደርጓል።" 
      : "The issue has been resolved and the affected area has been cleaned."
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return Language === "AMH" 
      ? date.toLocaleDateString('am-ET') 
      : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm p-8 mt-10 text-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4 tracking-tight">
        {t.header}
      </h2>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <p className="font-bold text-blue-700 text-lg flex items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
            {t.found}
          </p>
          <p className="text-sm text-slate-500 font-bold mt-1 tracking-wide uppercase">{t.refNum}: {data.ref_number}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.category}:</strong>
          <span className="font-bold text-slate-900">{data.Category?.name}</span>
        </div>
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.date}:</strong>
          <span className="font-bold text-slate-900">{formatDate(data.createdAt)}</span>
        </div>
        <div>
          <strong className="text-slate-400 block mb-1 uppercase text-[10px] tracking-widest">{t.status}:</strong>
          <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
            {data.status === "RESOLVED" ? t.resolved : data.status}
          </span>
        </div>
      </div>

      {data.status === "RESOLVED" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden"
        >
          <FontAwesomeIcon icon={faCheckDouble} className="absolute -right-6 -bottom-6 text-white opacity-5 text-7xl rotate-12" />
          <h4 className="font-bold mb-2 text-lg flex items-center gap-3 italic">
            <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckDouble} className="text-white text-sm" />
            </div>
            <span>{t.resolved}</span>
          </h4>
          <p className="text-sm opacity-80 leading-relaxed pl-14">
            {t.resolvedNote}
          </p>
        </motion.div>
      )}

      <Link 
        to='/FeedbackPage'
        className="mt-8 w-full py-5 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        {t.feedback}
      </Link>
    </div>
  );
};

export default ComplaintDetails;