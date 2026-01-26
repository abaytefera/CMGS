import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { Loader2, ExternalLink, AlertTriangle, Shield, BarChart3 } from 'lucide-react';

// RTK Query hooks
import { useGetAdminStatsQuery, useGetSystemActivityQuery } from '../../../Redux/adminApi';
import { useGetDepartmentsQuery } from '../../../Redux/departmentApi';
import { useGetComplaintsQuery } from '../../../Redux/complaintApi';
import { useGetUsersQuery } from '../../../Redux/userApi';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AdminStats from '../../../Component/AuthenticateComponent/AdminDashboardComponent/AdminStats';
import SystemSummary from '../../../Component/AuthenticateComponent/AdminDashboardComponent/SystemSummary';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { useGetCategoriesQuery } from '../../../Redux/categoryApi';
import { useGetComplaintsDashboardQuery } from '../../../Redux/complaintApi';
const AdminDashboard = () => {
  const { Language } = useSelector((state) => state.webState || {});

  const { data: stats, isLoading: statsLoading } = useGetAdminStatsQuery();
  const { data: activities, isLoading: activityLoading } = useGetSystemActivityQuery();
  const {data:dep,isLoading:loadingdept}=useGetDepartmentsQuery();
   const {data:catagory,isLoading:isloadingCat,isError,error}=useGetCategoriesQuery()
   const  {data:CompileList,isLoading:isloadingcompile} =useGetComplaintsDashboardQuery ('admin');


useEffect(()=>{
console.log(CompileList);

},[CompileList])


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

 const isloading = statsLoading || activityLoading || loadingdept 

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


  if (isloading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar role="admin" />
      
      <div className="flex-1 flex flex-col min-w-0 border-l border-gray-100">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-28 px-6 lg:px-10 pb-10 space-y-10 overflow-y-auto bg-white">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-10 border-b border-gray-100 pb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                {t.title}
              </h1>
              <p className="text-gray-500 font-medium text-sm mt-1">
                {t.subtitle}
              </p>
            </div>

            <AdminStats  CompileList={CompileList}
/>
            <SystemSummary catagory={catagory?.length} dep={dep?.length}  />
          
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-10">
              <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-gray-400" />
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                    {t.recentActivity}
                  </h3>
                </div>
                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest hover:underline transition-all">
                  {t.viewLogs}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-5">{t.trackingId}</th>
                      <th className="px-8 py-5">{t.subject}</th>
                      <th className="px-8 py-5">{t.status}</th>
                      <th className="px-8 py-5 text-right">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(activities || []).length > 0 ? (activities || []).map((item, i) => (
                      <tr key={item.id || i} className="group hover:bg-gray-50/80 transition-all cursor-pointer">
                        <td className="px-8 py-5 font-mono text-emerald-700 text-sm font-bold">
                          {item.trackingId || `EPA-${2026}-${i}`}
                        </td>
                        <td className="px-8 py-5 text-sm font-semibold text-gray-700">
                          {item.subject || "Environmental Service Request"}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md w-fit border ${
                            item.isOverdue 
                            ? 'text-red-600 bg-red-50 border-red-100' 
                            : 'text-amber-600 bg-amber-50 border-amber-100'
                          }`}>
                            <AlertTriangle size={12} /> {item.isOverdue ? t.overdue : t.pending}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 border border-gray-100 rounded-lg transition-all shadow-sm">
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-16 text-center text-gray-400 font-bold uppercase text-[10px] tracking-widest">
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