'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Clock,
  FileCheck,
  MonitorSmartphone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const faqs = [
  {
    icon: <CreditCard className="text-[#14442E] w-5 h-5 min-w-[20px]" />,
    question: 'How do I pay for the test?',
    answer:
      'You can pay using JazzCash or Bank Account. The account name and number are listed above. After payment, simply upload the screenshot to verify.',
  },
  {
    icon: <Clock className="text-[#14442E] w-5 h-5 min-w-[20px]" />,
    question: "What if the admin is busy and doesn't verify my payment immediately?",
    answer:
      'Sometimes it might take a little time to verify your screenshot if the admin is busy. Don’t worry — just wait patiently. If your proof is not approved within few minutes, feel free to contact us via our contact page or support number.',
  },
  {
    icon: <FileCheck className="text-[#14442E] w-5 h-5 min-w-[20px]" />,
    question: 'What happens after I submit the payment screenshot?',
    answer:
      "Once your payment screenshot is verified, you'll get instant access to the test page.",
  },
  {
    icon: <Clock className="text-[#14442E] w-5 h-5 min-w-[20px]" />,
    question: 'How long does the test take?',
    answer:
      'It will take about 10 to 15 minutes to complete.',
  },
  {
    icon: <MonitorSmartphone className="text-[#14442E] w-5 h-5 min-w-[20px]" />,
    question: 'Do I need to install anything or is it all online?',
    answer:
      'Everything is 100% online. You don’t need to install anything. Just register, pay, and start your test!',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:px-16 px-8">
      {/* Heading + Description (unchanged) */}
      <div className='md:max-w-4xl mx-auto'>
        <div className="text-center mb-10">
        <h3 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 text-sm md:text-base">
          Have questions? We’ve answered some of the most common ones below to help you get started.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md bg-gray-100 shadow-sm overflow-hidden transition-all duration-300"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleIndex(index)}
              className="flex justify-between items-center w-full text-left px-5 py-4 cursor-pointer duration-300 focus:outline-none transition"
            >
              <div className="flex items-start gap-2 text-[#14442E] font-medium flex-1 text-sm sm:text-base">
                {faq.icon}
                <span className="flex-1 break-words">{faq.question}</span>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-[#14442E]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#14442E]" />
              )}
            </button>

            {/* Answer */}
            <div
              className={`px-5 pb-4 text-gray-700 transition-all duration-500 text-sm sm:text-base ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default FaqSection;
