import React from 'react';
import { useSelector } from "react-redux";
import { Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintList = ({ Data}) => {
  const { Language } = useSelector((state) => state.webState);
const   navigate=useNavigate()
  const t = {
    title: Language === "AMH" ? "የተመደቡ መዝገቦች" : "Assigned Case Files",
    export: Language === "AMH" ? "በCSV አውርድ" : "Export CSV",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colSubject: Language === "AMH" ? "የአቤቱታው ርዕስ" : "Complaint Subject",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colPriority: Language === "AMH" ? "ቅድሚያ የሚሰጠው" : "Priority",
    statusNew: Language === "AMH" ? "አዲስ" : "New",
    statusProgress: Language === "AMH" ? "በሂደት ላይ" : "In-Progress",
    statusOverdue: Language === "AMH" ? "ጊዜ ያለፈበት" : "Overdue",
    pHigh: Language === "AMH" ? "ከፍተኛ" : "High",
    pMedium: Language === "AMH" ? "መካከለኛ" : "Medium",
    pCritical: Language === "AMH" ? "አስቸኳይ" : "Critical",
    sub1: Language === "AMH" ? "የኢንዱስትሪ ጭስ ልቀት" : "Industrial Smoke Emission",
    sub2: Language === "AMH" ? "የወንዝ ብክለት ሪፖርት" : "River Pollution Report",
    sub3: Language === "AMH" ? "ሕገ-ወጥ የደን ምንጣሮ" : "Illegal Forest Clearing",
  };

  const complaints = [
    { id: 'EPA-9921', subject: t.sub1, status: 'New', statusLabel: t.statusNew, priority: t.pHigh },
    { id: 'EPA-9925', subject: t.sub2, status: 'In-Progress', statusLabel: t.statusProgress, priority: t.pMedium },
    { id: 'EPA-9810', subject: t.sub3, status: 'Overdue', statusLabel: t.statusOverdue, priority: t.pCritical },
  ];

  return (
    /* Changed bg-white to transparent/dark overlay to match dashboard */
    <div className="w-full bg-[#0b1219]/50 backdrop-blur-sm">
      {/* Table Header Section */}
      <div className="p-8 flex justify-between items-center bg-white/[0.01] border-b border-white/5">
        <div>
          <h3 className="text-lg font-black text-white tracking-tight uppercase italic">
            {t.title}
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
            Real-time synchronization active
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
          <Download size={14} />
          {t.export}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.02] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
            <tr>
              <th className="px-8 py-5 border-b border-white/5">{t.colId}</th>
              <th className="px-8 py-5 border-b border-white/5">{t.colSubject}</th>
              <th className="px-8 py-5 border-b border-white/5">{t.colStatus}</th>
              <th className="px-8 py-5 border-b border-white/5">{t.colPriority}</th>
              <th className="px-8 py-5 border-b border-white/5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {complaints.map((c) => (
              <tr 
                key={c.id} 
                onClick={() => navigate(`/DetailList/${"id"}`)}
                className="group hover:bg-white/[0.03] transition-all cursor-pointer"
              >
                <td className="px-8 py-5 font-bold text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  <span className="font-mono">{c.id}</span>
                </td>
                <td className="px-8 py-5">
                   <div className="flex flex-col">
                      <span className="text-white font-bold text-sm">{c.subject}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Environmental Dept</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-block shadow-lg ${
                    c.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-blue-500/5' : 
                    c.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-rose-500/5' : 
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-emerald-500/5'
                  }`}>
                    {c.statusLabel}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      c.priority === t.pCritical ? 'bg-rose-500 animate-pulse' : 
                      c.priority === t.pHigh ? 'bg-amber-500' : 'bg-slate-500'
                    }`} />
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{c.priority}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all border border-white/5">
                    <ExternalLink size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintList;