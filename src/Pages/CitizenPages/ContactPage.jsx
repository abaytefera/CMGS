import React from 'react';
import { useSelector } from "react-redux";
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactMethod from '../../Component/CitizenComponent/ContactPageComponent/ContactMethod';
import OfficeMap from '../../Component/CitizenComponent/ContactPageComponent/OfficeMap';
import Header from '../../Component/CitizenComponent/Header';
import Footer from '../../Component/CitizenComponent/Footer';

const ContactPage = () => {
  const { Language } = useSelector((state) => state.webState);


  const t = {
    title: Language === "AMH" ? "ከባለሥልጣን መሥሪያ ቤታችን ጋር ይገናኙ" : "Contact Our Authority",
    description: Language === "AMH" 
      ? "ለማንኛውም ዓይነት ጥያቄዎች፣ የሕግ መመሪያዎችን ለማግኘት ወይም ከአካባቢ ጥበቃ ጋር የተያያዙ ጉዳዮችን ሪፖርት ለማድረግ የአካባቢ ጥበቃ ባለሥልጣንን ያግኙ።" 
      : "Get in touch with the Environmental Protection Authority for inquiries, legal guidance, or reporting environmental concerns.",
    officeTitle: Language === "AMH" ? "የቢሮ አድራሻ" : "Office Address",
    officeDetail: Language === "AMH" ? "የፖ.ሳ.ቁ. 1276፣ ዋና መሥሪያ ቤት መንገድ፣ አዲስ አበባ፣ ኢትዮጵያ" : "P.O. Box 1276, Headquarters Road, Addis Ababa, Ethiopia",
    officeSub: Language === "AMH" ? "የአካባቢ ጥበቃ ባለሥልጣን ሕንፃ" : "Environmental Protection Authority Building",
    phoneTitle: Language === "AMH" ? "የስልክ ቁጥሮች" : "Phone Numbers",
    phoneSub: Language === "AMH" ? "ከሰኞ - አርብ፣ ከጠዋቱ 2:30 - 11:30 ይገኛል" : "Available Mon-Fri, 8:30 AM - 5:30 PM",
    emailTitle: Language === "AMH" ? "የኢሜይል አድራሻ" : "Email Address",
    emailSub: Language === "AMH" ? "ለአጠቃላይ ጥያቄዎች እና ድጋፍ" : "General Inquiries & Support",
    officialChannels: Language === "AMH" ? "ይፋዊ የመረጃ ምንጮች" : "Official Channels",
    newsBtn: Language === "AMH" ? "ዜና እና ወቅታዊ መረጃዎች" : "News & Updates",
    faqBtn: Language === "AMH" ? "ተደጋጋሚ ጥያቄዎች (FAQ)" : "FAQ Portal",
    mapText: Language === "AMH" 
      ? "የአካባቢ ጥበቃ ባለሥልጣን ዋና መሥሪያ ቤት አድራሻን የሚያሳይ ካርታ (አዲስ አበባ)" 
      : "Map showing the location of the Environmental Protection Authority Headquarters in Addis Ababa",
    gisNote: Language === "AMH" 
      ? "* ለትክክለኛ የቢሮ አሰሳ የጂ.አይ.ኤስ (GIS/GPS) መጋጠሚያዎችን ይጠቀሙ።" 
      : "* Use GIS/GPS coordinates for precise office navigation."
  };

  return (
    <div className=''>
      <Header />
      <div className="max-w-7xl mx-auto pt-40 px-4 pb-12">
        
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4 text-green-600">{t.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            
            <ContactMethod 
              icon={MapPin}
              title={t.officeTitle}
              detail={t.officeDetail}
              subDetail={t.officeSub} 
            />

            <ContactMethod 
              icon={Phone}
              title={t.phoneTitle}
              detail="+251 11 646 4606"
              subDetail={t.phoneSub} 
            />

            <ContactMethod 
              icon={Mail}
              title={t.emailTitle}
              detail="info@epa.gov.et"
              subDetail={t.emailSub} 
            />

          <div className="pt-6 mt-6 border-t border-slate-100">
            <h5 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">{t.officialChannels}</h5>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                {t.newsBtn}
              </button>
              <button className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors">
                {t.faqBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <OfficeMap text={t.mapText} />
          <p className="mt-4 text-sm text-slate-500 italic text-center lg:text-left">
            {t.gisNote}
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;