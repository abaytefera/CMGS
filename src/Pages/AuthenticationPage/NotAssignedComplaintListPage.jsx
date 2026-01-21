import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Search, Download, ChevronLeft, ChevronRight, LayoutGrid, Loader2, Inbox } from 'lucide-react';

import { useGetUnassignedComplaintsQuery } from '../../Redux/complaintApi';
import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import ComplaintRowNotAssigned from '../../Component/AuthenticateComponent/ComplainListNotAssigned/ComplaintRow';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';

const NotAssignedComplaintListPage = () => {
  const { Language } = useSelector((state) => state.webState);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // 1. RTK Query Hook
  const { data, isLoading, isFetching } = useGetUnassignedComplaintsQuery({
    search: searchTerm,
    page: page,
    limit: 10
  });

  // 2. Three Realistic Sample Objects for fallback
  const sampleData = [
    {
      _id: "sample-001",
      trackingId: "EPA-2026-8812",
      citizenName: "Abay Tefera",
      phoneNumber: "+251 911 456 789",
      category: Language === "AMH" ? "የአየር ብክለት" : "Air Pollution",
      createdAt: "2026-01-20T10:00:00Z",
      status: "Submitted"
    },
    {
      _id: "sample-002",
      trackingId: "EPA-2026-9901",
      citizenName: "Mulugeta Bekele",
      phoneNumber: "+251 922 112 233",
      category: Language === "AMH" ? "የቆሻሻ አወጋገድ" : "Waste Management",
      createdAt: "2026-01-21T08:30:00Z",
      status: "Submitted"
    },
    {
      _id: "sample-003",
      trackingId: "EPA-2026-7742",
      citizenName: "Sara Hagos",
      phoneNumber: "+251 944 556 677",
      category: Language === "AMH" ? "የውሃ ብክለት" : "Water Contamination",
      createdAt: "2026-01-21T14:15:00Z",
      status: "Submitted"
    }
  ];

 
  // Use real data if it exists and has items, otherwise use sampleData
  const complaints = (data?.data && data.data.length > 0) ? data.data : sampleData;
  const totalEntries = data?.total || complaints.length;

  const t = {
    title: Language === "AMH" ? "ያልተመደቡ መዝገቦች" : "Unassigned Cases",
    subtitle: Language === "AMH" ? "ሰራተኛ ያልተመደበላቸውን ሪፖርቶች እዚህ ያገኛሉ" : "Manage environmental reports awaiting officer assignment",
    searchPlaceholder: Language === "AMH" ? "በመለያ ቁጥር ይፈልጉ..." : "Search by ID, name, or phone...",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colCitizen: Language === "AMH" ? "የዜጋው ዝርዝር" : "Citizen Details",
    colCategory: Language === "AMH" ? "ዘርፍ" : "Category",
    colDate: Language === "AMH" ? "የተላከበት ቀን" : "Date Submitted",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colActions: Language === "AMH" ? "ተግባራት" : "Actions",
    showing: Language === "AMH" ? `ከ ${totalEntries} መዝገቦች ውስጥ ${complaints.length}ቱ እየታዩ ነው` : `Showing ${complaints.length} of ${totalEntries} entries`,
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300 selection:bg-rose-500/30">
      <Sidebar role="supervisor" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 overflow-y-auto pb-20">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Pending Allocation</span>
                </div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">{t.title}</h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">{t.subtitle}</p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder} 
                    className="w-full bg-white/5 border border-white/10 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:border-rose-500/50 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden relative">
              {isFetching && (
                <div className="absolute inset-0 bg-[#080d14]/60 z-20 flex items-center justify-center backdrop-blur-sm">
                  <Loader2 className="animate-spin text-rose-500" size={32} />
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5">{t.colId}</th>
                      <th className="px-8 py-5">{t.colCitizen}</th>
                      <th className="px-8 py-5">{t.colCategory}</th>
                      <th className="px-8 py-5">{t.colDate}</th>
                      <th className="px-8 py-5">{t.colStatus}</th>
                      <th className="px-8 py-5 text-right">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {complaints.map((item) => (
                      <ComplaintRowNotAssigned key={item._id} complaint={item} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-8 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{t.showing}</span>
                <div className="flex gap-2">
                  <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="p-2.5 bg-white/5 rounded-xl disabled:opacity-20"><ChevronLeft size={18}/></button>
                  <button onClick={() => setPage(p => p + 1)} disabled={complaints.length < 10 && !data} className="p-2.5 bg-white/5 rounded-xl disabled:opacity-20"><ChevronRight size={18}/></button>
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

export default NotAssignedComplaintListPage;