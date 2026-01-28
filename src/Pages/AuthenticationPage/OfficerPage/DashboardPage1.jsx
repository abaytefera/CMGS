import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast'; 
import {
  LayoutGrid, ClipboardList, Clock, AlertCircle, 
  TrendingUp, CheckCircle, XCircle, Loader2 
} from 'lucide-react';

// API Hooks
import { useGetOfficerStatsQuery } from '../../../Redux/officerApi';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';

// Components
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import StatCard from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/StatCard';
import ComplaintList from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/ComplaintList';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import OfficerOverviewChart from './OfficerOverviewChart'; // New Import

const OfficerPage1 = () => {
  const { Language } = useSelector((state) => state.webState);
  
  const { data: stats, isLoading: isLoadingStats } = useGetOfficerStatsQuery();
  const { data: CompileList, isLoading: isLoadingCompiletask } = useGetComplaintsDashboardQuery('officer');

  const t = {
    live: Language === "AMH" ? "ቀጥታ" : "Live",
    pageTitle: Language === "AMH" ? "ዳሽቦርድ" : "Dashboard",
    recentWork: Language === "AMH" ? "የቅርብ ጊዜ ስራዎች" : "Recent Work Records",
    statAssigned: Language === "AMH" ? "የተመደቡ" : "Assigned",
    statProgress: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    statOverdue: Language === "AMH" ? "ጊዜ ያለፈባቸው" : "Overdue",
    statResolved: Language === "AMH" ? "የተፈቱ" : "Resolved",
    statRejected: Language === "AMH" ? "ውድቅ የተደረጉ" : "Rejected",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoadingCompiletask) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50 text-gray-900">
      <Toaster position="top-right" />
      <Sidebar role="OFFICER" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />

        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">

            {/* Top Section: Stats & Graph Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
              
              {/* Left Side: Stats Cards */}
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard title={t.statAssigned} count={CompileList?.assigned} icon={ClipboardList} type="assigned" />
                <StatCard title={t.statProgress} count={CompileList?.inProgress} icon={Clock} type="in_progress" />
                <StatCard title={t.statResolved} count={CompileList?.resolved} icon={CheckCircle} type="resolved" />
                <StatCard title={t.statRejected} count={CompileList?.rejected} icon={XCircle} type="rejected" />
                
                <div className="sm:col-span-2 bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <AlertCircle className="text-rose-500" />
                      <span className="font-bold text-rose-700 uppercase text-xs tracking-widest">{t.statOverdue}</span>
                   </div>
                   <span className="text-2xl font-black text-rose-700">{CompileList?.overdue}</span>
                </div>
              </div>

              {/* Right Side: Visual Graph */}
              <div className="xl:col-span-1">
                <OfficerOverviewChart data={CompileList} t={t} />
              </div>
            </div>

            {/* Table Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
                  <LayoutGrid size={20} />
                </div>
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">
                  {t.recentWork}
                </h3>
              </div>
            </div>

            {/* Complaints List Table */}
            <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden mb-12">
              <ComplaintList Data={[]} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default OfficerPage1;