'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero = () => {
  const router = useRouter();

  const handleTryItNow = () => {
    router.push('/pricing');
  };

  return (
    <section className="bg-[#14442E] text-white md:py-24 py-16 md:px-16 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Student Image */}
        <div className="flex-[0.8] w-full flex justify-center md:justify-start">
          <Image
            src="/hero/Hero-left-image.jpg"
            alt="Student Girl"
            width={400}
            height={400}
            className="rounded-md object-contain"
          />
        </div>

        {/* Center Content */}
        <div className="flex-[1.5] text-center w-full">
          <p className="text-xs sm:text-sm md:text-base tracking-widest mb-3 uppercase">
            Independent Institution With
          </p>
          <h1 className="text-[29px] md:text-5xl lg:text-[50px] font-bold leading-snug md:leading-tight mb-5">
            Top Notch Education <br className="hidden sm:block" />
            & Research
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 md:mb-10 px-1 sm:px-4 md:px-0">
            Consectetur a erat nam at. Facilisis magna etiam tempor orci. Sem et tortor consequat id. 
            Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem. 
            In pellentesque nunc non Donec pretium gravida neque et placerat.
          </p>

          <div className="flex flex-col sm:flex-row text-center gap-4 justify-center">
            <button
              onClick={handleTryItNow}
              className="bg-white text-[#14442E] font-semibold cursor-pointer px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition duration-300 text-sm sm:text-base md:text-lg"
            >
              Try It Now
            </button>

            <button
              className="flex items-center justify-center gap-2 border border-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-lg hover:bg-white hover:text-[#14442E] transition cursor-pointer duration-300 text-sm sm:text-base md:text-lg"
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

        {/* Right Student Image */}
        <div className="flex-[0.8] w-full justify-center md:flex hidden md:justify-end">
          <Image
            src="/hero/Hero-right-image.jpg"
            alt="Student Boy"
            width={400}
            height={400}
            className="rounded-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
