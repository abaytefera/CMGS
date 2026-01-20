import Header from "../../Component/CitizenComponent/Header";
import Breadcrumb from "../../Component/CitizenComponent/TrackComplaintPageComponent/Breadcrumb";
import TrackForm from "../../Component/CitizenComponent/TrackComplaintPageComponent/TrackForm";
import Footer from "../../Component/CitizenComponent/Footer";
import ComplaintDetails from "../../Component/CitizenComponent/TrackComplaintPageComponent/ComplaintDetails";
import { useState } from "react";

export default function TrackComplaintPage() {
const [showDetails, setShowDetails] = useState(false);


return (
<div className="min-h-screen bg-gray-50">
<Header />
<Breadcrumb />
<main className="max-w-3xl mx-auto px-6 py-10">
<TrackForm onTrack={() => setShowDetails(true)} />
{showDetails && <ComplaintDetails />}
</main>
<Footer />
</div>
);
}