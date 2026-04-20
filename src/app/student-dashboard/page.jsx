"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Globe, Award, BookOpen, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check for test results
      if (parsedUser?.email) {
        checkTestCompletion(parsedUser.email);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Invalid user data");
      router.push("/login");
    }
  }, [router]);

  const checkTestCompletion = async (email) => {
    try {
      // Fetch results from database
      const res = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(email)}`, { 
        cache: 'no-store' 
      });
      const data = await res.json();
      
      if (data.success && data.completed && data.result) {
        setMbtiType(data.result);
        setTestResult(data.result);
        
        // Also update localStorage as backup
        localStorage.setItem('testResult', data.result);
        const prevResults = JSON.parse(localStorage.getItem('testResults') || '[]');
        if (!prevResults.includes(data.result)) {
          prevResults.push(data.result);
          localStorage.setItem('testResults', JSON.stringify(prevResults));
        }
      } else {
        // Fallback to localStorage if database doesn't have result
        const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
        const savedResult = localStorage.getItem('testResult');
        
        if (savedResults.length > 0 || savedResult) {
          const latestResult = savedResult || savedResults[savedResults.length - 1];
          const type = typeof latestResult === 'string' ? latestResult : latestResult.type || latestResult;
          setMbtiType(type);
          setTestResult(latestResult);
        }
      }
    } catch (err) {
      console.error("Error checking test completion:", err);
      // Fallback to localStorage on error
      const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
      const savedResult = localStorage.getItem('testResult');
      
      if (savedResults.length > 0 || savedResult) {
        const latestResult = savedResult || savedResults[savedResults.length - 1];
        const type = typeof latestResult === 'string' ? latestResult : latestResult.type || latestResult;
        setMbtiType(type);
        setTestResult(latestResult);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#1B5A3D] to-[#0f3a26] text-white shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#1B5A3D] font-bold text-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Student Dashboard</h2>
            <p className="text-sm text-white/70 mt-1">Welcome, {user?.name || 'Student'}</p>
            <div className="w-16 h-0.5 bg-white/30 mx-auto mt-2"></div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {/* Dashboard Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Dashboard
              </p>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "overview" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300"></span>
                <span className="font-medium">Overview</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "results" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => setActiveTab("results")}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-green-300"></span>
                <span className="font-medium">Test Results</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "profile" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-purple-300"></span>
                <span className="font-medium">Profile</span>
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                  activeTab === "scholarships" 
                    ? "bg-white/20 text-white shadow-lg transform scale-105" 
                    : "hover:bg-white/10 hover:translate-x-1"
                }`}
                onClick={() => setActiveTab("scholarships")}
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:bg-yellow-300"></span>
                <span className="font-medium">Scholarships</span>
              </button>
            </div>

            {/* Quick Actions Section */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Quick Actions
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group hover:bg-white/10 hover:translate-x-1"
              >
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:bg-yellow-300"></span>
                <span className="font-medium">Contact Support</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-x-auto bg-gray-50">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
              Dashboard Overview
            </h2>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Test Status</h3>
                <p className="text-2xl font-bold text-green-600">Completed</p>
                <p className="text-xs text-gray-400 mt-1">Successfully finished</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Personality Type</h3>
                <p className="text-2xl font-bold text-blue-600">{mbtiType || 'N/A'}</p>
                <p className="text-xs text-gray-400 mt-1">Your MBTI result</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Plan</h3>
                <p className="text-2xl font-bold text-purple-600">Premium</p>
                <p className="text-xs text-gray-400 mt-1">Future Fit Premium</p>
              </div>
            </div>

            {/* Quick Actions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                <p className="text-gray-600 mb-4">View your complete personality analysis and career recommendations.</p>
                <button
                  onClick={() => setActiveTab("results")}
                  className="bg-[#14442E] text-white px-6 py-2 rounded-lg hover:bg-[#0f3a26] transition duration-200"
                >
                  View Results
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">Contact our support team for any questions about your results.</p>
                <button
                  onClick={() => router.push("/contact")}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Test Results Tab */}
        {activeTab === "results" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
              Your Test Results
            </h2>
            
            {mbtiType ? (
              <div className="bg-white rounded-lg shadow-md p-8">
                {/* Congratulations Message */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-[#14442E] mb-2">
                    🎉 Congratulations!
                  </h1>
                  <p className="text-gray-600 text-lg">
                    You have successfully completed your personality test.
                  </p>
                </div>

                {/* MBTI Type Display */}
                <div className="bg-[#14442E] text-white rounded-lg p-8 text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-2">Your Personality Type</h2>
                  <p className="text-6xl font-bold tracking-wider">{mbtiType}</p>
                </div>

                {/* WhatsApp Message */}
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-md">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    📱 Full Result on WhatsApp
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Your complete personality report, including detailed insights, strengths, weaknesses, career recommendations, and personalized guidance will be sent to your WhatsApp soon.
                  </p>
                  <p className="text-green-600 text-xs font-medium">
                    Please keep your WhatsApp active to receive your full result.
                  </p>
                </div>

                {/* Additional Info */}
                <div className="text-center text-gray-500 text-sm mt-6">
                  <p>Thank you for choosing Aptitude Counsel! 🌟</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500 mb-4">No test results found. Please complete your test first.</p>
                <button
                  onClick={() => router.push("/future-fit")}
                  className="bg-[#14442E] text-white px-6 py-2 rounded-lg hover:bg-[#0f3a26] transition duration-200"
                >
                  Take Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
              Profile Information
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-900">{user?.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-900">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-900">Student Account</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-900">Future Fit Premium</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Status */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800">Payment Status</h4>
                    <p className="text-sm text-green-600 mt-1">✅ Approved</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">Test Status</h4>
                    <p className="text-sm text-blue-600 mt-1">✅ Completed</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800">Result Status</h4>
                    <p className="text-sm text-purple-600 mt-1">✅ Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === "scholarships" && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
              Scholarship Opportunities
            </h2>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#14442E] opacity-40" />
                <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">
                  Premium Feature
                </p>
                <div className="w-12 h-px bg-[#14442E] opacity-40" />
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exclusive for Future Fit Premium plan users. Discover fully funded scholarships for your education journey.
              </p>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                {
                  id: 1,
                  title: "Fulbright Scholarship Program",
                  description: "Fully funded scholarship for Master's and PhD programs in the USA. Covers tuition, living expenses, airfare, and health insurance for Pakistani students.",
                  category: "Fully Funded",
                  level: "Master's & PhD",
                  icon: <Globe className="w-6 h-6" />
                },
                {
                  id: 2,
                  title: "Commonwealth Scholarships",
                  description: "UK government scholarship for Master's and PhD studies. Provides full tuition fees, living allowance, and travel costs for students from Pakistan.",
                  category: "Fully Funded",
                  level: "Master's & PhD",
                  icon: <Award className="w-6 h-6" />
                },
                {
                  id: 3,
                  title: "Chevening Scholarships",
                  description: "Prestigious UK scholarship for one-year Master's degree. Covers all expenses including tuition, accommodation, and travel for future leaders.",
                  category: "Fully Funded",
                  level: "Master's",
                  icon: <GraduationCap className="w-6 h-6" />
                },
                {
                  id: 4,
                  title: "DAAD Scholarships Germany",
                  description: "German government scholarship for Master's and PhD programs. Offers monthly stipend, health insurance, and travel allowance for Pakistani students.",
                  category: "Fully Funded",
                  level: "Master's & PhD",
                  icon: <BookOpen className="w-6 h-6" />
                },
                {
                  id: 5,
                  title: "Australia Awards Scholarships",
                  description: "Australian government scholarship for undergraduate and postgraduate studies. Covers full tuition, living expenses, and return airfare.",
                  category: "Fully Funded",
                  level: "Bachelor's & Master's",
                  icon: <TrendingUp className="w-6 h-6" />
                }
              ].map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="h-32 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                    <div className="text-white">
                      {scholarship.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Category Badge */}
                    <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {scholarship.category}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#14442E] mb-2">
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
            <div className="bg-[#14442E] text-white rounded-xl p-6 text-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
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
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;