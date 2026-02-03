import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronLeft, RefreshCcw, CheckCircle, Clock, AlertCircle,
  FileText, History, ShieldCheck, Lock,
  Send, Loader2, Paperclip, Mail, Phone, 
  Image as ImageIcon, ExternalLink, Video, Music, FileCode
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useGetComplaintByIdQuery, useUpdateComplaintStatusMutation } from "../../../Redux/complaintApi";

import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from "../../../Component/AuthenticateComponent/AuthHeader";
import InfoCard from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/InfoCard";
import StatusHistory from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/StatusHistory";

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const canUpdateStatus = user?.role === "SUPERVISOR" || user?.role === "OFFICER";
  
  const [selectedStatus, setSelectedStatus] = useState("");
  const [comment, setComment] = useState("");

  const complaintId = useMemo(() => (!isNaN(Number(id)) ? Number(id) : null), [id]);
  const { data: complaint, isLoading } = useGetComplaintByIdQuery(complaintId, { skip: !complaintId });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  useEffect(() => {
    if (complaint?.status) {
      setSelectedStatus(complaint.status);
    }
  }, [complaint]);

  // Configuration for Status badges
  const statusConfig = {
    "SUBMITTED": { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: <FileText size={16} /> },
    "UNDER_REVIEW": { label: "Under Review", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", icon: <Clock size={16} /> },
    "ASSIGNED": { label: "Assigned", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", icon: <ShieldCheck size={16} /> },
    "IN_PROGRESS": { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: <RefreshCcw size={16} /> },
    "RESOLVED": { label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: <CheckCircle size={16} /> },
    "CLOSED": { label: "Closed", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", icon: <History size={16} /> },
    "REJECTED": { label: "Rejected", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", icon: <AlertCircle size={16} /> },
  };

  // Helper to get correct icon and style for different file types
  const getFileDisplay = (type) => {
    const mime = type?.toLowerCase() || "";
    if (mime.startsWith('image/')) return { icon: <ImageIcon size={20} className="text-emerald-600" />, label: mime.split('/')[1] || "IMG" };
    if (mime.startsWith('video/')) return { icon: <Video size={20} className="text-rose-600" />, label: mime.split('/')[1] || "VID" };
    if (mime.startsWith('audio/')) return { icon: <Music size={20} className="text-amber-600" />, label: mime.split('/')[1] || "AUD" };
    if (mime.includes('pdf')) return { icon: <FileText size={20} className="text-red-600" />, label: "PDF" };
    return { icon: <FileCode size={20} className="text-blue-600" />, label: mime.split('/')[1] || "FILE" };
  };

  const handleStatusUpdate = async () => {
    if (!comment.trim()) return toast.error("Comment is required.");
    try {
      await toast.promise(
        updateStatus({ id: complaintId, status: selectedStatus, comment }).unwrap(),
        { loading: 'Updating...', success: 'Status Sync Complete', error: 'Update Failed' }
      );
      setComment("");
    } catch (err) { /* Error handled by toast.promise */ }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;
  if (!complaint) return <div className="h-screen flex items-center justify-center">Complaint not found.</div>;

  const activeConfig = statusConfig[complaint?.status] || statusConfig["SUBMITTED"];

  return (
    <div className="flex min-h-screen font-sans text-slate-800 bg-white">
      <Toaster position="top-right" />
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-grow pt-32 pb-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => window.history.back()} className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{complaint.ref_number}</h1>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border mt-2 inline-block ${complaint.priority === 'HIGH' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                    {complaint.priority || "NORMAL"} PRIORITY
                  </span>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest border bg-white ${activeConfig.color} ${activeConfig.border}`}>
                {activeConfig.icon} {activeConfig.label}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                
                {/* Citizen Information */}
                <InfoCard title="Citizen Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                        {complaint.citizen_name?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 uppercase tracking-tight">{complaint.citizen_name || "Anonymous"}</p>
                        <div className="flex flex-col gap-0.5 mt-1 text-slate-500 text-xs font-bold">
                          <span className="flex items-center gap-1.5"><Phone size={12} /> {complaint.phone_number || "No Phone"}</span>
                          <span className="flex items-center gap-1.5"><Mail size={12} /> {complaint.email || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-l border-slate-100 pl-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-City / Woreda</p>
                        <p className="text-sm font-bold text-slate-700">{complaint.sub_city || "N/A"}, {complaint.woreda || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submitted</p>
                        <p className="text-sm font-bold text-slate-700">{complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </InfoCard>

                {/* Complaint Description */}
                <InfoCard title="Complaint Description">
                  <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl italic text-slate-600 leading-relaxed font-medium">
                    "{complaint.description || "No description provided."}"
                  </div>
                </InfoCard>

                {/* Attachments Section */}
                <InfoCard title="Evidence & Attachments">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {complaint.Attachments && complaint.Attachments.length > 0 ? (
                      complaint.Attachments.map((file) => {
                        const fileDisplay = getFileDisplay(file.file_type);
                        return (
                          <div key={file.id} className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 transition-all shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="p-2 bg-slate-50 rounded-lg">
                                {fileDisplay.icon}
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-[11px] font-black text-slate-900 truncate uppercase">
                                  {file.original_name || "Untitled"}
                                </span>
                                <span className="text-[9px] text-slate-400 font-bold uppercase">
                                  {fileDisplay.label}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => window.open(file.file_path, '_blank', 'noopener,noreferrer')}
                              className="p-2 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-colors"
                            >
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-full py-6 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                        <Paperclip size={20} className="mx-auto text-slate-300 mb-2" />
                        <p className="text-[10px] font-black text-slate-400 uppercase">No attachments found</p>
                      </div>
                    )}
                  </div>
                </InfoCard>
              </div>

              {/* Sidebar Section */}
              <div className="space-y-8">
                <InfoCard title="Case Timeline">
                  <StatusHistory history={complaint.StatusLogs || []} />
                </InfoCard>

                <InfoCard title={canUpdateStatus ? "Decision Management" : "View Access"}>
                   {canUpdateStatus ? (
                    <div className="space-y-4">
                        <select 
                          value={selectedStatus} 
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-black outline-none focus:border-emerald-500"
                        >
                          {Object.keys(statusConfig).map(k => (
                            <option key={k} value={k}>{statusConfig[k].label}</option>
                          ))}
                        </select>
                        <textarea 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-slate-50 p-4 rounded-2xl text-sm font-medium border border-slate-200 min-h-[100px] outline-none"
                          placeholder="Internal remarks..."
                        />
                        <button 
                          onClick={handleStatusUpdate}
                          disabled={isUpdating}
                          className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all disabled:opacity-50"
                        >
                          {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} 
                          Update Status
                        </button>
                    </div>
                   ) : (
                    <div className="text-center p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Lock size={16} className="mx-auto text-slate-400 mb-2" />
                      <p className="text-[10px] font-black text-slate-400 uppercase">Read Only Mode</p>
                    </div>
                   )}
                </InfoCard>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ComplaintDetails;