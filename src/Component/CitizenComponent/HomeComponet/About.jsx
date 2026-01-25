import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full  max:pl-50  bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE SECTION */}
          <div className="relative md:pl-30 ">
            <img
              src="1ee1c8fc15ab4aa9252696be466a6aea3826d652.jpg"
              alt="Customer Support"
              className="w-full h-[1000px] object-cover rounded-md"
            />

            {/* Overlay Card */}
            <div className="absolute bottom-80 left-6 bg-green-500/80 text-white px-10 py-20 max-w-sm rounded-md shadow-lg">
              <h3 className="text-xl font-semibold mb-2">
                Take Action Today
              </h3>
              <p className="text-sm leading-relaxed">
                Your report can make a real difference. Speak up, stay informed,
                and help protect our environment.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              About Us
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-3 leading-tight">
              We Are Customer Support Services For Seamless Interactions
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              We are committed to protecting the environment by listening to
              citizens, responding responsibly, and ensuring environmental laws
              are upheld through transparent and efficient service delivery.
            </p>

            <p className="text-gray-500 mt-3 leading-relaxed">
              The Complaint & Grievance Management System (CGMS) is an official
              digital service of the Environmental Protection Authority,
              developed to improve public access, accountability, and
              participation in environmental governance.
            </p>

            {/* Blue Info Box */}
            <div className="bg-blue-800 text-white p-5 rounded-md mt-6">
              <h4 className="font-semibold mb-1">CGMS</h4>
              <p className="text-sm">
                is accessible through web and mobile devices, ensuring inclusive
                access for all citizens.
              </p>
            </div>

            {/* Feature List */}
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                Easy online complaint submission
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                Transparent case tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                SMS & email notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✔</span>
                Secure and confidential system
              </li>
            </ul>

            {/* Button */}
            <button className="mt-8 bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md flex items-center gap-2 transition">
              Learn More
              <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
