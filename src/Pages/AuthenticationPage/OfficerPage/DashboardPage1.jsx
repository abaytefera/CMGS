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
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';
const OfficerPage1 = () => {
  const { Language } = useSelector((state) => state.webState);
  
  // Data Fetching
  const { data: stats, isLoading: isLoadingStats } = useGetOfficerStatsQuery();
const {data:CompileList,isLoading:isLoadingCompiletask}=useGetComplaintsDashboardQuery('officer');


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


  useEffect(()=>{

console.log(CompileList);

  },[CompileList])

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
              

              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm">
                <TrendingUp size={16} />
                Efficiency: {isLoadingStats ? "..." : "94%"}
              </div>
            </div>


   {/* Stats Grid - FIXED: Passing .length to avoid Object error */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
              <StatCard title={t.statAssigned} type="assigned" count={isLoadingCompiletask ? "…" : CompileList.assigned} icon={ClipboardList} />
              <StatCard title={t.statProgress} type="in_progress" count={isLoadingCompiletask ? "…" : CompileList.inProgress} icon={Clock} />
              <StatCard title={t.statOverdue} type="overdue" count={isLoadingCompiletask ? "…" : CompileList.overdue} icon={AlertCircle} />
              <StatCard title={t.statResolved} type="resolved" count={isLoadingCompiletask ? "…" : CompileList.resolved} icon={CheckCircle} />
              <StatCard title={t.statRejected} type="rejected" count={isLoadingCompiletask ? "…" : CompileList.rejected} icon={XCircle} />
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
              
              {isLoadingCompiletask && (
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold italic">
                  <Loader2 size={14} className="animate-spin" /> Updating Records...
                </div>
              )}
            </div>

            {/* Complaints List Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
              {/* Pass the full 'compile' array to the list for rendering rows */}
              <ComplaintList Data={[]} />
            </div>

          </div>
        </main>

      
      </div>
    </div>
  );
};

export default OfficerPage1;