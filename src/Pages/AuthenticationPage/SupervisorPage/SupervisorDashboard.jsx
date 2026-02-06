import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, UserPlus, CheckCircle2, Users, XCircle, Loader2 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// --- API Hooks ---
import { useGetSupervisorStatsQuery } from '../../../Redux/supervisorApi';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';

// --- Components ---
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import SLAWarning from '../../../Component/AuthenticateComponent/SupervisorComponent/SLAWarning';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import TrendChart from '../../../Component/AuthenticateComponent/ManagementDashboardComponent/TrendChart';

// --- Redux Actions ---
import { logout } from '../../../Redux/auth';

const SupervisorDashboard = () => {
  const { Language } = useSelector((state) => state.webState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Fetch Data ---
  const { data: stats, isLoading: statsLoading, error: statsError } = useGetSupervisorStatsQuery();
  const { data: CompileList, isLoading: listLoading, error: listError } = useGetComplaintsDashboardQuery('supervisor');

  // --- Handle Unauthorized Access ---
  useEffect(() => {
    if ((statsError?.status === 401) || (listError?.status === 401)) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  }, [statsError, listError, dispatch, navigate]);

  // --- Text Translations ---
  const t = useMemo(() => ({
    notAssigned: Language === "AMH" ? "ያልተመደቡ" : "Not Assigned",
    resolved: Language === "AMH" ? "የተፈቱ" : "Resolved",
    rejected: Language === "AMH" ? "ውድቅ የተደረጉ" : "Rejected",
    inProgress: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    distribution: Language === "AMH" ? "የአቤቱታዎች ስርጭት" : "Complaint Distribution"
  }), [Language]);

  // --- Chart Data ---
  const chartData = useMemo(() => {
    if (!CompileList) {
      // Fallback empty data
      return [
        { name: t.notAssigned, value: 0, color: '#8b5cf6' },
        { name: t.resolved, value: 0, color: '#10b981' },
        { name: t.rejected, value: 0, color: '#f43f5e' },
        { name: t.inProgress, value: 0, color: '#f59e0b' },
      ];
    }

    const others = (CompileList.notAssigned || 0) + (CompileList.resolved || 0) + (CompileList.rejected || 0);
    const inProgressCount = Math.max(0, (CompileList.totalComplaints || 0) - others);

    return [
      { name: t.notAssigned, value: CompileList.notAssigned || 0, color: '#8b5cf6' },
      { name: t.resolved, value: CompileList.resolved || 0, color: '#10b981' },
      { name: t.rejected, value: CompileList.rejected || 0, color: '#f43f5e' },
      { name: t.inProgress, value: inProgressCount, color: '#f59e0b' },
    ];
  }, [CompileList, t]);

  // --- Custom Pie Chart Labels ---
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central" 
        className="text-[11px] font-black"
      >
        {percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  // --- Loading State ---
  if (statsLoading || listLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />

        <main className="flex-1 h-screen overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            {/* --- Top Stats Cards --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
              <div className="xl:col-span-1 grid grid-cols-1 sm:grid-cols-1 gap-4">
                <Link to="/Complaintlist/supervisor/">
                  <SLAWarning title="Total" count={CompileList?.totalComplaints} severity="low" icon={BarChart3} />
                </Link>
                <Link to="/Complaintlist/supervisor/unassigned">
                  <SLAWarning title={t.notAssigned} count={CompileList?.notAssigned} severity="high" icon={UserPlus} />
                </Link>
                <Link to="/Complaintlist/supervisor/resolved">
                  <SLAWarning title={t.resolved} count={CompileList?.resolved} severity="low" icon={CheckCircle2} />
                </Link>
                <Link to="/Complaintlist/supervisor/rejected">
                  <SLAWarning title={t.rejected} count={CompileList?.rejected} severity="medium" icon={XCircle} />
                </Link>
                <Link to="/userMg" className="sm:col-span-2">
                  <SLAWarning title="Active Officers" count={CompileList?.activeOfficers} severity="low" icon={Users} />
                </Link>
              </div>

              {/* --- Complaint Trend Chart --- */}
              <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-[3rem] shadow-sm">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] mb-2">
                  Complaint Trends
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-6">
                  Weekly incoming vs resolution volume
                </p>
                <TrendChart />
              </div>
            </div>

            {/* --- Complaint Distribution Pie Chart --- */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm flex flex-col mt-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 italic">
                {t.distribution}
              </h3>

              <div className="w-full" style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius="100%"
                      innerRadius={0}
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      formatter={(value, name) => [`${value} Records`, name]}
                    />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;