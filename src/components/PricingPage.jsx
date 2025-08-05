import React from 'react';
import PageBanner from './PageBanner';
import FaqSection from './FaqSection';

const PricingPage = () => {
  return (
    <div>
      <PageBanner title="Pricing Plan" backgroundImage="/Banners/about-banner.jpg" />

      {/* Section Container */}
      <section className="bg-gray-100 py-16 px-12">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
            <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">Pricing Plan</p>
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
          </div>
          <p className="text-3xl md:text-5xl font-bold md:w-[1100px] w-full mx-auto mb-4">
            Start Your <span className="text-green-700 font-semibold underline">MBTI Test</span> With Flexible Payment Options
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section - MBTI Test Info */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[#14442E] mb-4">Start Your MBTI Test</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our test is based on 70 scientifically designed MCQs. It will help you understand your unique personality type and behavior patterns.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-3">
              <li>70 Multiple Choice Questions</li>
              <li>Choose Marital Status & Language</li>
              <li>Result in PDF & Animated Video Format</li>
              <li>Result Based on 16 MBTI Personality Types</li>
            </ul>
          </div>

          {/* Right Section - Payment Info */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold text-[#14442E] mb-4 text-center">Pay via JazzCash or EasyPaisa</h3>
            
            <div className="text-gray-700 space-y-4 text-center text-lg mb-6">
              <div>
                <span className="font-semibold">JazzCash Number:</span> 0301-2345678<br />
                <span className="text-sm text-gray-500">Name: Ali Raza</span>
              </div>
              <div>
                <span className="font-semibold">EasyPaisa Number:</span> 0321-9876543<br />
                <span className="text-sm text-gray-500">Name: Hassan Shah</span>
              </div>
              <div className="text-green-700 font-semibold text-2xl mt-6">
                Fee: Rs. 1000 PKR
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 hover:scale-105 text-white px-6 py-3 rounded-lg text-lg font-medium transition cursor-pointer">
                Send Screenshot Proof
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Once you’ve paid, upload your proof to continue to the test.
            </p>
          </div>
        </div>
      </section>
      <div>
          <FaqSection/>
        </div>
    </div>
  );
};

export default PricingPage;
