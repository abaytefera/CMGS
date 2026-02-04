import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { BarChart3 } from 'lucide-react';

const AdminDashboardChart = ({ data, language }) => {
  // Mapping the specific data keys returned from your CompileList
  const chartData = [
    { 
      name: language === "AMH" ? "ገባሪ" : "Active", 
      value: data?.activeComplaints || 0, 
      color: '#3b82f6' // Blue
    },
    { 
      name: language === "AMH" ? "የተፈቱ" : "Resolved", 
      value: data?.resolvedComplaints || 0, 
      color: '#10b981' // Emerald
    },
    { 
      name: language === "AMH" ? "የተዘጉ" : "Closed", 
      value: data?.closedComplaints || 0, 
      color: '#6366f1' // Indigo
    },
    { 
      name: language === "AMH" ? "ውድቅ" : "Rejected", 
      value: data?.rejectedComplaints || 0, 
      color: '#ef4444' // Red
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
             <BarChart3 size={22} />
          </div>
          <div>
            <h3 className="text-xs font-black text-gray-900 capitalize tracking-widest">
              {language === "AMH" ? "የአቤቱታዎች የሁኔታ ትንተና" : "Complaint Status Analytics"}
            </h3>
            <p className="text-[10px] text-gray-400 font-bold capitalize mt-0.5">
               {language === "AMH" ? `ጠቅላላ አቤቱታዎች: ${data?.totalComplaints || 0}` : `Total Complaints: ${data?.totalComplaints || 0}`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 800 }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 10 }} 
              allowDecimals={false}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                fontSize: '12px',
                padding: '12px'
              }}
              itemStyle={{ fontWeight: '900' }}
            />
            <Bar 
               dataKey="value" 
               radius={[10, 10, 0, 0]} 
               barSize={55}
               animationBegin={200}
               animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              {/* Display the value on top of the bars for better scannability */}
              <LabelList 
                dataKey="value" 
                position="top" 
                style={{ fill: '#374151', fontSize: 12, fontWeight: 900 }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mini Legend for clarity */}
      <div className="grid grid-cols-2 gap-2 mt-6">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-bold text-gray-500">{item.name}: {item.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboardChart;