import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { LayoutGrid, ClipboardList, Clock, AlertCircle, TrendingUp, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useGetOfficerStatsQuery } from '../../../Redux/officerApi';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import StatCard from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/StatCard';
import ComplaintList from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/ComplaintList';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const DashboardPage1 = () => {
  const { Language } = useSelector((state) => state.webState);
  

  const { data: stats, isLoading, isError } = useGetOfficerStatsQuery();

  const t = {
    live: Language === "AMH" ? "ቀጥታ" : "Live",
    pageTitle: Language === "AMH" ? "ዳሽቦርድ" : "Dashboard",
    systemName: Language === "AMH" ? "የቅሬታ አያያዝ ስርዓት" : "Complaint Management System",
    recentWork: Language === "AMH" ? "የቅርብ ጊዜ ስራዎች" : "Recent Work Records",
    statAssigned: Language === "AMH" ? "የተመደቡ" : "Assigned",
    statProgress: Language === "AMH" ? "በሂደት ላይ" : "In-Progress",
    statOverdue: Language === "AMH" ? "ጊዜ ያለፈባቸው" : "Overdue",
    statResolved: Language === "AMH" ? "የተፈቱ" : "Resolved", 
    statRejected: Language === "AMH" ? "ውድቅ የተደረጉ" : "Rejected", 
  };
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="officer" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t.live}</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  {t.pageTitle}
                </h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                  {t.systemName}
                </p>
              </div>
              
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <div className="px-6 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} />
                  Efficiency: {isLoading ? "..." : "94%"}
                </div>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
              <StatCard 
                title={t.statAssigned} 
                type="Assigned" 
                count={isLoading ? <Loader2 className="animate-spin" size={16}/> : stats?.assigned || "0"} 
                icon={ClipboardList} 
                delay={0.1}
              />
              <StatCard 
                title={t.statProgress} 
                type="Progress" 
                count={isLoading ? <Loader2 className="animate-spin" size={16}/> : stats?.inProgress || "0"} 
                icon={Clock} 
                delay={0.2}
              />
              <StatCard 
                title={t.statOverdue} 
                type="Overdue" 
                count={isLoading ? <Loader2 className="animate-spin" size={16}/> : stats?.overdue || "0"} 
                icon={AlertCircle} 
                delay={0.3}
              />
              <StatCard 
                title={t.statResolved} 
                type="Resolved" 
                count={isLoading ? <Loader2 className="animate-spin" size={16}/> : stats?.resolved || "0"} 
                icon={CheckCircle} 
                delay={0.4}
              />
              <StatCard 
                title={t.statRejected} 
                type="Rejected" 
                count={isLoading ? <Loader2 className="animate-spin" size={16}/> : stats?.rejected || "0"} 
                icon={XCircle} 
                delay={0.5}
              />
            </div>

            {/* Table Header Label */}
            <div className="mb-8 flex items-center gap-3">
               <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <LayoutGrid size={20} />
               </div>
               <h3 className="text-white font-bold uppercase tracking-widest text-sm">{t.recentWork}</h3>
            </div>

            {/* Table Container */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] shadow-2xl mb-12 overflow-hidden transition-all hover:border-white/20">
              <ComplaintList  Data={stats || []}/>
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default DashboardPage1;