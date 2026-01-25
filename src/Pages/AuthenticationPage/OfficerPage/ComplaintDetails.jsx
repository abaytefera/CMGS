import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { User, ChevronLeft, RefreshCcw, CheckCircle, Clock, AlertCircle, FileText, History, ShieldCheck, UserPlus, Lock } from "lucide-react";

import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from "../../../Component/AuthenticateComponent/AuthHeader";
import AuthFooter from "../../../Component/AuthenticateComponent/AuthFooter";
import InfoCard from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/InfoCard";
import StatusHistory from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/StatusHistory";

// ... (mockFetchComplaint stays the same)

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  
  // Role Helpers
  const isAdmin = user?.role === "ADMIN";
  const isSupervisor = user?.role === "SUPERVISOR";
  const isOfficer = user?.role === "OFFICER";

  const [complaint, setComplaint] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    mockFetchComplaint(id).then(data => {
      setComplaint(data);
      setCurrentStatus(data.status);
    });
  }, [id]);

  const statusConfig = {
    "SUBMITTED": { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", icon: <FileText size={16} /> },
    "UNDER_REVIEW": { label: "Under Review", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", icon: <Clock size={16} /> },
    "ASSIGNED": { label: "Assigned", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", icon: <ShieldCheck size={16} /> },
    "IN_PROGRESS": { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", icon: <RefreshCcw size={16} /> },
    "RESOLVED": { label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", icon: <CheckCircle size={16} /> },
    "CLOSED": { label: "Closed", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", icon: <History size={16} /> },
    "REJECTED": { label: "Rejected", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100", icon: <AlertCircle size={16} /> },
  };

  const activeConfig = statusConfig[currentStatus] || statusConfig["SUBMITTED"];

  if (!complaint) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-white font-sans text-slate-800">
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        <main className="flex-grow pt-32 pb-20 px-6 lg:px-10 bg-white">
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <ChevronLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
              <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{complaint.ref_number}</h1>
                <p className="text-slate-500 text-sm font-medium">Complaint Management Panel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-widest border shadow-sm ${activeConfig.bg} ${activeConfig.border} ${activeConfig.color}`}>
                {activeConfig.icon} {activeConfig.label}
              </div>

              {/* Status Update Toggle for Non-Admins */}
              {!isAdmin && (
                <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="bg-white border border-slate-200 p-2 rounded-full hover:bg-slate-50 transition-colors">
                  <RefreshCcw size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <InfoCard title="Citizen Information">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">{complaint.citizen_name[0]}</div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{complaint.citizen_name}</p>
                    <p className="text-sm text-slate-500 font-medium">{complaint.phone_number}</p>
                    <p className="text-xs text-slate-400 mt-1">{complaint.email}</p>
                  </div>
                </div>
              </InfoCard>

              <InfoCard title="Complaint Description">
                <p className="text-slate-700 leading-relaxed">{complaint.description}</p>
              </InfoCard>
            </div>

            <div className="space-y-8">
              <InfoCard title="Status History">
                <StatusHistory history={complaint.StatusLogs} />
              </InfoCard>

              {/* DYNAMIC ACTION PANEL BASED ON ROLE */}
              <InfoCard title={isAdmin ? "Read Only Access" : isSupervisor ? "Supervisor Controls" : "Officer Actions"}>
                {isAdmin ? (
                  <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                    <Lock size={24} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrator View Only</p>
                  </div>
                ) : isSupervisor ? (
                  /* SUPERVISOR VIEW: Show Assignment Button */
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Management Actions</p>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95">
                      <UserPlus size={18} /> Assign to Officer
                    </button>
                    <button className="w-full bg-white border border-rose-200 text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-50 transition-colors">
                      Reject Complaint
                    </button>
                  </div>
                ) : (
                  /* OFFICER VIEW: Show Note and Update Button */
                  <div className="space-y-4">
                    <textarea 
                      className="w-full bg-slate-50 p-4 rounded-xl text-sm outline-none border border-slate-200 focus:bg-white focus:border-emerald-500 transition-all min-h-[120px]"
                      placeholder="Add investigation note or update status detail..." 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95">
                      Update & Save Changes
                    </button>
                  </div>
                )}
              </InfoCard>
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default ComplaintDetails;