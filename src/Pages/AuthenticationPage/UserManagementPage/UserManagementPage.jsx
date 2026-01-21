import React, { useEffect, useState } from 'react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../../../Redux/userApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import UserForm from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserForm';
import UserTable from '../../../Component/AuthenticateComponent/UserManagementPageComponent/UserTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { Loader2, Database } from 'lucide-react';

const UserManagementPage = () => {
  const [departments] = useState([
    "Environmental Quality", "Water Resources", "Waste Management", "Administrative"
  ]);

  const [editingUser, setEditingUser] = useState(null);

  // RTK Query Hooks
  const { data: DataUsers, isLoading, isError } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // SAMPLE DATA (Ensure objects are NOT empty to prevent crashes)
  const sampleUsers = [
    {
      _id: "s1",
      fullName: "Admin User",
      email: "admin@system.com",
      role: "admin",
      department: "Administrative"
    },
    {
      _id: "s2",
      fullName: "Officer Abebe",
      email: "abebe@epa.gov",
      role: "officer",
      department: "Environmental Quality"
    }
  ];

  // LOGIC: Use API data if available, otherwise use samples
  const users = (DataUsers && DataUsers.length > 0) ? DataUsers : sampleUsers;

  const handleSave = async (userData) => {
    try {
      if (editingUser) {
        await updateUser({ id: editingUser._id, ...userData }).unwrap();
        setEditingUser(null);
      } else {
        await createUser(userData).unwrap();
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete account?")) {
      try { await deleteUser(id).unwrap(); } 
      catch (err) { console.error(err); }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            <header className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                  Staff <span className="text-blue-500">Management</span>
                </h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                  <Database size={12} className={isError ? "text-rose-500" : "text-emerald-500"} />
                  {isError ? "Offline Mode (Using Local Samples)" : "Synchronized with Node.js Server"}
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <UserForm 
                  editingUser={editingUser} 
                  departments={departments} 
                  onSave={handleSave}
                  onCancel={() => setEditingUser(null)}
                  isLoading={isCreating || isUpdating}
                />
              </div>

              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                  </div>
                ) : (
                  <UserTable 
                    users={users} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                  />
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

export default UserManagementPage;