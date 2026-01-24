import React from 'react';
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../../Redux/categoryApi";
import { Loader2 } from "lucide-react";

export default function FormSelect({ Icon, label, name }) {
  const { Language } = useSelector((state) => state.webState);
  
  // Fetch categories automatically from your RTK Query hook
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  return (
    <div>
      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5 px-1">
        {Icon && <Icon className="inline mr-2 text-emerald-500" />} {label}
      </label>
      
      <div className="relative group">
        <select 
          name={"categoryId"}
          disabled={isLoading || error}
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <option>Loading categories...</option>
          ) : error ? (
            <option>Error loading categories</option>
          ) : (
            <>
              <option value="">
                {Language === "AMH" ? "-- ዘርፍ ይምረጡ --" : "-- Select Category --"}
              </option>
              
              {categories?.map((cat) => (
                <option 
                  key={cat.id} 
                  value={cat.id} // 
                >
                  {/* THIS is what the user sees (e.g., "Air Pollution") */}
                  {Language === "AMH" ? (cat.nameAm || cat.name) : cat.name}
                </option>
              ))}
            </>
          )}
        </select>
        
        {/* Custom Arrow Icon */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : "▼"}
        </div>
      </div>
    </div>
  );
}