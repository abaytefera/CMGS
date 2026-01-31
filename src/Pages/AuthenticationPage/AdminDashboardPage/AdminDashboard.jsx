import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Loader2, ExternalLink, AlertTriangle, Shield } from 'lucide-react';

// API Hooks
import { useGetAdminStatsQuery, useGetSystemActivityQuery } from '../../../Redux/adminApi';
import { useGetDepartmentsQuery } from '../../../Redux/departmentApi';
import { useGetCategoriesQuery } from '../../../Redux/categoryApi';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';

// Components
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AdminStats from '../../../Component/AuthenticateComponent/AdminDashboardComponent/AdminStats';
import SystemSummary from '../../../Component/AuthenticateComponent/AdminDashboardComponent/SystemSummary';
import AdminDashboardChart from '../../../Component/AuthenticateComponent/AdminDashboardComponent/AdminDashboardChart';

const AdminDashboard = () => {
  const { Language } = useSelector((state) => state.webState || {});
  const navigate = useNavigate();

  const { data: stats, isLoading: sLoading, error: sError } = useGetAdminStatsQuery();
  const { data: activities, isLoading: aLoading, error: aError } = useGetSystemActivityQuery();
  const { data: dep, isLoading: dLoading, error: dError } = useGetDepartmentsQuery();
  const { data: catagory, isLoading: cLoading, error: cError } = useGetCategoriesQuery();
  const {
    data: CompileList,
    isLoading: clLoading,
    error: clError,
  } = useGetComplaintsDashboardQuery('admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ ONLY ADDITION: 401 REDIRECT LOGIC
  useEffect(() => {
    const errors = [sError, aError, dError, cError, clError];

    const isUnauthorized = errors.some(
      (err) => err?.status === 401
    );

    if (isUnauthorized) {
                localStorage.setItem('authToken', null);
      navigate('/login', { replace: true });
    }
  }, [sError, aError, dError, cError, clError, navigate]);

  const isLoading = sLoading || aLoading || dLoading || cLoading || clLoading;

  const t = {
    title: Language === "AMH" ? "የአስተዳዳሪ ዳሽቦርድ" : "Admin Dashboard",
    subtitle: Language === "AMH" ? "የአካባቢ ጥበቃ ባለሥልጣን አጠቃላይ እይታ" : "EPA Global System Overview",
    recentActivity: Language === "AMH" ? "የቅርብ ጊዜ እንቅስቃሴዎች" : "Recent System Activity",
    overdue: Language === "AMH" ? "ጊዜ ያለፈበት" : "Overdue",
    pending: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
  };

  if (isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={48} />
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/40">
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <AuthHeader True={true} />

        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-24 space-y-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight capitalize">
                {t.title}
              </h1>
              <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-emerald-500"></span>
                {t.subtitle}
              </p>
            </div>

            {/* Statistics */}
            <AdminStats CompileList={CompileList} />

            {/* Chart & Summary */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10 items-start">
              <div className="xl:col-span-2 h-full">
                <AdminDashboardChart data={CompileList} language={Language} />
              </div>
              <div className="xl:col-span-1 h-full">
                <SystemSummary catagory={catagory?.length} dep={dep?.length} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm mt-10 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-900 rounded-xl text-white">
                    <Shield size={18} />
                  </div>
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">
                    {t.recentActivity}
                  </h3>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead className="text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-50">
                    <tr>
                      <th className="px-8 py-6">Tracking ID</th>
                      <th className="px-8 py-6">Subject</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {(activities || []).map((item, i) => (
                      <tr key={item.id || i} className="group hover:bg-gray-50/50 transition-all">
                        <td className="px-8 py-6 font-mono text-emerald-600 text-xs font-black">
                          {item.trackingId || `EPA-${2026}-${i}`}
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-gray-800">
                          {item.subject || "Environmental Monitoring Request"}
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                              item.isOverdue
                                ? 'text-rose-600 bg-rose-50 border-rose-100'
                                : 'text-amber-600 bg-amber-50 border-amber-100'
                            }`}
                          >
                            <AlertTriangle size={10} />
                            {item.isOverdue ? t.overdue : t.pending}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-gray-100 mr-4">
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
