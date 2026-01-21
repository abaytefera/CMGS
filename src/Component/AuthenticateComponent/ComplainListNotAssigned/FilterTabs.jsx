import React from 'react';

const FilterTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'All', count: 85 },
    { name: 'New', count: 12 },
    { name: 'In-Progress', count: 45 },
    { name: 'Resolved', count: 28 }
  ];

  return (
    <div className="flex gap-6 mb-8 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`pb-4 px-2 text-sm font-bold transition-all relative flex items-center gap-2 ${
            activeTab === tab.name ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {tab.name}
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
            activeTab === tab.name ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {tab.count}
          </span>
          {activeTab === tab.name && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;