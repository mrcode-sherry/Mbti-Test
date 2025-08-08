'use client';
import React from 'react';
import PageBanner from './PageBanner';
import FaqSection from './FaqSection';
import { CheckCircle } from 'lucide-react';

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-2 text-gray-700 text-sm">
    <CheckCircle className="text-green-600 mt-1" size={18} />
    {text}
  </li>
);

const PricingPage = () => {
  return (
    <div>
      <PageBanner title="Pricing Plan" backgroundImage="/Banners/about-banner.jpg" />

      {/* Section Container */}
      <section className="bg-gray-100 py-16 px-6 md:px-12">
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Section - MBTI Test Info */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Start Your MBTI Test</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Our test is based on 70 scientifically designed MCQs. It will help you understand your unique personality type and behavior patterns.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="70 Multiple Choice Questions" />
                <FeatureItem text="Choose Marital Status & Language" />
                <FeatureItem text="Result in PDF & Animated Video Format" />
                <FeatureItem text="Result Based on 16 MBTI Personality Types" />
              </ul>
            </div>
          </div>

          {/* Rs. 1000 Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Standard Plan - Rs. 1000</h3>
              <ul className="space-y-3 mb-6">
                <FeatureItem text="Full MBTI Test (70 Questions)" />
                <FeatureItem text="PDF Personality Report" />
                <FeatureItem text="Animated Video Result" />
                <FeatureItem text="16 Personality Types Explained" />
                <FeatureItem text="Access on Any Device" />
              </ul>
              <div className="text-center text-gray-700 text-sm space-y-2 mb-4">
                <div>
                  <span className="font-semibold">JazzCash:</span> 0301-2345678 <br />
                  <span className="text-gray-500 text-xs">Ali Raza</span>
                </div>
                <div>
                  <span className="font-semibold">EasyPaisa:</span> 0321-9876543 <br />
                  <span className="text-gray-500 text-xs">Hassan Shah</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                Send Screenshot Proof
              </button>
            </div>
          </div>

          {/* Rs. 1500 Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Premium Plan - Rs. 1500</h3>
              <ul className="space-y-3 mb-6">
                <FeatureItem text="All Standard Features" />
                <FeatureItem text="Advanced Personality Insights" />
                <FeatureItem text="Career Recommendation Report" />
                <FeatureItem text="Downloadable Certificate" />
                <FeatureItem text="Priority Support" />
              </ul>
              <div className="text-center text-gray-700 text-sm space-y-2 mb-4">
                <div>
                  <span className="font-semibold">JazzCash:</span> 0301-2345678 <br />
                  <span className="text-gray-500 text-xs">Ali Raza</span>
                </div>
                <div>
                  <span className="font-semibold">EasyPaisa:</span> 0321-9876543 <br />
                  <span className="text-gray-500 text-xs">Hassan Shah</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer">
                Send Screenshot Proof
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div>
        <FaqSection />
      </div>
    </div>
  );
};

export default PricingPage;
