import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import { logout } from '../../../Redux/auth';
const AdminDashboard = () => {
  const { Language } = useSelector((state) => state.webState || {});
  const navigate = useNavigate();
  const Dispath=useDispatch()

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
            localStorage.removeItem('authToken');
                                Dispath(logout())
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

            
            

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
