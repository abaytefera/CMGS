import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { 
  ShieldAlert, TrendingUp, BarChart3, UserPlus, 
  CheckCircle2, AlertCircle, History, Users, XCircle, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useGetSupervisorStatsQuery } from '../../../Redux/supervisorApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import SLAWarning from '../../../Component/AuthenticateComponent/SupervisorComponent/SLAWarning';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import EfficiencyChart from '../../../Component/AuthenticateComponent/SupervisorComponent/EfficiencyChart'
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { useGetComplaintsDashboardQuery, useGetComplaintsQuery } from '../../../Redux/complaintApi';
const SupervisorDashboard = () => {
  const { Language } = useSelector((state) => state.webState);
  const { data: stats, isLoading } = useGetSupervisorStatsQuery();
const {data:CompileList,isLoading:isLoadingCompiletask}=useGetComplaintsDashboardQuery('supervisor');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{

console.log(CompileList);
  },[CompileList])

  const t = {
    live: Language === "AMH" ? "ቀጥታ ክትትል" : "Live Overview",
    title: Language === "AMH" ? "የሱፐርቫይዘር መቆጣጠሪያ" : "Supervisor Command",
    departments: Language === "AMH" ? "የስራ ክፍሎች" : "Departments",
    totalComp: Language === "AMH" ? "ጠቅላላ አቤቱታዎች" : "Total Complaints",
    notAssigned: Language === "AMH" ? "ለባለሙያ ያልተመደቡ" : "Not Assigned",
    resolvedComp: Language === "AMH" ? "መፍትሔ ያገኘ" : "Resolved",
    rejectedComp: Language === "AMH" ? "ውድቅ የተደረገ" : "Rejected",
    slaBreach: Language === "AMH" ? "የጊዜ ገደብ ያለፈባቸው" : "SLA Breach",
    approaching: Language === "AMH" ? "ጊዜያቸው እየተቃረበ ያሉ" : "Approaching",
    activeOfficers: Language === "AMH" ? "በስራ ላይ ያሉ" : "Active Officers",
    efficiency: Language === "AMH" ? "አጠቃላይ ውጤታማነት" : "Overall Efficiency",
    lastMonth: Language === "AMH" ? "ካለፈው ወር በ 2.4% ብልጫ አለው" : "+2.4% increase",
    viewReport: Language === "AMH" ? "ዝርዝር ሪፖርት ይመልከቱ" : "View Detailed Report",
    escalations: Language === "AMH" ? "የተላኩ አሳሳቢ ጉዳዮች" : "Recent Escalations",
    viewHistory: Language === "AMH" ? "ሁሉንም ታሪክ ይመልከቱ" : "View All History",
    officer: Language === "AMH" ? "ባለሙያ" : "Officer",
  };
 const { data: compile, isLoading: isLoadingCompile, isError } = useGetComplaintsQuery();
  




  if (isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            
          
            </div>

            {/* --- TOP GRID: STATS & EFFICIENCY --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              
              {/* Stats Cards Cluster (Taking 2/3 of space on XL) */}
              <div className="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
  <Link to={`/Complaintlist/supervisor/}`}>
    <SLAWarning title={t.totalComp} count={CompileList?.totalComplaints} severity="low" icon={BarChart3} />
  </Link>

  <Link to={`/NotAssignComplainList/supervisor/${"unassigned"}`}>
    <SLAWarning title={t?.notAssigned} count={CompileList?.notAssigned} severity="high" icon={UserPlus} />
  </Link>

<Link to={`/Complaintlist/supervisor/${"resolved"}`}>
  <SLAWarning title={t.resolvedComp} count={CompileList?.rejected} severity="low" icon={CheckCircle2} />
</Link>
  <Link to={`/Complaintlist/supervisor/${"rejected"}`}>
    <SLAWarning title={t.rejectedComp} count={CompileList?.resolved} severity="medium" icon={XCircle} />
  </Link>


    <SLAWarning title={t?.activeOfficers} count={CompileList?.activeOfficers} severity="low" icon={Users} />
 
</div>



              {/* Efficiency Card (Taking 1/3 of space) */}
              <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm p-6 flex flex-col items-center">
                <div className="w-full flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-gray-900 font-bold uppercase tracking-widest text-[10px]">{t.efficiency}</h4>
                    <p className="text-emerald-600 text-[10px] font-bold mt-1">{t.lastMonth}</p>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <EfficiencyChart percentage={stats?.efficiency || 87} />
                <button className="w-full mt-6 py-3 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 transition-all border border-gray-100">
                  {t.viewReport}
                </button>
              </div>
            </div>

            {/* --- RECENT ESCALATIONS --- */}
            <div className="bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <ShieldAlert className="text-rose-500" size={20} />
                  </div>
                  <h3 className="text-gray-900 font-bold uppercase tracking-widest text-xs">{t.escalations}</h3>
                </div>
                <button className="text-[10px] font-black text-gray-400 hover:text-emerald-600 uppercase tracking-widest transition-all">
                  {t.viewHistory}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(stats?.recentEscalations || []).length > 0 ? (
                  stats.recentEscalations.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all group">
                      <div className="flex items-center gap-4">
                        <span className="text-emerald-600 font-bold text-xs">#{item.id}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1 group-hover:text-emerald-700">{item.subject}</p>
                          <p className="text-[10px] text-gray-500 flex items-center gap-1 font-bold uppercase">
                            <Users size={12} className="text-gray-400" /> {t.officer}: {item.officerName}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase ${
                        item.priority === 'Critical' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 py-12 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-gray-100 rounded-3xl">
                    No Recent Escalations Found
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </main>
     
      </div>
    </div>
  );
};

export default SupervisorDashboard;