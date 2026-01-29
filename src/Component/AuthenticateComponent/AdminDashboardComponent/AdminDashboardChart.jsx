import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const AdminDashboardChart = ({ data, language }) => {
  const chartData = [
    { name: language === "AMH" ? "ጠቅላላ" : "Total", value: data?.totalComplaints || 0, color: '#10b981' },
    { name: language === "AMH" ? "ተመድቧል" : "Assigned", value: data?.assigned || 0, color: '#3b82f6' },
    { name: language === "AMH" ? "ያልተመደበ" : "Unassigned", value: data?.notAssigned || 0, color: '#f59e0b' },
    { name: language === "AMH" ? "መፍትሔ ያገኘ" : "Resolved", value: data?.resolved || 0, color: '#059669' },
    { name: language === "AMH" ? "ውድቅ የተደረገ" : "Rejected", value: data?.rejected || 0, color: '#ef4444' },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
           <BarChart3 size={22} />
        </div>
        <div>
          <h3 className="text-xs font-black text-gray-900 capitalize tracking-widest">
            {language === "AMH" ? "የአቤቱታዎች የሁኔታ ትንተና" : "Complaint Status Analytics"}
          </h3>
          <p className="text-[10px] text-gray-400 font-bold capitalize mt-0.5">Live System Insights</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 800 }}
              dy={15}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboardChart;