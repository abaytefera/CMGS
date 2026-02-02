import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboardChart = ({ language }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve your auth token
        const response = await fetch(`${API_URL}/api/dashboard/admin?period=last7days`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch');
        
        const result = await response.json();
        setApiData(result);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  // Mapping API data to Chart categories
  const chartData = [
    { 
      name: language === "AMH" ? "ጠቅላላ" : "Total", 
      value: apiData?.totalComplaints || 0, 
      color: '#10b981' 
    },
    { 
      name: language === "AMH" ? "አክቲቭ" : "Active", 
      value: apiData?.activeComplaints || 0, 
      color: '#3b82f6' 
    },
    { 
      name: language === "AMH" ? "የተዘጉ" : "Closed", 
      value: apiData?.closedComplaints || 0, 
      color: '#059669' 
    },
    { 
      name: language === "AMH" ? "ተጠቃሚዎች" : "Users", 
      value: apiData?.totalUsers || 0, 
      color: '#f59e0b' 
    },
  ];

  if (loading) return <div className="h-[400px] flex items-center justify-center text-gray-400">Loading Analytics...</div>;

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
          <p className="text-[10px] text-gray-400 font-bold capitalize mt-0.5">
            {apiData?.period || 'Live'} System Insights
          </p>
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