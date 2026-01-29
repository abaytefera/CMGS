import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // ✅ ADDED useNavigate
import { useSelector } from "react-redux";
import {
  ChevronLeft, RefreshCcw, CheckCircle, Clock, AlertCircle,
  FileText, History, ShieldCheck, UserPlus, Lock,
  Send, Loader2, MapPin, Calendar, Tag, AlertTriangle,
  Download, Paperclip, Mail, Phone, Image as ImageIcon
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

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ ADDED
  const { user } = useSelector((state) => state.auth);

  // Updated Authority Logic: Only allow Officer and Supervisor
  const canUpdateStatus = user?.role === "SUPERVISOR" || user?.role === "OFFICER";
  const isSupervisor = user?.role === "SUPERVISOR";

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

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateComplaintStatusMutation();

  // ✅ 401 REDIRECT HANDLER (ONLY ADDITION)
  useEffect(() => {
    if (error?.status === 401) {
      navigate("/login", { replace: true });
    }
  }, [error, navigate]);

  useEffect(() => {
    if (complaint) setSelectedStatus(complaint.status);
  }, [complaint]);

  const statusConfig = {
    SUBMITTED: {
      label: "Submitted",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      icon: <FileText size={16} />,
    },
    UNDER_REVIEW: {
      label: "Under Review",
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      icon: <Clock size={16} />,
    },
    ASSIGNED: {
      label: "Assigned",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
      icon: <ShieldCheck size={16} />,
    },
    IN_PROGRESS: {
      label: "In Progress",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      icon: <RefreshCcw size={16} />,
    },
    RESOLVED: {
      label: "Resolved",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      icon: <CheckCircle size={16} />,
    },
    CLOSED: {
      label: "Closed",
      color: "text-slate-600",
      bg: "bg-slate-100",
      border: "border-slate-200",
      icon: <History size={16} />,
    },
    REJECTED: {
      label: "Rejected",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      icon: <AlertCircle size={16} />,
    },
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
          loading: "Updating...",
          success: "Status Sync Complete",
          error: "Update Failed",
        }
      );
      setComment("");
    } catch (err) {}
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );

  if (!complaintId || isError)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white text-center p-10">
        <AlertCircle size={48} className="text-rose-500 mb-4" />
        <h2 className="text-xl font-black uppercase italic">
          Data Fetch Error
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          {error?.data?.message || "Invalid Complaint ID"}
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest"
        >
          Go Back
        </button>
      </div>
    );

  const activeConfig =
    statusConfig[complaint.status] || statusConfig.SUBMITTED;

  return (
    <div className="flex min-h-screen font-sans text-slate-800 bg-white">
      <Toaster position="top-right" />
      <Sidebar role={user?.role?.toLowerCase() || "officer"} />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        {/* 🔽 REST OF YOUR JSX IS UNCHANGED */}
      </div>
    </div>
  );
};

export default ComplaintDetails;
