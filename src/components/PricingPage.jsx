'use client';

import React, { useState, useEffect } from 'react';
import PageBanner from './PageBanner';
import FaqSection from './FaqSection';
import { CheckCircle } from 'lucide-react';
import PaymentProofPopup from './PaymentProofPopup';
import TestPopupForm from './TestPopupForm';
import { useRouter } from 'next/navigation';

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-2 text-gray-700 text-sm">
    <CheckCircle className="text-green-600 mt-1" size={18} />
    {text}
  </li>
);

const PricingPage = () => {
  const [user, setUser] = useState(null);
  const [hasSubmittedTestForm, setHasSubmittedTestForm] = useState(false);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [isProofPopupOpen, setIsProofPopupOpen] = useState(false);
  const [isTestPopupOpen, setIsTestPopupOpen] = useState(false);
  const [proofStatus, setProofStatus] = useState("none");
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // ✅ to know which plan user clicked
  const router = useRouter();

  // ✅ Check if user has submitted popup form
  const refreshSubmissionStatus = async (email) => {
    if (!email) return false;
    try {
      const res = await fetch(`/api/question/check?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      const data = await res.json();
      const exists = data?.success && data.exists;
      setHasSubmittedTestForm(exists);
      if (exists) localStorage.setItem(`testFormFilled:${email}`, 'true');
      return exists;
    } catch {
      const fallback = localStorage.getItem(`testFormFilled:${email}`) === 'true';
      setHasSubmittedTestForm(fallback);
      return fallback;
    }
  };

  // ✅ Check if test is actually completed
  const refreshTestCompletion = async (email) => {
    if (!email) return false;
    try {
      const res = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      const data = await res.json();
      const completed = data?.completed === true;
      setHasCompletedTest(completed);
      return completed;
    } catch {
      setHasCompletedTest(false);
      return false;
    }
  };

  // ✅ Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return;
    try {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (parsed?.email) {
        refreshSubmissionStatus(parsed.email);
        refreshTestCompletion(parsed.email);
        checkProofStatus(parsed.email);
      }
    } catch {
      setUser(null);
      setHasSubmittedTestForm(false);
      setHasCompletedTest(false);
    }
  }, []);

  // ✅ Central Proof Status Checker
  const checkProofStatus = async (email) => {
    if (!email) return "none";
    try {
      const res = await fetch(`/api/screenshotfetch?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      if (!res.ok) return "none";

      const proofData = await res.json();
      if (proofData.success && proofData.data) {
        const proof = proofData.data;
        setProofStatus(proof.status);

        if (proof.status === "approved") {
          refreshTestCompletion(email);
          return "approved";
        }
        return proof.status;
      }
    } catch (err) {
      console.error("Proof check error:", err);
    }
    return "none";
  };

  // ✅ Auto-refresh proof status callback
  const handleProofSubmitted = async () => {
    if (!user?.email) return;
    setProofStatus("pending");
    const interval = setInterval(async () => {
      const status = await checkProofStatus(user.email);
      if (status !== "pending") clearInterval(interval);
    }, 2000);
  };

  // ✅ Handle Plan Selection
  const handlePlanClick = async (planType) => {
    if (!user?.email) {
      router.push('/login');
      return;
    }

    setCheckingStatus(true);
    setSelectedPlan(planType);

    try {
      // ✅ Save selected plan in DB
      await fetch('/api/updateplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, plan: planType }),
      });

      // ✅ Then check form & proof flow
      const submitted = await refreshSubmissionStatus(user.email);
      if (!submitted) {
        setIsProofPopupOpen(false);
        setIsTestPopupOpen(true);
        return;
      }

      const status = await checkProofStatus(user.email);
      if (status === "none") {
        setIsTestPopupOpen(false);
        setIsProofPopupOpen(true);
      }
    } finally {
      setCheckingStatus(false);
    }
  };

  // ✅ Handle Test form submission
  const handleTestFormSubmit = async (formData) => {
    if (!user?.email) return false;
    try {
      const payload = { ...formData, email: user.email };
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setHasSubmittedTestForm(true);
          localStorage.setItem(`testFormFilled:${user.email}`, 'true');
          setIsTestPopupOpen(false);
          setIsProofPopupOpen(true);
          return true;
        }
        throw new Error(data?.message || 'Failed to submit form');
      }

      localStorage.setItem(`testFormFilled:${user.email}`, 'true');
      setHasSubmittedTestForm(true);
      setIsTestPopupOpen(false);
      setIsProofPopupOpen(true);
      return true;
    } catch (err) {
      alert(err.message || 'Something went wrong.');
      return false;
    }
  };

  return (
    <div>
      <PageBanner title="Fees Plan" backgroundImage="/Banners/about-banner.jpg" />

      <section className="bg-gray-100 py-16 md:px-16 px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
            <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">
              Fees Plan
            </p>
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
          </div>
          <p className="text-[29px] md:text-4xl text-[#14442E] font-bold md:w-[1100px] w-full mx-auto mb-4">
            Because the cost of confusion is higher
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:flex md:justify-center md:items-center">

          {/* Standard Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:w-[400px] justify-between h-full">
            <div className="flex flex-col flex-grow">
              <h3 className="text-3xl font-bold text-[#14442E] mb-6 text-center">Standard</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-6 h-80">
                <h4 className="text-lg font-semibold text-[#14442E] mb-4 border-b border-gray-300 pb-2">Benefits</h4>
                <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <FeatureItem text="Report on your Strengths" />
                  <FeatureItem text="Report on your weaknesses " />
                  <FeatureItem text="What is success means to you" />
                  <FeatureItem text="Strategies for your success" />
                  <FeatureItem text="Problematic areas" />
                  <FeatureItem text="Rules for succeed" />
                </ul>
              </div>
              <div className="mt-auto text-center mb-6">
                <h3 className="text-2xl font-bold text-[#14442E] rounded-lg inline-block">Rs. 1000</h3>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => handlePlanClick("standard")}
                disabled={checkingStatus}
                className="bg-[#14442E] hover:bg-[#0f3a26] cursor-pointer hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingStatus && selectedPlan === "standard" ? 'Checking…' : 'Send Screenshot Proof'}
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:w-[400px] justify-between h-full">
            <div className="flex flex-col flex-grow">
              <h3 className="text-3xl font-bold text-[#14442E] mb-6 text-center">Premium</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-6 h-80">
                <h4 className="text-lg font-semibold text-[#14442E] mb-4 border-b border-gray-300 pb-2">Benefits</h4>
                <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                  <FeatureItem text="Report on your Strengths" />
                  <FeatureItem text="Report on your weaknesses " />
                  <FeatureItem text="What is success means to you" />
                  <FeatureItem text="Strategies for your success" />
                  <FeatureItem text="Problematic areas" />
                  <FeatureItem text="Rules for succeed" />
                  <FeatureItem text="Careers" />
                </ul>
              </div>
              <div className="mt-auto text-center mb-6">
                <h3 className="text-2xl font-bold text-[#14442E] rounded-lg inline-block">Rs. 1500</h3>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => handlePlanClick("premium")}
                disabled={checkingStatus}
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg cursor-pointer duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingStatus && selectedPlan === "premium" ? 'Checking…' : 'Send Screenshot Proof'}
              </button>
            </div>
          </div>

        </div>

        {/* ✅ Status Section */}
        {user && (
          <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow rounded-lg text-center">
            {proofStatus === "pending" && (
              <div className="space-y-2">
                <p className="text-yellow-600 font-medium">⏳ Your proof has been submitted. Waiting for admin approval.</p>
                <p className="text-gray-600 text-sm">
                  Your proof has been received and is currently under review. This usually takes a few hours. 
                  If not approved within <strong>24 hours</strong>, please{" "}
                  <a href="/contact" className="text-blue-600 underline">contact us</a>.
                </p>
              </div>
            )}

            {proofStatus === "approved" && !hasCompletedTest && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 text-sm">
                  ✅ Your payment proof has been approved. You can now begin your MBTI test.
                </p>
                <button
                  onClick={() => router.push('/start_test')}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-6 py-2 rounded-lg hover:bg-[#0c2f1e]"
                >
                  Start Test
                </button>
              </div>
            )}
            {proofStatus === "approved" && hasCompletedTest && (
              <div className="text-center space-y-3">
                <p className="text-gray-700 text-sm">
                  🎉 You have successfully completed your MBTI test. Your personalized results are ready.
                </p>
                <button
                  onClick={() => router.push('/result')}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-6 py-2 rounded-lg hover:bg-[#0c2f1e]"
                >
                  View Result
                </button>
              </div>
            )}

            {proofStatus === "rejected" && (
              <button
                onClick={() => handlePlanClick(selectedPlan)}
                className="bg-red-600 hover:bg-red-700 cursor-pointer duration-300 text-white px-6 py-2 rounded-lg"
              >
                Resubmit Proof
              </button>
            )}
          </div>
        )}
      </section>

      <FaqSection />

      {/* ✅ Popups */}
      <TestPopupForm
        isOpen={isTestPopupOpen}
        onClose={() => setIsTestPopupOpen(false)}
        onSubmit={handleTestFormSubmit}
      />
      <PaymentProofPopup
        isOpen={isProofPopupOpen}
        onClose={() => setIsProofPopupOpen(false)}
        userEmail={user?.email || ''}
        onProofSubmitted={handleProofSubmitted}
      />
    </div>
  );
};

export default PricingPage;
