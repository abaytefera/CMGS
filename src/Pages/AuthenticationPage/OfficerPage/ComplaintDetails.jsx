import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { User, ChevronLeft, RefreshCcw, CheckCircle, Clock, AlertCircle, FileText, History, ShieldCheck, MapPin, Mail, Phone, Play, File, Lock } from "lucide-react";

import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from "../../../Component/AuthenticateComponent/AuthHeader";
import AuthFooter from "../../../Component/AuthenticateComponent/AuthFooter";
import InfoCard from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/InfoCard";
import StatusHistory from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/StatusHistory";

// --- MOVED MOCK DATA HERE TO FIX REFERENCE ERROR ---
const mockFetchComplaint = (id) => Promise.resolve({
  id: id,
  ref_number: `CMP-2026-${id}`,
  citizen_name: "John Doe",
  phone_number: "+251911223344",
  email: "john@example.com",
  sub_city: "Bole",
  woreda: "08",
  description: "Test complaint description with details regarding the incident.",
  status: "SUBMITTED",
  priority: "MEDIUM",
  StatusLogs: [
    { status: "SUBMITTED", date: "2026-01-25", note: "Complaint filed" }
  ],
  Attachments: [
    { id: 1, file_path: "#", file_type: "image/jpeg", original_name: "evidence.jpg" }
  ],
  Category: { name: "Public Safety" }
});

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";

  const [complaint, setComplaint] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    // Calling the function now works because it is defined in scope
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
          
          {/* Header & Status Toggle */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <ChevronLeft size={24} className="cursor-pointer" onClick={() => window.history.back()} />
              <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{complaint.ref_number}</h1>
                <p className="text-slate-500 text-sm font-medium">Viewing complaint details</p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-[11px] uppercase tracking-widest border shadow-sm ${activeConfig.bg} ${activeConfig.border} ${activeConfig.color}`}>
                {activeConfig.icon} {activeConfig.label}
              </div>

              {/* ADMIN RESTRICTION: Dropdown hidden for Admins */}
              {!isAdmin && (
                <button onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="bg-white border border-slate-200 p-2 rounded-full">
                  <RefreshCcw size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <InfoCard title="Citizen Information">
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{complaint.citizen_name[0]}</div>
                    <div>
                        <p className="font-bold text-slate-900">{complaint.citizen_name}</p>
                        <p className="text-sm text-slate-500">{complaint.phone_number}</p>
                    </div>
                </div>
              </InfoCard>

              <InfoCard title="Description">
                <p className="text-slate-700">{complaint.description}</p>
              </InfoCard>
            </div>

            <div className="space-y-8">
              <InfoCard title="Status History">
                <StatusHistory history={complaint.StatusLogs} />
              </InfoCard>

              {/* ADMIN RESTRICTION: Actions panel disabled for Admin */}
              <InfoCard title={isAdmin ? "Read Only Access" : "Officer Actions"}>
                {isAdmin ? (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                    <Lock size={24} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrator View Only</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea 
                        className="w-full bg-slate-50 p-4 rounded-xl text-sm outline-none border border-slate-200"
                        placeholder="Add investigation note..." 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg">
                        Update Complaint
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