import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../../Redux/auth';
import toast, { Toaster } from 'react-hot-toast';
import {
  FileBarChart,
  ArrowUpRight,
  Loader2,
  Database,
  FileDown,
} from 'lucide-react';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import ReportFilters from '../../../Component/AuthenticateComponent/ReportsPageComponent/ReportFilters';

const API_URL = import.meta.env.VITE_API_URL;

const ReportsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- STATE MANAGEMENT ---
  const [departments, setDepartments] = useState([]);
  const [deptsLoading, setDeptsLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // Replacement states for RTK Query
  const [reportsData, setReportsData] = useState({ data: [], totalCount: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [filters, setFilters] = useState({
    period: 'This Month',
    department: '',
  });

  // --- FETCH DEPARTMENTS ---
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/departments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) throw new Error();
        const result = await response.json();
        setDepartments(result.data || result);
      } catch (err) {
        toast.error("Could not load departments list");
      } finally {
        setDeptsLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // --- FETCH REPORTS (Manual fetch replacement) ---
  const fetchReports = useCallback(async () => {
    setIsFetching(true);
    setFetchError(null);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_URL}/api/reports?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 401) {
        handleAuthError();
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch reports');

      const result = await response.json();
      setReportsData({
        data: result.data || [],
        totalCount: result.totalCount || 0
      });
    } catch (err) {
      setFetchError(err);
      toast.error("Failed to load reports");
    } finally {
      setIsFetching(false);
    }
  }, [filters]);

 
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);


  const handleAuthError = () => {
    toast.error("Session expired. Please login again.");
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const reports = reportsData.data;
  const totalCount = reportsData.totalCount;

  
  const downloadFile = async (type) => {
    const downloadToast = toast.loading(`Generating ${type.toUpperCase()}...`);
    try {
      setDownloading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = type === 'pdf' ? '/api/reports/pdf' : '/api/reports/excel';
      
      const response = await fetch(`${API_URL}${endpoint}?${queryParams}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) throw new Error();

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Report_${filters.period.replace(/\s+/g, '_')}.${type === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success(`${type.toUpperCase()} downloaded successfully`, { id: downloadToast });
    } catch (err) {
      toast.error("Download failed", { id: downloadToast });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Toaster position="top-right" />
      <Sidebar role="manager" />

      <div className="flex-1 flex flex-col">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 bg-slate-50/30">
          <div className="max-w-7xl mx-auto">
            
            {/* HEADER */}
            <header className="mb-12 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black ">
                  Data <span className="text-blue-600">Vault</span>
                </h1>
              </div>

              <div className="hidden lg:block p-4 bg-white border rounded-3xl shadow-sm">
                {isFetching || deptsLoading ? (
                  <Loader2 className="animate-spin text-blue-600" />
                ) : (
                  <FileBarChart className="text-blue-600" />
                )}
              </div>
            </header>

            <ReportFilters
              filters={filters}
              setFilters={setFilters}
              departments={departments}
            />

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => downloadFile('pdf')}
                disabled={downloading || reports.length === 0}
                className="px-8 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black rounded-2xl flex items-center gap-2 transition-all shadow-md"
              >
                <FileDown size={14} /> Export PDF
              </button>

              <button
                onClick={() => downloadFile('excel')}
                disabled={downloading || reports.length === 0}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-2xl flex items-center gap-2 transition-all shadow-md"
              >
                <FileDown size={14} /> Export Excel
              </button>
            </div>

            {/* TABLE PREVIEW */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] mt-8 overflow-hidden relative shadow-sm">
              {isFetching && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
              )}

              <div className="px-8 py-6 flex justify-between border-b border-slate-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Preview: <span className="text-slate-900">{filters.period}</span>
                  {filters.department && <span className="text-blue-600"> / {filters.department}</span>}
                </h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                  {totalCount} Records Found
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[9px] uppercase font-black text-slate-500 tracking-wider">
                    <tr>
                      <th className="px-8 py-5">Report ID</th>
                      <th className="px-8 py-5">Category</th>
                      <th className="px-8 py-5">Department</th>
                      <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.length > 0 ? (
                      reports.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-5 text-blue-600 font-mono font-bold text-xs">
                            #{item.trackingId}
                          </td>
                          <td className="px-8 py-5 text-sm font-medium">{item.category}</td>
                          <td className="px-8 py-5 text-sm">{item.department}</td>
                          <td className="px-8 py-5 text-right">
                            <ArrowUpRight size={16} className="inline text-slate-300" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-24 text-center">
                          <Database size={40} className="mx-auto text-slate-200 mb-4" />
                          <p className="text-[10px] font-black uppercase text-slate-400">Archive Empty</p>
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

export default ReportsPage;