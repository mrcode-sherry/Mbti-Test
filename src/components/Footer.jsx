'use client';

import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    // Check if user has completed the test
    const checkTestCompletion = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          
          // Check API for completion status (same as navbar)
          const res = await fetch('/api/testSubmission/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          });
          
          if (res.ok) {
            const data = await res.json();
            setIsTestCompleted(data.completed || false);
          } else {
            // Fallback to localStorage check
            const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
            const savedResult = localStorage.getItem('testResult');
            setIsTestCompleted(savedResults.length > 0 || !!savedResult);
          }
        } catch (err) {
          // Fallback to localStorage check
          const savedResults = JSON.parse(localStorage.getItem('testResults') || '[]');
          const savedResult = localStorage.getItem('testResult');
          setIsTestCompleted(savedResults.length > 0 || !!savedResult);
        }
      } else {
        setIsTestCompleted(false);
      }
    };

    checkTestCompletion();
    
    // Listen for storage changes to update state when test is completed
    window.addEventListener('storage', checkTestCompletion);
    
    return () => {
      window.removeEventListener('storage', checkTestCompletion);
    };
  }, []);

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
            Aptitude Counsel helps students discover strengths, overcome weaknesses, and choose the right career with trusted Aptitude Counsel guidance. Your clarity, confidence, and future start here.
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
            <li><Link href="/future-fit" className="hover:underline">Future Fit</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore More */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {isTestCompleted ? "View Your Results" : "Ready to Begin Your Test?"}
          </h3>
          <p className="text-sm text-gray-300 mb-3">
            {isTestCompleted 
              ? "Access your dashboard to view your test results and insights."
              : "Click below to start your assessment and discover your insights."
            }
          </p>
          <Link href={isTestCompleted ? "/student-dashboard" : "/future-fit"}>
            <button
              type="button"
              className="bg-white text-[#14442E] px-6 py-2 hover:scale-105 duration-300 rounded-md font-medium hover:bg-gray-100 transition w-fit cursor-pointer"
            >
              {isTestCompleted ? "Dashboard" : "Start Test"}
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;