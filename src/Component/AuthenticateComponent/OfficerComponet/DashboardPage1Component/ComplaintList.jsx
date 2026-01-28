import React from 'react';
import { useSelector } from "react-redux";
import { Download, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintList = ({ Data = [] }) => { 
  const { Language = "EN" } = useSelector((state) => state.webState || {});
  const navigate = useNavigate();

  const t = {
    title: Language === "AMH" ? "የተመደቡ መዝገቦች" : "Assigned Case Files",
    export: Language === "AMH" ? "በCSV አውርድ" : "Export CSV",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colSubject: Language === "AMH" ? "የአቤቱታው ርዕስ" : "Complaint Subject",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colPriority: Language === "AMH" ? "ቅድሚያ" : "Priority",
    view: Language === "AMH" ? "ተመልከት" : "View", // Added View translation
    noData: Language === "AMH" ? "ምንም መዝገብ አልተገኘም" : "No records found",
    getStatusLabel: (status) => {
        if (Language === "AMH") {
            const labels = { 'New': 'አዲስ', 'In Progress': 'በሂደት ላይ', 'Overdue': 'ጊዜ ያለፈበት' };
            return labels[status] || status;
        }
        return status;
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition">
          <Download size={16} />
          {t.export}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">{t.colId}</th>
              <th className="px-6 py-4 text-left">{t.colSubject}</th>
              <th className="px-6 py-4 text-left">{t.colStatus}</th>
              <th className="px-6 py-4 text-left">{t.colPriority}</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Data.length > 0 ? (
              Data.map((c) => (
                <tr
                  key={c._id || c.id}
                  onClick={() => navigate(`/DetailList/${c._id || c.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-emerald-600 font-medium">
                    {c.ref_number || c.id}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{c.subject || "---"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === 'New' ? 'bg-blue-100 text-blue-700' : 
                      c.status === 'Overdue' ? 'bg-red-100 text-red-700' : 
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {t.getStatusLabel(c.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{c.priority}</td>
                  <td className="px-6 py-4 text-right">
                    {/* Replaced Icon with "View" Text button */}
                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider group-hover:underline">
                      {t.view}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <Inbox size={32} strokeWidth={1} />
                    <p>{t.noData}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintList;