import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;

const TrendChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard/management/weekly`);
        const result = await response.json();

        // Transform the API data to match your chart format
        const formatted = result.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
          incoming: item.incoming,
          resolved: item.resolved,
          fullDate: item.date // Kept for tooltip reference
        }));

        setChartData(formatted);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };

    fetchWeeklyData();
  }, []);

  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10', 
              borderRadius: '12px',
              color: '#fff' 
            }}
            itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          />
          <Area 
            type="monotone" 
            dataKey="incoming" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorInc)" 
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="resolved" 
            stroke="#10b981" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorRes)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;