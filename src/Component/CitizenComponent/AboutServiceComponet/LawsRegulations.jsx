import { faChevronRight, faDownload, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const LawsRegulations = () => {
  const { Language } = useSelector((state) => state.webState);

  const laws = [
    {
      title: Language === "AMH" ? "የአካባቢ ጥበቃ አዋጅ" : "Environmental Protection Act",
      viewLink: "#",
      downloadLink: "#",
    },
    {
      title: Language === "AMH" ? "የውሃ እና አየር ጥራት መመዘኛዎች" : "Water & Air Quality Standards",
      viewLink: "#",
      downloadLink: "#",
    },
    {
      title: Language === "AMH" ? "የቆሻሻ አወጋገድ መመሪያዎች" : "Waste Management Regulations",
      viewLink: "#",
      downloadLink: "#",
    },
  ];

  return (
    <section className="flex flex-col py-8">
      
      <h2 className="text-3xl max-md:self-center font-bold text-gray-800 mb-8 border-l-4 border-green-600 pl-4">
        {Language === "AMH" ? "ሕጎች እና ደንቦች" : "Laws & Regulations"}
      </h2>

      <div className="space-y-4">
        {laws.map((law) => (
          <div
            key={law.title}
            className="bg-white p-5 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-center hover:shadow-md transition-all border border-gray-100"
          >
         
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faFileAlt} className="text-green-600 text-xl" />
              <span className="font-semibold text-gray-800 text-lg">
                {law.title}
              </span>
            </div>

           
            <div className="mt-4 sm:mt-0 flex gap-3">
              <a
                href={law.viewLink}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm text-sm"
              >
                {Language === "AMH" ? "ይመልከቱ" : "View"}
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </a>
              <a
                href={law.downloadLink}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-sm text-sm"
              >
                {Language === "AMH" ? "ያውርዱ" : "Download"}
                <FontAwesomeIcon icon={faDownload} className="text-xs" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LawsRegulations;