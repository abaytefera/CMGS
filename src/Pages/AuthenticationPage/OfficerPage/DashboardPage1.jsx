import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'; 
import {
  LayoutGrid,
  ClipboardList,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

// API Hooks
import { useGetOfficerStatsQuery } from '../../../Redux/officerApi';
import { useGetComplaintsQuery } from '../../../Redux/complaintApi';

// Components
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import StatCard from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/StatCard';
import ComplaintList from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/ComplaintList';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const OfficerPage1 = () => {
  const { Language } = useSelector((state) => state.webState);
  
  // Data Fetching
  const { data: stats, isLoading: isLoadingStats } = useGetOfficerStatsQuery();
  const { data: compile, isLoading: isLoadingCompile, isError } = useGetComplaintsQuery();

  // Translations
  const t = {
    live: Language === "AMH" ? "ቀጥታ" : "Live",
    pageTitle: Language === "AMH" ? "ዳሽቦርድ" : "Dashboard",
    systemName: Language === "AMH" ? "የቅሬታ አያያዝ ስርዓት" : "Complaint Management System",
    recentWork: Language === "AMH" ? "የቅርብ ጊዜ ስራዎች" : "Recent Work Records",
    statAssigned: Language === "AMH" ? "የተመደቡ" : "Assigned",
    statProgress: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    statOverdue: Language === "AMH" ? "ጊዜ ያለፈባቸው" : "Overdue",
    statResolved: Language === "AMH" ? "የተፈቱ" : "Resolved",
    statRejected: Language === "AMH" ? "ውድቅ የተደረጉ" : "Rejected",
  };

  // Internal State for Filtered Data
  const [assigned, setAssigned] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [rejected, setRejected] = useState([]);

  // Filter logic whenever 'compile' data changes
  useEffect(() => {
    if (compile && Array.isArray(compile)) {
      setAssigned(compile.filter(item => item.status === 'ASSIGNED'));
      setInProgress(compile.filter(item => item.status === 'IN_PROGRESS'));
      setResolved(compile.filter(item => item.status === 'RESOLVED'));
      setRejected(compile.filter(item => item.status === 'REJECTED'));
    }
  }, [compile]);

  // Error handling for data fetch
  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch recent records. Please refresh.");
    }
  }, [isError]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Toast Notifications Container */}
      <Toaster position="top-right" />
      
      <Sidebar role="OFFICER" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                    {t.live}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {t.pageTitle}
                </h1>

                <p className="text-gray-500 text-sm mt-1 font-medium">
                  {t.systemName}
                </p>
              </div>

              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
                <TrendingUp size={16} />
                Efficiency: {isLoadingStats ? "..." : "94%"}
              </div>
            </div>

            {/* Stats Grid - FIXED: Passing .length to avoid Object error */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
              <StatCard title={t.statAssigned} type="Assigned" count={isLoadingCompile ? "…" : assigned.length} icon={ClipboardList} />
              <StatCard title={t.statProgress} type="Progress" count={isLoadingCompile ? "…" : inProgress.length} icon={Clock} />
              <StatCard title={t.statOverdue} type="Overdue" count={isLoadingCompile ? "…" : 0} icon={AlertCircle} />
              <StatCard title={t.statResolved} type="Resolved" count={isLoadingCompile ? "…" : resolved.length} icon={CheckCircle} />
              <StatCard title={t.statRejected} type="Rejected" count={isLoadingCompile ? "…" : rejected.length} icon={XCircle} />
            </div>

            {/* Table Section Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-md">
                  <LayoutGrid size={18} />
                </div>
                <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wider">
                  {t.recentWork}
                </h3>
              </div>
              
              {isLoadingCompile && (
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold italic">
                  <Loader2 size={14} className="animate-spin" /> Updating Records...
                </div>
              )}
            </div>

            {/* Complaints List Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
              {/* Pass the full 'compile' array to the list for rendering rows */}
              <ComplaintList Data={compile || []} />
            </div>

          </div>
        </main>

        <AuthFooter />
      </div>
    </div>
  );
};

export default OfficerPage1;