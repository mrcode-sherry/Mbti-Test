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
    icon: <UserPlus  className="text-[#14442E] h-10 w-10" />,
    title: 'Register Account',
    description: 'Sign up with your name, email, and password to begin.',
  },
  {
    icon: <CreditCard  className="text-[#14442E] h-10 w-10" />,
    title: 'Submit Test Fee',
    description: 'Pay via JazzCash or EasyPaisa and upload a screenshot for confirmation.',
  },
  {
    icon: <Languages  className="text-[#14442E] h-10 w-10" />,
    title: 'Take the Test',
    description: 'Answer simple questions about your preferences and choices. No right or wrong—just about you.',
  },
  {
    icon: <ListTodo className="text-[#14442E] h-10 w-10" />,
    title: 'Get Your Personalized Report',
    description: 'Receive a clear report highlighting your strengths, weaknesses, success style, and potential career paths.',
  },
  {
    icon: <FileCheck2 className="text-[#14442E] h-10 w-10" />,
    title: 'Plan Your Future with Clarity',
    description: 'Use your results to choose subjects, careers, or even understand relationships better confusion replaced by direction.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16 md:px-16 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[29px] md:text-4xl font-bold text-[#14442E] mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Follow these simple steps to discover your MBTI personality type.
        </p>

        <div className="grid gap-8 md:h-[430px] grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="mb-4 flex justify-center"><span>{step.icon}</span></div>
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
