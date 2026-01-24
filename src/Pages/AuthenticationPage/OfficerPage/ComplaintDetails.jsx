import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { 
  User, ChevronLeft, RefreshCcw, CheckCircle, 
  Clock, AlertCircle, FileText, History, ShieldCheck, 
  MapPin, Mail, Phone, Loader2, XCircle, Play
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetComplaintByIdQuery, useUpdateComplaintStatusMutation } from '../../../Redux/complaintApi';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import InfoCard from '../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/InfoCard';
import StatusHistory from '../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/StatusHistory';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Language } = useSelector((state) => state.webState);

  const { data, isLoading, isError } = useGetComplaintByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  const mockComplaint = {
    caseId: "EPA-2026-9912",
    title: Language === "AMH" ? "የአካባቢ ብክለት ሪፖርት" : "Industrial Chemical Leakage",
    citizenName: "Abay Tefera",
    phone: "+251 911 456 789",
    email: "a.tefera@gmail.com",
    address: "Akaki Kality, Industrial Zone, Addis Ababa",
    description: "Dark fluid is being discharged into the local stream from the textile factory pipes during the night. The smell is pungent and residents are concerned about water safety.",
    status: "In Progress",
    attachments: [
      "https://images.unsplash.com/photo-1621447508323-271221c76916?q=80&w=500",
      "https://images.unsplash.com/photo-1590244948026-6427382296d1?q=80&w=500"
    ],
    history: [
      { status: "Submitted", updatedAt: "2024-05-18T09:00:00Z", remarks: "Initial citizen report filed" },
      { status: "Assigned", updatedAt: "2024-05-19T14:30:00Z", remarks: "Assigned to Kality branch inspector" }
    ]
  };

  const complaintData = data || mockComplaint;
  const [currentStatus, setCurrentStatus] = useState("In Progress");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [note, setNote] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (complaintData?.status) setCurrentStatus(complaintData.status);
  }, [complaintData]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleUpdate = async () => {
    try {
      await updateStatus({ id, status: currentStatus, remarks: note }).unwrap();
      setNote("");
      setShowStatusDropdown(false);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getFileType = (url) => {
    if (!url) return 'other';
    const ext = url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return 'image';
    if (['mp4', 'webm'].includes(ext)) return 'video';
    return 'other';
  };

  const statusConfig = {
    'Submitted': { label: Language === "AMH" ? "ገቢ የተደረገ" : "Submitted", color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: <FileText size={16}/> },
    'Under Review': { label: Language === "AMH" ? "በግምገማ ላይ" : "Under Review", color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', icon: <Clock size={16}/> },
    'Assigned': { label: Language === "AMH" ? "የተመደበ" : "Assigned", color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: <ShieldCheck size={16}/> },
    'In Progress': { label: Language === "AMH" ? "በሂደት ላይ" : "In Progress", color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: <RefreshCcw size={16}/> },
    'Resolved': { label: Language === "AMH" ? "መፍትሔ ያገኘ" : "Resolved", color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: <CheckCircle size={16}/> },
    'Closed': { label: Language === "AMH" ? "የተዘጋ" : "Closed", color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', icon: <History size={16}/> },
    'Rejected': { label: Language === "AMH" ? "ውድቅ የተደረገ" : "Rejected", color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: <AlertCircle size={16}/> },
  };

  const activeConfig = statusConfig[currentStatus] || statusConfig['In Progress'];

  return (
    <div className='flex min-h-screen bg-white font-sans text-slate-800'>
      <Sidebar role="officer"/>
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        {/* --- Main content changed to bg-white --- */}
        <main className="flex-grow pt-32 pb-20 px-6 lg:px-10 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-3 hover:bg-slate-50 rounded-full text-slate-400 shadow-sm border border-slate-100 transition-all">
                <ChevronLeft size={24} />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{complaintData.caseId}</h1>
                <p className="text-slate-500 text-sm font-medium">{complaintData.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              {isLoading && <Loader2 className="animate-spin text-emerald-600 mr-2" size={18} />}
              <div className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest border shadow-sm ${activeConfig.bg} ${activeConfig.border} ${activeConfig.color}`}>
                {activeConfig.icon} {activeConfig.label}
              </div>
              <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="bg-white border border-slate-200 shadow-sm p-3 rounded-full text-slate-600 hover:text-emerald-600 transition-colors">
                <RefreshCcw size={20} className={showStatusDropdown ? "rotate-180 duration-500" : "duration-500"} />
              </button>

              {showStatusDropdown && (
                <div className="absolute right-0 top-16 w-64 bg-white border border-slate-200 rounded-3xl shadow-xl z-[60] overflow-hidden py-2">
                  {Object.keys(statusConfig).map((statusKey) => (
                    <button
                      key={statusKey}
                      onClick={() => { setCurrentStatus(statusKey); setShowStatusDropdown(false); }}
                      className={`w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest transition-all border-b border-slate-50 last:border-none
                        ${currentStatus === statusKey ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      <span className={statusConfig[statusKey].color}>{statusConfig[statusKey].icon}</span>
                      {statusConfig[statusKey].label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <InfoCard title="Citizen Information">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-emerald-200/50 uppercase">
                    {(complaintData.citizenName || "U").substring(0, 2)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    <div className="flex items-center gap-3 text-slate-900 font-bold text-xl"><User size={18} className="text-emerald-600" /> {complaintData.citizenName}</div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm"><Phone size={18} className="text-slate-400" /> {complaintData.phone}</div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm"><Mail size={18} className="text-slate-400" /> {complaintData.email}</div>
                    <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider"><MapPin size={18} className="text-slate-400" /> {complaintData.address}</div>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Complaint Description">
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                  <p className="text-slate-700 leading-relaxed italic text-lg font-medium">"{complaintData.description}"</p>
                </div>
              </InfoCard>

              <InfoCard title="Evidence Attachments">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                  {complaintData.attachments?.map((url, i) => {
                    const type = getFileType(url);
                    return (
                      <div key={i} onClick={() => setSelectedFile(url)} className="group relative aspect-square rounded-[1.5rem] overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-sm hover:shadow-md transition-all">
                        {type === 'image' ? (
                          <img src={url} alt="evidence" className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 group-hover:text-emerald-600 transition-colors">
                            <Play size={32} fill="currentColor" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{type}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </InfoCard>
            </div>

            <div className="space-y-8">
              <InfoCard title="Status History">
                <StatusHistory history={complaintData.history || []} />
              </InfoCard>

              <InfoCard title="Officer Actions">
                <div className="space-y-4">
                  <textarea 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                    placeholder="Enter case investigation findings..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 min-h-[180px] resize-none transition-all" 
                  />
                  <button 
                    onClick={handleUpdate}
                    disabled={!note || isUpdating} 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-lg shadow-emerald-100 uppercase tracking-[0.2em] text-[11px] flex justify-center items-center gap-3"
                  >
                    {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <>Update Case File <CheckCircle size={16} /></>}
                  </button>
                </div>
              </InfoCard>
            </div>
          </div>
        </main>

        {/* --- Media Viewer Modal remains consistent with light theme backdrop --- */}
        {selectedFile && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-6" onClick={() => setSelectedFile(null)}>
            <div className="relative w-full max-w-5xl h-[70vh] flex flex-col" onClick={e => e.stopPropagation()}>
               <div className="w-full flex justify-between items-center mb-6">
                 <span className="text-white text-[10px] font-black uppercase tracking-widest">Case Evidence Viewer</span>
                 <button onClick={() => setSelectedFile(null)} className="text-white/60 hover:text-white transition-colors"><XCircle size={32} /></button>
               </div>
               <div className="flex-grow bg-black rounded-[2rem] shadow-2xl overflow-hidden flex items-center justify-center border border-white/10">
                 {getFileType(selectedFile) === 'image' && <img src={selectedFile} className="max-w-full max-h-full object-contain" alt="Preview" />}
                 {getFileType(selectedFile) === 'video' && <video controls autoPlay className="max-w-full max-h-full"><source src={selectedFile} /></video>}
               </div>
            </div>
          </div>
        )}

        <AuthFooter />
      </div>
    </div>
  );
};

export default ComplaintDetails;