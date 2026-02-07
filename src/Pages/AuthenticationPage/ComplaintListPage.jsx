import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Search, ListFilter, CheckCircle, XCircle, AlertTriangle, PlayCircle, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/auth';
import { useGetComplaintsbyCatagoryQuery } from '../../Redux/complaintApi';
import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import ComplaintRow from '../../Component/AuthenticateComponent/ComplaintListPageComponent/ComplaintRow';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';

const ComplaintListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Language } = useSelector((state) => state.webState);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === "ADMIN";
  const isOfficer = user?.role === "OFFICER";

  const { role, type } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("TOTAL");

  // RTK Query
  const { data: TotalCompile, isLoading, isFetching, error } = useGetComplaintsbyCatagoryQuery({
    role: role,
    type: type
  }, { skip: !role || !type });

  // --- 401 REDIRECT LOGIC ---
  useEffect(() => {
    if (error && error.status === 401) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login', { replace: true });
    }
  }, [error, navigate, dispatch]);

  // Dynamic labels for filterType
  const filterLabels = {
    TOTAL: Language === "AMH" ? "ሁሉም" : "Total",
    ACTIVE: Language === "AMH" ? "ንቁ" : "Active",
    IN_PROGRESS: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    OVERDUE: Language === "AMH" ? "የተዘግደ" : "Overdue",
    RESOLVED: Language === "AMH" ? "የተፈታ" : "Resolved",
    REJECTED: Language === "AMH" ? "የተከለከለ" : "Rejected",
  };

  // Filtered complaints
  const filteredComplaints = useMemo(() => {
    if (!Array.isArray(TotalCompile)) return [];

    let list = [...TotalCompile].filter(item => item && typeof item === 'object');

    // Filter based on role and filterType
    if (filterType === "TOTAL") {
      // TOTAL = all complaints
      list = list;
    } else if (filterType === "ACTIVE") {
      // ACTIVE = not resolved/rejected/closed
      list = list.filter(item => !['RESOLVED', 'REJECTED', 'CLOSED'].includes(item?.status?.toUpperCase()));
    } else if (filterType === "IN_PROGRESS") {
      list = list.filter(item => item?.status?.toUpperCase() === "IN_PROGRESS");
    } else if (filterType === "RESOLVED") {
      list = list.filter(item => item?.status?.toUpperCase() === "RESOLVED");
    } else if (filterType === "REJECTED") {
      list = list.filter(item => item?.status?.toUpperCase() === "REJECTED");
    } else if (filterType === "OVERDUE") {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      list = list.filter(item => {
        const status = item?.status?.toUpperCase() || "";
        const createdDate = item?.createdAt ? new Date(item.createdAt) : null;
        return (
          !['RESOLVED', 'REJECTED', 'CLOSED'].includes(status) &&
          createdDate && createdDate < threeDaysAgo
        );
      });
    }

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      list = list.filter(item =>
        item?.ref_number?.toLowerCase().includes(lowerSearch) ||
        item?.citizen_name?.toLowerCase().includes(lowerSearch)
      );
    }

    return list;
  }, [TotalCompile, filterType, searchTerm]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Sidebar role={user?.role?.toLowerCase() || "all"} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />

        <main className="flex-grow pt-20 px-6 lg:px-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">

            {/* ===== PAGE HEADER ===== */}
            <header className="text-left mb-10">
              <h1 className="text-2xl relative top-10 font-black capitalize">
                Complaints <span className="text-emerald-600">{filterLabels[filterType] || filterType}</span>
              </h1>
            </header>

            {/* ===== FILTER BUTTONS & SEARCH ===== */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["TOTAL", "ACTIVE", "IN_PROGRESS", "OVERDUE", "RESOLVED", "REJECTED"].map((key) => (
                    <button
                      key={key}
                      onClick={() => setFilterType(key)}
                      className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                        filterType === key
                          ? key === "IN_PROGRESS" ? "bg-amber-500 text-white shadow-lg"
                          : key === "OVERDUE" ? "bg-rose-500 text-white shadow-lg"
                          : key === "RESOLVED" ? "bg-emerald-600 text-white shadow-lg"
                          : key === "REJECTED" ? "bg-slate-600 text-white shadow-lg"
                          : "bg-emerald-600 text-white shadow-lg"
                          : "bg-white text-slate-400 border-slate-200"
                      }`}
                    >
                      {key === "IN_PROGRESS" && <PlayCircle size={14} />}
                      {key === "OVERDUE" && <AlertTriangle size={14} />}
                      {key === "RESOLVED" && <CheckCircle size={14} />}
                      {key === "REJECTED" && <XCircle size={14} />}
                      {filterLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={Language === "AMH" ? "መከታተያ መለያ ፈልግ..." : "Search tracking ID..."}
                  className="w-full bg-white border border-slate-200 py-3.5 pl-12 pr-4 rounded-2xl outline-none text-sm"
                />
              </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden mb-10">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <ListFilter className="text-emerald-600" size={18} />
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest italic">
                  {Language === "AMH" ? "በመሰረት እየተደረገ" : "Showing"}: {filterLabels[filterType] || filterType} ({filteredComplaints.length})
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5 border-b border-slate-100">Tracking ID</th>
                      <th className="px-8 py-5 border-b border-slate-100">Citizen</th>
                      <th className="px-8 py-5 border-b border-slate-100">Status</th>
                      <th className="px-8 py-5 border-b border-slate-100 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoading || isFetching ? (
                      <tr>
                        <td colSpan="4" className="px-8 py-24 text-center">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                            <p className="font-bold text-slate-400 animate-pulse uppercase tracking-[0.2em] text-[10px]">
                              {Language === "AMH" ? "በመጫን ላይ..." : "Loading Records..."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredComplaints.length > 0 ? (
                      filteredComplaints.map((item) => (
                        <ComplaintRow key={item?.id || item?._id} complaint={item} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-20 text-center text-slate-400 uppercase font-black text-[10px] tracking-widest">
                          {Language === "AMH" ? "መዝግቦች አልተገኙም" : "No Records Found"}
                        </td>
                      </tr>
                    )}
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

export default ComplaintListPage;