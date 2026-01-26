import React, { useState, useEffect, useRef } from 'react';
import { 
  Edit3, Save, X, User as UserIcon, Phone as PhoneIcon, 
  Mail, Building, Loader2, Calendar, ShieldCheck, 
  BadgeCheck, Camera, CheckCircle2 
} from 'lucide-react';
// 1. Import Toaster and toast
import toast, { Toaster } from 'react-hot-toast';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../Redux/profileApi';

import Sidebar from '../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../Component/AuthenticateComponent/AuthHeader';
import ProfileField from '../../Component/AuthenticateComponent/WorkProfileComponent/ProfileField';
import AuthFooter from '../../Component/AuthenticateComponent/AuthFooter';
import { useNavigate } from 'react-router-dom';

const WorkProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [tempUser, setTempUser] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (user) {
      setTempUser({ 
        name: user.full_name || "", 
        phone: user.phone_number || "" 
      });
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Image uploaded to draft");
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Updated HandleUpdate with Toast Feedback
  const handleUpdate = async () => {
    // Create the promise for the update
    const updatePromise = updateProfile({ 
      full_name: tempUser.name, 
      phone_number: tempUser.phone, 
      profileImage 
    }).unwrap();

    // Show toast feedback for the process
    toast.promise(updatePromise, {
      loading: 'Synchronizing profile with server...',
      success: () => {
        setIsEditing(false);
        return 'Profile updated successfully!';
      },
      error: (err) => `Update failed: ${err.data?.message || 'Server Error'}`,
    }, {
      style: {
        borderRadius: '15px',
        background: '#333',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
      },
      success: {
        duration: 4000,
        iconTheme: { primary: '#10b981', secondary: '#fff' },
      },
    });
  };

  if (isLoading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-600" size={40} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white text-slate-800 font-sans">
      {/* 3. Add Toaster component at the top level */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <Sidebar role="manager" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-8 bg-slate-50/50">
          <div className="w-full max-w-4xl">
            <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden relative">
              
              {/* Header Banner */}
              <div className="h-44 bg-gradient-to-r from-emerald-600 to-emerald-400 relative">
                <div className="absolute -bottom-16 left-12 group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <div className="p-1.5 bg-white rounded-[2.2rem] shadow-xl border border-slate-100">
                    <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center overflow-hidden relative">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={50} className="text-slate-300" />
                      )}
                      <div className="absolute inset-0 bg-emerald-600/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <Camera className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="pt-24 pb-12 px-8 md:px-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h1 className="text-4xl font-black text-slate-900 uppercase italic">
                      User <span className="text-emerald-600">Profile</span>
                    </h1>
                  </div>

                  {!isEditing ? (
                    <button 
                      onClick={() => {
                        setIsEditing(true);
                        toast('Editing Mode Active', { icon: '📝', style: { borderRadius: '10px', fontSize: '10px' } });
                      }} 
                      className="px-6 py-3 border border-slate-200 rounded-2xl text-[11px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <Edit3 size={16} className="inline mr-2" /> Edit Profile
                    </button>
                  ) : (
                    <button onClick={() => setIsEditing(false)} className="p-3 bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl border border-slate-200">
                      <X size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ProfileField 
                    label="Full Name" 
                    value={tempUser.name} 
                    icon={UserIcon} 
                    isEditing={isEditing} 
                    onChange={(val) => setTempUser({...tempUser, name: val})} 
                  />
                  <ProfileField 
                    label="Contact Number" 
                    value={tempUser.phone} 
                    icon={PhoneIcon} 
                    isEditing={isEditing} 
                    onChange={(val) => setTempUser({...tempUser, phone: val})} 
                  />
                  <ProfileField label="Access Email" value={user?.username} icon={Mail} isEditing={false} />
                  <ProfileField label="Departmental Unit" value={user?.Department?.name} icon={Building} isEditing={false} />
                </div>

                {isEditing && (
                  <div className="mt-12">
                    <button 
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-xs font-black uppercase py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg"
                    >
                      {isUpdating ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <Save size={18} />
                      )}
                      {isUpdating ? 'Saveing...' : 'Save '}
                    </button>
                  </div>
                )}
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