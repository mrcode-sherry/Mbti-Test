import React from 'react';
import { Star, ThumbsUp, UsersRound, Handshake, HeartHandshake } from 'lucide-react';
import Testimonial from '@/components/Testimonial'; // Adjust path if needed
import PageBanner from './PageBanner';

const ratings = [
  {
    icon: <ThumbsUp size={60} className="text-[#14442E]" />,
    label: 'Client Ratings',
    value: '9.6/10',
  },
  {
    icon: <UsersRound size={60} className="text-[#14442E]" />,
    label: 'Customer Support',
    value: '4.9/5',
  },
  {
    icon: <Handshake size={60} className="text-[#14442E]" />,
    label: 'Technical Guidance',
    value: '5/5',
  },
  {
    icon: <HeartHandshake size={60} className="text-[#14442E]" />,
    label: 'Excellent Service',
    value: '4.9/5',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-white text-[#14442E]">
      <PageBanner title="About Us" backgroundImage="/Banners/about-banner.jpg" />

      {/* Section 1: About Info */}
      <section className="py-16 md:px-16 px-8 text-center">
        {/* Top Heading */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
          <p className="uppercase text-sm tracking-widest text-[#14442E] font-medium">About Us</p>
          <div className="w-12 h-px bg-[#14442E] opacity-40" />
        </div>

        <h2 className="text-[29px] md:text-4xl font-bold mb-4 text-[#14442E]">
          Guiding students from uncertainty to opportunity
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12 text-sm sm:text-base">
          Every student should have clarity about their future, in our opinion at Aptitude Counsel. We assist youth in identifying their inherent strengths, shortcomings, and distinct strategy for success through the use of the globally accepted MBTI® (Myers-Briggs Type Indicator). Our in-depth reports highlight each student's personal definition of success, potential obstacles, and guidelines for personal development. Schools, colleges, and organizations all across the world use the MBTI®, one of the most reliable personality tests available. Students who work with us not only plan their professions but also learn about themselves first.
        </p>

        {/* Ratings Grid */}
        <div className="grid gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {ratings.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center gap-4 bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-inner">
                {item.icon}
              </div>
              <div className="bg-[#14442E] text-white font-semibold px-8 py-1 rounded-md flex items-center gap-4 text-[22px] sm:text-[25px]">
                {item.value} <Star size={20} className="text-yellow-400" />
              </div>
              <p className="text-[16px] sm:text-[18px] font-bold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Testimonials */}
      <section>
        <Testimonial />
      </section>
    </div>
  );
};

export default AboutPage;
