import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RefreshCcw, CheckCircle, Clock, AlertCircle,
  FileText, History, ShieldCheck, Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  useGetComplaintByIdQuery,
  useUpdateComplaintStatusMutation
} from "../../../Redux/complaintApi";

import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from "../../../Component/AuthenticateComponent/AuthHeader";
import InfoCard from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/InfoCard";
import StatusHistory from "../../../Component/AuthenticateComponent/OfficerComponet/ComplaintDetailsComponent/StatusHistory";
import { logout } from "../../../Redux/auth";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [comment, setComment] = useState("");

  const complaintId = useMemo(
    () => (!isNaN(Number(id)) ? Number(id) : null),
    [id]
  );

  const {
    data: complaint,
    isLoading,
    isError,
    error,
    refetch
  } = useGetComplaintByIdQuery(complaintId, { skip: !complaintId });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  // Handle 401 Unauthorized
  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [error, navigate, dispatch]);

  // Sync internal state with fetched data
  useEffect(() => {
    if (complaint){
      console.log("what happen eerror")
      console.log(complaint);
      
      setSelectedStatus(complaint.status);}
  }, [complaint]);

  const statusConfig = {
    SUBMITTED: { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", icon: <FileText size={16} /> },
    UNDER_REVIEW: { label: "Under Review", color: "text-purple-600", bg: "bg-purple-50", icon: <Clock size={16} /> },
    ASSIGNED: { label: "Assigned", color: "text-indigo-600", bg: "bg-indigo-50", icon: <ShieldCheck size={16} /> },
    IN_PROGRESS: { label: "In Progress", color: "text-amber-600", bg: "bg-amber-50", icon: <RefreshCcw size={16} /> },
    RESOLVED: { label: "Resolved", color: "text-emerald-600", bg: "bg-emerald-50", icon: <CheckCircle size={16} /> },
    CLOSED: { label: "Closed", color: "text-slate-600", bg: "bg-slate-100", icon: <History size={16} /> },
    REJECTED: { label: "Rejected", color: "text-rose-600", bg: "bg-rose-50", icon: <AlertCircle size={16} /> },
  };

  const handleStatusUpdate = async () => {
    if (!comment.trim()) return toast.error("Comment is required.");
    try {
      await toast.promise(
        updateStatus({
          id: complaintId,
          status: selectedStatus,
          comment,
        }).unwrap(),
        {
          loading: "Updating status...",
          success: "Status updated successfully!",
          error: (err) => err?.data?.message || "Update Failed",
        }
      );
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  // 2. Error State (Blocking content if data is missing)
  if (isError && error?.status !== 401 && !complaint) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white text-center p-10">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-xl font-black uppercase italic">Data Fetch Error</h2>
        <p className="text-slate-500 text-sm mb-6">{error?.data?.message || "Complaint not found"}</p>
        <button onClick={() => navigate(-1)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px]">
          Go Back
        </button>
      </div>
    );
  }

  // 3. Main Render
  return (
    <div className="flex min-h-screen font-sans text-slate-800 bg-gray-50/50">
      <Toaster position="top-right" />
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="p-6 max-w-7xl mx-auto w-full">
          {complaint ? (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Complaint #{complaint.id}</h1>
                  <p className="text-slate-500 text-sm">Review and update complaint details</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider ${statusConfig[complaint.status]?.bg} ${statusConfig[complaint.status]?.color}`}>
                  {statusConfig[complaint.status]?.icon}
                  {statusConfig[complaint.status]?.label}
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <InfoCard complaint={complaint} />
                  <StatusHistory history={complaint.statusHistory} />
                </div>

                {/* Sidebar Action Card */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="font-black uppercase text-[10px] tracking-widest text-slate-400 mb-4">Update Status</h3>
                    
                    <select 
                      value={selectedStatus} 
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {Object.keys(statusConfig).map((key) => (
                        <option key={key} value={key}>{statusConfig[key].label}</option>
                      ))}
                    </select>

                    <textarea
                      placeholder="Add a comment explaining the change..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 text-sm min-h-[120px] mb-4 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />

                    <button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={16} /> : "Update Complaint"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">No data available.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComplaintDetails;