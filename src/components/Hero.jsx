'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const router = useRouter();
  const typedEl = useRef(null);

  const handleTryItNow = () => {
    router.push('/future-fit');
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
      {/* Enhanced gradient overlay with better depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-br from-blue-400/15 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-600/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Left Content - Text styling only, no backgrounds */}
          <div className="max-w-2xl text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span 
                ref={typedEl} 
                className="text-white drop-shadow-2xl filter brightness-110"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.3)'
                }}
              ></span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light drop-shadow-lg"
               style={{
                 textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
               }}>
              Explore your future with confidence and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                onClick={handleTryItNow}
                className="group relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white font-bold px-8 md:px-12 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 text-lg overflow-hidden border border-emerald-400/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Try It Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;