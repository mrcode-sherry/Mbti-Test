'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';

const Hero = () => {
  const router = useRouter();
  const typedEl = useRef(null);

  const handleTryItNow = () => {
    router.push('/pricing');
  };

  const images = [
    { src: '/hero/Hero-left-image.jpg', name: 'Student One' },
    { src: '/hero/Hero-right-image.jpg', name: 'Student Two' },
    { src: '/hero/Hero-left-image.jpg', name: 'Student Three' },
    { src: '/hero/Hero-right-image.jpg', name: 'Student Four' },
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Auto change image every 6s (slowed down)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Typed.js Effect (slower + longer delay)
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
    <section className="bg-[#14442E] md:py-0 py-16 text-white md:px-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-[1.5] text-left w-full space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-snug md:leading-tight md:w-[500px] md:h-32">
            <span ref={typedEl} className="text-gray-200"></span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg">
            Explore your future with confidence and clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleTryItNow}
              className="bg-gray-100 text-[#14442E] font-semibold cursor-pointer px-8 md:px-10 py-3 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-lg transition duration-300 text-base md:text-lg"
            >
              Try It Now
            </button>
          </div>
        </div>

        {/* Right Rotating Images with Framer Motion */}
        <div className="flex-[1.2] w-full flex justify-center md:justify-end relative overflow-hidden h-[340px] sm:h-[380px] md:h-[500px] md:mt-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: isMobile ? 100 : 0,
                y: isMobile ? 0 : 100,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: isMobile ? -100 : 0,
                y: isMobile ? 0 : -100,
              }}
              transition={{ duration: 2, delay: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              <div className="border-4 border-white rounded-2xl shadow-xl overflow-hidden w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] flex items-center justify-center bg-gray-100">
                <Image
                  src={images[index].src}
                  alt={images[index].name}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-center font-semibold text-white bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm sm:text-base md:text-lg">
                {images[index].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
