import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Search, Download, ChevronLeft, ChevronRight, LayoutGrid, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useGetComplaintsQuery } from '../../Redux/complaintApi';
import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import ComplaintRow from '../../Component/AuthenticateComponent/ComplaintListPageComponent/ComplaintRow';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';

const ComplaintListPage = () => {
  const { Language } = useSelector((state) => state.webState);
  const { listType } = useParams();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // RTK Query Hook
  const { data, isLoading, isFetching } = useGetComplaintsQuery({
    status: listType !== "Overview" ? listType : undefined,
    search: searchTerm,
    page: page
  });

  // Sample Data for UI Testing
  const sampleComplaints = [
    {
      _id: "1",
      trackingId: "CGMS-10294",
      citizenName: "Abebe Kebede",
      phoneNumber: "+251 911 223344",
      category: Language === "AMH" ? "የቆሻሻ አወጋገድ" : "Waste Management",
      createdAt: new Date().toISOString(),
      status: "Assigned",
    },
    {
      _id: "2",
      trackingId: "CGMS-10295",
      citizenName: "Sara Mohammed",
      phoneNumber: "+251 922 556677",
      category: Language === "AMH" ? "የአየር ብክለት" : "Air Pollution",
      createdAt: new Date().toISOString(),
      status: "Pending",
    },
    {
      _id: "3",
      trackingId: "CGMS-10296",
      citizenName: "Yohannes Tekle",
      category: Language === "AMH" ? "የድምፅ ብክለት" : "Noise Pollution",
      createdAt: new Date().toISOString(),
      status: "Resolved",
    }
  ];

  const complaints = data?.data && data.data.length > 0 ? data.data : sampleComplaints;
  const totalEntries = data?.total || complaints.length;

  const t = {
    title: Language === "AMH" ? "የመዝገብ አስተዳደር" : "Case Management",
    subtitle: Language === "AMH" ? "የአካባቢ ጥበቃ ሪፖርቶችን ይገምግሙ እና ያከናውኑ" : "Review and process environmental reports",
    searchPlaceholder: Language === "AMH" ? "በመለያ ቁጥር፣ በስም ወይም በስልክ ይፈልጉ..." : "Search by ID, name, or phone...",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colCitizen: Language === "AMH" ? "የዜጋው ዝርዝር" : "Citizen Details",
    colCategory: Language === "AMH" ? "ዘርፍ" : "Category",
    colDate: Language === "AMH" ? "የተላከበት ቀን" : "Date Submitted",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colActions: Language === "AMH" ? "ተግባራት" : "Actions",
    showing: Language === "AMH" ? `ከ ${totalEntries} መዝገቦች ውስጥ ${complaints.length}ቱ እየታዩ ነው` : `Showing ${complaints.length} of ${totalEntries} entries`,
    prev: Language === "AMH" ? "ቀዳሚ" : "Previous",
    next: Language === "AMH" ? "ቀጣይ" : "Next",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Sidebar role="all" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            
            {/* Header with White/Green Theme */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 ${isFetching ? 'bg-amber-500 animate-spin' : 'bg-emerald-500 animate-pulse'} rounded-full`} />
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">
                    {isFetching ? "Syncing Data..." : (listType || "Overview")}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">{t.title}</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">{t.subtitle}</p>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder} 
                    className="w-full bg-white border border-slate-200 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:border-emerald-500/50 text-sm text-slate-700 shadow-sm"
                  />
                </div>
                <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm">
                  <Download size={20} />
                </button>
              </div>
            </div>

            {/* Table Container - White Theme */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden relative">
              
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center backdrop-blur-sm">
                   <Loader2 className="animate-spin text-emerald-600" size={40} />
                </div>
              )}

              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                 <LayoutGrid className="text-emerald-600" size={18} />
                 <span className="text-xs font-black text-slate-800 uppercase tracking-widest italic">Live Feed Status</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5 border-b border-slate-100">{t.colId}</th>
                      <th className="px-8 py-5 border-b border-slate-100">{t.colCitizen}</th>
                      <th className="px-8 py-5 border-b border-slate-100">{t.colCategory}</th>
                      <th className="px-8 py-5 border-b border-slate-100">{t.colDate}</th>
                      <th className="px-8 py-5 border-b border-slate-100">{t.colStatus}</th>
                      <th className="px-8 py-5 border-b border-slate-100 text-right">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {complaints.map((item) => (
                      <ComplaintRow key={item._id || item.trackingId} complaint={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination - White Theme */}
              <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-6">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                  {t.showing}
                </span>
                
                <div className="flex gap-3">
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 disabled:opacity-50 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft size={16} /> {t.prev}
                  </button>
                  <button 
                    disabled={complaints.length < 10 && !sampleComplaints}
                    onClick={() => setPage(p => p + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 border border-emerald-700 rounded-xl text-xs font-black text-white hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
                  >
                    {t.next} <ChevronRight size={16} />
                  </button>
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

export default ComplaintListPage;