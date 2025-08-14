'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check login status on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="shadow-sm bg-white sticky top-0 z-50">
      <nav className="flex items-center justify-between px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-sm" /> {/* Dummy logo */}
          <span className="text-xl font-bold text-[#14442E]">MBTI test</span>
        </div>

        {/* Center Links for Medium & Large Screens */}
        <ul className="hidden md:flex items-center gap-6 text-[#14442E] text-[17px] font-medium mx-auto">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Login / Logout Button */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
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

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-[#14442E]">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          <ul className="flex flex-col gap-4 text-[#14442E] font-medium">
            <li><Link href="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/pricing" onClick={toggleMenu}>Pricing</Link></li>
            <li><Link href="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-1 rounded w-fit"
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
