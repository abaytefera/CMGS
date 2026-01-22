import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Globe, Save, Send, Loader2 } from 'lucide-react';
import { useGetSystemSettingsQuery, useUpdateSettingsMutation } from '../../../Redux/settingsApi';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import SettingCard from '../../../Component/AuthenticateComponent/SystemSettingsComponent/SettingCard';
import { ToggleRow, SettingInput } from '../../../Component/AuthenticateComponent/SystemSettingsComponent/ToggleRow';

const SystemSettings = () => {
  // 1. Fetch Data from Node.js
  const { data: serverSettings, isLoading } = useGetSystemSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();

  const [form, setForm] = useState({});


  useEffect(() => {
    if (serverSettings) setForm(serverSettings);
  }, [serverSettings]);

  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleGlobalSave = async () => {
    try {
      await updateSettings(form).unwrap();
      alert("System configuration updated successfully!");
    } catch (err) {
      alert("Failed to save settings: " + err.data?.message);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="admin" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
                System <span className="text-emerald-500">Settings</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
                Platform Configuration & Global Rules
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* SMS GATEWAY */}
              <SettingCard title="SMS Gateway" icon={MessageSquare} colorClass="border-blue-500/20">
                <ToggleRow 
                  label="Enable SMS Notifications" 
                  active={form.smsEnabled || false}
                  onClick={() => handleInputChange('smsEnabled', !form.smsEnabled)}
                />
                <SettingInput 
                  label="Gateway API Key" 
                  value={form.smsApiKey || ''}
                  onChange={(e) => handleInputChange('smsApiKey', e.target.value)}
                  type="password" 
                />
                <button className="w-full py-3 bg-blue-500/10 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all">
                  <Send size={14} /> Send Test SMS
                </button>
              </SettingCard>

              {/* EMAIL INTEGRATION */}
              <SettingCard title="Email Integration" icon={Mail} colorClass="border-purple-500/20">
                <SettingInput 
                  label="SMTP Host" 
                  value={form.smtpHost || ''} 
                  onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SettingInput 
                    label="Port" 
                    value={form.smtpPort || ''} 
                    onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                  />
                  <SettingInput 
                    label="Encryption" 
                    value={form.encryption || ''}
                    onChange={(e) => handleInputChange('encryption', e.target.value)}
                  />
                </div>
              </SettingCard>

              {/* LANGUAGE & REGION */}
              <SettingCard title="Language & Region" icon={Globe} colorClass="border-emerald-500/20">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Interface Language</label>
                  <select 
                    value={form.language || 'English (US)'}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full bg-[#080d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  >
                    <option>English (US)</option>
                    <option>Amharic (Ethiopia)</option>
                  </select>
                </div>
                <ToggleRow 
                   label="Auto-detect Timezone" 
                   active={form.autoTimezone || false}
                   onClick={() => handleInputChange('autoTimezone', !form.autoTimezone)}
                />
              </SettingCard>

              {/* SECURITY OPTIONS */}
              <SettingCard title="Security Options" icon={Globe} colorClass="border-rose-500/20">
                <ToggleRow 
                   label="Two-Factor Authentication" 
                   active={form.twoFactor || false}
                   onClick={() => handleInputChange('twoFactor', !form.twoFactor)}
                />
                <ToggleRow 
                   label="Maintenance Mode" 
                   active={form.maintenanceMode || false}
                   onClick={() => handleInputChange('maintenanceMode', !form.maintenanceMode)}
                />
              </SettingCard>

            </div>

            {/* GLOBAL SAVE */}
            <button 
              onClick={handleGlobalSave}
              disabled={isSaving}
              className="w-full max-w-md mx-auto py-5 bg-emerald-500 rounded-[2rem] text-[#080d14] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {isSaving ? "Saving..." : "Save All Changes"}
            </button>

          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemSettings;