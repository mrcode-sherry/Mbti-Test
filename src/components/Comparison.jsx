import React from "react";
import { Check, Minus } from "lucide-react";
import Link from "next/link";


const plans = [
  {
    name: "Standard",
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
    name: "Premium",
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
];

const Comparison = () => {
  return (
    <section className="py-16 md:px-16 px-8 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-3">
          Compare our plans
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          See at a glance what each plan costs and what you get for your money.
        </p>
      </div>

      {/* Plans header */}
      <div className="grid md:grid-cols-2 grid-cols-1 max-w-3xl mx-auto mb-10 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="relative bg-gray-100 rounded-xl shadow-md p-6 text-center"
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-200 text-[#14442E] text-xs font-semibold px-3 py-1 rounded-full">
                POPULAR
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {plan.name}
            </h3>
            <p className="text-[#14442E] font-bold text-xl mt-2 mb-5">
              {plan.price}
            </p>
            <Link href="/pricing" className="py-3 cursor-pointer duration-300 rounded-lg font-medium text-white px-12 bg-[#14442E] hover:bg-[#0c2f1e] transition">
              Get started
            </Link>
          </div>
        ))}
      </div>

      {/* Features table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse max-w-4xl mx-auto text-sm md:text-base">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Benefits
              </th>
              {plans.map((plan, index) => (
                <th
                  key={index}
                  className="py-3 px-4 font-semibold text-gray-700 text-center"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, i) => (
              <tr key={i} className="border-t">
                <td className="py-3 px-4 text-gray-700">{feature}</td>
                {plans.map((plan, j) => (
                  <td
                    key={j}
                    className="py-3 px-4 text-center"
                  >
                    {plan.features.includes(feature) ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Comparison;
