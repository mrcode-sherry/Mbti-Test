import React from 'react';
import {
  CreditCard,
  Clock,
  FileCheck,
  HelpCircle,
  Download,
  ShieldCheck,
  MonitorSmartphone,
} from 'lucide-react';

const faqs = [
  {
    icon: <CreditCard className="text-[#14442E] w-6 h-6" />,
    question: 'How do I pay for the test?',
    answer:
      'You can pay using JazzCash or EasyPaisa. The account name and number are listed above. After payment, simply upload the screenshot to verify.',
  },
  {
    icon: <Clock className="text-[#14442E] w-6 h-6" />,
    question: "What if the admin is busy and doesn't verify my payment immediately?",
    answer:
      'Sometimes it might take a little time to verify your screenshot if the admin is busy. Don’t worry — just wait patiently. If your proof is not approved within 24 hours, feel free to contact us via our contact page or support number.',
  },
  {
    icon: <FileCheck className="text-[#14442E] w-6 h-6" />,
    question: 'What happens after I submit the payment screenshot?',
    answer:
      "Once your payment screenshot is verified, you'll get instant access to the test page where you can begin your MBTI assessment.",
  },
  {
    icon: <Clock className="text-[#14442E] w-6 h-6" />,
    question: 'How long does the test take?',
    answer:
      'The test has 70 multiple choice questions and takes about 10 to 15 minutes to complete.',
  },
  {
    icon: <Download className="text-[#14442E] w-6 h-6" />,
    question: 'What will I get after the test?',
    answer:
      'You’ll receive a personalized MBTI result in downloadable PDF format along with a short animated video explaining your personality type.',
  },
  {
    icon: <ShieldCheck className="text-[#14442E] w-6 h-6" />,
    question: 'Is this MBTI test scientifically valid?',
    answer:
      'Yes, our test is based on the widely recognized MBTI (Myers-Briggs Type Indicator) framework and consists of 70 thoughtfully designed questions.',
  },
  {
    icon: <MonitorSmartphone className="text-[#14442E] w-6 h-6" />,
    question: 'Do I need to install anything or is it all online?',
    answer:
      'Everything is 100% online. You don’t need to install anything. Just register, pay, and start your test!',
  },
];

const FaqSection = () => {
  return (
    <section className="py-16 px-12">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-[#14442E] mb-4">Frequently Asked Questions</h3>
        <p className="text-gray-600 text-sm md:text-base">
          Have questions? We’ve answered some of the most common ones below to help you get started.
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border bg-gray-100  md:h-60 border-gray-200 rounded-lg p-7 shadow-sm"
          >
            <div className="">{faq.icon}</div>
            <div>
              <h4 className="font-semibold text-[#14442E] mb-2">{faq.question}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
