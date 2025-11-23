'use client';

import { CheckCircle, BookOpen, Target, Award, TrendingUp } from 'lucide-react';

const SchoolLandingPage = () => {
  const handleGetStarted = () => {
    window.open('/pricing', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#14442E] mb-6">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-4">
            For Students in Class 8, 9 & 10
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Take our scientifically designed personality test and get personalized career guidance tailored for school students.
          </p>
          <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md">
            <p className="text-yellow-800 font-semibold">
              ⚡ Special Offer: Only Rs. 2000 for Standard Plan | Rs. 3000 for Premium Plan
            </p>
          </div>
        </div>
      </section>

      {/* Why Take This Test */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            Why Should You Take This Test?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Target className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Find Your True Potential
                </h3>
                <p className="text-gray-600">
                  Understand your personality type and discover which careers match your natural strengths and interests.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <BookOpen className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Choose the Right Subjects
                </h3>
                <p className="text-gray-600">
                  Get guidance on which subjects to focus on in 9th and 10th grade based on your personality and career goals.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Award className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Plan Your Future Early
                </h3>
                <p className="text-gray-600">
                  Start planning your career path early and make informed decisions about your education and future.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <TrendingUp className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Boost Your Confidence
                </h3>
                <p className="text-gray-600">
                  Know yourself better and build confidence in your abilities and career choices.
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
            What You'll Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Standard Plan - Rs. 2000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Your MBTI Personality Type</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Detailed Strengths & Weaknesses Report</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Success Strategies for Your Type</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Career Recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Full Result on WhatsApp</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-lg shadow-md text-white">
              <div className="bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan - Rs. 3000</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Everything in Standard Plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Scholarship Opportunities (Fully & Partially Funded)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Personalized Career Roadmap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Subject Selection Guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Future Planning Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-12 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Click Get Started</h3>
              <p className="text-gray-600 text-sm">Choose your plan and make payment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Fill Your Details</h3>
              <p className="text-gray-600 text-sm">Provide your information and upload payment proof</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Take the Test</h3>
              <p className="text-gray-600 text-sm">Answer 70 simple questions honestly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Your Results</h3>
              <p className="text-gray-600 text-sm">Receive detailed report on WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-12 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#14442E] text-center mb-12">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "This test helped me understand which subjects I should focus on. Now I know I want to become an engineer!"
              </p>
              <p className="font-semibold text-[#14442E]">- Ahmed, Class 9</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "I was confused about my career. This test showed me my strengths and now I'm confident about my future."
              </p>
              <p className="font-semibold text-[#14442E]">- Fatima, Class 10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 mb-4">
                "The scholarship information in the premium plan was amazing! I found so many opportunities."
              </p>
              <p className="font-semibold text-[#14442E]">- Ali, Class 10</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Discover Your Future?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students who have found their perfect career path
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-green-700 px-10 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now →
          </button>
          <p className="text-sm mt-4 text-green-100">
            Click the button to choose your plan and start your test
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14442E] text-white py-6 text-center">
        <p className="text-sm">© 2024 Aptitude Counsel. All rights reserved.</p>
        <p className="text-xs mt-2 text-gray-400">Helping students discover their true potential</p>
      </footer>
    </div>
  );
};

export default SchoolLandingPage;
