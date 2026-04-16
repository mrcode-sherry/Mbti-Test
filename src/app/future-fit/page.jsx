'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryPage from '@/components/CategoryPage';
import { Users, BookOpen, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import PaymentProofPopup from '@/components/PaymentProofPopup';
import TestPopupForm from '@/components/TestPopupForm';

const FeatureItem = ({ text }) => (
  <li className="flex items-start gap-2 text-gray-700 text-sm">
    <CheckCircle className="text-green-600 mt-1" size={18} />
    {text}
  </li>
);

const FutureFitPage = () => {
  const [user, setUser] = useState(null);
  const [hasSubmittedTestForm, setHasSubmittedTestForm] = useState(false);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);
  const [isProofPopupOpen, setIsProofPopupOpen] = useState(false);
  const [isTestPopupOpen, setIsTestPopupOpen] = useState(false);
  const [proofStatus, setProofStatus] = useState("none");
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [hasUploadedProof, setHasUploadedProof] = useState(false);
  const [showPricingCard, setShowPricingCard] = useState(true); // New state for pricing card visibility
  const [showWaitingPopup, setShowWaitingPopup] = useState(false); // New state for waiting popup
  const router = useRouter();

  // Check if user has submitted popup form
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

  // Check if test is actually completed
  const refreshTestCompletion = async (email) => {
    if (!email) return false;
    try {
      const res = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      const data = await res.json();
      const completed = data?.completed === true && data?.result;
      setHasCompletedTest(completed);
      return completed;
    } catch {
      setHasCompletedTest(false);
      return false;
    }
  };

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return;
    try {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (parsed?.email) {
        refreshSubmissionStatus(parsed.email).then(formSubmitted => {
          refreshTestCompletion(parsed.email);
          checkProofStatus(parsed.email).then(proofStat => {
            updatePricingCardVisibility(proofStat, formSubmitted);
          });
        });
      }
    } catch {
      setUser(null);
      setHasSubmittedTestForm(false);
      setHasCompletedTest(false);
    }
  }, []);

  // Watch for changes in proof status and form submission to update pricing card visibility
  useEffect(() => {
    updatePricingCardVisibility(proofStatus, hasSubmittedTestForm);
  }, [proofStatus, hasSubmittedTestForm]);

  // Central Proof Status Checker
  const checkProofStatus = async (email) => {
    if (!email) return "none";
    try {
      const res = await fetch(`/api/screenshotfetch?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
      if (!res.ok) return "none";

      const proofData = await res.json();
      if (proofData.success && proofData.data) {
        const proof = proofData.data;
        setProofStatus(proof.status);
        setHasUploadedProof(true);

        // Update pricing card visibility based on proof status and form submission
        updatePricingCardVisibility(proof.status, hasSubmittedTestForm);

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

  // Update pricing card visibility logic
  const updatePricingCardVisibility = (proofStat, formSubmitted) => {
    // Show pricing card only if:
    // 1. No proof uploaded yet (proofStat === "none")
    // 2. OR proof was rejected (proofStat === "rejected")
    // Hide pricing card if:
    // 1. Proof uploaded and form submitted (pending/approved status)
    
    if (proofStat === "none" || proofStat === "rejected") {
      setShowPricingCard(true);
    } else if ((proofStat === "pending" || proofStat === "approved") && formSubmitted) {
      setShowPricingCard(false);
    }
  };

  // Auto-refresh proof status callback
  const handleProofSubmitted = async () => {
    if (!user?.email) return;
    setHasUploadedProof(true);
    setIsProofPopupOpen(false);
    setIsTestPopupOpen(true);
    // Don't hide pricing card yet - wait for form submission
  };

  // Handle Start Test button clicks with different logic based on user status
  const handleStartTestClick = () => {
    // If user not logged in, redirect to login
    if (!user?.email) {
      router.push('/login');
      return;
    }

    // If no proof uploaded yet, scroll to pricing card
    if (!hasUploadedProof && proofStatus === "none") {
      const pricingSection = document.querySelector('[data-pricing-section]');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // If proof submitted and form filled but waiting for approval
    if (proofStatus === "pending" && hasSubmittedTestForm) {
      setShowWaitingPopup(true);
      return;
    }

    // If approved, redirect to start test
    if (proofStatus === "approved") {
      router.push('/start_test');
      return;
    }

    // Default case - scroll to pricing card
    const pricingSection = document.querySelector('[data-pricing-section]');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Plan Selection
  const handlePlanClick = async () => {
    if (!user?.email) {
      router.push('/login');
      return;
    }

    setCheckingStatus(true);

    try {
      // Save selected plan in DB (premium for Future Fit)
      await fetch('/api/updateplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, plan: "premium" }),
      });

      // Check if screenshot uploaded first
      const status = await checkProofStatus(user.email);
      
      if (!hasUploadedProof && status === "none") {
        setIsTestPopupOpen(false);
        setIsProofPopupOpen(true);
        return;
      }

      // Screenshot uploaded → Check if form submitted
      const submitted = await refreshSubmissionStatus(user.email);
      if (!submitted) {
        setIsProofPopupOpen(false);
        setIsTestPopupOpen(true);
        return;
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
          setHasSubmittedTestForm(true);
          localStorage.setItem(`testFormFilled:${user.email}`, 'true');
          setIsTestPopupOpen(false);
          setProofStatus("pending");
          // Hide pricing card after form submission
          updatePricingCardVisibility("pending", true);
          // Show waiting popup immediately after form submission
          setShowWaitingPopup(true);
          // ✅ Force page refresh to update navbar status
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Delay to show popup first
          return true;
        }
        throw new Error(data?.message || 'Failed to submit form');
      }

      localStorage.setItem(`testFormFilled:${user.email}`, 'true');
      setHasSubmittedTestForm(true);
      setIsTestPopupOpen(false);
      setProofStatus("pending");
      // Hide pricing card after form submission
      updatePricingCardVisibility("pending", true);
      // Show waiting popup immediately after form submission
      setShowWaitingPopup(true);
      // ✅ Force page refresh to update navbar status
      setTimeout(() => {
        window.location.reload();
      }, 2000); // Delay to show popup first
      return true;
    } catch (err) {
      alert(err.message || 'Something went wrong.');
      return false;
    }
  };

  const futureFitData = {
    title: "Find Your Best Career Fit",
    subtitle: "A short assessment that helps you choose the right stream, subjects, and career direction after Matric, Inter, or A-Levels.",
    heroImage: "/future/hero.webp",
    targetAudience: [
      { 
        icon: Users, 
        title: "Matric / O-Levels students", 
        subtitle: "Helping you choose the right stream and subjects for your next big step." 
      },
      { 
        icon: BookOpen, 
        title: "Inter / A-Levels students", 
        subtitle: "Guiding your university and career choices with clarity and confidence." 
      },
      { 
        icon: Award, 
        title: "Parents", 
        subtitle: "Giving you insights to support your child's future with data-driven advice." 
      }
    ],
    assessmentChecks: [], // Hide this section
    pathways: [], // Hide this section
    reportFeatures: [
      "Top 5 career fields",
      "Stream/subject guidance (FSC/A-Levels)",
      "Career environment fit",
      "Study plan tips",
      "4-8 week roadmap",
      "Parent-friendly summary"
    ],
    realityCheck: [
      "Your interests and strengths evolve.",
      "Career paths are rarely linear.",
      "Exploration is key to success."
    ],
    howItWorks: [
      { icon: Target, title: "Take the test", subtitle: "Complete the 10-12 minute online assessment." },
      { icon: BookOpen, title: "Get your report", subtitle: "Receive a comprehensive, instant career report." },
      { icon: TrendingUp, title: "Follow your roadmap", subtitle: "Use the actionable steps to plan your future." }
    ],
    ctaTitle: "Ready to discover your Future Fit?",
    ctaSubtitle: "Take the first step towards your future with our comprehensive career assessment",
    ctaButtonText: "Start Future Fit Test"
  };

  return (
    <div>
      {/* CategoryPage with pricing and status sections inserted after hero */}
      <CategoryPage 
        {...futureFitData} 
        onStartTestClick={handleStartTestClick}
        pricingSection={showPricingCard && (
          <section className="bg-gray-100 py-16 md:px-16 px-8" data-pricing-section>
            {/* Status Message - Above pricing card */}
            {user && !hasUploadedProof && proofStatus === "none" && !hasSubmittedTestForm && (
              <div className="max-w-3xl mx-auto mb-12 text-center">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                  <p className="text-blue-800 font-medium">📸 Please upload your payment screenshot</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Click "Get Started" button below to upload your payment proof and continue.
                  </p>
                </div>
              </div>
            )}

            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-12 h-px bg-[#14442E] opacity-40" />
                <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">
                  Future Fit Plan
                </p>
                <div className="w-12 h-px bg-[#14442E] opacity-40" />
              </div>
              <p className="text-[29px] md:text-4xl text-[#14442E] font-bold md:w-[1100px] w-full mx-auto mb-4">
                Invest in Your Future Today
              </p>
            </div>

            {/* Pricing Card */}
            <div className="flex justify-center">
              <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:w-[400px] justify-between h-full">
                <div className="flex flex-col flex-grow">
                  <h3 className="text-3xl font-bold text-[#14442E] mb-6 text-center">Future Fit Premium</h3>
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 h-[430px] md:h-[385px]">
                    <h4 className="text-lg font-semibold text-[#14442E] mb-4 border-b border-gray-300 pb-2">Benefits</h4>
                    <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                      <FeatureItem text="Report on your Strengths" />
                      <FeatureItem text="Report on your weaknesses" />
                      <FeatureItem text="What success means to you" />
                      <FeatureItem text="Strategies for your success" />
                      <FeatureItem text="Problematic areas" />
                      <FeatureItem text="Rules for success" />
                      <FeatureItem text="Career recommendations" />
                      <FeatureItem text="Scholarships guidance" />
                      <FeatureItem text="Career roadmap" />
                    </ul>
                  </div>
                  <div className="mt-auto text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#14442E] rounded-lg inline-block">
                      Rs. 3000
                    </h3>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handlePlanClick}
                    disabled={checkingStatus}
                    className="bg-[#14442E] hover:bg-[#0f3a26] cursor-pointer hover:shadow-lg duration-500 hover:scale-105 text-white px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {checkingStatus ? 'Processing...' : 'Get Started'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        statusSection={user && (
          <section className="py-12 md:px-16 px-8">
            <div className="max-w-3xl mx-auto text-center">
              {hasUploadedProof && !hasSubmittedTestForm && proofStatus !== "pending" && proofStatus !== "approved" && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6">
                  <p className="text-green-800 font-medium">📝 Please complete the form</p>
                  <p className="text-green-700 text-sm mt-1">
                    Click "Get Started" button above to fill the form and complete your registration.
                  </p>
                </div>
              )}

              {proofStatus === "pending" && hasSubmittedTestForm && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-6">
                  <p className="text-yellow-600 font-medium">⏳ Your proof has been submitted. Waiting for admin approval.</p>
                  <p className="text-gray-600 text-sm mt-2">
                    Your proof has been received and is currently under review. This usually takes a few hours.
                    If not approved within <strong>24 hours</strong>, please{" "}
                    <a href="/contact" className="text-blue-600 underline">contact us</a>.
                  </p>
                </div>
              )}

              {proofStatus === "approved" && !hasCompletedTest && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md mb-6">
                  <p className="text-green-800 font-medium mb-3">
                    ✅ Your payment proof has been approved. You can now begin your test.
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
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
                  <p className="text-blue-800 font-medium mb-3">
                    🎉 You have successfully completed your test. Your personalized results are ready.
                  </p>
                  <button
                    onClick={() => router.push('/student-dashboard')}
                    className="bg-[#14442E] cursor-pointer duration-300 text-white px-6 py-2 rounded-lg hover:bg-[#0c2f1e]"
                  >
                    View Dashboard
                  </button>
                </div>
              )}

              {proofStatus === "rejected" && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
                  <p className="text-red-600 font-medium mb-3">❌ Your proof was rejected. Please resubmit with correct payment details.</p>
                  <button
                    onClick={handlePlanClick}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer duration-300 text-white px-6 py-2 rounded-lg"
                  >
                    Resubmit Proof
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      />

      {/* Popups */}
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

      {/* Waiting for Approval Popup - Enhanced Design */}
      {showWaitingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-4xl">⏳</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Wait for Admin Approval</h3>
            </div>
            
            {/* Content */}
            <div className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-4"></div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Your payment proof is currently under review. Please wait for admin approval before starting the test.
                </p>
              </div>
              
              {/* Info box */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-600 text-xl">💡</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800 font-medium">What happens next?</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Our admin team will review your payment proof within 24 hours. You'll receive a notification once approved.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Action button */}
              <button
                onClick={() => setShowWaitingPopup(false)}
                className="bg-gradient-to-r from-[#14442E] to-[#0f3a26] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105"
              >
                Got it, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureFitPage;