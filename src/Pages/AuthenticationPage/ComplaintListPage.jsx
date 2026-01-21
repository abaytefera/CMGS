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

  // Sample Data for UI Testing (Fallback)
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
    },
    {
      _id: "4",
      trackingId: "CGMS-10297",
      citizenName: "Marta Alemu",
      category: Language === "AMH" ? "የውሃ ብክለት" : "Water Pollution",
      createdAt: new Date().toISOString(),
      status: "Assigned",
    }
  ];

  // Logic: Prioritize API data, fallback to Sample if API is empty/loading
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
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="all" />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 ${isFetching ? 'bg-amber-500 animate-spin' : 'bg-emerald-500 animate-pulse'} rounded-full`} />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                    {isFetching ? "Syncing..." : (listType || "Overview")}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{t.title}</h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">{t.subtitle}</p>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.searchPlaceholder} 
                    className="w-full bg-white/5 border border-white/10 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:border-emerald-500/50 text-sm text-white"
                  />
                </div>
                <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-emerald-500 hover:bg-emerald-500/10">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
              
              {isLoading && (
                <div className="absolute inset-0 bg-[#080d14]/80 z-20 flex items-center justify-center">
                   <Loader2 className="animate-spin text-emerald-500" size={40} />
                </div>
              )}

              <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
                 <LayoutGrid className="text-emerald-500" size={18} />
                 <span className="text-xs font-black text-white uppercase tracking-widest italic">Live Feed Status</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-white/[0.03] text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5 border-b border-white/5">{t.colId}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.colCitizen}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.colCategory}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.colDate}</th>
                      <th className="px-8 py-5 border-b border-white/5">{t.colStatus}</th>
                      <th className="px-8 py-5 border-b border-white/5 text-right">{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {complaints.map((item) => (
                      <ComplaintRow key={item._id || item.trackingId} complaint={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-8 border-t border-white/5 bg-white/[0.01] flex flex-col sm:flex-row justify-between items-center gap-6">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic opacity-70">
                  {t.showing}
                </span>
                
                <div className="flex gap-3">
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-slate-400 disabled:opacity-30"
                  >
                    <ChevronLeft size={16} /> {t.prev}
                  </button>
                  <button 
                    disabled={complaints.length < 10 && !sampleComplaints}
                    onClick={() => setPage(p => p + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-black text-emerald-500"
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