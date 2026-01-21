import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, User as UserIcon, Phone as PhoneIcon, Mail, Building, Loader2, Calendar } from 'lucide-react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../Redux/profileApi';

import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';
import ProfileHeader from '../../Component/AuthenticateComponent/WorkProfileComponent/ProfileHeader';
import ProfileField from '../../Component/AuthenticateComponent/WorkProfileComponent/ProfileField';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';

const WorkProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // 1. Fetch Data
  const { data: user, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // 2. Local State for editing
  const [tempUser, setTempUser] = useState({ name: "", phone: "" });

  // 3. Sample Data Fallback (Prevents empty UI)
  const sampleUser = {
    name: "Dr. Elias Zewde",
    phone: "+251 911 223344",
    email: "elias.z@epa.gov.et",
    role: "Senior Officer",
    department: "Environmental Quality",
    createdAt: new Date().toISOString()
  };


const activeUser = user || sampleUser;

useEffect(() => {
 
  if (user) {
 
    if (user.name !== tempUser.name || user.phone !== tempUser.phone) {
      setTempUser({ 
        name: user.name || "", 
        phone: user.phone || "" 
      });
    }
  } 
  else if (!tempUser.name && !tempUser.phone) {
    setTempUser({ 
      name: sampleUser.name, 
      phone: sampleUser.phone 
    });
  }
}, [user]); 

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile(tempUser).unwrap();
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err?.data?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setTempUser({ name: activeUser.name, phone: activeUser.phone });
    setIsEditing(false);
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Decrypting Profile...</span>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="all" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 flex mt-10 flex-col items-center justify-center py-20 px-4 md:px-6">
          <div className="w-full max-w-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden">
            
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            
            <div className="flex justify-end mb-10 md:absolute md:top-12 md:right-12 md:mb-0 z-20">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="group flex items-center gap-3 px-6 py-4 bg-blue-600 rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                >
                  <Edit3 size={16} className="group-hover:rotate-12 transition-transform" /> 
                  Edit Profile
                </button>
              ) : (
                <button 
                  onClick={handleCancel}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all active:scale-95"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="relative z-10">
              <ProfileHeader name={activeUser.name} role={activeUser.role} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <ProfileField 
                  label="Full Name" 
                  value={tempUser.name} 
                  icon={UserIcon} 
                  isEditing={isEditing} 
                  onChange={(val) => setTempUser({...tempUser, name: val})} 
                />
                <ProfileField 
                  label="Phone Number" 
                  value={tempUser.phone} 
                  icon={PhoneIcon} 
                  isEditing={isEditing} 
                  onChange={(val) => setTempUser({...tempUser, phone: val})} 
                />
                <ProfileField 
                  label="Email Address" 
                  value={activeUser.email} 
                  icon={Mail} 
                  isEditing={false} 
                />
                <ProfileField 
                  label="Department" 
                  value={activeUser.department} 
                  icon={Building} 
                  isEditing={false} 
                />
              </div>

              {isEditing && (
                <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <button 
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#080d14] font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-500/10 active:scale-95"
                  >
                    {isUpdating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    <span className="uppercase tracking-[0.3em] text-sm">
                      {isUpdating ? "Syncing..." : "Commit Changes"}
                    </span>
                  </button>
                </div>
              )}

              {!isEditing && (
                <div className="mt-12 flex flex-col items-center gap-2">
                  <div className="h-px w-12 bg-white/10" />
                  <p className="text-center text-[10px] text-slate-600 uppercase font-black tracking-[0.4em] flex items-center gap-2">
                    <Calendar size={12} />
                    Verified Member Since {new Date(activeUser.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default WorkProfile;