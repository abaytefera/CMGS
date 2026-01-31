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
    error
  } = useGetComplaintByIdQuery(complaintId, { skip: !complaintId });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  // 1. Handle 401 Redirects safely
  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [error, navigate, dispatch]);

  // 2. Safely sync status once data arrives
  useEffect(() => {
    if (complaint?.status) {
      setSelectedStatus(complaint.status);
    }
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
          success: "Updated Successfully",
          error: (err) => err?.data?.message || "Update Failed",
        }
      );
      setComment("");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // 3. SHOW LOADING FIRST
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  // 4. SHOW ERROR ONLY IF NO DATA EXISTS
  if (isError && error?.status !== 401 && !complaint) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-xl font-bold">Data Fetch Error</h2>
        <p className="text-slate-500 mb-4">{error?.data?.message || "Connection failed"}</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-black text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="p-6 max-w-7xl mx-auto w-full">
          {/* CRITICAL FIX: Only render content if complaint is not undefined */}
          {complaint ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                
                {/* Safe Data Injection */}
                <InfoCard complaint={complaint} />
                
                {/* Safe History Check */}
                {complaint.statusHistory && (
                   <StatusHistory history={complaint.statusHistory} />
                )}
              </div>

              {/* Status Update Form */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                  Action Panel
                </h3>
                
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border bg-gray-50 mb-4 font-bold text-sm"
                >
                  {Object.keys(statusConfig).map((key) => (
                    <option key={key} value={key}>{statusConfig[key].label}</option>
                  ))}
                </select>

                <textarea
                  placeholder="Explain the reason for this update..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 rounded-xl border bg-gray-50 text-sm mb-4 min-h-[100px]"
                />

                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating}
                  className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest disabled:opacity-50"
                >
                  {isUpdating ? "Processing..." : "Submit Change"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="animate-spin text-gray-200 mb-4" size={48} />
               <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Finalizing Data...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComplaintDetails;