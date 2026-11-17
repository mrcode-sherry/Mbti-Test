'use client';

import React from "react";
import { Check, X } from "lucide-react";
import Link from "next/link";

const features = [
  { name: "NSR (Natural Strength Report)",      advance: true,  premium: true  },
  { name: "NWR (Natural Weakness Report)",       advance: true,  premium: true  },
  { name: "SMU (Success Means To You)",          advance: true,  premium: true  },
  { name: "PAR (Problematic Areas Report)",      advance: true,  premium: true  },
  { name: "EPR (Educational Pathway Report)",    advance: true,  premium: true  },
  { name: "PCS (Potential Careers and Skills)",  advance: true,  premium: true  },
  { name: "National Scholarships",               advance: true,  premium: true  },
  { name: "International Scholarships",          advance: true,  premium: true  },
  { name: "30 Minutes Online Session",           advance: false, premium: true  },
];

const Comparison = () => {
  return (
    <section className="py-20 md:px-16 px-8 bg-gradient-to-br from-white via-[#fefefe] to-[#f9f9f9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-[#FDCA00]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#14442E]/10 to-[#14442E]/5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#14442E]">Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#14442E] mb-6">
            Compare our plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See at a glance what each plan costs and what you get for your money.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#FDCA00]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">

                {/* Header row */}
                <thead>
                  <tr>
                    {/* Feature column header */}
                    <th className="text-left py-6 px-6 md:px-10 bg-gradient-to-r from-[#14442E] to-[#0c2f1e] text-white font-bold text-lg w-1/2">
                      Benefits
                    </th>

                    {/* Advance column header */}
                    <th className="py-4 px-4 md:px-8 bg-gradient-to-br from-[#14442E] to-[#0c2f1e] border-l border-white/10 text-center w-1/4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="inline-block bg-gradient-to-r from-[#FDCA00] to-[#f0c000] text-[#14442E] text-xs font-bold px-3 py-1 rounded-full mb-1">
                          POPULAR
                        </span>
                        <span className="text-white font-bold text-base md:text-lg">Advance</span>
                        <div className="text-center mt-1">
                          <div className="flex items-center justify-center gap-2">
                            <span className="line-through text-white/40 text-xs">Rs. 3000</span>
                            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">33% OFF</span>
                          </div>
                          <span className="text-[#FDCA00] font-black text-xl md:text-2xl">Rs. 2000</span>
                          <p className="text-white/60 text-xs">One-time payment</p>
                        </div>
                      </div>
                    </th>

                    {/* Premium column header */}
                    <th className="py-4 px-4 md:px-8 bg-gradient-to-br from-[#0c2f1e] to-[#061a10] border-l border-white/10 text-center w-1/4">
                      <div className="flex flex-col items-center gap-1">
                        <span className="inline-block bg-white/10 text-white/70 text-xs font-bold px-3 py-1 rounded-full mb-1 border border-white/20">
                          COMING SOON
                        </span>
                        <span className="text-white/60 font-bold text-base md:text-lg">Premium</span>
                        <div className="text-center mt-1">
                          <span className="text-white/40 font-black text-xl md:text-2xl">Rs. 5000</span>
                          <p className="text-white/40 text-xs">One-time payment</p>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Feature rows */}
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={i}
                      className={`border-b border-gray-100 group transition-all duration-300 hover:bg-gradient-to-r hover:from-[#FDCA00]/8 hover:to-transparent ${
                        i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                      }`}
                    >
                      <td className="py-4 px-6 md:px-10 text-gray-700 font-medium">
                        {feature.name}
                      </td>

                      {/* Advance check */}
                      <td className="py-4 px-4 md:px-8 text-center border-l border-gray-100">
                        <div className="flex justify-center">
                          {feature.advance ? (
                            <div className="w-8 h-8 bg-gradient-to-r from-[#14442E] to-[#0c2f1e] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Premium check */}
                      <td className="py-4 px-4 md:px-8 text-center border-l border-gray-100 bg-gray-50/30">
                        <div className="flex justify-center">
                          {feature.premium ? (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow-sm">
                              <Check className="w-4 h-4 text-gray-500" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Footer row with CTA button */}
                <tfoot>
                  <tr className="bg-gray-50/80">
                    <td className="py-6 px-6 md:px-10 text-gray-500 text-sm italic">
                      * Premium plan will be available soon. Stay tuned!
                    </td>
                    <td className="py-6 px-4 md:px-8 text-center border-l border-gray-100">
                      <button
                        onClick={() => {
                          sessionStorage.setItem('scrollToPricing', 'true');
                          window.location.href = '/raah-for-student';
                        }}
                        className="inline-block py-3 px-6 cursor-pointer rounded-2xl font-bold text-white bg-gradient-to-r from-[#14442E] to-[#0c2f1e] hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-md text-sm"
                      >
                        Get Started
                      </button>
                    </td>
                    <td className="py-6 px-4 md:px-8 text-center border-l border-gray-100 bg-gray-50/30">
                      <span className="inline-block py-3 px-6 rounded-2xl font-bold text-gray-400 bg-gray-100 text-sm cursor-not-allowed">
                        Not Available Yet
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">Still have questions? We&apos;re here to help!</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FDCA00] to-[#f0c000] text-[#14442E] px-8 py-4 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.172-.268l-5.909 2.058a.5.5 0 01-.644-.644l2.058-5.909A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
