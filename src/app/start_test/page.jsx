import React from 'react';
import TestQuiz from '@/components/TestQuiz';

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="text-center pt-10">
        <h1 className="text-3xl font-bold">Start Your MBTI Test</h1>
        <p className="text-gray-500 mt-2 text-sm">Answer all questions honestly. Each question appears once.</p>
      </div>
      <TestQuiz />
    </div>
  );
};

export default TestPage;
