'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Dummy questions (10 questions per language for now)
const dummyQuestions = {
  en: Array.from({ length: 10 }, (_, i) => ({
    title: `Sample Question ${i + 1}: What would you prefer?`,
    options: ['Option A', 'Option B'],
    examples: ['You like to plan ahead and follow structure.', 'You prefer flexibility and spontaneity.']
  })),
  ur: Array.from({ length: 10 }, (_, i) => ({
    title: `مثال سوال ${i + 1}: آپ کیا پسند کریں گے؟`,
    options: ['آپشن A', 'آپشن B'],
    examples: ['آپ منصوبہ بندی اور نظم و ضبط کو ترجیح دیتے ہیں۔', 'آپ لچک اور بے ساختگی کو پسند کرتے ہیں۔']
  }))
};

const TestQuiz = () => {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSelectedOptionIndex(null);
  };

  const handleOptionSelect = (option, index) => {
    setSelectedOptionIndex(index);
    const updated = [...selectedAnswers];
    updated[currentIndex] = option;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex + 1 < dummyQuestions[language].length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push('/result');
      }, 2000);
    }
  };

  if (!isClient) return null;

  if (!language) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Select Language</h2>
        <p className="text-sm text-gray-500 mb-6">Once selected, test will begin and can't be repeated.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleLanguageSelect('en')}
            className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg cursor-pointer duration-500 hover:scale-105 text-white px-6 py-2 rounded-lg transition"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect('ur')}
            className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg cursor-pointer duration-500 hover:scale-105 text-white px-6 py-2 rounded-lg transition"
          >
            اردو
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50" />
        <p className="text-lg">Processing your result...</p>
      </div>
    );
  }

  const currentQuestion = dummyQuestions[language][currentIndex];

  return (
    <div className="max-w-4xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-md">
      <div className="flex justify-between mb-6">
        <p className="text-sm text-gray-500">
          Language: <strong>{language === 'en' ? 'English' : 'اردو'}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Progress: {currentIndex + 1} out of {dummyQuestions[language].length}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-6">{currentQuestion.title}</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option, index)}
            className={`cursor-pointer border rounded-xl p-5 transition ${
              selectedOptionIndex === index ? 'border-green-700 shadow-md' : 'border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full border-2 border-green-700 flex items-center justify-center">
                {selectedOptionIndex === index && (
                  <div className="w-2 h-2 rounded-full bg-green-700" />
                )}
              </div>
              <p className="font-medium">{option}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-1">
                {language === 'en' ? 'Example for this option:' : 'اس آپشن کی مثال:'}
              </p>
              <p>{currentQuestion.examples[index]}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedOptionIndex !== null && (
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            className="bg-[#14442E] hover:bg-[#0f3a26] hover:shadow-lg cursor-pointer duration-500 hover:scale-105 text-white px-6 py-2 rounded-lg transition"
          >
            {currentIndex + 1 < dummyQuestions[language].length ? 'Next' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestQuiz;
