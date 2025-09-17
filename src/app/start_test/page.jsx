import React from 'react';
import TestQuiz from '@/components/TestQuiz';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 md:px-16 px-8 pb-20">
      <div className="text-center pt-10">
        <h1 className="text-[29px] md:text-4xl text-[#14442E] tracking-wide font-bold">Start Your Aptitude Counsel Test</h1>
        <p className="text-gray-500 mt-2 text-sm">Answer all questions honestly. Each question appears once.</p>
      </div>
      <TestQuiz />
    </div>
  );
};

export default TestPage;
