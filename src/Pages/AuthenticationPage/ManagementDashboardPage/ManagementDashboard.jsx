import React, { useEffect } from 'react';
import { Activity, ShieldCheck, TrendingUp, Loader2, Heart } from 'lucide-react'; // Added Heart icon
import { useNavigate } from 'react-router-dom';

import {
  useGetManagementStatsQuery,
  useGetDashboardChartsQuery
} from '../../../Redux/managementApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import TrendChart from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/TrendChart';
import ResolutionPie from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/ResolutionPie';
import StatCard from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/StatCard';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/auth';
const ManagementDashboard = () => {
  const navigate = useNavigate();
const  Dispath=useDispatch()
  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError 
  } = useGetManagementStatsQuery();

  const {
    data: charts,
    isLoading: chartsLoading,
    error: chartsError 
  } = useGetDashboardChartsQuery();

  const {
    data: CompileList,
    isLoading: isloadingcompile,
    error: compileError 
  } = useGetComplaintsDashboardQuery('management');

  // 401 REDIRECT HANDLER
  useEffect(() => {
    const errors = [statsError, chartsError, compileError];
    const isUnauthorized = errors.some((err) => err?.status === 401);
    if (isUnauthorized) {
      localStorage.removeItem('authToken');
             Dispath(logout())
      navigate('/login', { replace: true });
    }
  }, [statsError, chartsError, compileError, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- DATA MAPPING FROM COMPILELIST ---
  // We use optional chaining and logical OR to prevent "undefined" errors
  const totalComplaints = CompileList?.summary?.total ?? stats?.total ?? "0";
  const slaCompliance = `${CompileList?.percentage ?? stats?.sla ?? 0}%`;
  
  // Data for the Pie Chart based on CompileList summary
  const resolutionData = {
    resolved: CompileList?.summary?.resolved ?? 0,
    pending: CompileList?.summary?.unresolved ?? 0,
    overdue: charts?.resolution?.overdue ?? 0 // Falls back to chart API for overdue
  };

  if (statsLoading || chartsLoading || isloadingcompile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar role="manager" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 pb-40 pt-32 px-6 lg:px-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">

            {/* Dashboard Hero Section (Stats Cards) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
             <StatCard
  title="Complaints"
  value={totalComplaints}
  trend={stats?.trend || 0}
  icon={Activity}
  colorClass="bg-blue-600"
onClick={() =>{

    console.log("what is this")

     navigate("/Complaintlist/admin/list/")

  }}
  
/>
              <StatCard
                title="SLA Compliance"
                value={slaCompliance}
                trend={stats?.slaTrend || 0}
                icon={ShieldCheck}
                colorClass="bg-emerald-600"
               
              />

              {/* System Health / Satisfaction Card */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    User Satisfaction
                  </h4>
                  <p className="text-xl font-black text-slate-800 italic mt-1 uppercase">
                    {CompileList?.satisfaction?.averageSatisfaction ?? "No Feedback"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase border border-emerald-200">
                      {CompileList?.percentage === 100 ? 'Excellent' : 'Stable'}
                    </span>
                  </div>
                </div>
                <div className="h-16 w-16 opacity-20">
                  <Heart className="text-rose-600 w-full h-full" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trends Card */}
              <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-2">
                  Complaint Trends
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-6">
                  Weekly incoming vs resolution volume
                </p>
                <TrendChart data={charts?.trends || []} />
              </div>

              {/* Status Breakdown Card */}
              <div className="bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm flex flex-col items-center">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 w-full">
                  Resolution Status
                </h3>
                
                {/* Now using mapped data from CompileList */}
                <ResolutionPie data={resolutionData} />

                <div className="w-full mt-8 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded bg-emerald-500" /> Resolved
                    </span>
                    <span className="text-slate-900 font-bold">
                      {resolutionData.resolved}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-600">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded bg-blue-500" /> Unresolved (Pending)
                    </span>
                    <span className="text-slate-900 font-bold">
                      {resolutionData.pending}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagementDashboard;