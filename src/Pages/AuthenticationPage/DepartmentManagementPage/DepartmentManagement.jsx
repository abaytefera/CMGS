import React, { useEffect, useState } from 'react';
import { 
  useGetDepartmentsQuery, 
  useAddDepartmentMutation, 
  useUpdateDepartmentMutation, 
  useDeleteDepartmentMutation 
} from '../../../Redux/departmentApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import DepartmentForm from '../../../Component/AuthenticateComponent/DepartmentManagementComponent/DepartmentForm';
import DepartmentTable from '../../../Component/AuthenticateComponent/DepartmentManagementComponent/DepartmentTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';

import { Loader2, ServerOff, Globe } from 'lucide-react';
import { useGetUsersQuery } from '../../../Redux/userApi';
const DepartmentPage = () => {
  const [editingDept, setEditingDept] = useState(null);

  const { data: departmentsData, isLoading, isError } = useGetDepartmentsQuery();
  const [addDepartment, { isLoading: isAdding }] = useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const {data:user}=useGetUsersQuery()

  const sampleDepartments = [
    {
      _id: "dept-01",
      name: "Environmental Quality",
      code: "ENV-Q",
      supervisor: "Dr. Selamawit Kassa",
      status: "Active"
    },
    {
      _id: "dept-02",
      name: "Water Resources",
      code: "WAT-R",
      supervisor: "Ato Yonas Biru",
      status: "Active"
    }
  ];
  

  const departments = (departmentsData && departmentsData.length > 0) ? departmentsData : sampleDepartments;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingDept) {
        await updateDepartment({ 
          id: editingDept._id || editingDept.id, 
          ...formData 
        }).unwrap();
        setEditingDept(null);
      } else {
        await addDepartment(formData).unwrap();
      }
    } catch (err) {
      console.error("Database Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this department?")) {
      try {
        await deleteDepartment(id).unwrap();
      } catch (err) {
        console.error("Delete failed");
      }
    }
  };

  const handleEdit = (dept) => {
    setEditingDept(dept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700">
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-20">
          <div className="max-w-5xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-12 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">
                Department <span className="text-emerald-600">Registry</span>
              </h1>
              <div className="flex flex-col items-center gap-3 mt-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${isError ? 'border-rose-200 bg-rose-50' : 'border-emerald-200 bg-emerald-50'}`}>
                  {isError ? <ServerOff size={12} className="text-rose-600" /> : <Globe size={12} className="text-emerald-600" />}
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {isError ? "Offline Mode" : "System Synchronized"}
                  </span>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  Federal Environmental Protection Authority
                </p>
              </div>
            </div>

            {/* Content Stack: TOP (Form) to BOTTOM (Table) */}
            <div className="flex flex-col gap-16">
              
              {/* TOP: FORM SECTION (Centered and constrained) */}
              <section className="max-w-2xl mx-auto w-full">
                <DepartmentForm 
                  editingDept={editingDept} 
                  onSave={handleSave} 
                  onCancel={() => setEditingDept(null)} 
                  isSaving={isAdding || isUpdating} 
                />
              </section>

              {/* BOTTOM: TABLE SECTION */}
              <section className="w-full">
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-[1px] flex-1 bg-slate-200"></div>
                   <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Registered Units</h2>
                   <div className="h-[1px] flex-1 bg-slate-200"></div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4">
                    <Loader2 className="animate-spin text-emerald-600" size={40} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Records...</span>
                  </div>
                ) : (
                  <DepartmentTable 
                    data={departments} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                  />
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

export default DepartmentPage;