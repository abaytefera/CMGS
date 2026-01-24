import React, { useEffect, useState } from "react";

import Breadcrumb from "../../Component/CitizenComponent/TrackComplaintPageComponent/Breadcrumb";
import TrackForm from "../../Component/CitizenComponent/TrackComplaintPageComponent/TrackForm";

import ComplaintDetails from "../../Component/CitizenComponent/TrackComplaintPageComponent/ComplaintDetails";

import { useLazyTrackComplaintQuery } from "../../Redux/citizenApi";
import { Loader2, AlertCircle, Search, CheckCircle2 } from "lucide-react";

export default function TrackComplaintPage() {
  const [trigger, { data, isFetching, isError, error, isSuccess }] = useLazyTrackComplaintQuery();
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (ref_number) => {
    if (ref_number) {
      console.log(ref_number);
      trigger(ref_number);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
if(isSuccess){
console.log("data")
  console.log(data)
}
if(isError){
console.log(error)

}
  },[isError,isSuccess,error])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
 
      <Breadcrumb />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-800">Track Your Request</h1>
          <p className="text-slate-500 mt-2">Enter your reference number to check real-time status</p>
        </div>

        {/* Tracking Input Form */}
        <div className="bg-white p-2 rounded-3xl shadow-xl border border-slate-100 mb-10">
           <TrackForm onTrack={handleTrack} isLoading={isFetching} />
        </div>

        {/* --- 1. LOADING STATE --- */}
        {isFetching && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="relative">
               <Loader2 className="animate-spin text-green-600" size={48} />
               <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400" size={18} />
            </div>
            <p className="text-slate-500 mt-6 font-bold tracking-wide uppercase text-xs">Accessing EPA Database...</p>
          </div>
        )}

        {/* --- 2. ERROR STATE (Not Found) --- */}
        {isError && !isFetching && (
          <div className="mt-4 p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-3xl text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-bold text-red-800">No Record Found</h3>
            <p className="text-red-600/70 text-sm max-w-xs mx-auto mt-2">
              {error?.data?.message || "We couldn't find a complaint matching that reference ID. Please check the number and try again."}
            </p>
          </div>
        )}

        {/* --- 3. SUCCESS STATE (Result Found) --- */}
        {isSuccess && !isFetching && data && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 mb-4">
               <CheckCircle2 size={20} />
               <span className="font-bold text-sm">Complaint Records Located Successfully</span>
            </div>
            <ComplaintDetails complaint={data} />
          </div>
        )}

        {/* --- 4. INITIAL EMPTY STATE --- */}
        {!hasSearched && !isFetching && (
          <div className="py-20 text-center opacity-40">
             <div className="bg-slate-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-400" />
             </div>
             <p className="text-slate-500 font-medium italic">Enter your ID above to view details</p>
          </div>
        )}
      </main>


    </div>
  );
}