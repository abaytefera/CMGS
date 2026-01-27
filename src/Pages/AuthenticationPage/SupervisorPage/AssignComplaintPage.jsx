import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
} from 'lucide-react';

// 1. Notifications Host and Logic
import toast, { Toaster } from "react-hot-toast";

// Project components
import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AssignSelector from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/AssignSelector';
import PriorityToggle from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/PriorityToggle';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

// RTK Query Hooks (for fetching dropdown data)
import { useGetProfileQuery } from '../../../Redux/profileApi';
import { useGetUsersQuery } from '../../../Redux/userApi';

// Environment variable for backend URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Custom Ethiopian Date Picker Component
 */
const RealEthioPicker = ({ label, value, onChange, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const monthsAMH = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
  const monthsEN = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"];
  const months = language === "AMH" ? monthsAMH : monthsEN;
  const [viewDate, setViewDate] = useState({ month: 1, year: 2018 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectDay = (day) => {
    onChange(`${day}/${viewDate.month}/${viewDate.year}`);
    setIsOpen(false);
  };

  const changeMonth = (dir) => {
    let nextM = viewDate.month + dir;
    let nextY = viewDate.year;
    if (nextM > 13) { nextM = 1; nextY++; }
    if (nextM < 1) { nextM = 13; nextY--; }
    setViewDate({ month: nextM, year: nextY });
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full bg-white border border-slate-200 rounded-2xl px-4 py-4 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition-all"
      >
        <span className={value ? "text-slate-800 font-bold text-sm" : "text-slate-400 text-sm"}>
          {value || (language === "AMH" ? "ቀን ይምረጡ" : "Select Date")}
        </span>
        <CalendarIcon size={18} className="text-emerald-600" />
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 w-72 bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={18}/></button>
            <div className="font-black text-slate-800 uppercase text-xs tracking-tighter">{months[viewDate.month - 1]} {viewDate.year}</div>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight size={18}/></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-[9px] font-black text-slate-300 py-1">{d}</div>
            ))}
            {[...Array(viewDate.month === 13 ? 6 : 30)].map((_, i) => (
              <button
                key={i}
                onClick={() => selectDay(i + 1)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  value === `${i+1}/${viewDate.month}/${viewDate.year}` ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 text-slate-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AssignComplaintPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { Language } = useSelector((state) => state.webState || {});

  // Fetching context data for the UI
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: allUsers, isLoading: loadingUsers } = useGetUsersQuery();
  
  // Local state management
  const [isDeploying, setIsDeploying] = useState(false);
  const [officerId, setOfficerId] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');

  // Filter officers based on department
  const filteredOfficers = useMemo(() => {
    if (!allUsers || !profile) return [];
    return allUsers
      .filter(user => user.role === "officer" && user.departmentId === profile.departmentId)
      .map(user => ({ label: user.full_name || user.username, value: user.id }));
  }, [allUsers, profile]);

  /**
   * Main Submission Handler using Fetch and AuthToken
   */
  const handleDeploy = async () => {
    // Basic validation
    if (!officerId || !endDate) {
      toast.error(Language === "AMH" ? "እባክዎ ባለሙያ እና ቀን ይምረጡ" : "Required: Officer and End Date");
      return;
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      toast.error(Language === "AMH" ? "እባክዎ መጀመሪያ ይግቡ" : "Unauthorized: Please login first.");
      return;
    }

    setIsDeploying(true);
    const toastId = toast.loading(Language === "AMH" ? 'በመመደብ ላይ...' : 'Processing assignment...');

    try {
      const response = await fetch(`${API_URL}/api/workflow/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          complaintId: id,
          officerId: Number(officerId),
          priority,
          timeline: { start: startDate, end: endDate }
        }),
      });

      // Handle cases where server returns HTML (like a 404 page) instead of JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") === -1) {
        throw new Error("SERVER_NOT_FOUND");
      }

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) throw new Error("EXPIRED_SESSION");
        throw new Error(data.message || 'Operation failed');
      }

      toast.success(Language === "AMH" ? 'ምደባው ተሳክቷል!' : 'Assigned successfully!', { id: toastId });
      
      // Navigate back after a short delay
      setTimeout(() => navigate('/SupervisorDashboard'), 1500);

    } catch (err) {
      console.error("Assignment Error:", err);
      let errorMsg = Language === "AMH" ? 'ምደባው አልተሳካም!' : 'Failed to assign complaint.';
      
      if (err.message === "SERVER_NOT_FOUND") {
        errorMsg = "Critical Error: Endpoint /api/workflow/assign not found on server.";
      } else if (err.message === "EXPIRED_SESSION") {
        errorMsg = "Session Expired: Please log out and back in.";
      }

      toast.error(errorMsg, { id: toastId });
    } finally {
      setIsDeploying(false);
    }
  };

  const isDataLoading = loadingProfile || loadingUsers;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Toast Host for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Sidebar role="supervisor" />
      
      <div className="flex-1 flex flex-col">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50/30">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm">
            
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                {Language === "AMH" ? "የምደባ ዝግጅት" : "Assignment Setup"}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                <p className="text-emerald-600 font-mono text-lg font-bold">#{id}</p>
                {profile?.Department && (
                  <span className="text-[10px] bg-slate-900 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest">
                    {profile.Department.name}
                  </span>
                )}
              </div>
            </header>

            <div className="space-y-10">
              {/* Officer Selection */}
              <div>
                {isDataLoading ? (
                   <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                     <Loader2 className="animate-spin text-emerald-500" size={18} />
                     <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading...</span>
                   </div>
                ) : (
                  <AssignSelector 
                    label={Language === "AMH" ? "ባለሙያ ይምረጡ" : "Assign to Officer"}
                    value={officerId} 
                    options={filteredOfficers} 
                    onChange={setOfficerId}
                  />
                )}
              </div>

              {/* Priority Selection */}
              <PriorityToggle selected={priority} onSelect={setPriority} />

              {/* Timeline Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                <RealEthioPicker label="Start Date" value={startDate} onChange={setStartDate} language={Language} />
                <RealEthioPicker label="End Date" value={endDate} onChange={setEndDate} language={Language} />
              </div>

              {/* Action Button */}
              <button 
                onClick={handleDeploy}
                disabled={isDeploying || !officerId || !endDate || isDataLoading}
                className="w-full bg-green-900 hover:bg-emerald-600 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-20 uppercase tracking-[0.2em] text-xs shadow-lg shadow-green-900/10"
              >
                {isDeploying ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  Language === "AMH" ? "መድብ" : "Confirm Assignment"
                )}
              </button>
            </div>
          </div>
        </main>
        
        
      </div>
    </div>
  );
};

export default AssignComplaintPage;