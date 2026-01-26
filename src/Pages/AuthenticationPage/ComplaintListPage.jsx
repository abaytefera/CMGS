import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from "react-redux";
import { Search, Download, ListFilter, CheckCircle, XCircle, Clock, AlertTriangle, PlayCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useGetComplaintsbyCatagoryQuery } from '../../Redux/complaintApi';
import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import ComplaintRow from '../../Component/AuthenticateComponent/ComplaintListPageComponent/ComplaintRow';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';

const ComplaintListPage = () => {
  const { Language } = useSelector((state) => state.webState);
  const { user } = useSelector((state) => state.auth);
  
  // Role Helpers
  const isAdmin = user?.role === "ADMIN";
  const isSupervisor = user?.role === "SUPERVISOR";
  const isOfficer = user?.role === "OFFICER";

  const { role, type } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  console.log( role)
    console.log(type)
  
  
  // Filter state
  const [filterType, setFilterType] = useState("TOTAL");

  const { data: TotalCompile, isLoading, isFetching } = useGetComplaintsbyCatagoryQuery({ 
    role: role, 
    type: type 
  });
  useEffect(()=>{

console.log(TotalCompile);
  },[TotalCompile])

  const filteredComplaints = useMemo(() => {
    if (!TotalCompile) return [];
    
    let list = [...TotalCompile];

    // --- OFFICER SPECIFIC FILTER LOGIC ---
    if (isOfficer) {
      switch (filterType) {
        case "IN_PROGRESS":
          list = list.filter(item => item.status?.toUpperCase() === "IN_PROGRESS");
          break;
        case "RESOLVED":
          list = list.filter(item => item.status?.toUpperCase() === "RESOLVED");
          break;
        case "REJECTED":
          list = list.filter(item => item.status?.toUpperCase() === "REJECTED");
          break;
        case "OVERDUE":
          // Logic: Status isn't closed/resolved AND it's older than 3 days (example logic)
          const threeDaysAgo = new Date();
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
          list = list.filter(item => 
            !['RESOLVED', 'REJECTED', 'CLOSED'].includes(item.status?.toUpperCase()) &&
            new Date(item.createdAt) < threeDaysAgo
          );
          break;
        default: // TOTAL
          break;
      }
    } 
    // Admin & Supervisor logic remains as previously discussed
    else if (isAdmin && filterType === "ACTIVE") {
      list = list.filter(item => !['RESOLVED', 'REJECTED', 'CLOSED'].includes(item.status?.toUpperCase()));
    }

    // Apply Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      list = list.filter(item => 
        item.ref_number?.toLowerCase().includes(lowerSearch) || 
        item.citizen_name?.toLowerCase().includes(lowerSearch)
      );
    }

    return list;
  }, [TotalCompile, filterType, searchTerm, isOfficer, isAdmin]);

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Sidebar role={user?.role?.toLowerCase() || "all"} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AuthHeader True={true} />
        
        <main className="flex-grow pt-32 px-6 lg:px-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  {type} {Language === "AMH" ? "መዝገቦች" : "Records"}
                </h1>
                
                {/* DYNAMIC FILTER BUTTONS FOR OFFICER */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <button 
                    onClick={() => setFilterType("TOTAL")}
                    className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      filterType === "TOTAL" ? "bg-green-900 text-white shadow-lg" : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    Total
                  </button>

                  {isOfficer && (
                    <>
                      <button 
                        onClick={() => setFilterType("IN_PROGRESS")}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                          filterType === "IN_PROGRESS" ? "bg-amber-500 text-white shadow-lg" : "bg-white text-slate-400 border-slate-200"
                        }`}
                      >
                        <PlayCircle size={14} /> In Progress
                      </button>

                      <button 
                        onClick={() => setFilterType("OVERDUE")}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                          filterType === "OVERDUE" ? "bg-rose-500 text-white shadow-lg" : "bg-white text-slate-400 border-slate-200"
                        }`}
                      >
                        <AlertTriangle size={14} /> Overdue
                      </button>

                      <button 
                        onClick={() => setFilterType("RESOLVED")}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                          filterType === "RESOLVED" ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-400 border-slate-200"
                        }`}
                      >
                        <CheckCircle size={14} /> Resolved
                      </button>

                      <button 
                        onClick={() => setFilterType("REJECTED")}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                          filterType === "REJECTED" ? "bg-slate-600 text-white shadow-lg" : "bg-white text-slate-400 border-slate-200"
                        }`}
                      >
                        <XCircle size={14} /> Rejected
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tracking ID..." 
                  className="w-full bg-white border border-slate-200 py-3.5 pl-12 pr-4 rounded-2xl outline-none text-sm"
                />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                 <ListFilter className="text-emerald-600" size={18} />
                 <span className="text-xs font-black text-slate-800 uppercase tracking-widest italic">
                    Showing: {filterType.replace('_', ' ')}
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
                    {filteredComplaints.map((item) => (
                      <ComplaintRow key={item.id || item._id} complaint={item} />
                    ))}
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

export default ComplaintListPage;