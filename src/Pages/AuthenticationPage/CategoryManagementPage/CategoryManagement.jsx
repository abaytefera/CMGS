import React, { useEffect, useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation 
} from '../../../Redux/categoryApi';

import Sidebar from '../../../Component/AuthenticateComponent/OfficerComponet/DashboardPage1Component/Sidebar';
import AuthHeader from '../../../Component/AuthenticateComponent/AuthHeader';
import CategoryForm from '../../../Component/AuthenticateComponent/CategoryManagementComponent/CategoryForm';
import CategoryTable from '../../../Component/AuthenticateComponent/CategoryManagementComponent/CategoryTable';
import AuthFooter from '../../../Component/AuthenticateComponent/AuthFooter';
import { Loader2, Database } from 'lucide-react';

const CategoryManagement = () => {
  const [departments] = useState(["Environmental Quality", "Water Resources", "Waste Management"]);
  const [editingCat, setEditingCat] = useState(null);

  // RTK Query hooks
  const { data: categoriesData, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  // 1. REALISTIC SAMPLE DATA
  const sampleCategories = [
    {
      _id: "cat-01",
      name: "Air Pollution",
      department: "Environmental Quality",
      description: "Industrial emissions and air quality monitoring",
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: "cat-02",
      name: "Illegal Dumping",
      department: "Waste Management",
      description: "Unauthorized waste disposal in public areas",
      status: true,
      createdAt: new Date().toISOString()
    },
    {
      _id: "cat-03",
      name: "Water Contamination",
      department: "Water Resources",
      description: "Chemical or biological pollutants in water bodies",
      status: false,
      createdAt: new Date().toISOString()
    }
  ];

  // 2. MERGE LOGIC: Use API data if it has items, otherwise use samples
  const categories = (categoriesData && categoriesData.length > 0) ? categoriesData : sampleCategories;

  const handleSave = async (data) => {
    try {
      if (editingCat) {
        await updateCategory({ 
            id: editingCat._id || editingCat.id, 
            ...data 
        }).unwrap();
        setEditingCat(null);
      } else {
        await createCategory(data).unwrap();
      }
    } catch (err) {
      alert("Failed to sync category with Node.js server");
    }
  };

  const handleToggleStatus = async (category) => {
    try {
        await updateCategory({ 
            id: category._id || category.id, 
            status: !category.status 
        }).unwrap();
    } catch (err) {
        console.error("Status toggle failed");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#080d14] text-slate-300">
      <Sidebar role="supervisor" />
      <div className="flex-1 flex flex-col min-w-0">
        <AuthHeader True={true} />
        
        <main className="flex-1 pt-32 px-6 lg:px-10 pb-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Form Section */}
            <div className="lg:col-span-1">
              <CategoryForm 
                editingCat={editingCat} 
                departments={departments}
                onSave={handleSave} 
                onCancel={() => setEditingCat(null)} 
                isProcessing={isCreating || isUpdating}
              />
            </div>

            {/* Table Section */}
            <div className="lg:col-span-2">
              <header className="mb-8">
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                    Category <span className="text-cyan-500">Mapping</span>
                </h1>
                <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-2 flex items-center gap-2">
                  <Database size={12} className={isError ? "text-rose-500" : "text-cyan-500"} />
                  {isError ? "Backend Offline - Using Sample Data" : "Node.js Backend Synchronized"}
                </p>
              </header>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-cyan-500" size={40} />
                </div>
              ) : (
                <CategoryTable 
                  categories={categories} 
                  onEdit={(cat) => {
                    setEditingCat(cat);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  onToggle={(id) => {
                    // Search in the merged list
                    const category = categories.find(c => (c._id || c.id) === id);
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