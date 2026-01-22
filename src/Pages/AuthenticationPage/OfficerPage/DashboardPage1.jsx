import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import {
  LayoutGrid,
  ClipboardList,
  Clock,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { useGetOfficerStatsQuery } from '../../../Redux/officerApi';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import StatCard from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/StatCard';
import ComplaintList from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/ComplaintList';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const OfficerPage1 = () => {
  const { Language } = useSelector((state) => state.webState);
  const { data: stats, isLoading } = useGetOfficerStatsQuery();

  const t = {
    live: Language === "AMH" ? "ቀጥታ" : "Live",
    pageTitle: Language === "AMH" ? "ዳሽቦርድ" : "Dashboard",
    systemName: Language === "AMH" ? "የቅሬታ አያያዝ ስርዓት" : "Complaint Management System",
    recentWork: Language === "AMH" ? "የቅርብ ጊዜ ስራዎች" : "Recent Work Records",
    statAssigned: Language === "AMH" ? "የተመደቡ" : "Assigned",
    statProgress: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    statOverdue: Language === "AMH" ? "ጊዜ ያለፈባቸው" : "Overdue",
    statResolved: Language === "AMH" ? "የተፈቱ" : "Resolved",
    statRejected: Language === "AMH" ? "ውድቅ የተደረጉ" : "Rejected",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar role="officer" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 overflow-y-auto pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                  <span className="text-xs font-semibold text-emerald-600 uppercase">
                    {t.live}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  {t.pageTitle}
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  {t.systemName}
                </p>
              </div>

              <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-md text-sm font-medium flex items-center gap-2">
                <TrendingUp size={16} />
                Efficiency: {isLoading ? "..." : "94%"}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
              <StatCard title={t.statAssigned} type="Assigned" count={isLoading ? "…" : stats?.assigned || 0} icon={ClipboardList} />
              <StatCard title={t.statProgress} type="Progress" count={isLoading ? "…" : stats?.inProgress || 0} icon={Clock} />
              <StatCard title={t.statOverdue} type="Overdue" count={isLoading ? "…" : stats?.overdue || 0} icon={AlertCircle} />
              <StatCard title={t.statResolved} type="Resolved" count={isLoading ? "…" : stats?.resolved || 0} icon={CheckCircle} />
              <StatCard title={t.statRejected} type="Rejected" count={isLoading ? "…" : stats?.rejected || 0} icon={XCircle} />
            </div>

            {/* Recent Work */}
            <div className="mb-4 flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-md text-emerald-700">
                <LayoutGrid size={18} />
              </div>
              <h3 className="font-semibold text-gray-800">
                {t.recentWork}
              </h3>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-12">
              <ComplaintList Data={stats || []} />
            </div>

          </div>
        </main>

        <AuthFooter />
      </div>
    </div>
  );
};

export default OfficerPage1;
