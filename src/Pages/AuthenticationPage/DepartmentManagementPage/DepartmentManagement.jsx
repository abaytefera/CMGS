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

const DepartmentPage = () => {
  const [editingDept, setEditingDept] = useState(null);

  // RTK Query: Data Fetching
  const { data: departmentsData, isLoading, isError } = useGetDepartmentsQuery();
  
  // RTK Query: Mutations
  const [addDepartment, { isLoading: isAdding }] = useAddDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  // 1. PROFESSIONAL SAMPLE DATA
  const sampleDepartments = [
    {
      _id: "dept-01",
      name: "Environmental Quality",
      code: "ENV-Q",
      headName: "Dr. Selamawit Kassa",
      description: "Monitoring air and soil quality standards across industrial zones.",
      status: "Active"
    },
    {
      _id: "dept-02",
      name: "Water Resources",
      code: "WAT-R",
      headName: "Ato Yonas Biru",
      description: "Management of water bodies and industrial liquid waste discharge.",
      status: "Active"
    },
    {
      _id: "dept-03",
      name: "Waste Management",
      code: "WST-M",
      headName: "W/ro Mulu Gebre",
      description: "Coordination of solid waste disposal and hazardous material handling.",
      status: "Active"
    }
  ];

  // 2. MERGE LOGIC: Fallback to samples if server is down or empty
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
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="supervisor" />

      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />

        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                  Department <span className="text-blue-500">Registry</span>
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${isError ? 'border-rose-500/30 bg-rose-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                    {isError ? <ServerOff size={10} className="text-rose-500" /> : <Globe size={10} className="text-emerald-500" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isError ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {isError ? "Offline Samples" : "Live Database"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    EPA Structural Unit Management
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              
              <div className="lg:sticky lg:top-32">
                <DepartmentForm 
                  editingDept={editingDept} 
                  onSave={handleSave} 
                  onCancel={() => setEditingDept(null)} 
                  isSaving={isAdding || isUpdating} 
                />
              </div>

              <div className="lg:col-span-2">
                {isLoading ? (
                  <div className="flex flex-col items-center py-20 gap-4">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Connecting to Registry...</span>
                  </div>
                ) : (
                  <DepartmentTable 
                    data={departments} 
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

export default DepartmentPage;