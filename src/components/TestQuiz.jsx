'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import questionsEn from '../data/questions.en.json';
import questionsUr from '../data/questions.ur.json';
import questionsRoman from '../data/questions.roman.json';
import resultsData from '../data/results.json';

const TestQuiz = () => {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState(null); // Start with no language selected
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Track all selected languages
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(true); // Show language selection first
  const [isSpeaking, setIsSpeaking] = useState(false); // For TTS functionality
  const speechSynthesisRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    const checkTestCompletion = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.email) {
        try {
          const res = await fetch(`/api/testSubmission/check?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          if (data.completed && data.result) {
            // User has already completed test, redirect to dashboard
            router.push('/student-dashboard');
          }
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

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setSelectedOptionIndex(null);
    setShowLanguageSelection(false);
  };

  const handleLanguageSwitch = (lang) => {
    setLanguage(lang);
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
    setSelectedOptionIndex(null);
  };

  const handleOptionSelect = (option, index) => {
    setSelectedOptionIndex(index);
    const updated = [...selectedAnswers];
    updated[currentIndex] = option;
    setSelectedAnswers(updated);
  };

  const getQuestions = () => {
    switch(language) {
      case 'en': return questionsEn;
      case 'ur': return questionsUr;
      case 'roman': return questionsRoman;
      default: return questionsEn;
    }
  };

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
    let textToSpeak = `Question: ${currentQuestion.title}. `;
    
    currentQuestion.options.forEach((option, index) => {
      textToSpeak += `Option ${index + 1}: ${option.text}. Example: ${option.example}. `;
    });

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 1;
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

          // Save to database with result, answers, and selected languages
          const response = await fetch('/api/testSubmission', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: user.email, 
              answers: selectedAnswers, 
              result: result,
              languages: selectedLanguages // Save all selected languages
            }),
          });

          const data = await response.json();
          
          if (data.success) {
            // Also save to localStorage as backup
            const prevResults = JSON.parse(localStorage.getItem('testResults') || '[]');
            prevResults.push(result);
            localStorage.setItem('testResults', JSON.stringify(prevResults));
            localStorage.setItem('testResult', result);

            router.push('/student-dashboard');
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            throw new Error(data.message || 'Failed to save test result');
          }
        }
      } catch (err) {
        console.error('Test submission failed', err);
        alert('Failed to save test result. Please try again.');
        setLoading(false);
      }
    }
  };

  if (!isClient) return null;

  // Language Selection Screen
  if (showLanguageSelection) {
    return (
      <div className="max-w-4xl mx-auto bg-white mt-6 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#14442E] mb-4">Select Your Language</h2>
          <p className="text-gray-600 mb-6">
            Choose your preferred language for the personality test. You can switch languages during the test if needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* English */}
          <div 
            onClick={() => handleLanguageSelect('en')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">EN</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">English</h3>
              <div className="bg-white rounded-lg p-4 text-left">
                <p className="text-sm text-gray-700 font-medium mb-2">Sample Question:</p>
                <p className="text-sm text-gray-600 italic">
                  "When I have free time I prefer to spend time with friends or family"
                </p>
              </div>
            </div>
          </div>

          {/* Urdu */}
          <div 
            onClick={() => handleLanguageSelect('ur')}
            className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">اردو</span>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">اردو</h3>
              <div className="bg-white rounded-lg p-4 text-right">
                <p className="text-sm text-gray-700 font-medium mb-2">نمونہ سوال:</p>
                <p className="text-sm text-gray-600 italic">
                  "جب مجھے فارغ وقت ملتا ہے تو میں دوستوں یا خاندان کے ساتھ وقت گزارنا پسند کرتا ہوں"
                </p>
              </div>
            </div>
          </div>

          {/* Roman Urdu */}
          <div 
            onClick={() => handleLanguageSelect('roman')}
            className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-lg font-bold">ROM</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Roman Urdu</h3>
              <div className="bg-white rounded-lg p-4 text-left">
                <p className="text-sm text-gray-700 font-medium mb-2">Sample Sawal:</p>
                <p className="text-sm text-gray-600 italic">
                  "Jab mujhe farigh waqt milta hai to main doston ya family ke sath waqt guzarna pasand karta hun"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            💡 You can switch between languages during the test using the language buttons
          </p>
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

  const checklist = [
    'Be Honest with Yourself',
    'Think About Your Natural Self', 
    'No Right or Wrong Answers',
    'Stay Relaxed & Focused',
  ];

  return (
    <div className={`max-w-4xl mx-auto bg-white mt-6 p-4 sm:p-6 md:p-8 rounded-xl shadow-md ${directionClass}`}>
      {/* Language Switcher & Progress */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleLanguageSwitch('en')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              language === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSwitch('ur')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              language === 'ur' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            اردو
          </button>
          <button
            onClick={() => handleLanguageSwitch('roman')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              language === 'roman' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Roman
          </button>
        </div>
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
              isUrdu ? 'flex-row-reverse text-right' : ''
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
        <h3 className={`text-lg sm:text-xl font-semibold text-gray-700 ${isUrdu ? 'text-right' : ''}`}>
          {currentQuestion.title}
        </h3>
        {language === 'en' && (
          <button
            onClick={speakQuestionAndOptions}
            disabled={isSpeaking}
            className={`self-start mt-1 ${
              isSpeaking ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
            }`}
            aria-label="Listen to question"
          >
            {isSpeaking ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
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
            <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
              <div className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-green-700 flex items-center justify-center">
                {selectedOptionIndex === index && (
                  <div className="w-2 h-2 rounded-full bg-green-700" />
                )}
              </div>
              <p className={`font-medium text-sm sm:text-base text-gray-700 ${isUrdu ? 'text-right' : ''}`}>
                {option.text}
              </p>
            </div>
            <div className={`bg-gray-100 p-3 sm:p-5 rounded-lg text-xs sm:text-sm text-gray-600 ${isUrdu ? 'text-right' : ''}`}>
              <p className="font-semibold mb-1">
                {language === 'ur' ? 'مثال:' : language === 'roman' ? 'Misal:' : 'Example:'}
              </p>
              <p>{option.example}</p>
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
              ? (language === 'ur' ? 'اگلا' : language === 'roman' ? 'Agla' : 'Next')
              : (language === 'ur' ? 'ختم' : language === 'roman' ? 'Khatam' : 'Finish')}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestQuiz;