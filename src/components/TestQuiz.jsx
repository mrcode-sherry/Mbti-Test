'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Import your actual JSON files
import questionsEn from '../data/questions.en.json'; // English questions
import questionsUr from '../data/questions.ur.json'; // Urdu questions
import resultsData from '../data/results.json'; // Result mapping

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

    const checkTestCompletion = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.email) {
        try {
          const res = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          if (data.completed) router.push('/result');
        } catch (err) {
          console.error('Error checking test submission:', err);
        }
      }
    };

    checkTestCompletion();
  }, [router]);

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

  const getQuestions = () => (language === 'en' ? questionsEn : questionsUr);

  const calculateResult = () => {
    const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    selectedAnswers.forEach(ans => {
      if (ans.dimension && counts.hasOwnProperty(ans.dimension)) {
        counts[ans.dimension]++;
      }
    });

    return (
      (counts.E >= counts.I ? 'E' : 'I') +
      (counts.S >= counts.N ? 'S' : 'N') +
      (counts.T >= counts.F ? 'T' : 'F') +
      (counts.J >= counts.P ? 'J' : 'P')
    );
  };

  const handleNext = async () => {
    const questions = getQuestions();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.email) {
          const result = calculateResult();

          await fetch('/api/testSubmission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, answers: selectedAnswers, result })
          });

          const prevResults = JSON.parse(localStorage.getItem('testResults') || '[]');
          prevResults.push(result);
          localStorage.setItem('testResults', JSON.stringify(prevResults));
          localStorage.setItem('testResult', result);

          router.push('/result');
        }
      } catch (err) {
        console.error('Test submission failed', err);
        setLoading(false);
      }
    }
  };

  if (!isClient) return null;

  if (!language) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Select Language</h2>
        <p className="text-sm text-gray-500 mb-6">Once selected, test will begin and can't be repeated.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => handleLanguageSelect('en')} className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg">
            English
          </button>
          <button onClick={() => handleLanguageSelect('ur')} className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg">
            اردو
          </button>
        </div>
      </div>
    );
  }

  const questions = getQuestions();
  const currentQuestion = questions[currentIndex];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-opacity-50" />
        <p className="text-lg">Processing your result...</p>
      </div>
    );
  }

  const isUrdu = language === 'ur';
  const directionClass = isUrdu ? 'text-right' : 'text-left';

  // ✅ Checklist points (English/Urdu)
  const checklist = language === 'en'
    ? [
        "70 Multiple Choice Questions",
        "Choose Marital Status & Language",
        "Result in PDF & Animated Video Format",
        "Based on 16 MBTI Personality Types"
      ]
    : [
        "70 کثیر الانتخاب سوالات",
        "ازدواجی حیثیت اور زبان منتخب کریں",
        "نتیجہ پی ڈی ایف اور ویڈیو فارمیٹ میں",
        "16 MBTI شخصیات کی بنیاد پر نتیجہ"
      ];

  return (
    <div className={`max-w-4xl mx-auto bg-white mt-10 p-8 rounded-xl shadow-md ${directionClass}`}>
      <div className="flex justify-between mb-6">
        <p className="text-sm text-gray-500">
          Language: <strong>{language === 'en' ? 'English' : 'اردو'}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Progress: {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* ✅ Checklist block with RTL support */}
      <div className="grid md:grid-cols-1 gap-3 mb-6 bg-gray-100 p-4 rounded-lg">
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 text-green-700 font-medium ${
              isUrdu ? 'flex-row-reverse text-right' : ''
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-green-700">
              ✓
            </span>
            <p>{item}</p>
          </div>
        ))}
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
            <div className={`flex items-center gap-3 mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-green-700 flex items-center justify-center">
                {selectedOptionIndex === index && <div className="w-2 h-2 rounded-full bg-green-700" />}
              </div>
              <p className="font-medium">{option.text}</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg text-sm text-gray-600">
              <p className="font-semibold mb-1">{language === 'en' ? 'Example:' : 'مثال:'}</p>
              <p>{option.example}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedOptionIndex !== null && (
        <div className={`flex ${isUrdu ? 'justify-start' : 'justify-end'} mt-8`}>
          <button onClick={handleNext} className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg">
            {currentIndex + 1 < questions.length ? 'Next' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestQuiz;
