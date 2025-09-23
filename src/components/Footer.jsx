'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#14442E] text-white py-12 md:px-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1: Logo + Description + Socials */}
        <div>
          <Link href="/" className="flex items-center mb-4">
            <img src="/logo/mbtilogowhite1.png" alt="" className='w-12 h-12'/>
            <div className='flex flex-col'>
              <span className="text-[22px] font-bold text-white mt-3">APTITUDE</span>
            <span className="text-[18px] font-bold text-gray-100 -mt-3">COUNSEL</span>
            </div>
          </Link>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Aptitude Counsel helps students discover strengths, overcome weaknesses, and choose the right career with trusted MBTI guidance. Your clarity, confidence, and future start here.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-green-400 transition">
              <Facebook size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-green-400 transition">
              <Instagram size={20} />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/pricing" className="hover:underline">Fees</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore More */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/pricing" className="hover:underline">Start Test</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Ready to Begin Your Test?</h3>
          <p className="text-sm text-gray-300 mb-3">
            Click below to start your assessment and discover your insights.
          </p>
          <Link href="/pricing">
            <button
              type="button"
              className="bg-white text-[#14442E] px-6 py-2 hover:scale-105 duration-300 rounded-md font-medium hover:bg-gray-100 transition w-fit cursor-pointer"
            >
              Start Test
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
