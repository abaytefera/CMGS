import React, { useEffect, useState } from 'react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../../../Redux/userApi';

// 1. Toast import
import toast, { Toaster } from 'react-hot-toast';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import UserForm from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserForm';
import UserTable from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { Loader2, Database, Search, UserPlus, Users } from 'lucide-react';


const UserManagementPage = () => {
  const [departments] = useState([
    "Environmental Quality", "Water Resources", "Waste Management", "Administrative"
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: DataUsers, isLoading, isError } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  useEffect(()=>{

    console.log("user")
    console.log(DataUsers);

  },[DataUsers])

  const rawUsers = (DataUsers && DataUsers.length > 0) ? DataUsers : [];

  const filteredUsers = rawUsers.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- ACTION HANDLERS WITH COLOR REPS ---

  const handleSave = async (userData) => {
    // AMBER for Loading
    const loadId = toast.loading(editingUser ? 'Updating...' : 'Registering...', {
      style: { border: '1px solid #f59e0b', color: '#f59e0b' }
    });

    try {
      if (editingUser) {
        await updateUser({ id: editingUser._id, ...userData }).unwrap();
        // EMERALD for Success
        toast.success('Staff profile updated!', { id: loadId });
        setEditingUser(null);
      } else {
        await createUser(userData).unwrap();
        // EMERALD for Success
        toast.success('New staff registered!', { id: loadId });
      }
    } catch (error) {
      // ROSE for Error
      const errMsg = error?.data?.message || "Critical Validation Error";
      toast.error(errMsg, { id: loadId });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Action: Delete this user?")) {
      const delId = toast.loading('Removing user...');
      try { 
        await deleteUser(id).unwrap(); 
        // EMERALD for Success
        toast.success('User deleted from database', { id: delId });
      } 
      catch (err) { 
        // ROSE for Error
        toast.error('Delete failed: Restricted access', { id: delId });
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // SLATE for Info/Neutral
    toast('Switched to Edit Mode', {
      icon: '📝',
      style: { border: '1px solid #64748b', color: '#64748b' }
    });
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      {/* GLOBAL TOAST CONFIGURATION */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'font-bold uppercase text-[10px] tracking-widest',
          style: {
            padding: '16px',
            borderRadius: '12px',
            background: '#fff',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
          success: {
            style: { border: '1px solid #10b981', color: '#10b981' },
          },
          error: {
            style: { border: '1px solid #f43f5e', color: '#f43f5e' },
          },
        }}
      />
      
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 bg-slate-50/50">
          <div className="max-w-5xl mx-auto">
            
            <header className="mb-10">
                <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                  Staff <span className="text-emerald-600">Management</span>
                </h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-3 flex items-center gap-2 ml-1">
                  <Database size={12} className={isError ? "text-rose-500" : "text-emerald-500"} />
                  {isError ? "Database Sync Error" : "Cloud Database Synchronized"}
                </p>
            </header>

            <div className="flex flex-col gap-12">
              <section className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <UserPlus size={18} className="text-emerald-600" />
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">
                    {editingUser ? "Edit Profile" : "Onboarding"}
                  </h2>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-2 shadow-sm">
                  <UserForm 
                    editingUser={editingUser} 
                    departments={departments} 
                    onSave={handleSave}
                    onCancel={() => {
                        setEditingUser(null);
                        // SLATE for Cancel
                        toast('Action Cancelled', { icon: '✖️', style: { border: '1px solid #64748b' } });
                    }}
                    isLoading={isCreating || isUpdating}
                  />
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Users size={18} className="text-slate-600" />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Directory</h2>
                  </div>

                  <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <input 
                      type="text"
                      placeholder="Search name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm text-slate-700 font-medium"
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-24 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <Loader2 className="animate-spin text-emerald-600" size={44} />
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <UserTable 
                      users={rawUsers} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete}
                    />
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default UserManagementPage;