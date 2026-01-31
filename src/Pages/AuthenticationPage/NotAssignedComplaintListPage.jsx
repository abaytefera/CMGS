import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Search, Download, ChevronLeft, ChevronRight, LayoutGrid, Loader2, Inbox, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

import { 
  useGetUnassignedComplaintsQuery, 
  useGetComplaintsbyCatagoryQuery 
} from '../../Redux/complaintApi';

import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import ComplaintRowNotAssigned from '../../Component/AuthenticateComponent/ComplainListNotAssigned/ComplaintRow';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';
import { logout } from '../../Redux/auth';
import { useDispatch } from 'react-redux';
const NotAssignedComplaintListPage = () => {
  const navigate = useNavigate(); // ✅ Added navigate
  const { Language } = useSelector((state) => state.webState);
  const { user } = useSelector((state) => state.auth);
  const { role: urlRole, type: urlType } = useParams();
const Dispath=useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // 1. Fetch data based on Category/Role params
  const { 
    data: TotalCompile, 
    isLoading: isLoadingCompile, 
    isFetching: isFetchingCompile,
    error: errorCompile // ✅ Capture error
  } = useGetComplaintsbyCatagoryQuery({ 
    role: urlRole || user?.role, 
    type: urlType 
  }, { skip: !urlType });

  // 2. Fetch Unassigned specifically
  const { 
    data: unassignedData, 
    isLoading: isLoadingUnassigned, 
    isFetching: isFetchingUnassigned,
    error: errorUnassigned // ✅ Capture error
  } = useGetUnassignedComplaintsQuery({
    search: searchTerm,
    page: page,
    limit: 10
  }, { skip: !!urlType });

  // --- 401 REDIRECT LOGIC ---
  useEffect(() => {
    if ((errorCompile && errorCompile.status === 401) || (errorUnassigned && errorUnassigned.status === 401)) {
      localStorage.removeItem('authToken');
      Dispath(logout())
      navigate('/login', { replace: true });
    }
  }, [errorCompile, errorUnassigned, navigate]);
  // --------------------------

  const displayData = useMemo(() => {
    const rawData = urlType ? TotalCompile : unassignedData?.data;
    if (!rawData) return [];

    if (searchTerm && urlType) {
      return rawData.filter(item => 
        item.ref_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.citizen_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return rawData;
  }, [TotalCompile, unassignedData, urlType, searchTerm]);

  const isLoading = isLoadingCompile || isLoadingUnassigned;
  const isFetching = isFetchingCompile || isFetchingUnassigned;

  const t = {
    title: Language === "AMH" ? "የመዝገቦች ዝርዝር" : urlType ? `${urlType} Cases` : "Unassigned Cases",
    subtitle: Language === "AMH" ? "ለማስተዳደር ዝግጁ የሆኑ ሪፖርቶች" : "Manage environmental reports awaiting action",
    searchPlaceholder: Language === "AMH" ? "በመለያ ቁጥር ይፈልጉ..." : "Search by ID or name...",
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Sidebar role={user?.role?.toLowerCase() || "supervisor"} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 overflow-y-auto pb-20 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isFetching ? 'bg-amber-500 animate-spin' : 'bg-rose-500'} `} />
                  <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em]">
                    {urlType ? 'Category View' : 'Pending Allocation'}
                  </span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{t.title}</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-3 ml-1">{t.subtitle}</p>
              </div>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1-2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.searchPlaceholder} 
                  className="w-full bg-white border border-slate-200 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:border-rose-400 text-slate-700 shadow-sm"
                />
              </div>
            </div>

            {/* Content Table */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden relative">
              {(isLoading) && (
                <div className="py-20 flex flex-col items-center justify-center">
                  <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fetching Records...</p>
                </div>
              )}

              {!isLoading && displayData.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                  <Inbox size={48} className="mb-4 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest">No complaints found</p>
                </div>
              )}

              {!isLoading && displayData.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                      <tr>
                        <th className="px-8 py-6">Tracking ID</th>
                        <th className="px-8 py-6">Citizen Details</th>
                        <th className="px-8 py-6">Category</th>
                        <th className="px-8 py-6">Date Submitted</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {displayData.map((item) => (
                        <ComplaintRowNotAssigned key={item._id || item.id} complaint={item} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                  Showing {displayData.length} records
                </span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-3 bg-white border border-slate-200 rounded-xl disabled:opacity-30"
                  >
                    <ChevronLeft size={18}/>
                  </button>
                  <button 
                    onClick={() => setPage(p => p + 1)}
                    disabled={displayData.length < 10}
                    className="p-3 bg-white border border-slate-200 rounded-xl disabled:opacity-30"
                  >
                    <ChevronRight size={18}/>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default NotAssignedComplaintListPage;
