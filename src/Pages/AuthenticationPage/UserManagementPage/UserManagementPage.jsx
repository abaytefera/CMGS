import React, { useEffect, useState } from 'react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../../../Redux/userApi';

// Toast
import toast, { Toaster } from 'react-hot-toast';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import UserForm from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserForm';
import UserTable from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { Loader2, Database, Search, UserPlus, Users, Plus } from 'lucide-react';

const UserManagementPage = () => {
  const [departments] = useState([
    "Environmental Quality", "Water Resources", "Waste Management", "Administrative"
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);

  const { data: DataUsers, isLoading, isError } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  
  useEffect(() => { console.log(DataUsers); }, [DataUsers]);

  const rawUsers = (DataUsers && DataUsers.length > 0) ? DataUsers : [];
  const filteredUsers = rawUsers.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = async (userData) => {
    const loadId = toast.loading(editingUser ? 'Updating...' : 'Registering...');
    try {
      if (editingUser) {
        console.log(userData.id);
      const { id, ...restOfData } = userData; 
    
    await updateUser({ id: id, ...restOfData }).unwrap();
        toast.success('Staff profile updated!', { id: loadId });
        setEditingUser(null);
      } else {
        await createUser(userData).unwrap();
        toast.success('New staff registered!', { id: loadId });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Critical Validation Error", { id: loadId });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanent Action: Delete this user?")) {
      const delId = toast.loading('Removing user...');
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted from database', { id: delId });
      } catch {
        toast.error('Delete failed', { id: delId });
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    toast('Switched to Edit Mode', { icon: '📝' });
    setShowUserForm(true);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Toaster position="top-right" />
      <Sidebar role="admin" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 bg-slate-50/50 relative">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <header className="mb-10">
              <h1 className="text-2xl relative top-10 font-black capitalize">
                User <span className="text-emerald-600">Management</span>
              </h1>
             
            </header>

            {/* Onboarding + Directory */}
            <div className="flex flex-col gap-12">

              {/* Onboarding Header */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                 
                 
                  <button
                    onClick={() => setShowUserForm(true)}
                    className="ml-auto flex px-5 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                     <Plus size={16} /> Register User
                  </button>
                </div>
              </section>

              {/* Directory & Search */}
              <section className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
                  <div className="flex items-center gap-3">
                   
                  </div>
              
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-24">
                    <Loader2 className="animate-spin" size={44} />
                  </div>
                ) : (
                  <UserTable users={rawUsers} onEdit={handleEdit} onDelete={handleDelete} />
                )}
              </section>
            </div>
          </div>

          {/* ================= POPUP FORM ================= */}
          {showUserForm && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setShowUserForm(false)}
              />

              {/* Full-screen popup container */}
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">

                  {/* Header & Cancel */}
                  <div className="flex justify-between items-center p-6 border-b border-slate-200 flex-shrink-0">
                    <h2 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-2">
                      <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
                      {editingUser ? 'Update Staff' : 'Staff Registration'}
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserForm(false);
                        setEditingUser(null);
                      }}
                      className="text-slate-400 hover:text-slate-600 p-2 rounded-full transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Scrollable form */}
                  <div className="overflow-auto px-6 py-4 flex-1">
                    <UserForm
                      editingUser={editingUser}
                      departments={departments}
                      onSave={(data) => {
                        handleSave(data);
                        setShowUserForm(false);
                      }}
                      onCancel={() => {
                        setShowUserForm(false);
                        setEditingUser(null);
                      }}
                      isLoading={isCreating || isUpdating}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>

        
      </div>
    </div>
  );
};

export default UserManagementPage;
