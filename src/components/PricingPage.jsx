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
  const [hasSubmittedTest, setHasSubmittedTest] = useState(false);
  const [isProofPopupOpen, setIsProofPopupOpen] = useState(false);
  const [isTestPopupOpen, setIsTestPopupOpen] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const router = useRouter();

  // Check if user has submitted test
  const refreshSubmissionStatus = async (email) => {
    if (!email) return false;
    try {
      const res = await fetch(`/api/question/check?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      const data = await res.json();
      const exists = data?.success && data.exists;
      setHasSubmittedTest(exists);
      if (exists) localStorage.setItem(`testFormFilled:${email}`, 'true');
      return exists;
    } catch {
      const fallback = localStorage.getItem(`testFormFilled:${email}`) === 'true';
      setHasSubmittedTest(fallback);
      return fallback;
    }
  };

  // Load user and check test submission status
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return;
    try {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (parsed?.email) refreshSubmissionStatus(parsed.email);
    } catch {
      setUser(null);
      setHasSubmittedTest(false);
    }
  }, []);

  // Handle "Send Screenshot Proof" click
  const handleSendProofClick = async () => {
    if (!user?.email) {
      router.push('/login');
      return;
    }

    setCheckingStatus(true);
    try {
      const submitted = await refreshSubmissionStatus(user.email);
      if (submitted) {
        setIsTestPopupOpen(false);
        setIsProofPopupOpen(true);
      } else {
        setIsProofPopupOpen(false);
        setIsTestPopupOpen(true);
      }
    } finally {
      setCheckingStatus(false);
    }
  };

  // Handle Test form submission
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
          setHasSubmittedTest(true);
          localStorage.setItem(`testFormFilled:${user.email}`, 'true');
          setIsTestPopupOpen(false);
          setIsProofPopupOpen(true);
          return true;
        }
        throw new Error(data?.message || 'Failed to submit form');
      }

      localStorage.setItem(`testFormFilled:${user.email}`, 'true');
      setHasSubmittedTest(true);
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
    </div>
  );
};

export default PricingPage;
