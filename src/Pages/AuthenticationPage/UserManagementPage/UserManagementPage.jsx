import React, { useEffect, useState } from 'react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../../../Redux/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Redux/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Loader2, Plus } from 'lucide-react';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import UserForm from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserForm';
import UserTable from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserTable';

const UserManagementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current user and role from Redux
  const { user: currentUser } = useSelector((state) => state.auth);
  const isAdmin = currentUser?.role === 'ADMIN';

  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  const { data: DataUsers, isLoading, error } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (error && error.status === 401) {
      dispatch(logout());
      navigate('/login');
    }
  }, [error, navigate, dispatch]);

  // --- FILTERING LOGIC ---
  // 1. Convert to array 
  // 2. Filter out the logged-in user (Self-exclusion)
  const rawUsers = Array.isArray(DataUsers) ? DataUsers : [];
  const filteredUsers = rawUsers.filter(u => u.id !== currentUser?.id && u._id !== currentUser?.id);

  const handleSave = async (userData) => {
    const loadId = toast.loading(editingUser ? 'Updating...' : 'Registering...');
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id || editingUser._id, ...userData }).unwrap();
        toast.success('Staff profile updated!', { id: loadId });
      } else {
        await createUser(userData).unwrap();
        toast.success('New staff registered!', { id: loadId });
      }
      setShowUserForm(false);
      setEditingUser(null);
    } catch (err) {
      toast.error(err?.data?.message || "Action Failed", { id: loadId });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Toaster position="top-right" />
      <Sidebar role={currentUser?.role} />

      <div className="flex-1 flex flex-col">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 pb-10">
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-black">Staff <span className="text-emerald-600">Directory</span></h1>
              
              {/* Only show "Register" button to Admins */}
              {isAdmin && (
                <button
                  onClick={() => { setEditingUser(null); setShowUserForm(true); }}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                >
                  <Plus size={18} /> Register Staff
                </button>
              )}
            </header>

            {isLoading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-emerald-600" size={40} /></div>
            ) : (
              <UserTable 
                users={filteredUsers} 
                onEdit={(u) => { setEditingUser(u); setShowUserForm(true); }}
                onDelete={handleDelete}
                isAdmin={isAdmin} // Passing role status to table
              />
            )}
          </div>

          {/* User Registration/Edit Modal */}
          {showUserForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="font-black uppercase tracking-tight">{editingUser ? 'Edit Staff' : 'New Registration'}</h2>
                  <button onClick={() => setShowUserForm(false)}>✕</button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                  <UserForm 
                    editingUser={editingUser} 
                    onSave={handleSave} 
                    onCancel={() => setShowUserForm(false)} 
                    isLoading={isCreating || isUpdating}
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserManagementPage;