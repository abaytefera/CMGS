import React, { useEffect } from 'react';
import { Activity, ShieldCheck, TrendingUp, Loader2 } from 'lucide-react';
import { useGetManagementStatsQuery, useGetDashboardChartsQuery } from '../../../Redux/managementApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import TrendChart from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/TrendChart';
import ResolutionPie from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/ResolutionPie';
import StatCard from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/StatCard';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const ManagementDashboard = () => {
  // RTK Query: Fetch Data from Node.js
  const { data: stats, isLoading: statsLoading } = useGetManagementStatsQuery();
  const { data: charts, isLoading: chartsLoading } = useGetDashboardChartsQuery();
 useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  // REAL DEFAULT VALUES
  const totalComplaints = stats?.total || "0";
  const slaCompliance = stats?.sla || "0%";
  const trendValue = stats?.trend || 0;
  const resolutionData = charts?.resolution || { resolved: 0, pending: 0, overdue: 0 };

  if (statsLoading || chartsLoading) {
    return (
      <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }
  

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="manager" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pb-40 pt-32 px-6 lg:px-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Dashboard Hero Section (Stats Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Complaints" value={totalComplaints} trend={trendValue} icon={Activity} colorClass="bg-blue-500" />
              <StatCard title="SLA Compliance" value={slaCompliance} trend={stats?.slaTrend || 0} icon={ShieldCheck} colorClass="bg-emerald-500" />
              
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Health</h4>
                  <p className="text-xl font-black text-white italic mt-1 uppercase">Optimal Performance</p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-lg uppercase border border-emerald-500/20">Active</span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[9px] font-black rounded-lg uppercase border border-blue-500/20">Secured</span>
                  </div>
                </div>
                <div className="h-16 w-32">
                   <TrendingUp className="text-emerald-500/20 w-full h-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trends Card - Pass chart data as props */}
              <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[3rem] shadow-2xl">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">Complaint Trends</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-6">Weekly incoming vs resolution volume</p>
                <TrendChart data={charts?.trends || []} />
              </div>

              {/* Status Breakdown Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] shadow-2xl flex flex-col items-center">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-10 w-full">Resolution Status</h3>
                <ResolutionPie data={resolutionData} />
                
                <div className="w-full mt-8 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-emerald-500"/> Resolved</span>
                    <span className="text-white">{resolutionData.resolved}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500"/> Pending</span>
                    <span className="text-white">{resolutionData.pending}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-rose-500"/> Overdue</span>
                    <span className="text-white">{resolutionData.overdue}</span>
                  </div>
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

export default ManagementDashboard;