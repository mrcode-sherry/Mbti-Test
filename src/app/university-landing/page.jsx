'use client';

import { CheckCircle, Rocket, TrendingUp, Users, Globe } from 'lucide-react';

const UniversityLandingPage = () => {
  const handleGetStarted = () => {
    window.open('/pricing', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#14442E] mb-6">
            Plan Your Professional Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            For University Students & Graduates
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're choosing a specialization, planning your career, or preparing for the job market - our personality test will guide you to success.
          </p>
          <div className="inline-block bg-purple-100 border-l-4 border-purple-500 p-4 rounded-md">
            <p className="text-purple-800 font-semibold">
              ⚡ Professional Package: Rs. 2000 (Standard) | Rs. 3000 (Premium with Career Roadmap)
            </p>
          </div>
        </div>
      </section>

      {/* Why University Students Need This */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Why University Students Choose Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Rocket className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Career Clarity
                </h3>
                <p className="text-gray-600">
                  Understand which career path aligns with your personality, skills, and long-term goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <TrendingUp className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Specialization Guidance
                </h3>
                <p className="text-gray-600">
                  Choose the right specialization in your field based on your natural strengths and interests.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Globe className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Global Opportunities
                </h3>
                <p className="text-gray-600">
                  Discover international scholarships, job opportunities, and career paths abroad.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="w-12 h-12 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Professional Development
                </h3>
                <p className="text-gray-600">
                  Learn how to leverage your personality type for career success and professional growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="px-6 py-12 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Comprehensive Career Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Standard Plan - Rs. 2000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Professional MBTI Personality Assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Detailed Strengths & Weaknesses Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Career Path Recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Professional Success Strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Complete Report on WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg shadow-md text-white">
              <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan - Rs. 3000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Everything in Standard Plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Master's & PhD Scholarship Opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Personalized Career Roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Job Market Insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Study Abroad Guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Fields */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Career Fields We Cover
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Engineering</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Medicine</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Business</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">IT & Tech</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Law</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Education</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Research</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-[#14442E]">Arts & Media</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Graduates */}
      <section className="px-6 py-12 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Perfect for Graduates Planning Their Next Step
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Job Seekers</h3>
              <p className="text-gray-600 text-sm">
                Understand which jobs match your personality and how to excel in interviews.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Further Studies</h3>
              <p className="text-gray-600 text-sm">
                Planning for Master's or PhD? Get guidance on specializations and scholarships.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Career Switchers</h3>
              <p className="text-gray-600 text-sm">
                Thinking of changing your field? Discover careers that truly fit your personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Quick & Easy Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose Plan</h3>
              <p className="text-gray-600 text-sm">Select your package</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Complete Payment</h3>
              <p className="text-gray-600 text-sm">Secure payment process</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Take Assessment</h3>
              <p className="text-gray-600 text-sm">70 questions, honest answers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Receive Report</h3>
              <p className="text-gray-600 text-sm">Detailed analysis on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-12 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            What Graduates Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "This test helped me choose between MBA and MS. Now I'm pursuing my Master's with full confidence!"
              </p>
              <p className="font-semibold text-[#14442E]">- Zainab, BS Computer Science</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The scholarship information was gold! I applied and got accepted to a fully funded program in UK."
              </p>
              <p className="font-semibold text-[#14442E]">- Usman, BS Engineering</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "Understanding my personality type helped me ace job interviews. I got my dream job!"
              </p>
              <p className="font-semibold text-[#14442E]">- Sara, BBA Graduate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Take Control of Your Career Today
          </h2>
          <p className="text-xl mb-8">
            Join thousands of successful professionals who started with clarity
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-purple-700 px-10 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now →
          </button>
          <p className="text-sm mt-4 text-purple-100">
            Professional assessment • Instant results • Career guidance included
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14442E] text-white py-6 text-center">
        <p className="text-sm">© 2024 Aptitude Counsel. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">Empowering professionals to achieve their dreams</p>
      </footer>
    </div>
  );
};

export default UniversityLandingPage;
