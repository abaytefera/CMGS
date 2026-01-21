import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Loader2, ExternalLink, AlertTriangle } from 'lucide-react';

// RTK Query hooks
import { useGetAdminStatsQuery, useGetSystemActivityQuery } from '../../../Redux/adminApi';


import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AdminStats from '../../../Component/AuthenticateComponent/AdminDashboardComponent/AdminStats';
import SystemSummary from '../../../Component/AuthenticateComponent/AdminDashboardComponent/SystemSummary';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

 const AdminDashboard = () => {
  const { Language } = useSelector((state) => state.webState || {});

  // Fetching Data
  const { data: stats, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: activities, isLoading: activityLoading } = useGetSystemActivityQuery();
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const t = {
    title: Language === "AMH" ? "የአስተዳዳሪ ዳሽቦርድ" : "Admin Dashboard",
    subtitle: Language === "AMH" ? "የአካባቢ ጥበቃ ባለሥልጣን አጠቃላይ የሲስተም እይታ" : "EPA System Global Overview",
    recentActivity: Language === "AMH" ? "የቅርብ ጊዜ የሲስተም እንቅስቃሴዎች" : "Recent System Activity",
    viewLogs: Language === "AMH" ? "ሁሉንም መዝገቦች ይመልከቱ" : "View All Logs",
    trackingId: Language === "AMH" ? "መከታተያ መታወቂያ" : "Tracking ID",
    subject: Language === "AMH" ? "ርዕሰ ጉዳይ" : "Subject",
    status: Language === "AMH" ? "ሁኔታ" : "Status",
    action: Language === "AMH" ? "እርምጃ" : "Action",
    overdue: Language === "AMH" ? "ጊዜ ያለፈበት" : "Overdue",
    pending: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    noData: Language === "AMH" ? "ምንም እንቅስቃሴ አልተገኘም" : "No Activity Found",
  };

  if (statsLoading || activityLoading) return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={48} />
    </div>
  );
 
  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="admin" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 space-y-10 overflow-y-auto bg-[#080d14]">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">{t.title}</h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">{t.subtitle}</p>
            </div>

            {/* Pass stats to components or use defaults */}
            <AdminStats data={stats || {}} />
            <SystemSummary data={stats?.summary || {}} />

            {/* Recent Activity Table */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl mt-10">
              <div className="p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">{t.recentActivity}</h3>
                <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline transition-all">
                  {t.viewLogs}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                      <th className="px-8 py-5 border-b border-white/5">{t.trackingId}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.subject}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.status}</th>
                      <th className="px-8 py-5 border-b border-white/5 text-right">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {(activities || []).length > 0 ? (activities || []).map((item, i) => (
                      <tr key={item.id || i} className="group hover:bg-white/[0.02] transition-all cursor-pointer">
                        <td className="px-8 py-5 font-mono text-emerald-500 text-sm">
                          {item.trackingId || `EPA-2026-${i}`}
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-white">
                          {item.subject || "N/A"}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit ${
                            item.isOverdue ? 'text-rose-500 bg-rose-500/10' : 'text-amber-500 bg-amber-500/10'
                          }`}>
                            <AlertTriangle size={12} /> {item.isOverdue ? t.overdue : t.pending}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 bg-white/5 text-slate-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-10 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest">
                          {t.noData}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;