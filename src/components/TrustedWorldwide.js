'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const TrustedWorldwide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalImages = 6;

  const trustedImages = [
    '/trusted/Image 1.png',
    '/trusted/Image 2.png',
    '/trusted/Image 3.png',
    '/trusted/Image 4.png',
    '/trusted/Image 5.png',
    '/trusted/Image 6.png',
  ];

  // How many slides are visible at once
  const visibleCount = isMobile ? 1 : 3;
  // Max index we can slide to
  const maxIndex = totalImages - visibleCount;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset index if it goes out of range after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [isMobile, maxIndex, currentIndex]);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Each item is 1/visibleCount of the container width.
  // Translate by currentIndex * (1/visibleCount) of the TOTAL track width.
  // Since total track width = totalImages * (1/visibleCount * 100%) of container,
  // offset per step = 100% / visibleCount (in container units).
  // Simpler: set each item width as a % of the TRACK (which is totalImages wide),
  // then translate by item-width * currentIndex.

  const itemWidthPercent = 100 / totalImages; // % of track width per item
  const translatePercent = currentIndex * itemWidthPercent; // how much to move track

  return (
    <section className="py-20 px-4 md:px-16 bg-gradient-to-br from-[#F3F2ED] via-white to-[#FDCA00]/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#FDCA00]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#05503C]/10 to-transparent rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDCA00]/20 to-[#FDCA00]/10 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-[#FDCA00] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-[#05503C]">Global Recognition</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#05503C] mb-4">
            Trusted Worldwide
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative px-10 md:px-16">
          {/* Viewport - clips the track */}
          <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-[#FDCA00]/20 shadow-2xl">
            {/* Track - full width = totalImages × item-width */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${(totalImages / visibleCount) * 100}%`,
                transform: `translateX(-${(currentIndex / totalImages) * 100}%)`,
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {trustedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-2 md:p-4"
                  style={{ width: `${100 / totalImages}%` }}
                >
                  <div className="rounded-2xl md:rounded-3xl h-48 md:h-80 flex items-center justify-center relative overflow-hidden bg-white/60">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={image}
                        alt={`Trusted partner ${index + 1}`}
                        fill
                        sizes={isMobile ? '100vw' : '33vw'}
                        className="object-contain p-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-[#FDCA00]/30 flex items-center justify-center text-[#05503C] hover:bg-white hover:scale-110 hover:border-[#FDCA00]/60 transition-all duration-300 z-20"
          >
            <svg width="18" height="18" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-[#FDCA00]/30 flex items-center justify-center text-[#05503C] hover:bg-white hover:scale-110 hover:border-[#FDCA00]/60 transition-all duration-300 z-20"
          >
            <svg width="18" height="18" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 md:mt-10 gap-3 md:gap-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-[#05503C] to-[#044029] shadow-lg scale-125 w-4 h-4 md:w-5 md:h-5'
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110 w-3 h-3 md:w-4 md:h-4'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedWorldwide;