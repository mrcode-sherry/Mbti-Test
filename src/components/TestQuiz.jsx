'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import questionsEn from '../data/questions.en.json';
import questionsUr from '../data/questions.ur.json';
import resultsData from '../data/results.json';

const TestQuiz = () => {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState('en'); // default to English
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDemoPrompt, setShowDemoPrompt] = useState(true); // New: show demo prompt
  const [isSpeaking, setIsSpeaking] = useState(false); // For TTS functionality
  const speechSynthesisRef = useRef(null);
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

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  /* Commented out Urdu language selection for now
  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSelectedOptionIndex(null);
  };
  */

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

  // Text-to-Speech function (English only now)
  const speakQuestionAndOptions = () => {
    // Only works for English now
    if (language !== 'en') return;
    
    if (!speechSynthesisRef.current || isSpeaking) return;

    const questions = getQuestions();
    const currentQuestion = questions[currentIndex];
    
    // Create text to speak: question + all options + examples
    let textToSpeak = language === 'en' 
      ? `Question: ${currentQuestion.title}. ` 
      : `${currentQuestion.title}۔ `;
    
    currentQuestion.options.forEach((option, index) => {
      const optionText = language === 'en' ? 'Option' : 'اختیار';
      const exampleText = language === 'en' ? 'Example' : 'مثال';
      textToSpeak += language === 'en' 
        ? `${optionText} ${index + 1}: ${option.text}. ${exampleText}: ${option.example}. `
        : `${optionText} ${index + 1}: ${option.text}۔ ${exampleText}: ${option.example}۔ `;
    });

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
    utterance.rate = language === 'en' ? 1 : 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current.speak(utterance);
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
            body: JSON.stringify({ email: user.email, answers: selectedAnswers, result }),
          });

          const prevResults = JSON.parse(localStorage.getItem('testResults') || '[]');
          prevResults.push(result);
          localStorage.setItem('testResults', JSON.stringify(prevResults));
          localStorage.setItem('testResult', result);

          router.push('/result');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        console.error('Test submission failed', err);
        setLoading(false);
      }
    }
  };

  if (!isClient) return null;

  // New: Show Demo Class prompt
  if (showDemoPrompt) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-black mb-4">Watch Demo Class</h2>
        <p className="text-sm text-gray-500 mb-6">
          Before starting the test, you can watch a demo class or skip it to start the quiz.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => alert('Demo video will be added here later')}
            className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg cursor-pointer duration-300"
          >
            Watch Demo
          </button>
          <button
            onClick={() => setShowDemoPrompt(false)}
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-lg cursor-pointer duration-300"
          >
            Skip Demo
          </button>
        </div>
      </div>
    );
  }

  /* Commented out language selection UI for now
  if (!language) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold text-black mb-4">Select Language</h2>
        <p className="text-sm text-gray-500 mb-6">Once selected, test will begin and can't be repeated.</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => handleLanguageSelect('en')} className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg cursor-pointer duration-300">
            English
          </button>
          <button onClick={() => handleLanguageSelect('ur')} className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-6 py-2 rounded-lg cursor-pointer duration-300 urdu-font">
            اردو
          </button>
        </div>
      </div>
    );
  }
  */

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
  const directionClass = 'text-left';

  const checklist =
    language === 'en'
      ? [
          'Be Honest with Yourself',
          'Think About Your Natural Self',
          'No Right or Wrong Answers',
          'Stay Relaxed & Focused',
        ]
      : [
          '70 کثیر echang سوالات',
          'ازدواجی حیثیت اور زبان منتخب کریں',
          'نتیجہ پی ڈی ایف اور ویڈیو فارمیٹ میں',
          '16 Aptitude Counsel شخصیات کی بنیاد پر نتیجہ',
        ];

  return (
    <div
      className={`max-w-4xl mx-auto bg-white mt-6 p-4 sm:p-6 md:p-8 rounded-xl shadow-md ${directionClass}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
        <p className="text-sm text-gray-500">
          Language:{' '}
          <strong className={isUrdu ? 'urdu-font' : ''}>
            {language === 'en' ? 'English' : 'اردو'}
          </strong>
        </p>
        <p className="text-sm text-gray-600">
          Progress: {currentIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="grid gap-3 mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg">
        <h1 className="text-lg pb-2 border-b text-[#14442E] font-medium">
          4 Important Points Before Taking the personality Test
        </h1>
        {checklist.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start sm:items-center gap-2 text-green-700 font-medium ${
              isUrdu ? 'flex-row-reverse text-right urdu-font' : ''
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-green-700 flex-shrink-0">
              ✓
            </span>
            <p className="text-sm sm:text-base">{item}</p>
          </div>
        ))}
      </div>

      <div className={`flex items-start gap-2 mb-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
        <h3
          className={`text-lg sm:text-xl font-semibold text-gray-700 ${
            isUrdu ? 'urdu-font' : ''
          }`}
        >
          {currentQuestion.title}
        </h3>
        <button
          onClick={speakQuestionAndOptions}
          disabled={isSpeaking}
          className={`self-start mt-1 ${
            isSpeaking ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
          }`}
          aria-label={language === 'en' ? 'Listen to question' : 'سوال سنیں'}
        >
          {isSpeaking ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option, index)}
            className={`cursor-pointer border rounded-xl p-4 sm:p-5 transition ${
              selectedOptionIndex === index
                ? 'border-green-700 shadow-md'
                : 'border-gray-300'
            }`}
          >
            <div
              className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${
                isUrdu ? 'flex-row-reverse urdu-font' : ''
              }`}
            >
              <div className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-green-700 flex items-center justify-center">
                {selectedOptionIndex === index && (
                  <div className="w-2 h-2 rounded-full bg-green-700" />
                )}
              </div>
              <p className="font-medium text-sm sm:text-base text-gray-700">
                {option.text}
              </p>
            </div>
            <div className="bg-gray-100 p-3 sm:p-5 rounded-lg text-xs sm:text-sm text-gray-600">
              <p className="font-semibold mb-1">
                {language === 'en' ? 'Example:' : 'مثال:'}
              </p>
              <p className={isUrdu ? 'urdu-font' : ''}>{option.example}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedOptionIndex !== null && (
        <div className={`flex ${isUrdu ? 'justify-start' : 'justify-end'} mt-6 sm:mt-8`}>
          <button
            onClick={handleNext}
            className="bg-[#14442E] hover:bg-[#0f3a26] text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base cursor-pointer duration-300"
          >
            {currentIndex + 1 < questions.length
              ? language === 'en'
                ? 'Next'
                : 'اگلا'
              : language === 'en'
              ? 'Finish'
              : 'ختم'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestQuiz;
