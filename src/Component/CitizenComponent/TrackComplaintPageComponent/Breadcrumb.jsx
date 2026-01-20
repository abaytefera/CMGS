import React from "react";
import { useSelector } from "react-redux";

const Breadcrumb = () => {
  const { Language } = useSelector((state) => state.webState);

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
      {Language === "AMH" ? "መነሻ" : "Home"} 
      <span className="mx-2">›</span> 
      {Language === "AMH" ? "ቅሬታ መከታተያ" : "Track Complaint"}
    </div>
  );
};

export default Breadcrumb;