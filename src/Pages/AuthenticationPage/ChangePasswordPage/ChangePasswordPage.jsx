import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { useChangePasswordMutation } from '../../../Redux/authApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import PasswordField from '../../../Component/AuthenticateComponent/ChangePasswordPageComponent/PasswordField';
import StrengthMeter from '../../../Component/AuthenticateComponent/ChangePasswordPageComponent/StrengthMeter';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

const ChangePasswordPage = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [strength, setStrength] = useState(0);

  // RTK Query Mutation
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  // Password Strength Logic
  useEffect(() => {
    let s = 0;
    if (newPass.length > 7) s++;
    if (/[A-Z]/.test(newPass) && /[a-z]/.test(newPass)) s++;
    if (/[0-9]/.test(newPass) || /[^A-Za-z0-9]/.test(newPass)) s++;
    setStrength(newPass.length === 0 ? 0 : s);
  }, [newPass]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (newPass !== confirmPass) return alert("New passwords do not match!");
    if (strength < 2) return alert("Please use a stronger password.");

    try {
      // Trigger Node.js API call
      await changePassword({ currentPass, newPass }).unwrap();
      
      alert("Security updated successfully!");
      // Clear fields on success
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      // Handle Node.js errors (e.g., 401 Unauthorized for wrong current password)
      alert(err?.data?.message || "Failed to update password. Please try again.");
    }
  };
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="all" url="/settings" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 min-h-screen flex items-center justify-center mb-60 pt-20 px-6">
          <div className="w-full max-w-lg bg-white/5 mt-20 min-h-[600px] backdrop-blur-3xl border border-white/10 px-10 py-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 border border-blue-500/20">
                  {isLoading ? <Loader2 size={32} className="animate-spin" /> : <ShieldCheck size={32} />}
                </div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Security Update</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Update your portal access credentials</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <PasswordField 
                  label="Current Password" 
                  value={currentPass} 
                  onChange={setCurrentPass} 
                  placeholder="••••••••" 
                  disabled={isLoading}
                />
                
                <div className="pt-4 border-t border-white/5">
                  <PasswordField 
                    label="New Secure Password" 
                    value={newPass} 
                    onChange={setNewPass} 
                    placeholder="Min. 8 characters" 
                    disabled={isLoading}
                  />
                  <StrengthMeter strength={strength} />
                </div>

                <PasswordField 
                  label="Confirm New Password" 
                  value={confirmPass} 
                  onChange={setConfirmPass} 
                  placeholder="Repeat new password" 
                  disabled={isLoading}
                />

                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-500/80 uppercase tracking-widest">Two-Factor Authentication is Active</span>
                  </div>

                  <button 
                    type="submit"
                    disabled={isLoading || !currentPass || !newPass}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_15px_30px_rgba(37,99,235,0.2)] active:scale-95"
                  >
                    {isLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <RefreshCcw size={20} />
                    )}
                    <span className="uppercase tracking-[0.2em] text-sm">
                      {isLoading ? "Processing..." : "Update Password"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default ChangePasswordPage;