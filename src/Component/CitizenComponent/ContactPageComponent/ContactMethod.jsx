import React from 'react';

const ContactMethod = ({ icon: Icon, title, detail, subDetail }) => (
  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-emerald-50 transition-colors">

    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-700">
      <Icon size={24} />
    </div>
    
    <div>
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-sm">{detail}</p>
      

      {subDetail && (
        <p className="text-xs text-emerald-600 font-medium mt-1">
          {subDetail}
        </p>
      )}
    </div>
  </div>
);

export default ContactMethod;