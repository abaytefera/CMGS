import React from 'react';
import { useSelector } from "react-redux";
import { Download, Inbox, Eye } from 'lucide-react'; // Added Eye for a subtle touch
import { useNavigate } from 'react-router-dom';

const ComplaintList = ({ Data = [] }) => { 
  const { Language = "EN" } = useSelector((state) => state.webState || {});
  const navigate = useNavigate();

  const t = {
    title: Language === "AMH" ? "የተመደቡ መዝገቦች" : "Assigned Case Files",
    export: Language === "AMH" ? "በCSV አውርድ" : "Export CSV",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colSubject: Language === "AMH" ? "የአቤቱታው ርዕስ" : "Complaint Subject",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colPriority: Language === "AMH" ? "ቅድሚያ" : "Priority",
    view: Language === "AMH" ? "ተመልከት" : "View Details", 
    noData: Language === "AMH" ? "ምንም መዝገብ አልተገኘም" : "No records found",
    getStatusLabel: (status) => {
        if (Language === "AMH") {
            const labels = { 'New': 'አዲስ', 'In Progress': 'በሂደት ላይ', 'Overdue': 'ጊዜ ያለፈበት' };
            return labels[status] || status;
        }
        return status;
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* HEADER SECTION */}
      <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-gray-50/30">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">{t.title}</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95">
          <Download size={14} />
          {t.export}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50 text-gray-500 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-left">{t.colId}</th>
              <th className="px-6 py-5 text-left">{t.colSubject}</th>
              <th className="px-6 py-5 text-left">{t.colStatus}</th>
              <th className="px-6 py-5 text-left">{t.colPriority}</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {Data.length > 0 ? (
              Data.map((c) => (
                <tr
                  key={c._id || c.id}
                  onClick={() => navigate(`/DetailList/${c._id || c.id}`)}
                  className="hover:bg-emerald-50/30 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-5">
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 text-xs">
                      #{c.ref_number || c.id?.slice(-6)}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-semibold text-gray-800">
                    {c.subject || "---"}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      c.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                      c.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                      'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {t.getStatusLabel(c.status)}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-gray-600 font-medium">{c.priority}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {/* ENHANCED VIEW BUTTON */}
                    
                      <Eye size={14} />
                      
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-gray-50 rounded-full text-gray-300">
                      <Inbox size={40} strokeWidth={1} />
                    </div>
                    <p className="text-gray-400 font-medium italic">{t.noData}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintList;