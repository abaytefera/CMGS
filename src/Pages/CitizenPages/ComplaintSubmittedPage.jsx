import Header from "../../Component/CitizenComponent/HomeComponet/Header";
import Breadcrumb from "../../Component/CitizenComponent/ComplaintSubmittedPageComponent/Breadcrumb";
import SuccessCard from "../../Component/CitizenComponent/ComplaintSubmittedPageComponent/SuccessCard";
import Footer from "../../Component/CitizenComponent/Footer";
import { useEffect } from "react";
export default function ComplaintSubmittedPage() {
      useEffect(()=>{
        
            window.scrollTo(0,0)
        
          },[])
return (
<div className="min-h-screen bg-gray-50">
  <Header page={true} ></Header>
<Breadcrumb />
<main className="px-6 py-10">
<SuccessCard />
</main>
<Footer />
</div>
);
}