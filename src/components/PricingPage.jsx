'use client';

import React, { useState, useEffect } from 'react';
import PageBanner from './PageBanner';
import FaqSection from './FaqSection';
import { CheckCircle, X } from 'lucide-react';
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
  const [hasSubmittedTestForm, setHasSubmittedTestForm] = useState(false); // popup form
  const [hasCompletedTest, setHasCompletedTest] = useState(false); // actual test
  const [isProofPopupOpen, setIsProofPopupOpen] = useState(false);
  const [isTestPopupOpen, setIsTestPopupOpen] = useState(false);
  const [isWaitPopupOpen, setIsWaitPopupOpen] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
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
    } catch (err) {
      console.warn("Test form check failed, using localStorage fallback", err);
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
    } catch (err) {
      console.warn("Test completion check failed", err);
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

        if (proof.status === "approved") {
          // ✅ Check if test is completed
          const testRes = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(email)}`);
          const testData = await testRes.json();

          if (testData.completed) {
            router.push("/result");
          } else {
            router.push("/start_test");
          }

          return "approved";
        }

        if (proof.status === "pending") {
          setIsWaitPopupOpen(true);
          return "pending";
        }

        if (proof.status === "rejected") {
          alert("❌ Your proof was rejected. Please re-submit or contact support.");
          return "rejected";
        }
      }
    } catch (err) {
      console.error("Proof check error:", err);
    }

    return "none";
  };

  // ✅ Handle Send Proof Button Click
  const handleSendProofClick = async () => {
    if (!user?.email) {
      router.push('/login');
      return;
    }

    if (checkingStatus) return; // prevent double clicks
    setCheckingStatus(true);
    try {
      // 1. Check if test form is submitted
      const submitted = await refreshSubmissionStatus(user.email);
      if (!submitted) {
        setIsProofPopupOpen(false);
        setIsTestPopupOpen(true);
        return;
      }

      // 2. Check proof status
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
      <PageBanner title="Pricing Plan" backgroundImage="/Banners/about-banner.jpg" />

      <section className="bg-gray-100 py-16 px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
            <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">
              Pricing Plan
            </p>
            <div className="w-12 h-px bg-[#14442E] opacity-40" />
          </div>
          <p className="text-3xl md:text-5xl font-bold md:w-[1100px] w-full mx-auto mb-4">
            Start Your{' '}
            <span className="text-green-700 font-semibold underline">MBTI Test</span> With Flexible
            Payment Options
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Card */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Start Your MBTI Test</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Our test is based on 70 scientifically designed MCQs. It will help you understand
                your unique personality type and behavior patterns.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="70 Multiple Choice Questions" />
                <FeatureItem text="Choose Marital Status & Language" />
                <FeatureItem text="Result in PDF & Animated Video Format" />
                <FeatureItem text="Result Based on 16 MBTI Personality Types" />
              </ul>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Standard Plan - Rs. 1000</h3>
              <ul className="space-y-3 mb-6">
                <FeatureItem text="Full MBTI Test (70 Questions)" />
                <FeatureItem text="PDF Personality Report" />
                <FeatureItem text="Animated Video Result" />
                <FeatureItem text="16 Personality Types Explained" />
                <FeatureItem text="Access on Any Device" />
              </ul>
              <div className="text-center text-gray-700 text-sm space-y-2 mb-4">
                <div>
                  <span className="font-semibold">JazzCash:</span> 0301-2345678 <br />
                  <span className="text-gray-500 text-xs">Ali Raza</span>
                </div>
                <div>
                  <span className="font-semibold">EasyPaisa:</span> 0321-9876543 <br />
                  <span className="text-gray-500 text-xs">Hassan Shah</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleSendProofClick}
                disabled={checkingStatus}
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingStatus ? 'Checking…' : 'Send Screenshot Proof'}
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold text-[#14442E] mb-4">Premium Plan - Rs. 1500</h3>
              <ul className="space-y-3 mb-6">
                <FeatureItem text="All Standard Features" />
                <FeatureItem text="Advanced Personality Insights" />
                <FeatureItem text="Career Recommendation Report" />
                <FeatureItem text="Downloadable Certificate" />
                <FeatureItem text="Priority Support" />
              </ul>
              <div className="text-center text-gray-700 text-sm space-y-2 mb-4">
                <div>
                  <span className="font-semibold">JazzCash:</span> 0301-2345678 <br />
                  <span className="text-gray-500 text-xs">Ali Raza</span>
                </div>
                <div>
                  <span className="font-semibold">EasyPaisa:</span> 0321-9876543 <br />
                  <span className="text-gray-500 text-xs">Hassan Shah</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleSendProofClick}
                disabled={checkingStatus}
                className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkingStatus ? 'Checking…' : 'Send Screenshot Proof'}
              </button>
            </div>
          </div>
        </div>
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
      />

      {/* ✅ Wait Popup */}
      {isWaitPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsWaitPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Proof Submitted</h2>
            <p className="text-gray-600 text-sm mb-6">
              ⏳ Your proof has been submitted. Please wait for admin approval within 24 hours. <br />
              If not approved, you can try re-submitting or{' '}
              <button
                onClick={() => router.push('/contact')}
                className="text-blue-600 underline"
              >
                contact us
              </button>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
