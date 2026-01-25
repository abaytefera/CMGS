import React from 'react';
import { ArrowRight } from 'lucide-react'; 

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mr. John Doe",
      role: "CLIENTS",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&fit=crop",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
    },
    {
      id: 2,
      name: "Mr. John Doe",
      role: "CLIENTS",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&fit=crop",
      text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor",
    }
  ];

  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Side */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-gray-400 uppercase tracking-widest text-sm font-bold">
            Our Testimonials
          </h2>
          <h1 className="text-5xl font-bold text-gray-600 leading-tight">
            Our Users Reviews
          </h1>
          <button className="flex items-center gap-3 bg-[#13519c] text-white px-8 py-4 font-bold uppercase text-sm hover:bg-blue-800 transition-colors">
            See More <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Testimonials Slider Side */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-white p-10 shadow-sm border border-gray-100 flex flex-col justify-between">
                <p className="italic text-gray-500 text-lg leading-relaxed mb-8">
                  “ {item.text} “
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover grayscale" 
                  />
                  <div>
                    <h4 className="font-bold text-gray-700">{item.name}</h4>
                    <p className="text-xs text-gray-400 tracking-widest font-bold">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-start md:justify-end md:mr-20 gap-2 pr-4">
            <span className="h-2 w-8 bg-[#2d9a63]"></span>
            <span className="h-2 w-3 bg-[#82cfac]"></span>
            <span className="h-2 w-3 bg-[#82cfac]"></span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;