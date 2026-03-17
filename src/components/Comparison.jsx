import React from "react";
import { Check, Minus } from "lucide-react";
import Link from "next/link";


const plans = [
  {
    name: "True Self",
    price: "Rs. 2000",
    popular: false,
    features: [
      "Report on your Strengths",
      "Report on your weaknesses",
      "What is success means to you",
      "Strategies for your success",
      "Problematic areas",
      "Rules for succeed",
    ],
  },
  {
    name: "Golden Future",
    price: "Rs. 3000",
    popular: true,
    features: [
      "Report on your Strengths",
      "Report on your weaknesses",
      "What is success means to you",
      "Strategies for your success",
      "Problematic areas",
      "Rules for succeed",
      "Careers",
      "Scholarships",
      "Careers roadmap"
    ],
  },
];

const allFeatures = [
  "Report on your Strengths",
  "Report on your weaknesses",
  "What is success means to you",
  "Strategies for your success",
  "Problematic areas",
  "Rules for succeed",
  "Careers",
  "Scholarships",
  "Careers roadmap"
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

        {/* Plans header */}
        <div className="grid md:grid-cols-2 grid-cols-1 max-w-4xl mx-auto mb-16 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border transition-all duration-300 hover:scale-105 hover:shadow-3xl ${
                plan.popular 
                  ? 'border-[#FDCA00]/40 bg-gradient-to-br from-white to-[#FDCA00]/5' 
                  : 'border-[#14442E]/20 hover:border-[#FDCA00]/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#FDCA00] to-[#f0c000] text-[#14442E] text-sm font-bold px-6 py-2 rounded-full shadow-lg animate-pulse">
                    POPULAR
                  </span>
                </div>
              )}
              <div className="mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <p className="text-[#14442E] font-bold text-3xl">
                    {plan.price}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">One-time payment</p>
                </div>
                <Link 
                  href="/pricing" 
                  className="inline-block py-4 px-10 cursor-pointer duration-300 rounded-2xl font-bold text-white bg-gradient-to-r from-[#14442E] to-[#0c2f1e] hover:shadow-2xl hover:scale-105 transition-all shadow-xl"
                >
                  Get started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Features table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#FDCA00]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-[#14442E] to-[#0c2f1e]">
                    <th className="text-left py-6 px-8 font-bold text-white text-lg">
                      Benefits
                    </th>
                    {plans.map((plan, index) => (
                      <th
                        key={index}
                        className="py-6 px-8 font-bold text-white text-center text-lg"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr 
                      key={i} 
                      className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-[#FDCA00]/5 hover:to-transparent transition-all duration-300 ${
                        i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                      }`}
                    >
                      <td className="py-5 px-8 text-gray-700 font-medium">
                        {feature}
                      </td>
                      {plans.map((plan, j) => (
                        <td
                          key={j}
                          className="py-5 px-8 text-center"
                        >
                          {plan.features.includes(feature) ? (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-[#14442E] to-[#0c2f1e] rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <Minus className="w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">
              Still have questions? We're here to help!
            </p>
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
