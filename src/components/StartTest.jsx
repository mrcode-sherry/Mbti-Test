'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const StartTest = () => {
  const router = useRouter();

  const handleStartTest = () => {
    router.push('/pricing');
  };

  return (
    <section className="bg-gray-100 py-16 md:px-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Side: Details */}
        <div className="flex-1">
          <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-4">Start Your MBTI Test</h2>
          <p className="text-gray-700 text-sm mb-6">
            Our test is based on 70 scientifically designed MCQs. It will help you understand your unique personality type and behavior patterns.
          </p>

          <ul className="space-y-3 text-gray-800 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> 70 Multiple Choice Questions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> Choose Marital Status & Language
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> Result in PDF & Animated Video Format
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" /> Result Based on 16 MBTI Personality Types
            </li>
          </ul>
        </div>

        {/* Right Side: CTA */}
        <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl font-semibold text-[#0c2f1e] mb-4">
            Begin Your Personality Journey Today
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            To get started, click below and complete your registration and fee process.
          </p>

          <button
            onClick={handleStartTest}
            className="inline-block bg-[#14442E] text-white font-medium hover:shadow-lg cursor-pointer duration-500 hover:scale-105 px-6 py-3 rounded hover:bg-[#0f3a26] transition"
          >
            Start Test
          </button>
        </div>
      </div>
    </section>
  );
};

export default StartTest;
