'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Load user + always fetch latest submission
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (parsedUser?.role !== 'admin' && parsedUser?.email) {
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
            setCompleted(false);
          }
        } catch (err) {
          console.error('Invalid user in localStorage');
          localStorage.removeItem('user');
          setUser(null);
          setCompleted(false);
        }
      } else {
        setUser(null);
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
      {/* ✅ Navbar */}
      <header className="shadow-sm bg-white sticky top-0 z-50">
        <nav className="flex items-center justify-between md:px-16 px-8 py-4">
          <Link href="/" className="flex items-center">
            <img src="/logo/mbtilogo.png" alt="" className='w-12 h-12'/>
            <div className='flex flex-col'>
              <span className="text-[22px] font-bold text-[#00311A] mt-3">APTITUDE</span>
              <span className="text-[18px] font-bold text-[#175434] -mt-3">COUNSEL</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-[#14442E] text-[17px] font-medium mx-auto">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/pricing">Fees</Link></li>
            <li><Link href="/contact">Contact</Link></li>

            {user?.role === 'admin' && (
              <li><Link href="/dashboard">Dashboard</Link></li>
            )}

            {user && user?.role !== 'admin' && completed && (
              <li><Link href="/result">Result</Link></li>
            )}
          </ul>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="bg-[#14442E] text-[18px] text-white px-4 py-1 rounded hover:shadow-lg duration-500 hover:scale-105 hover:bg-[#0c2f1e] cursor-pointer transition"
                >
                  Logout
                </button>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#14442E] text-white font-bold uppercase ml-1">
                  {getUserInitial()}
                </div>
              </>
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
            <ul className="flex flex-col gap-4 text-[#14442E] font-medium">
              <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
              <li><Link href="/pricing" onClick={toggleMenu}>Fees</Link></li>
              <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>

              {user?.role === 'admin' && (
                <li><Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
              )}

              {user && user?.role !== 'admin' && completed && (
                <li><Link href="/result" onClick={toggleMenu}>Result</Link></li>
              )}

              <li>
                {user ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="bg-[#14442E] cursor-pointer duration-300 text-white px-4 py-1 rounded w-fit"
                    >
                      Logout
                    </button>
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#14442E] text-white font-bold uppercase">
                      {getUserInitial()}
                    </div>
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

      {/* ✅ Notification Bar (only based on completed flag) */}
      {user && pathname !== '/result' && pathname !== '/dashboard' && (
        <div className="bg-gray-100 text-green-900 text-center py-2 px-4 text-md font-medium">
          {!completed ? (
            <p>
              You are now logged in. Please start and complete your test.{" "}
              <Link href="/test" className="underline text-green-700 hover:text-green-900">Start Test</Link>
            </p>
          ) : (
            <p>
              You have submitted your test. You can now view your{" "}
              <Link href="/result" className="underline text-green-700 hover:text-green-900">Result</Link>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
