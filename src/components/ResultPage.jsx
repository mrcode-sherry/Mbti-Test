'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ResultPage = () => {
  const [mbtiType, setMbtiType] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
    if (!savedResults.length) {
      router.push('/'); // redirect if no results
      return;
    }

    const latestResult = savedResults[savedResults.length - 1];
    const type = typeof latestResult === 'string' ? latestResult : latestResult.type;
    setMbtiType(type);

    // TODO: Set video link based on type when videos are ready
    // Example: setVideoLink(`https://youtu.be/${type}-video`);
    setVideoLink(null); // No video yet
  }, [router]);

  if (!mbtiType) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Congratulations Message */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#14442E] mb-2">
            🎉 Congratulations!
          </h1>
          <p className="text-gray-600 text-lg">
            You have successfully completed your personality test.
          </p>
        </div>

        {/* MBTI Type Display */}
        <div className="bg-[#14442E] text-white rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your Personality Type</h2>
          <p className="text-6xl font-bold tracking-wider">{mbtiType}</p>
        </div>

        {/* Video Section (Placeholder) */}
        {videoLink ? (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Watch Your Personality Video
            </h3>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Video player will go here */}
              <p className="text-gray-500">Video Player</p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              📹 Video Coming Soon
            </h3>
            <p className="text-blue-700 text-sm">
              Your personalized video explanation will be available shortly.
            </p>
          </div>
        )}

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
        <div className="mt-6 text-gray-500 text-sm">
          <p>Thank you for choosing Aptitude Counsel! 🌟</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
