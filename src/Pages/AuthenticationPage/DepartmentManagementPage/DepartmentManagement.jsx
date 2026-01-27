import React, { useEffect, useState } from 'react';
// Toast
import toast, { Toaster } from 'react-hot-toast';
import { 
  useGetDepartmentsQuery, 
  useAddDepartmentMutation, 
  useUpdateDepartmentMutation
} from '../../../Redux/departmentApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import DepartmentForm from '../../../Component/AuthenticateComponent/DepartmentManagementComponent/DepartmentForm';
import DepartmentTable from '../../../Component/AuthenticateComponent/DepartmentManagementComponent/DepartmentTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

import { Loader2, ServerOff, Globe, Plus, X } from 'lucide-react';
import { useGetUsersQuery } from '../../../Redux/userApi';

const DepartmentPage = () => {
  const [editingDept, setEditingDept] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // RTK Query Hooks
  const { data: departmentsData, isLoading, isError } = useGetDepartmentsQuery();
  const [addDepartment, { isLoading: isAdding }] = useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const { data: user } = useGetUsersQuery();
 useEffect(()=>{
console.log("update info")
  console.log(user);

 },[user])

  const departments = departmentsData || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save or update department
  const handleSave = async (formData) => {
    const toastId = toast.loading(editingDept ? "Updating department..." : "Adding department...");
    try {
      if (editingDept) {
        await updateDepartment({ 
          id: editingDept._id || editingDept.id, 
          ...formData
        }).unwrap();
        toast.success("Department updated successfully!", { id: toastId });
      } else {
        await addDepartment(formData).unwrap();
        toast.success("Department added successfully!", { id: toastId });
      }
      setEditingDept(null);
      setShowForm(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save department", { id: toastId });
    }
  };

  // Toggle department active status
  const handleToggleStatus = async ({ id, is_active }) => {
    try {
      await updateDepartment({ id, is_active: !is_active }).unwrap();
      toast.success(`Department ${!is_active ? 'Activated' : 'Deactivated'}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Edit button
  const handleEdit = (dept) => {
    setEditingDept(dept);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700">
      <Toaster position="top-right" />
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-20">
          <div className="max-w-5xl mx-auto">

            {/* HEADER */}
            <div className="mb-12 flex flex-col items-center text-center">
              
              <div className="flex flex-col items-center gap-3 mt-4">
               
               
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  setEditingDept(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-black rounded-full hover:bg-emerald-700 transition"
              >
                <Plus size={16} />
                Register Department
              </button>
            </div>

            {/* TABLE */}
            {isLoading ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="animate-spin text-emerald-600" size={40} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Loading Records...
                </span>
              </div>
            ) : (
              <DepartmentTable 
                data={departments} 
                onEdit={handleEdit} 
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>
        </main>
        <AuthFooter />
      </div>

      {/* ================= MODAL FORM ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4  rounded-[3rem]  p-6">
            {/* CLOSE BUTTON */}
           

            <DepartmentForm
              editingDept={editingDept}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingDept(null);
                toast("Editing cancelled", { icon: 'ℹ️' });
              }}
              user={user}
              isSaving={isAdding || isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
