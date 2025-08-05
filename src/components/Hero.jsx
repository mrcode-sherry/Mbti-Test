'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-[#14442E] text-white py-24 px-12">
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
        <div className="flex-[1.5] text-center w-full ">
          <p className="text-sm tracking-widest mb-2 uppercase">Independent Institution With</p>
          <h1 className="md:text-[55px] text-5xl font-bold leading-tight mb-4">
            Top Notch Education <br className="hidden sm:block" />
            & Research
          </h1>
          <p className="md:text-[17px] text-base text-gray-200 mb-6">
            Consectetur a erat nam at. Facilisis magna etiam tempor orci. Sem et tortor consequat id. Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem. In pellentesque nunc non Donec pretium gravida neque et placerat.

          </p>

          <div className="flex flex-col sm:flex-row text-center gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-[#14442E] font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Try It Now
            </Link>
            <button
              className="flex items-center gap-2 border border-white px-6 py-2 rounded hover:bg-white hover:text-[#14442E] transition"
            >
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo Class
            </button>
          </div>
        </div>

        {/* Right Student Image (Hidden on small screens) */}
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
