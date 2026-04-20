'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const TrustedWorldwide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Array of trusted images
  const trustedImages = [
    '/trusted/Image 1.png',
    '/trusted/Image 2.png',
    '/trusted/Image 3.png',
    '/trusted/Image 4.png',
    '/trusted/Image 5.png',
    '/trusted/Image 6.png'
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide effect with pause functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (isMobile) {
          // Mobile: cycle through all 6 images (0-5)
          return prevIndex === trustedImages.length - 1 ? 0 : prevIndex + 1;
        } else {
          // Desktop: cycle through 4 positions (0-3) showing 3 images each
          return prevIndex === trustedImages.length - 3 ? 0 : prevIndex + 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [trustedImages.length, isPaused, isMobile]);

  const goToPrevious = () => {
    if (isMobile) {
      setCurrentIndex(currentIndex === 0 ? trustedImages.length - 1 : currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex === 0 ? trustedImages.length - 3 : currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (isMobile) {
      setCurrentIndex(currentIndex === trustedImages.length - 1 ? 0 : currentIndex + 1);
    } else {
      setCurrentIndex(currentIndex === trustedImages.length - 3 ? 0 : currentIndex + 1);
    }
  };

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
        <div className="relative px-4 md:px-20">
          <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-[#FDCA00]/20 shadow-2xl p-4 md:p-8">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: isMobile 
                  ? `translateX(-${currentIndex * 100}%)` 
                  : `translateX(-${currentIndex * (100 / trustedImages.length)}%)`,
                width: isMobile ? `${trustedImages.length * 100}%` : `${trustedImages.length * (100 / 3)}%`
              }}
            >
              {trustedImages.map((image, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ 
                    width: isMobile 
                      ? `${100 / trustedImages.length}%` 
                      : `calc(${100 / trustedImages.length}% - 16px)` 
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="rounded-2xl md:rounded-3xl h-48 md:h-80 flex items-center justify-center relative overflow-hidden mx-2 md:mx-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image 
                        src={image} 
                        alt={`Trusted partner ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Positioned outside the carousel */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-[#FDCA00]/30 flex items-center justify-center text-[#05503C] hover:bg-white hover:scale-110 hover:border-[#FDCA00]/60 transition-all duration-300 z-20"
          >
            <svg width="20" height="20" className="md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-2 border-[#FDCA00]/30 flex items-center justify-center text-[#05503C] hover:bg-white hover:scale-110 hover:border-[#FDCA00]/60 transition-all duration-300 z-20"
          >
            <svg width="20" height="20" className="md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 md:mt-10 gap-3 md:gap-4">
            {isMobile ? (
              // Mobile: 6 dots for 6 images
              Array.from({ length: trustedImages.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-[#05503C] to-[#044029] shadow-lg scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))
            ) : (
              // Desktop: 4 dots for 4 positions (showing 3 images each)
              Array.from({ length: trustedImages.length - 2 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-gradient-to-r from-[#05503C] to-[#044029] shadow-lg scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedWorldwide;