'use client';

import {
  UserPlus,
  CreditCard,
  Languages,
  ListTodo,
  FileCheck2
} from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={32} className="text-[#14442E]" />,
    title: 'Register Account',
    description: 'Sign up with your name, email, and password to begin.',
  },
  {
    icon: <CreditCard size={32} className="text-[#14442E]" />,
    title: 'Submit Test Fee',
    description: 'Pay via JazzCash or EasyPaisa and upload a screenshot for confirmation.',
  },
  {
    icon: <Languages size={32} className="text-[#14442E]" />,
    title: 'Choose Status & Language',
    description: 'Tell us if you are single or married, then choose English or Urdu.',
  },
  {
    icon: <ListTodo size={32} className="text-[#14442E]" />,
    title: 'Take the Test',
    description: 'Answer 70 MCQs to identify your MBTI personality type.',
  },
  {
    icon: <FileCheck2 size={32} className="text-[#14442E]" />,
    title: 'Get Your Result',
    description: 'Download your result as a PDF and watch a personality animation video.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#14442E] mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Follow these simple steps to discover your MBTI personality type.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-[#14442E] mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
