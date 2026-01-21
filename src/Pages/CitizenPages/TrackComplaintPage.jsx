import React, { useEffect, useState } from "react";
import Header from "../../Component/CitizenComponent/Header";
import Breadcrumb from "../../Component/CitizenComponent/TrackComplaintPageComponent/Breadcrumb";
import TrackForm from "../../Component/CitizenComponent/TrackComplaintPageComponent/TrackForm";
import Footer from "../../Component/CitizenComponent/Footer";
import ComplaintDetails from "../../Component/CitizenComponent/TrackComplaintPageComponent/ComplaintDetails";

import { useLazyTrackComplaintQuery } from "../../Redux/citizenApi";
import { Loader2, AlertCircle } from "lucide-react";

export default function TrackComplaintPage() {
  const [trigger, { data, isFetching, isError, error }] = useLazyTrackComplaintQuery();
  const [hasSearched, setHasSearched] = useState(false);

  const handleTrack = (refId) => {
    if (refId) {
      trigger(refId);
      setHasSearched(true);
    }
  };
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <TrackForm onTrack={handleTrack} isLoading={isFetching} />

        {/* Loading State */}
        {isFetching && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-green-600" size={40} />
            <p className="text-gray-500 mt-4 font-medium italic">Searching database...</p>
          </div>
        )}

        {/* Error State */}
        {isError && hasSearched && (
          <div className="mt-10 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4 text-red-700">
            <AlertCircle />
            <p className="font-bold">
              {error?.data?.message || "Could not find a complaint with that Reference ID."}
            </p>
          </div>
        )}
{/* !isFetching && data  */}
        {/* Result State */}
        {true&& (
          <ComplaintDetails complaint={data} />
        )}
      </main>
      <Footer />
    </div>
  );
}