import React, { useEffect, useState } from 'react';
import { useGetReportsQuery } from '../../../Redux/reportApi';
import { FileBarChart, ArrowUpRight, Loader2, Database, ShieldCheck } from 'lucide-react';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import ReportFilters from '../../../Component/AuthenticateComponent/ReportsPageComponent/ReportFilters';
import ExportPanel from '../../../Component/AuthenticateComponent/ReportsPageComponent/ExportPanel';

const ReportsPage = () => {
  const departments = ["Environmental Quality", "Water Resources", "Waste Management"];
  const locations = ["Arada", "Kirkos", "Bole", "Akaki Kality"];
  
  // 1. Filter State
  const [filters, setFilters] = useState({ 
    period: 'This Month',
    department: '',
    location: ''
  });

  // 2. RTK Query
  const { data: Data, isLoading, isFetching, isError } = useGetReportsQuery(filters);

  // 3. Fallback Sample Data
  const sampleData = {
    totalCount: 3,
    data: [
      {
        _id: "rep-001",
        trackingId: "EPA-2026-001",
        category: "Air Quality",
        department: "Environmental Quality",
        createdAt: "2026-01-15T10:30:00Z"
      },
      {
        _id: "rep-002",
        trackingId: "EPA-2026-042",
        category: "Water Pollution",
        department: "Water Resources",
        createdAt: "2026-01-18T14:20:00Z"
      },
      {
        _id: "rep-003",
        trackingId: "EPA-2026-088",
        category: "Toxic Waste",
        department: "Waste Management",
        createdAt: "2026-01-20T09:15:00Z"
      }
    ]
  };

  const activeData = (Data && Data.data && Data.data.length > 0) ? Data : sampleData;
  const reports = activeData?.data || [];
  const totalCount = activeData?.totalCount || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      {/* Sidebar restricted to manager in logic */}
      <Sidebar role="manager" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 overflow-y-auto bg-slate-50/30">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <header className="mb-12 flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                  Data <span className="text-blue-600 italic">Vault</span>
                </h1>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase tracking-tighter ${isError ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
                    {isError ? "Offline Archive" : "Secure Connection"}
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                    Archive Access & Analytical Reporting
                  </p>
                </div>
              </div>
              <div className="hidden lg:block p-4 bg-white border border-slate-200 rounded-3xl shadow-sm">
                {isFetching ? (
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                ) : (
                  <FileBarChart className="text-blue-600" size={32} />
                )}
              </div>
            </header>

            {/* Controls Section */}
            <ReportFilters 
              filters={filters} 
              setFilters={setFilters} 
              departments={departments} 
              locations={locations} 
            />

            <ExportPanel data={reports} />

            {/* Table Container */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden relative shadow-sm mt-8">
              
              {/* Table Loading Overlay */}
              {isFetching && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xl">
                      <Loader2 className="animate-spin text-blue-600" size={16} />
                      <span className="text-[10px] font-black uppercase text-slate-800">Updating Archive...</span>
                    </div>
                </div>
              )}

              {/* Table Status Bar */}
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  Previewing: {filters.period}
                </h3>
                <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {totalCount.toLocaleString()} Records Found
                </span>
              </div>
              
              {/* Actual Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[9px] uppercase font-black text-slate-400 tracking-widest">
                    <tr>
                      <th className="px-8 py-4">Report ID</th>
                      <th className="px-8 py-4">Category</th>
                      <th className="px-8 py-4">Department</th>
                      <th className="px-8 py-4">Date Filed</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.length > 0 ? (
                      reports.map((item) => (
                        <tr 
                          key={item._id || item.id} 
                          className="group hover:bg-slate-100/70 transition-colors cursor-pointer"
                        >
                          <td className="px-8 py-5 text-xs font-mono text-blue-600 font-bold">
                            #{item.trackingId || 'REP-000'}
                          </td>
                          <td className="px-8 py-5 text-xs font-bold text-slate-800 uppercase italic">
                            {item.category || 'General'}
                          </td>
                          <td className="px-8 py-5 text-[10px] text-slate-500 font-bold uppercase">
                            {item.department || 'Unassigned'}
                          </td>
                          <td className="px-8 py-5 text-xs text-slate-400">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-100/50 rounded-lg transition-all">
                              <ArrowUpRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : !isLoading && (
                      <tr>
                        <td colSpan="5" className="py-20 text-center">
                          <Database size={32} className="mx-auto text-slate-200 mb-4" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            No records match the current filters
                          </p>
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

export default ReportsPage;