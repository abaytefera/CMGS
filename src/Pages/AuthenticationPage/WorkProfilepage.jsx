import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Save, X, User as UserIcon, Phone as PhoneIcon, Mail, Building, Loader2, Calendar, ShieldCheck, BadgeCheck, Camera } from 'lucide-react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../Redux/profileApi';

import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';
import ProfileField from '../../Component/AuthenticateComponent/WorkProfileComponent/ProfileField';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';

const WorkProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  
  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [tempUser, setTempUser] = useState({ name: "", phone: "" });

  

useEffect(()=>{


console.log(user);

},[user])

  useEffect(() => {
    if (user) {
      setTempUser({ name: user.full_name || "", phone: user.phone_name || "" });
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile({ ...tempUser, profileImage }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white text-slate-800 font-sans">
      <Sidebar role="manager" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-8 bg-slate-50/50">
          <div className="w-full max-w-4xl">
            
            {/* White Profile Card */}
            <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden relative">
              
              {/* Header Banner - Emerald Theme */}
              <div className="h-44 bg-gradient-to-r from-emerald-600 to-emerald-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                
                {/* Profile Photo Upload */}
                <div className="absolute -bottom-16 left-12 group cursor-pointer" 
                     onClick={() => fileInputRef.current.click()}>
                  <div className="p-1.5 bg-white rounded-[2.2rem] shadow-xl border border-slate-100">
                    <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 border border-slate-100 overflow-hidden relative">
                      {profileImage ? (
                        <img src={profileImage  } alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={50} strokeWidth={1.5} />
                      )}
                      <div className="absolute inset-0 bg-emerald-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>

                <div className="absolute bottom-4 right-8">
                   <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                     <BadgeCheck size={14} /> Authorized Personnel
                   </span>
                </div>
              </div>

              <div className="pt-24 pb-12 px-8 md:px-12">
                
                {/* Title & Action */}
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                      User <span className="text-emerald-600">Profile</span>
                    </h1>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Data Integrity & Access Control</p>
                  </div>

                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                    >
                      <Edit3 size={16} /> Edit Profile
                    </button>
                  ) : (
                    <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all border border-slate-200">
                      <X size={20} />
                    </button>
                  )}
                </div>

                {/* Highlight Card */}
                <div className="mb-12 p-8 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">{user.full_name}</h2>
                    <p className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mt-1">{user.role} • {user.Department.name}</p>
                  </div>
                  <div className="px-5 py-2 bg-white border border-emerald-100 rounded-xl shadow-sm">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Account Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-black text-emerald-600 uppercase italic">Encrypted & Active</span>
                    </div>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileField label="Full Name" value={user?.full_name} icon={UserIcon} isEditing={isEditing} onChange={(val) => setTempUser({...tempUser, name: val})} />
                  <ProfileField label="Contact Number" value={user?.phone_number} icon={PhoneIcon} isEditing={isEditing} onChange={(val) => setTempUser({...tempUser, phone: val})} />
                  <ProfileField label="Access Email" value={user?.username} icon={Mail} isEditing={false} />
                  <ProfileField label="Departmental Unit" value={user?.Department.namet} icon={Building} isEditing={false} />
                </div>

                {isEditing && (
                  <div className="mt-12">
                    <button 
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-200"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                      Synchronize Changes
                    </button>
                  </div>
                )}

                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-600" />
                    <p className="text-[9px] font-bold text-slate-400 uppercase leading-tight">Security Protocol <br/> Active</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} /> Established {new Date(user?.updtedAt).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <AuthFooter />
      </div>
    </div>
  );
};

export default WorkProfile;