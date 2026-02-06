import React, { useEffect } from 'react';
import { Activity, ShieldCheck, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/auth';

import {
  useGetManagementStatsQuery,
  useGetDashboardChartsQuery
} from '../../../Redux/managementApi';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import TrendChart from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/TrendChart';
import ResolutionPie from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/ResolutionPie';
import StatCard from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/StatCard';
import DepartmentCircularChart from '../../../Component/AuthenticateComponent/AdminDashboardComponent/DepartmentCatagory';

const ManagementDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: stats, isLoading: statsLoading, error: statsError } = useGetManagementStatsQuery();
  const { data: charts, isLoading: chartsLoading, error: chartsError } = useGetDashboardChartsQuery();
  const { data: CompileList, isLoading: isLoadingCompile, error: compileError } = useGetComplaintsDashboardQuery('management');

  useEffect(() => {
    const errors = [statsError, chartsError, compileError];
    const isUnauthorized = errors.some(err => err?.status === 401);
    if (isUnauthorized) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  }, [statsError, chartsError, compileError, navigate, dispatch]);

  useEffect(() => window.scrollTo(0, 0), []);

  const totalComplaints = CompileList?.summary?.total ?? stats?.total ?? 0;
  const slaCompliance = `${CompileList?.percentage ?? stats?.sla ?? 0}%`;

  // Correct resolution data for pie with gradient colors
  const resolutionData = [
    { name: 'Resolved', value: CompileList?.summary?.resolved ?? 0, colorStart: '#34d399', colorEnd: '#10b981' },
    { name: 'Closed', value: CompileList?.summary?.closed ?? 0, colorStart: '#60a5fa', colorEnd: '#3b82f6' },
    { name: 'Rejected', value: CompileList?.summary?.rejected ?? 0, colorStart: '#f87171', colorEnd: '#ef4444' },
    { name: 'In Progress', value: CompileList?.summary?.inprogress ?? 0, colorStart: '#facc15', colorEnd: '#f59e0b' },
    { name: 'Under Review', value: CompileList?.summary?.underReview ?? 0, colorStart: '#c084fc', colorEnd: '#8b5cf6' },
    { name: 'Assigned', value: CompileList?.summary?.assigned ?? 0, colorStart: '#2dd4bf', colorEnd: '#06b6d4' },
    { name: 'Submitted', value: CompileList?.summary?.submitted ?? 0, colorStart: '#fb923c', colorEnd: '#f97316' },
    { name: 'Unresolved', value: CompileList?.summary?.unresolved ?? 0, colorStart: '#93c5fd', colorEnd: '#3b82f6' },
  ];

  if (statsLoading || chartsLoading || isLoadingCompile) {
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
          <div className="max-w-7xl mx-auto space-y-10">

            {/* Complaint Trends */}
            <div className="bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-2">
                Complaint Trends
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-6">
                Weekly incoming vs resolution volume
              </p>
              <TrendChart />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatCard title="Complaints" value={totalComplaints} trend={stats?.trend || 0} icon={Activity} colorClass="bg-blue-600" onClick={() => navigate("/Complaintlist/admin/list/")} />
              <StatCard title="SLA Compliance" value={slaCompliance} trend={stats?.slaTrend || 0} icon={ShieldCheck} colorClass="bg-emerald-600" />
            </div>

            {/* User Satisfaction */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">User Satisfaction</h4>
                <p className="text-xl font-black text-slate-800 italic mt-1 uppercase">{CompileList?.satisfaction?.averageSatisfaction ?? "No Feedback"}%</p>
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

            {/* Resolution Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm flex flex-col items-center">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-10 w-full">Resolution Status</h3>
                <ResolutionPie data={resolutionData} />
                <div className="w-full mt-8 space-y-4">
                  {resolutionData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-[10px] font-black uppercase text-slate-600">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded" style={{ background: `linear-gradient(to right, ${item.colorStart}, ${item.colorEnd})` }} />
                        {item.name}
                      </span>
                      <span className="text-slate-900 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DepartmentCircularChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagementDashboard;