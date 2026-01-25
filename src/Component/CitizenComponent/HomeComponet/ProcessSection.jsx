import React from 'react';

import { 
  MessageSquare, 
  Headset,       
  ClipboardCheck,
  PieChart,      
  MoveRight     
} from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Submit a Complaint",
      description: "Fill out a simple online form with your complaint details. Attach photos or documents if available.",
      icon: <MessageSquare size={44} strokeWidth={2.5} />,
    },
    {
      id: 2,
      title: "Get a Reference Number",
      description: "Once submitted, you will receive a unique complaint reference number via SMS or email.",
      icon: <Headset size={44} strokeWidth={2.5} />,
    },
    {
      id: 3,
      title: "Complaint Review & Action",
      description: "Your complaint is reviewed, assigned to the responsible department, and handled according to service standards.",
      icon: <ClipboardCheck size={44} strokeWidth={2.5} />,
    },
    {
      id: 4,
      title: "Track Progress",
      description: "Use your reference number or phone number to check the status of your complaint at any time.",
      icon: <PieChart size={44} strokeWidth={2.5} />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center p-6 md:p-12">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-[url(e1f76a060d4463ad6083ab102b3e27e6117263d9.jpg)] bg-no-repeat bg-center bg-cover opacity-30 grayscale"
        style={{ 
          backgroundImage: "e1f76a060d4463ad6083ab102b3e27e6117263d9.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-16">
          <p className="text-white/70 uppercase tracking-[0.4em] text-xs font-bold mb-4">How the system works</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            A Simple, Transparent Process From<br />Start To Finish
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-10 flex flex-col items-start shadow-2xl group transition-transform hover:-translate-y-1">
              <div className="text-blue-800 mb-6">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Step {step.id}: {step.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-lg mb-8">
                {step.description}
              </p>
              
              <a href="#" className="flex items-center gap-3 text-blue-900 font-black text-sm uppercase tracking-wider hover:gap-5 transition-all">
                Contact Us <MoveRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;