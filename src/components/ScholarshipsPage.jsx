'use client';

import PageBanner from './PageBanner';
import { GraduationCap, Globe, Award, BookOpen, TrendingUp } from 'lucide-react';

const ScholarshipsPage = () => {
  const scholarships = [
    {
      id: 1,
      title: "Fulbright Scholarship Program",
      image: "/scholarships/fulbright.jpg",
      description: "Fully funded scholarship for Master's and PhD programs in the USA. Covers tuition, living expenses, airfare, and health insurance for Pakistani students.",
      category: "Fully Funded",
      level: "Master's & PhD",
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Commonwealth Scholarships",
      image: "/scholarships/commonwealth.jpg",
      description: "UK government scholarship for Master's and PhD studies. Provides full tuition fees, living allowance, and travel costs for students from Pakistan.",
      category: "Fully Funded",
      level: "Master's & PhD",
      icon: <Award className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Chevening Scholarships",
      image: "/scholarships/chevening.jpg",
      description: "Prestigious UK scholarship for one-year Master's degree. Covers all expenses including tuition, accommodation, and travel for future leaders.",
      category: "Fully Funded",
      level: "Master's",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      id: 4,
      title: "DAAD Scholarships Germany",
      image: "/scholarships/daad.jpg",
      description: "German government scholarship for Master's and PhD programs. Offers monthly stipend, health insurance, and travel allowance for Pakistani students.",
      category: "Fully Funded",
      level: "Master's & PhD",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Australia Awards Scholarships",
      image: "/scholarships/australia.jpg",
      description: "Australian government scholarship for undergraduate and postgraduate studies. Covers full tuition, living expenses, and return airfare.",
      category: "Fully Funded",
      level: "Bachelor's & Master's",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div>
      <PageBanner title="Scholarships" backgroundImage="/Banners/about-banner.jpg" />

      <section className="py-16 md:px-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
              <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">
                Premium Feature
              </p>
              <div className="w-12 h-px bg-[#14442E] opacity-40" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#14442E] mb-4">
              Scholarship Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Exclusive for Golden Future (Premium) plan users. Discover fully funded scholarships for your education journey.
            </p>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-12 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              📌 Important Note
            </h3>
            <p className="text-yellow-700 text-sm">
              These scholarships are provided for informational purposes only. Aptitude Counsel does not sponsor these scholarships. 
              Please verify all details directly with the scholarship providers before applying. We recommend checking official websites 
              for the most up-to-date information and application deadlines.
            </p>
          </div>

          {/* Scholarships Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                  <div className="text-white">
                    {scholarship.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {scholarship.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#14442E] mb-2">
                    {scholarship.title}
                  </h3>

                  {/* Level */}
                  <p className="text-sm text-gray-500 mb-3">
                    📚 {scholarship.level}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {scholarship.description}
                  </p>

                  {/* Learn More Button */}
                  <button className="w-full bg-[#14442E] hover:bg-[#0f3a26] text-white py-2 px-4 rounded-lg transition duration-300 cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-[#14442E] text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help with Scholarship Applications?
            </h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Our team can guide you through the application process. Contact us on WhatsApp for personalized assistance.
            </p>
            <a
              href="https://wa.me/923390115530?text=Hi%20I%20need%20help%20with%20scholarship%20applications"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScholarshipsPage;
