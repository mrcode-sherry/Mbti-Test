'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); // ✅ Track test completion

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // ✅ Check test submission only if normal user (not admin)
          if (parsedUser?.role !== 'admin' && parsedUser?.email) {
            try {
              const res = await fetch(
                `/api/testSubmission/check?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (res.ok) {
                const data = await res.json();
                // ✅ API returns "completed", not "hasSubmitted"
                setHasSubmitted(data.completed || false);
              }
            } catch (err) {
              console.error("Error checking test submission:", err);
              setHasSubmitted(false);
            }
          } else {
            setHasSubmitted(false);
          }
        } catch (err) {
          console.error('Invalid user in localStorage');
          localStorage.removeItem('user');
          setUser(null);
          setHasSubmitted(false);
        }
      } else {
        setUser(null);
        setHasSubmitted(false);
      }
    };

    // initial load
    loadUser();

    // listen to "storage" events (for login/logout sync)
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setHasSubmitted(false);

    // Let other parts know
    window.dispatchEvent(new Event('storage'));

    window.location.href = '/login';
  };

  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between md:px-16 px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-sm" />
          <span className="text-xl font-bold text-[#14442E]">MBTI test</span>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-[#14442E] text-[17px] font-medium mx-auto">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>

          {/* Dashboard link → only for admin */}
          {user?.role === 'admin' && (
            <li><Link href="/dashboard">Dashboard</Link></li>
          )}

          {/* ✅ Show Result only if user is normal AND test is completed */}
          {user && user?.role !== 'admin' && hasSubmitted && (
            <li><Link href="/result">Result</Link></li>
          )}
        </ul>

        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-[#14442E] text-[18px] text-white px-4 py-1 rounded hover:shadow-lg duration-500 hover:scale-105 hover:bg-[#0c2f1e] cursor-pointer transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-[#14442E] text-[18px] text-white px-4 py-1 rounded hover:shadow-lg duration-500 hover:scale-105 hover:bg-[#0c2f1e] transition"
            >
              Login
            </Link>
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-[#14442E] cursor-pointer duration-300">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white px-8 pb-4">
          <ul className="flex flex-col gap-4 text-[#14442E] font-medium">
            <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/pricing" onClick={toggleMenu}>Pricing</Link></li>
            <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
            {user?.role === 'admin' && (
              <li><Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            )}
            {user && user?.role !== 'admin' && hasSubmitted && (
              <li><Link href="/result" onClick={toggleMenu}>Result</Link></li>
            )}
            <li>
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="bg-[#14442E] cursor-pointer duration-300 text-white px-4 py-1 rounded w-fit"
                >
                  Logout
                </button>
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
  );
};

export default Navbar;
