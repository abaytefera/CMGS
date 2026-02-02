import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ ADDED
import { useGetReportsQuery } from '../../../Redux/reportApi';
import {
  FileBarChart,
  ArrowUpRight,
  Loader2,
  Database,
  ShieldCheck,
  FileDown,
} from 'lucide-react';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import ReportFilters from '../../../Component/AuthenticateComponent/ReportsPageComponent/ReportFilters';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/auth';
const API_URL = import.meta.env.VITE_API_URL;

const ReportsPage = () => {
  const navigate = useNavigate(); // ✅ ADDED
const  Dispath=useDispatch()
  const departments = [
    'Environmental Quality',
    'Water Resources',
    'Waste Management',
  ];
  const locations = ['Arada', 'Kirkos', 'Bole', 'Akaki Kality'];

  // Filters
  const [filters, setFilters] = useState({
    period: 'This Month',
    department: '',
    location: '',
  });

  // Download loading state
  const [downloading, setDownloading] = useState(false);

  // Reports query
  const { data, isLoading, isFetching, isError, error } =
    useGetReportsQuery(filters);

  // ✅ ADD 401 ERROR REDIRECT (ONLY ADDITION)
  useEffect(() => {
    if (error?.status === 401) {
                  localStorage.removeItem('authToken');
                     Dispath(logout())
      navigate('/login', { replace: true });
    }
  }, [error, navigate]);

  // Sample fallback
  const sampleData = {
    totalCount: 3,
    data: [
      {
        _id: 'rep-001',
        trackingId: 'EPA-2026-001',
        category: 'Air Quality',
        department: 'Environmental Quality',
        createdAt: '2026-01-15T10:30:00Z',
      },
      {
        _id: 'rep-002',
        trackingId: 'EPA-2026-042',
        category: 'Water Pollution',
        department: 'Water Resources',
        createdAt: '2026-01-18T14:20:00Z',
      },
      {
        _id: 'rep-003',
        trackingId: 'EPA-2026-088',
        category: 'Toxic Waste',
        department: 'Waste Management',
        createdAt: '2026-01-20T09:15:00Z',
      },
    ],
  };

  const activeData =
    data && data?.data?.length > 0 ? data : sampleData;

  const reports = activeData.data;
  const totalCount = activeData.totalCount;

  // 🔽 DOWNLOAD HANDLER (PDF / EXCEL)
  const downloadFile = async (type) => {
    try {
      setDownloading(true);

      const endpoint =
        type === 'pdf'
          ? '/api/reports/pdf'
          : '/api/reports/excel';

      const filename =
        type === 'pdf' ? 'reports.pdf' : 'reports.xlsx';

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // remove if not needed
        },
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('File download failed');
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-900">
      <Sidebar role="manager" />

      <div className="flex-1 flex flex-col">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 bg-slate-50/30">
          <div className="max-w-7xl mx-auto">
            {/* HEADER */}
            <header className="mb-12 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black">
                  Data <span className="text-blue-600 italic">Vault</span>
                </h1>

                <div className="flex gap-2 mt-4">
                  <div
                    className={`px-2 py-0.5 rounded-md border text-[9px] font-black uppercase ${
                      isError
                        ? 'border-rose-200 text-rose-600 bg-rose-50'
                        : 'border-blue-200 text-blue-600 bg-blue-50'
                    }`}
                  >
                    {isError ? 'Offline Archive' : 'Secure Connection'}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block p-4 bg-white border rounded-3xl">
                {isFetching ? (
                  <Loader2 className="animate-spin text-blue-600" />
                ) : (
                  <FileBarChart className="text-blue-600" />
                )}
              </div>
            </header>

            {/* FILTERS */}
            <ReportFilters
              filters={filters}
              setFilters={setFilters}
              departments={departments}
              locations={locations}
            />

            {/* EXPORT BUTTONS */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => downloadFile('pdf')}
                disabled={downloading}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black rounded-2xl flex items-center gap-2"
              >
                <FileDown size={14} />
                {downloading ? 'Preparing PDF...' : 'Download PDF'}
              </button>

              <button
                onClick={() => downloadFile('excel')}
                disabled={downloading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black rounded-2xl flex items-center gap-2"
              >
                <FileDown size={14} />
                {downloading
                  ? 'Preparing Excel...'
                  : 'Download Excel'}
              </button>
            </div>

            {/* TABLE */}
            <div className="bg-white border rounded-[2.5rem] mt-8 overflow-hidden">
              <div className="px-8 py-6 flex justify-between border-b">
                <h3 className="text-[10px] font-black uppercase">
                  Previewing: {filters.period}
                </h3>
                <span className="text-[10px] font-black text-blue-600">
                  {totalCount} Records Found
                </span>
              </div>

              <table className="w-full">
                <thead className="bg-slate-50 text-[9px] uppercase">
                  <tr>
                    <th className="px-8 py-4">Report ID</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Department</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {reports.length ? (
                    reports.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-slate-100"
                      >
                        <td className="px-8 py-5 text-blue-600 font-mono">
                          #{item.trackingId}
                        </td>
                        <td className="px-8 py-5">
                          {item.category}
                        </td>
                        <td className="px-8 py-5">
                          {item.department}
                        </td>
                        <td className="px-8 py-5">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <ArrowUpRight size={16} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-20 text-center">
                        <Database
                          size={32}
                          className="mx-auto text-slate-300 mb-4"
                        />
                        <p className="text-[10px] font-black uppercase text-slate-400">
                          No records found
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default ReportsPage;
