import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ChevronLeft, RefreshCcw, CheckCircle, Clock, AlertCircle,
  FileText, History, ShieldCheck, UserPlus, Lock,
  Send, Loader2, MapPin, Calendar, Tag, AlertTriangle,
  Download, Paperclip, Mail, Phone, Image as ImageIcon
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
  
  // Updated Authority Logic: Only allow Officer and Supervisor
  const canUpdateStatus = user?.role === "SUPERVISOR" || user?.role === "OFFICER";
  const isSupervisor = user?.role === "SUPERVISOR";

  const [selectedStatus, setSelectedStatus] = useState("");
  const [comment, setComment] = useState("");

  const complaintId = useMemo(() => (!isNaN(Number(id)) ? Number(id) : null), [id]);

  const { data: complaint, isLoading, isError, error } = useGetComplaintByIdQuery(complaintId, { skip: !complaintId });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  useEffect(() => {
    if (complaint) setSelectedStatus(complaint.status);
  }, [complaint]);

  const statusConfig = {
    "SUBMITTED": { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: <FileText size={16} /> },
    "UNDER_REVIEW": { label: "Under Review", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", icon: <Clock size={16} /> },
    "ASSIGNED": { label: "Assigned", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", icon: <ShieldCheck size={16} /> },
    "IN_PROGRESS": { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: <RefreshCcw size={16} /> },
    "RESOLVED": { label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: <CheckCircle size={16} /> },
    "CLOSED": { label: "Closed", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", icon: <History size={16} /> },
    "REJECTED": { label: "Rejected", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", icon: <AlertCircle size={16} /> },
  };

  const handleStatusUpdate = async () => {
    if (!comment.trim()) return toast.error("Comment is required.");
    try {
      await toast.promise(
        updateStatus({ id: complaintId, status: selectedStatus, comment }).unwrap(),
        { loading: 'Updating...', success: 'Status Sync Complete', error: 'Update Failed' }
      );
      setComment("");
    } catch (err) {}
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>;

  if (!complaintId || isError) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center p-10">
      <AlertCircle size={48} className="text-rose-500 mb-4" />
      <h2 className="text-xl font-black uppercase italic">Data Fetch Error</h2>
      <p className="text-slate-500 text-sm mb-6">{error?.data?.message || "Invalid Complaint ID"}</p>
      <button onClick={() => window.history.back()} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest">Go Back</button>
    </div>
  );

  const activeConfig = statusConfig[complaint.status] || statusConfig["SUBMITTED"];

  return (
    <div className="flex min-h-screen font-sans text-slate-800 bg-white">
      <Toaster position="top-right" />
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-grow pt-32 pb-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => window.history.back()} className="p-2 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{complaint.ref_number}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${complaint.priority === 'HIGH' ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                      {complaint.priority} PRIORITY
                    </span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest border bg-white ${activeConfig.color} ${activeConfig.border}`}>
                {activeConfig.icon} {activeConfig.label}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <InfoCard title="Core Incident Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl">{complaint.citizen_name?.[0]}</div>
                        <div>
                          <p className="font-black text-slate-900 uppercase tracking-tight">{complaint.citizen_name}</p>
                          <div className="flex flex-col gap-0.5 mt-1 text-slate-500 text-xs">
                            <span className="flex items-center gap-1.5"><Phone size={12}/> {complaint.phone_number}</span>
                            <span className="flex items-center gap-1.5"><Mail size={12}/> {complaint.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-l border-slate-100 pl-6">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sub-City / Woreda</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-1"><MapPin size={14} className="text-rose-500"/> {complaint.sub_city}, {complaint.woreda}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submission Date</p>
                        <p className="text-sm font-bold text-slate-700 flex items-center gap-1"><Calendar size={14} className="text-blue-500"/> {new Date(complaint.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </InfoCard>

                <InfoCard title="Full Description">
                  <div className="p-6 bg-white border border-slate-100 rounded-2xl italic text-slate-600 leading-relaxed font-medium">
                    "{complaint.description}"
                  </div>
                </InfoCard>
              </div>

              {/* Sidebar: Status & Actions */}
              <div className="space-y-8">
                <InfoCard title="Status History">
                  <StatusHistory history={complaint.StatusLogs || []} />
                </InfoCard>

                <InfoCard title={canUpdateStatus ? "Decision Management" : "View Authority"}>
                  {/* ONLY OFFICER OR SUPERVISOR CAN SEE THIS */}
                  {canUpdateStatus ? (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Update Status To</label>
                        <select 
                          value={selectedStatus} 
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm font-black outline-none focus:border-emerald-500 cursor-pointer"
                        >
                          {Object.keys(statusConfig).map(k => <option key={k} value={k}>{statusConfig[k].label}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Internal Remarks</label>
                        <textarea 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full bg-slate-50 p-4 rounded-2xl text-sm font-medium border border-slate-200 focus:bg-white focus:border-emerald-500 min-h-[100px] resize-none outline-none"
                          placeholder="Explain the reasoning for this status change..."
                        />
                      </div>

                      <button 
                        onClick={handleStatusUpdate}
                        disabled={isUpdating || (selectedStatus === complaint.status && !comment)}
                        className="w-full bg-green-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-600 transition-all disabled:opacity-30"
                      >
                        {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} 
                        Commit Status Change
                      </button>

                      {/* EXTRA OPTION ONLY FOR SUPERVISORS */}
                      {isSupervisor && (
                        <div className="pt-4 border-t border-slate-100">
                          <Link to={`/AssignComplain/${complaint.id}`} className="w-full bg-emerald-50 text-emerald-600 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all text-[10px] uppercase tracking-widest">
                            <UserPlus size={16} /> Assign Officer
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* FORBIDDEN FOR ADMINS */
                    <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <Lock size={20} className="mx-auto text-slate-300 mb-2" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Read-Only Access</p>
                      <p className="text-[9px] text-slate-400 mt-1">Admins cannot modify case status.</p>
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