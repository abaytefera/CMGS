import React, { useEffect, useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} from '../../../Redux/categoryApi';
import { useGetDepartmentsQuery } from '../../../Redux/departmentApi';

import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import CategoryForm from '../../../Component/AuthenticateComponent/CategoryManagementComponent/CategoryForm';
import CategoryTable from '../../../Component/AuthenticateComponent/CategoryManagementComponent/CategoryTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { Loader2, Database, Layers } from 'lucide-react';
import { useOneUpdateMutation } from '../../../Redux/categoryApi';

const CategoryManagement = () => {
  const [editingCat, setEditingCat] = useState(null);

  // RTK Query Hooks
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [OneUpdate, { isLoading: isUpdating }] = useOneUpdateMutation();
  const { data: departments } = useGetDepartmentsQuery();

  const categories = categoriesData || [];

  // --- ACTION HANDLERS ---

  const handleSave = async (payload) => {
    const toastId = toast.loading(editingCat ? 'Updating category...' : 'Creating category...');
    
    try {
      if (editingCat) {
        // payload already contains name, departmentId, resolutionTimeDays, etc.
        // We add the ID to the payload so the API knows which record to update
        await OneUpdate({ 
            id: editingCat.id || editingCat._id, 
            ...payload 
        }).unwrap();
        
        toast.success('Category updated successfully', { id: toastId });
        setEditingCat(null);
      } else {
        await createCategory(payload).unwrap();
        toast.success('New category registered', { id: toastId });
      }
    } catch (err) {
      const errorMsg = err?.data?.message || "Failed to sync with server";
      toast.error(errorMsg, { id: toastId });
    }
  };

  const handleToggleStatus = async (category) => {
    const toastId = toast.loading('Syncing status change...');
    try {
        await OneUpdate({ 
            id: category.id || category._id, 
            is_active: !category.is_active // Changed 'status' to 'is_active'
        }).unwrap();
        
        toast.success(`Category ${!category.is_active ? 'Enabled' : 'Disabled'}`, { id: toastId });
    } catch (err) {
        toast.error("Status update failed", { id: toastId });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <Toaster position="top-right" />

      <Sidebar role="supervisor" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-20 bg-slate-50/50">
          <div className="max-w-5xl mx-auto flex flex-col gap-12">
            
            <header className="text-center">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                  Category <span className="text-emerald-600">Mapping</span>
              </h1>
              <div className="flex flex-col items-center gap-3 mt-4">
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-[0.3em] flex items-center gap-2">
                  <Database size={12} className={isError ? "text-rose-500" : "text-emerald-500"} />
                  {isError ? "System Offline" : "Live Central Registry"}
                </p>
              </div>
            </header>

            <div className="max-w-2xl mx-auto w-full">
                <div className="bg-white border border-slate-200 rounded-[3rem] p-2 shadow-xl shadow-slate-200/50">
                <CategoryForm 
                  editingCat={editingCat} 
                  departments={departments || []}
                  onSave={handleSave} 
                  onCancel={() => setEditingCat(null)} 
                  isProcessing={isCreating || isUpdating}
                />
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-[1px] flex-1 bg-slate-200"></div>
                 <div className="flex items-center gap-2 px-4 py-1 bg-slate-100 rounded-full">
                    <Layers size={14} className="text-slate-500" />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Active Classifications</span>
                 </div>
                 <div className="h-[1px] flex-1 bg-slate-200"></div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-[2.5rem]">
                  <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fetching Data...</span>
                </div>
              ) : (
                <CategoryTable 
                  categories={categories} 
                  onEdit={(cat) => {
                    setEditingCat(cat);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  onToggle={(id) => {
                    const category = categories.find(c => (c.id || c._id) === id);
                    if (category) handleToggleStatus(category);
                  }}
                />
              )}
            </div>
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
};

export default CategoryManagement;