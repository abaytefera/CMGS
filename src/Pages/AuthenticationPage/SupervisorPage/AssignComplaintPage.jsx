import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { 
  UserCheck, ShieldAlert, ArrowRight, Calendar, 
  AlertCircle, Loader2, CheckCircle2 
} from 'lucide-react';

// RTK Query Hooks
import { useGetOfficersQuery, useAssignComplaintMutation } from '../../../Redux/supervisorApi';

import Sidebar from "../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar";
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import AssignSelector from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/AssignSelector';
import PriorityToggle from '../../../Component/AuthenticateComponent/SupervisorComponent/AssignSelectorComponent/PriorityToggle';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const AssignComplaintPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { Language } = useSelector((state) => state.webState || {});

  // 1. RTK Query hooks
  const { data: Data, isLoading: loadingOfficers } = useGetOfficersQuery();
  const [assignComplaint, { isLoading: isDeploying }] = useAssignComplaintMutation();

  // 2. REALISTIC SAMPLE DATA
  const Dataofficer = [
    { _id: "off-01", fullName: "Dr. Abraham Tadesse", specialization: "Environmental Law" },
    { _id: "off-02", fullName: "Meskerem Assefa", specialization: "Chemical Waste" },
    { _id: "off-03", fullName: "Yonas Biru", specialization: "Water Quality" }
  ];

  // 3. MERGE LOGIC
  // Use API Data if it exists and is not empty, otherwise fallback to Dataofficer
  const officerList = (Data && Data.length > 0) ? Data : Dataofficer;

  // Component State
  const [officer, setOfficer] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [endDate, setEndDate] = useState('');

  const t = {
    setup: Language === "AMH" ? "የምደባ ዝግጅት" : "Assignment Setup",
    title: Language === "AMH" ? "የስራ ሂደት የጊዜ ሰሌዳ" : "Workflow Timeline",
    selectOfficer: Language === "AMH" ? "ባለሙያ ይምረጡ" : "Select Officer",
    timelineTitle: Language === "AMH" ? "የምርመራ የጊዜ ሰሌዳ ያስቀምጡ" : "Set Investigation Timeline",
    startDate: Language === "AMH" ? "መጀመሪያ ቀን" : "Start Date",
    endDate: Language === "AMH" ? "የማብቂያ ቀን (የጊዜ ገደብ)" : "Deadline (End Date)",
    warning: Language === "AMH" ? "ምደባው እስከ " : "Assignment must be resolved by ",
    warningSuffix: Language === "AMH" ? " መጠናቀቅ አለበት" : "",
    deployBtn: Language === "AMH" ? "ባለሙያውን ይመድቡ" : "Deploy Officer",
    loading: Language === "AMH" ? "በመመደብ ላይ..." : "Deploying...",
  };

  // Convert to simple array for the selector component
  const officerOptions = officerList.map(o => o.fullName || o.name || "Unknown Officer");

  const handleDeploy = async () => {
    if (!officer || !endDate) return alert("Please fill required fields");

    try {
      await assignComplaint({
        id: id, 
        assignedTo: officer,
        priority: priority,
        timeline: { start: startDate, end: endDate }
      }).unwrap();
      
      navigate('/SupervisorDashboard');
    } catch (err) {
      console.error("Assignment failed", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14]">
      <Sidebar role="supervisor" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 pb-20 px-6 lg:px-10 flex items-center justify-center bg-[#080d14]">
          <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
            
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="text-emerald-500" size={20} />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">{t.setup}</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">{t.title}</h1>
              <p className="text-emerald-500 font-mono text-lg mt-1">#{id || "CASE-PENDING"}</p>
            </header>

            {/* Officer Selection */}
            <div className="mb-8">
              <AssignSelector 
                label={t.selectOfficer}
                value={officer} 
                options={officerOptions} 
                onChange={setOfficer}
                icon={loadingOfficers ? Loader2 : UserCheck}
              />
            </div>

            {/* Priority Selection */}
            <div className="mb-10">
              <PriorityToggle selected={priority} onSelect={setPriority} />
            </div>

            {/* Timeline Section */}
            <div className="mb-12 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-emerald-500" size={18} />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">{t.timelineTitle}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.startDate}</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/50 transition-all [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.endDate}</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-rose-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {endDate && (
                <div className="mt-4 flex items-center gap-2 text-rose-400 px-2 animate-pulse">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-tight">{t.warning} {endDate} {t.warningSuffix}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button 
              onClick={handleDeploy}
              disabled={isDeploying || !officer || !endDate}
              className="group relative w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-[#080d14] font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] active:scale-[0.98]"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="uppercase tracking-widest text-sm">{t.loading}</span>
                </>
              ) : (
                <>
                  <span className="uppercase tracking-widest text-sm">{t.deployBtn}</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                </>
              )}
            </button>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default AssignComplaintPage;