'use client';
import React from 'react';
import {
  School,
  GraduationCap,
  University,
  Landmark,
  BookOpen,
  ScrollText,
  Library,
  Building2,
} from 'lucide-react';

const icons = [
  <School size={48} />,
  <GraduationCap size={48} />,
  <University size={48} />,
  <Landmark size={48} />,
  <BookOpen size={48} />,
  <ScrollText size={48} />,
  <Library size={48} />,
  <Building2 size={48} />,
];

const Slider = () => {
  return (
    <div className="overflow-hidden w-full py-6 bg-gray-100">
      <div className="animate-slide flex whitespace-nowrap">
        {[...icons, ...icons].map((icon, idx) => (
          <div
            key={idx}
            className="w-1/2 md:w-1/4 flex-shrink-0 flex justify-center items-center"
          >
            <div className="bg-white p-4 rounded-xl shadow-md">{icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
