import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', incoming: 45, resolved: 38 },
  { name: 'Tue', incoming: 52, resolved: 48 },
  { name: 'Wed', incoming: 48, resolved: 45 },
  { name: 'Thu', incoming: 70, resolved: 55 },
  { name: 'Fri', incoming: 65, resolved: 60 },
  { name: 'Sat', incoming: 30, resolved: 35 },
  { name: 'Sun', incoming: 25, resolved: 28 },
];

const TrendChart = () => (
  <div className="h-[300px] w-full mt-6">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
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
          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
          itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
        />
        <Area type="monotone" dataKey="incoming" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
        <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default TrendChart;