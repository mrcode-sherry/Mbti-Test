'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const router = useRouter();
  const typedEl = useRef(null);

  const handleTryItNow = () => {
    router.push('/pricing');
  };

  // ✅ Typed.js Effect
  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        "Gen-Z<br/>Career Guidance",
        "From Confusion to Direction",
      ],
      typeSpeed: 60,       
      backSpeed: 60,       
      backDelay: 5000,     
      startDelay: 500,     
      loop: true,
      smartBackspace: true,
      showCursor: true,
      contentType: 'html',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{
        backgroundImage: "url('/hero/home-hero.png')",
      }}
    >
      {/* Light black overlay covering the entire hero */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Left Content - Your Original Content */}
          <div className="max-w-2xl text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span 
                ref={typedEl} 
                className="bg-gradient-to-r from-white via-emerald-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-2xl"
              ></span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed font-light">
              Explore your future with confidence and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleTryItNow}
                className="group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold px-8 md:px-12 py-4 rounded-xl shadow-2xl hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-300 text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Try It Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;