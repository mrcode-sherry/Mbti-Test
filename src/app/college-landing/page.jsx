'use client';

import { CheckCircle, Compass, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

const CollegeLandingPage = () => {
  const handleGetStarted = () => {
    window.open('/pricing', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#14442E] mb-6">
            Choose the Right Career Path
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            For College Students (FSc, FA, ICS, I.Com)
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Confused about which field to choose after college? Our MBTI-based personality test will guide you to the perfect career that matches your strengths.
          </p>
          <div className="inline-block bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md">
            <p className="text-blue-800 font-semibold">
              ⚡ Limited Time Offer: Rs. 2000 (Standard) | Rs. 3000 (Premium with Scholarships)
            </p>
          </div>
        </div>
      </section>

      {/* Why College Students Need This */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Why College Students Need This Test
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Compass className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  End Career Confusion
                </h3>
                <p className="text-gray-600">
                  Stop feeling lost about your future. Discover which university degree and career path aligns with your personality.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <GraduationCap className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Choose the Right Degree
                </h3>
                <p className="text-gray-600">
                  Get personalized recommendations for university programs that match your natural abilities and interests.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Briefcase className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Plan Your Career
                </h3>
                <p className="text-gray-600">
                  Get a clear roadmap from college to your dream career with step-by-step guidance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Lightbulb className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Discover Hidden Talents
                </h3>
                <p className="text-gray-600">
                  Uncover your unique strengths and learn how to use them for career success.
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
            What You'll Receive
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Standard Plan - Rs. 2000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Complete MBTI Personality Analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Strengths & Weaknesses Report</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Career Recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Success Strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Detailed Results on WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg shadow-md text-white">
              <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan - Rs. 3000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Everything in Standard Plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>University Scholarship Opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Degree Selection Guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Personalized Career Roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Study Abroad Opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Career Paths */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Popular Career Paths for College Students
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Engineering</h3>
              <p className="text-gray-600 text-sm">Mechanical, Electrical, Civil, Software, Computer Science</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Medical</h3>
              <p className="text-gray-600 text-sm">MBBS, BDS, Pharmacy, Nursing, Allied Health Sciences</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Business</h3>
              <p className="text-gray-600 text-sm">BBA, Accounting, Finance, Marketing, Management</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Arts & Design</h3>
              <p className="text-gray-600 text-sm">Fine Arts, Graphic Design, Architecture, Fashion Design</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">Social Sciences</h3>
              <p className="text-gray-600 text-sm">Psychology, Sociology, Economics, Political Science</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-[#14442E]">IT & Technology</h3>
              <p className="text-gray-600 text-sm">Computer Science, AI, Data Science, Cybersecurity</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-12 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Simple 4-Step Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Select Your Plan</h3>
              <p className="text-gray-600 text-sm">Choose Standard or Premium</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Make Payment</h3>
              <p className="text-gray-600 text-sm">Upload payment proof</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Take the Test</h3>
              <p className="text-gray-600 text-sm">70 questions, 20-30 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">Receive on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "I was confused between engineering and medical. This test showed me I'm perfect for software engineering!"
              </p>
              <p className="font-semibold text-[#14442E]">- Hassan, FSc Pre-Engineering</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The scholarship information helped me apply to 5 universities. I got accepted with 50% scholarship!"
              </p>
              <p className="font-semibold text-[#14442E]">- Ayesha, FSc Pre-Medical</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "Now I know my strengths and which career suits my personality. Best investment I made!"
              </p>
              <p className="font-semibold text-[#14442E]">- Bilal, ICS</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Stop Being Confused. Start Your Journey!
          </h2>
          <p className="text-xl mb-8">
            Make the right career decision with confidence
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-700 px-10 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now →
          </button>
          <p className="text-sm mt-4 text-blue-100">
            Takes only 20-30 minutes • Results delivered on WhatsApp
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14442E] text-white py-6 text-center">
        <p className="text-sm">© 2024 Aptitude Counsel. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">Your trusted career guidance partner</p>
      </footer>
    </div>
  );
};

export default CollegeLandingPage;
