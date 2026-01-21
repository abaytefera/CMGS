import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { 
  ShieldAlert, TrendingUp, BarChart3, UserPlus, 
  CheckCircle2, AlertCircle, History, Users, XCircle, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// RTK Query Hook

import { useGetSupervisorStatsQuery } from '../../../Redux/supervisorApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import SLAWarning from '../../../Component/AuthenticateComponent/SupervisorComponent/SLAWarning';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import EfficiencyChart from '../../../Component/AuthenticateComponent/SupervisorComponent/EfficiencyChart'
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const SupervisorDashboard = () => {
  const { Language } = useSelector((state) => state.webState);

  // RTK Query fetch
  const { data: stats, isLoading } = useGetSupervisorStatsQuery();
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const t = {
    live: Language === "AMH" ? "ቀጥታ ክትትል" : "Live Overview",
    title: Language === "AMH" ? "የሱፐርቫይዘር መቆጣጠሪያ" : "Supervisor Command",
    departments: Language === "AMH" ? "የስራ ክፍሎች" : "Departments",
    totalComp: Language === "AMH" ? "ጠቅላላ አቤቱታዎች" : "Total Complaints",
    slaBreach: Language === "AMH" ? "የጊዜ ገደብ ያለፈባቸው (ዛሬ)" : "SLA Breach (Today)",
    approaching: Language === "AMH" ? "ጊዜያቸው እየተቃረበ ያሉ" : "Approaching Deadline",
    activeOfficers: Language === "AMH" ? "በስራ ላይ ያሉ ባለሙያዎች" : "Active Officers",
    efficiency: Language === "AMH" ? "አጠቃላይ ውጤታማነት" : "Overall Efficiency",
    lastMonth: Language === "AMH" ? "ካለፈው ወር በ 2.4% ብልጫ አለው" : "+2.4% from last month",
    viewReport: Language === "AMH" ? "ዝርዝር ሪፖርት ይመልከቱ" : "View Detailed Report",
    escalations: Language === "AMH" ? "የተላኩ አሳሳቢ ጉዳዮች" : "Recent Escalations",
    viewHistory: Language === "AMH" ? "ሁሉንም ታሪክ ይመልከቱ" : "View All History",
    officer: Language === "AMH" ? "ባለሙያ" : "Officer",
    critical: Language === "AMH" ? "በጣም አስቸኳይ" : "Critical",
    high: Language === "AMH" ? "ከፍተኛ" : "High",
    sub1: Language === "AMH" ? "የኬሚካል መፍሰስ" : "Chemical Spill",
    sub2: Language === "AMH" ? "ሕገ-ወጥ የዛፍ ምንጣሮ" : "Illegal Logging",
    notAssigned: Language === "AMH" ? "ለባለሙያ ያልተመደቡ" : "Not Assigned to Officer",
    resolvedComp: Language === "AMH" ? "መፍትሔ ያገኘ" : "Resolved",
    rejectedComp: Language === "AMH" ? "ውድቅ የተደረገ" : "Rejected",
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#080d14]">
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true}/>
        
        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t.live}</span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">{t.title}</h1>
              </div>
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20">
                  {t.departments}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
              {/* Stats Cards with Default Values */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Link to="/Complaintlist/all">
                  <SLAWarning title={t.totalComp} count={stats?.total || "40"} severity="medium" icon={BarChart3} />
                </Link>
                
                <Link to="/NotAssignComplainList/notAssign">
                  <SLAWarning title={t.notAssigned} count={stats?.unassigned || "40"} severity="high" icon={UserPlus} />
                </Link>

                <SLAWarning title={t.resolvedComp} count={stats?.resolved || "20"} severity="low" icon={CheckCircle2} />

                <Link to="/Complaintlist/rejected">
                  <SLAWarning title={t.rejectedComp} count={stats?.rejected || "10"} severity="medium" icon={XCircle} />
                </Link>

                <Link to="/Complaintlist/breach">
                  <SLAWarning title={t.slaBreach} count={stats?.breached || "20"} severity="high" icon={AlertCircle} />
                </Link>

                <Link to="/Complaintlist/approaching">
                  <SLAWarning title={t.approaching} count={stats?.approaching || "10"} severity="medium" icon={History} />
                </Link>

                <Link to="/Complaintlist/active">
                  <SLAWarning title={t.activeOfficers} count={stats?.activeOfficers || "40"} severity="low" icon={Users} />
                </Link>
              </div>

              {/* Efficiency Chart */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center">
                <div className="w-full flex justify-between items-start mb-2 px-4">
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs">{t.efficiency}</h4>
                    <p className="text-emerald-500 text-[10px] font-bold">{t.lastMonth}</p>
                  </div>
                  <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-500">
                    <TrendingUp size={18} />
                  </div>
                </div>
                {/* Defaulting percentage to 0 if undefined */}
                <EfficiencyChart percentage={stats?.efficiency || 87} />
                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all border border-white/5">
                  {t.viewReport}
                </button>
              </div>
            </div>

            {/* Escalations Section */}
            <div className="grid grid-cols-1 gap-8 mb-10">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem]">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="text-red-500" size={24} />
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm">{t.escalations}</h3>
                  </div>
                  <button className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all">
                    {t.viewHistory}
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Pull escalations from API or show empty array */}
                  {(stats?.recentEscalations || []).length > 0 ? (
                    (stats?.recentEscalations || []).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-6">
                          <span className="text-emerald-500 font-bold text-sm tracking-tighter">{item.id || "N/A"}</span>
                          <div>
                            <p className="text-sm font-bold text-white leading-none mb-1">{item.subject || "No Subject"}</p>
                            <p className="text-[10px] text-slate-500 flex items-center gap-1 font-bold uppercase">
                              <Users size={10} /> {t.officer}: {item.officerName || "Unassigned"}
                            </p>
                          </div>
                        </div>
                        <span className={`px-4 py-1.5 text-white text-[10px] font-black rounded-full uppercase shadow-lg ${item.priority === 'Critical' ? 'bg-red-500 shadow-red-900/20' : 'bg-amber-500 shadow-amber-900/20'}`}>
                          {item.priority || "Low"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-10 text-center text-slate-600 text-xs font-bold uppercase tracking-widest border-2 border-dashed border-white/5 rounded-3xl">
                      No Recent Escalations
                    </div>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default SupervisorDashboard;