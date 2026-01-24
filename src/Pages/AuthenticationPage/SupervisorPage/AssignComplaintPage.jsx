import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, ArrowRight, Calendar as CalendarIcon, 
  ChevronLeft, ChevronRight, UserCheck, Loader2 
} from 'lucide-react';
import * as EthioConverter from 'ethiopian-calendar-date-converter';

// Existing project components
import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AssignSelector from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/AssignSelector';
import PriorityToggle from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/PriorityToggle';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { useGetOfficersQuery, useAssignComplaintMutation } from '../../../Redux/supervisorApi';

/**
 * TRUE ETHIOPIAN CALENDAR PICKER COMPONENT
 */
const RealEthioPicker = ({ label, value, onChange, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const monthsAMH = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
  const monthsEN = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene", "Hamle", "Nehasse", "Pagume"];
  const months = language === "AMH" ? monthsAMH : monthsEN;

  // Internal state for navigating the calendar grid
  const [viewDate, setViewDate] = useState({ month: 1, year: 2018 });

  // Close when clicking outside
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

  // Logic to determine days in month (Pagume is 5 or 6)
  const daysInMonth = viewDate.month === 13 ? 6 : 30;

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition-all"
      >
        <span className={value ? "text-slate-800" : "text-slate-400"}>
          {value || (language === "AMH" ? "ቀን ይምረጡ" : "Select Date")}
        </span>
        <CalendarIcon size={18} className="text-emerald-600" />
      </div>

      {isOpen && (
        <div className="absolute z-[100] mt-2 w-72 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-full"><ChevronLeft size={18}/></button>
            <div className="font-bold text-slate-800">{months[viewDate.month - 1]} {viewDate.year}</div>
            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-full"><ChevronRight size={18}/></button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</div>
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const d = i + 1;
              const isSelected = value === `${d}/${viewDate.month}/${viewDate.year}`;
              return (
                <button
                  key={d}
                  onClick={() => selectDay(d)}
                  className={`py-2 text-sm rounded-lg transition-colors ${
                    isSelected ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-50 text-slate-700'
                  }`}
                >
                  {d}
                </button>
              );
            })}
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
  const { data: Data, isLoading: loadingOfficers } = useGetOfficersQuery();
  const [assignComplaint, { isLoading: isDeploying }] = useAssignComplaintMutation();

  const [officer, setOfficer] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');

  const handleDeploy = async () => {
    if (!officer || !endDate) return alert("Please fill required fields");
    try {
      await assignComplaint({
        id, assignedTo: officer, priority,
        timeline: { start: startDate, end: endDate }
      }).unwrap();
      navigate('/SupervisorDashboard');
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar role="supervisor" />
      <div className="flex-1 flex flex-col">
        <AuthHeader True={true} />
        <main className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center bg-slate-50/50">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-[3rem] p-10 shadow-xl relative">
            <header className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                {Language === "AMH" ? "የምደባ ዝግጅት" : "Assignment Setup"}
              </h1>
              <p className="text-emerald-600 font-mono text-lg mt-2 font-bold">#{id || "CASE-PENDING"}</p>
            </header>

            <div className="mb-8">
              <AssignSelector 
                label={Language === "AMH" ? "ባለሙያ ይምረጡ" : "Select Officer"}
                value={officer} 
                options={Data?.map(o => o.fullName) || []} 
                onChange={setOfficer}
              />
            </div>

            <div className="my-8">
              <PriorityToggle selected={priority} onSelect={setPriority} />
            </div>

            <div className="mb-12 p-8 bg-slate-50 border border-slate-100 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-6">
              <RealEthioPicker 
                label={Language === "AMH" ? "መጀመሪያ ቀን" : "Start Date"}
                value={startDate}
                onChange={setStartDate}
                language={Language}
              />
              <RealEthioPicker 
                label={Language === "AMH" ? "የማብቂያ ቀን" : "End Date"}
                value={endDate}
                onChange={setEndDate}
                language={Language}
              />
            </div>

            <button 
              onClick={handleDeploy}
              disabled={isDeploying || !officer || !endDate}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              {isDeploying ? <Loader2 className="animate-spin" /> : "DEPLOY OFFICER"}
            </button>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default AssignComplaintPage;