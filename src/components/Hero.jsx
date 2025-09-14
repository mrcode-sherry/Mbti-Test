'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const router = useRouter();

  const handleTryItNow = () => {
    router.push('/pricing');
  };

  // Images with names (replace paths later)
  const images = [
    { src: '/hero/Hero-left-image.jpg', name: 'Student One' },
    { src: '/hero/Hero-right-image.jpg', name: 'Student Two' },
    { src: '/hero/Hero-left-image.jpg', name: 'Student Three' },
    { src: '/hero/Hero-right-image.jpg', name: 'Student Four' },
  ];

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Auto change image every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

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

  return (
    <section className="bg-[#14442E] md:py-0 py-16 text-white md:px-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-[1.5] text-left w-full space-y-6">
          <p className="text-xs sm:text-sm md:text-base tracking-[3px] uppercase text-gray-300">
            Independent Institution With
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-snug md:leading-tight">
            From Confusion to <br className="hidden sm:block" />
            <span className="text-gray-200">Direction</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-lg">
            Explore your future with confidence and clarity. Discover the path that leads you 
            towards success with the best mentors and learning environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleTryItNow}
              className="bg-gray-100 text-[#14442E] font-semibold cursor-pointer px-8 md:px-10 py-3 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-lg transition duration-300 text-base md:text-lg"
            >
              Try It Now
            </button>

            <button
              className="flex items-center justify-center gap-2 border-2 border-white px-8 md:px-10 py-3 rounded-lg hover:text-[#14442E] shadow-md transition cursor-pointer duration-300 text-base md:text-lg hover:bg-gray-200"
            >
              <svg
                fill="currentColor"
                height="22"
                width="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo Class
            </button>
          </div>
        </div>

        {/* Right Rotating Images with Framer Motion */}
        <div className="flex-[1.2] w-full flex justify-center md:justify-end relative overflow-hidden h-[340px] sm:h-[380px] md:h-[500px] md:mt-32">
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
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full"
            >
              <div className="border-4 border-white rounded-2xl shadow-xl overflow-hidden w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[350px] md:h-[350px] flex items-center justify-center bg-gray-100">
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
