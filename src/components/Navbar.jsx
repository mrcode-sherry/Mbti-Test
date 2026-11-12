'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [raahOpen, setRaahOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const raahRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Active link helper
  const navLink = (href) => {
    const isActive = pathname === href;
    return `relative px-3 py-1.5 rounded-lg transition-all duration-200 group
      ${isActive
        ? 'text-white bg-[#14442E] font-semibold'
        : 'text-[#14442E] hover:text-white hover:bg-[#14442E]'
      }`;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (raahRef.current && !raahRef.current.contains(event.target)) {
        setRaahOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Load user + fetch proof + fetch approval + fetch test submission
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (parsedUser?.role !== 'admin' && parsedUser?.email) {
            // ✅ Check form submission first
            try {
              const formRes = await fetch(
                `/api/question/check?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (formRes.ok) {
                const formData = await formRes.json();
                console.log("📋 Navbar form check:", formData);
                setFormSubmitted(formData?.exists || false);
              } else {
                console.log("❌ Form check failed:", formRes.status);
                setFormSubmitted(false);
              }
            } catch (err) {
              console.error("Error checking form submission:", err);
              setFormSubmitted(false);
            }

            // ✅ Check proof submission
            try {
              const proofRes = await fetch(
                `/api/screenshotfetch?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (proofRes.ok) {
                const proofData = await proofRes.json();
                console.log("📸 Navbar proof check:", proofData);
                if (proofData?.success && proofData?.data) {
                  setProofSubmitted(true);
                  // Also check approval status from the same response
                  if (proofData.data.status === "approved") {
                    setApproved(true);
                  } else {
                    setApproved(false);
                  }
                } else {
                  setProofSubmitted(false);
                  setApproved(false);
                }
              } else {
                console.log("❌ Proof check failed:", proofRes.status);
                setProofSubmitted(false);
                setApproved(false);
              }
            } catch (err) {
              console.error("Error checking proof:", err);
              setProofSubmitted(false);
              setApproved(false);
            }

            // ✅ Check test submission
            try {
              const res = await fetch(
                `/api/testSubmission/check?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (res.ok) {
                const data = await res.json();
                setCompleted(data.completed || false);
              } else {
                setCompleted(false);
              }
            } catch (err) {
              console.error("Error checking test submission:", err);
              setCompleted(false);
            }
          } else {
            setProofSubmitted(false);
            setFormSubmitted(false);
            setApproved(false);
            setCompleted(false);
          }
        } catch (err) {
          console.error('Invalid user in localStorage');
          localStorage.removeItem('user');
          setUser(null);
          setProofSubmitted(false);
          setApproved(false);
          setCompleted(false);
        }
      } else {
        setUser(null);
        setProofSubmitted(false);
        setFormSubmitted(false);
        setApproved(false);
        setCompleted(false);
      }
    };

    loadUser();

    // ✅ Listen for login/logout changes across tabs
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setProofSubmitted(false);
    setFormSubmitted(false);
    setApproved(false);
    setCompleted(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/login';
  };

  const getUserInitial = () => {
    if (user?.name && user.name.length > 0) return user.name.charAt(0).toUpperCase();
    if (user?.email && user.email.length > 0) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  return (
    <>
      {/* ✅ Combined Status Bar + Navbar - No gap */}
      <div className="sticky top-0 z-50">
        {/* Status Bar */}
        {user && pathname !== '/result' && pathname !== '/dashboard' && pathname !== '/student-dashboard' && pathname !== '/admin' && (
          <div className="bg-gradient-to-r from-[#FDCA00] to-[#f0c000] text-[#14442E] shadow-lg">
            <div className="container mx-auto px-4 py-5">
              <div className="flex items-center justify-center text-center">
                <div className="flex items-center space-x-3">
                  {(() => {
                    console.log("🔔 Navbar status check:", {
                      proofSubmitted,
                      formSubmitted,
                      approved,
                      completed,
                      userEmail: user?.email
                    });
                    
                    if (!proofSubmitted || !formSubmitted) {
                      return (
                        <>
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                          <p className="text-sm font-medium">
                            Please pay your fees to continue.{" "}
                            <Link href="/future-fit" className="underline text-[#14442E] hover:text-[#0f3a26] font-bold">Pay Fees</Link>
                          </p>
                        </>
                      );
                    } else if (!approved) {
                      return (
                        <>
                          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-sm">⏳</span>
                          </div>
                          <p className="text-sm font-medium">
                            Your proof has been submitted. Please wait for admin approval. This usually takes a few minutes. If not approved within few hours, please contact us.
                          </p>
                        </>
                      );
                    } else if (!completed) {
                      return (
                        <>
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">✓</span>
                          </div>
                          <p className="text-sm font-medium">
                            Your proof has been approved. You can now{" "}
                            <Link href="/start_test" className="underline text-[#14442E] hover:text-[#0f3a26] font-bold">Start Test</Link>
                          </p>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">🎉</span>
                          </div>
                          <p className="text-sm font-medium">
                            You have submitted your test. You can now view your{" "}
                            <Link href="/student-dashboard" className="underline text-[#14442E] hover:text-[#0f3a26] font-bold">Dashboard</Link>
                          </p>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Navbar */}
        <header className="shadow-sm bg-white">
        <nav className="flex items-center justify-between md:px-16 px-8 py-4">
          <Link href="/" className="flex items-center">
            <img src="/logo/mbtilogo.png" alt="" className='w-12 h-12'/>
            <div className='flex flex-col'>
              <span className="text-[22px] font-bold text-[#00311A] mt-3">APTITUDE</span>
              <span className="text-[18px] font-bold text-[#175434] -mt-3">COUNSEL</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-1 text-[17px] font-medium mx-auto">
            <li><Link href="/" className={navLink('/')}>Home</Link></li>
            <li><Link href="/about" className={navLink('/about')}>About</Link></li>

            {/* RAAH Dropdown */}
            <li className="relative" ref={raahRef}>
              <button
                onClick={() => setRaahOpen(prev => !prev)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200
                  ${pathname === '/future-fit' || pathname === '/raah-for-schools'
                    ? 'text-white bg-[#14442E] font-semibold'
                    : 'text-[#14442E] hover:text-white hover:bg-[#14442E]'
                  }`}
              >
                RAAH
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${raahOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown panel */}
              {raahOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  style={{ animation: 'fadeSlideDown 0.18s ease forwards' }}
                >
                  <Link
                    href="/future-fit"
                    onClick={() => setRaahOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150
                      ${pathname === '/future-fit'
                        ? 'bg-[#14442E] text-white'
                        : 'text-[#14442E] hover:bg-[#F3F2ED]'
                      }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FDCA00] flex-shrink-0" />
                    RAAH for Students
                  </Link>
                  <div className="h-px bg-gray-100" />
                  <Link
                    href="/raah-for-schools"
                    onClick={() => setRaahOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150
                      ${pathname === '/raah-for-schools'
                        ? 'bg-[#14442E] text-white'
                        : 'text-[#14442E] hover:bg-[#F3F2ED]'
                      }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FDCA00] flex-shrink-0" />
                    RAAH for Schools
                  </Link>
                </div>
              )}
            </li>

            {/* Student Dashboard */}
            {user && user?.role !== 'admin' && completed && (
              <li><Link href="/student-dashboard" className={navLink('/student-dashboard')}>Dashboard</Link></li>
            )}

            {/* Admin Dashboard */}
            {user?.role === 'admin' && (
              <li><Link href="/dashboard" className={navLink('/dashboard')}>Admin Dashboard</Link></li>
            )}

            <li><Link href="/privacy-policy" className={navLink('/privacy-policy')}>Privacy Policy</Link></li>
            <li><Link href="/contact" className={navLink('/contact')}>Contact</Link></li>
          </ul>

          <style jsx global>{`
            @keyframes fadeSlideDown {
              from { opacity: 0; transform: translateY(-8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#14442E] to-[#0c2f1e] text-white font-bold uppercase hover:from-[#0c2f1e] hover:to-[#14442E] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 ring-2 ring-white/20"
                >
                  {getUserInitial()}
                </button>
                
                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-[#14442E] to-[#0c2f1e] p-6 text-white">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                          {getUserInitial()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-lg truncate">{user?.name || 'User'}</p>
                          <p className="text-white/80 text-sm truncate">{user?.email || 'No email'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Account Status */}
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">Account Active</span>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-2">
                      {user?.role !== 'admin' && completed && (
                        <button
                          onClick={() => {
                            router.push('/student-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <span className="font-medium">Dashboard</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          router.push('/contact');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                          </svg>
                        </div>
                        <span className="font-medium">Support</span>
                      </button>
                    </div>
                    
                    {/* Logout Section */}
                    <div className="p-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#14442E] text-[18px] text-white px-4 py-1 rounded hover:shadow-lg duration-500 hover:scale-105 hover:bg-[#0c2f1e] transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden text-[#14442E] cursor-pointer duration-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white px-8 pb-4">
            <ul className="flex flex-col gap-2 font-medium">
              {/* Home */}
              <li>
                <Link href="/" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>Home</Link>
              </li>
              {/* About */}
              <li>
                <Link href="/about" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/about' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>About</Link>
              </li>

              {/* RAAH Dropdown Mobile */}
              <li>
                <button
                  onClick={() => setRaahOpen(prev => !prev)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
                    ${pathname === '/future-fit' || pathname === '/raah-for-schools'
                      ? 'bg-[#14442E] text-white font-semibold'
                      : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'
                    }`}
                >
                  RAAH
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${raahOpen ? 'rotate-180' : ''}`} />
                </button>
                {raahOpen && (
                  <div className="mt-1 ml-4 flex flex-col gap-1">
                    <Link href="/future-fit" onClick={() => { toggleMenu(); setRaahOpen(false); }} className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${pathname === '/future-fit' ? 'bg-[#14442E] text-white' : 'text-[#14442E] hover:bg-[#F3F2ED]'}`}>
                      → RAAH for Students
                    </Link>
                    <Link href="/raah-for-schools" onClick={() => { toggleMenu(); setRaahOpen(false); }} className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${pathname === '/raah-for-schools' ? 'bg-[#14442E] text-white' : 'text-[#14442E] hover:bg-[#F3F2ED]'}`}>
                      → RAAH for Schools
                    </Link>
                  </div>
                )}
              </li>

              {/* Student Dashboard */}
              {user && user?.role !== 'admin' && completed && (
                <li>
                  <Link href="/student-dashboard" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/student-dashboard' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>Dashboard</Link>
                </li>
              )}

              {/* Admin Dashboard */}
              {user?.role === 'admin' && (
                <li>
                  <Link href="/dashboard" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/dashboard' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>Admin Dashboard</Link>
                </li>
              )}

              {/* Privacy Policy */}
              <li>
                <Link href="/privacy-policy" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/privacy-policy' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>Privacy Policy</Link>
              </li>

              {/* Contact */}
              <li>
                <Link href="/contact" onClick={toggleMenu} className={`block px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/contact' ? 'bg-[#14442E] text-white font-semibold' : 'text-[#14442E] hover:bg-[#14442E] hover:text-white'}`}>Contact</Link>
              </li>

              <li>
                {user ? (
                  <div className="bg-gradient-to-r from-[#14442E] to-[#0c2f1e] rounded-2xl p-4 text-white shadow-lg">
                    {/* User Info Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                        {getUserInitial()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-lg truncate">{user?.name || 'User'}</p>
                        <p className="text-white/80 text-sm truncate">{user?.email || 'No email'}</p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex items-center space-x-2 mb-4 bg-white/10 rounded-lg p-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Account Active</span>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="space-y-2 mb-4">
                      {user?.role !== 'admin' && completed && (
                        <button
                          onClick={() => {
                            router.push('/student-dashboard');
                            toggleMenu();
                          }}
                          className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <span className="font-medium">Dashboard</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          router.push('/contact');
                          toggleMenu();
                        }}
                        className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                        </svg>
                        <span className="font-medium">Support</span>
                      </button>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 rounded-lg p-3 transition-colors duration-200 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="bg-[#14442E] text-white px-4 py-1 rounded w-fit"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
      </div>
    </>
  );
};

export default Navbar;
