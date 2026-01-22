import React from 'react';
import { useSelector } from "react-redux";
import { Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintList = ({ Data }) => {
  const { Language } = useSelector((state) => state.webState);
  const navigate = useNavigate();

  const t = {
    title: Language === "AMH" ? "የተመደቡ መዝገቦች" : "Assigned Case Files",
    export: Language === "AMH" ? "በCSV አውርድ" : "Export CSV",
    colId: Language === "AMH" ? "መለያ ቁጥር" : "Tracking ID",
    colSubject: Language === "AMH" ? "የአቤቱታው ርዕስ" : "Complaint Subject",
    colStatus: Language === "AMH" ? "ሁኔታ" : "Status",
    colPriority: Language === "AMH" ? "ቅድሚያ" : "Priority",
    statusNew: Language === "AMH" ? "አዲስ" : "New",
    statusProgress: Language === "AMH" ? "በሂደት ላይ" : "In Progress",
    statusOverdue: Language === "AMH" ? "ጊዜ ያለፈበት" : "Overdue",
    pHigh: Language === "AMH" ? "ከፍተኛ" : "High",
    pMedium: Language === "AMH" ? "መካከለኛ" : "Medium",
    pCritical: Language === "AMH" ? "አስቸኳይ" : "Critical",
  };

  const complaints = [
    { id: 'EPA-9921', subject: t.colSubject, status: 'New', statusLabel: t.statusNew, priority: t.pHigh },
    { id: 'EPA-9925', subject: t.colSubject, status: 'In Progress', statusLabel: t.statusProgress, priority: t.pMedium },
    { id: 'EPA-9810', subject: t.colSubject, status: 'Overdue', statusLabel: t.statusOverdue, priority: t.pCritical },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {t.title}
        </h3>

        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition">
          <Download size={16} />
          {t.export}
        </button>
      </div>

      {/* Table */}
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
            {complaints.map((c) => (
              <tr
                key={c.id}
                onClick={() => navigate(`/DetailList/${c.id}`)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 font-mono text-emerald-600">
                  {c.id}
                </td>

                <td className="px-6 py-4 text-gray-800">
                  {c.subject}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    c.status === 'New'
                      ? 'bg-blue-100 text-blue-700'
                      : c.status === 'Overdue'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {c.statusLabel}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {c.priority}
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="p-2 rounded-md hover:bg-gray-200">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ComplaintList;
