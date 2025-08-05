'use client';

import Link from 'next/link';
import { ArrowRightCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#14442E] text-white py-12 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1: Logo + Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-green-500 rounded-sm" />
            <span className="text-2xl font-bold">MBTI Test</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Explore your unique personality traits with our MBTI-based test system. Multilingual, simple, and insightful for personal and professional growth.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore More */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/start-test" className="hover:underline">Start Test</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className=''>
          <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
          <p className="text-sm text-gray-300 mb-3">
            Get updates about new features, test types, and insights.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md text-white border text-sm placeholder-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-[#14442E] px-4 py-2 -ml-15 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
