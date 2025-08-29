'use client';
import React from 'react';

// ✅ Replace these with your own image paths in /public/slider folder
const images = [
  "/slider/university-logo1.jpg",
  "/slider/university-logo2.jpg",
  "/slider/university-logo3.jpg",
  "/slider/university-logo4.jpg",
  "/slider/university-logo5.jpg",
  "/slider/university-logo6.jpg",
  "/slider/university-logo7.jpg",
];

const Slider = () => {
  return (
    <div className="overflow-hidden w-full py-8 bg-gray-100">
      <div className="animate-slide flex whitespace-nowrap">
        {[...images, ...images].map((src, idx) => (
          <div
            key={idx}
            className="w-1/2 md:w-1/4 flex-shrink-0 flex justify-center items-center"
          >
            <div className="w-40 h-40 flex justify-center items-center rounded-xl mx-3 p-4 hover:shadow-lg transition">
              <img
                src={src}
                alt={`Logo ${idx}`}
                className="max-w-full max-h-full object-contain bg-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
