'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [proofSubmitted, setProofSubmitted] = useState(false); // ✅ Screenshot submitted
  const [approved, setApproved] = useState(false); // ✅ Proof approved
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Load user + fetch proof + fetch approval + fetch test submission
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          if (parsedUser?.role !== 'admin' && parsedUser?.email) {
            // ✅ Check proof submission
            try {
              const proofRes = await fetch(
                `/api/screenshotfetch?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (proofRes.ok) {
                const proofData = await proofRes.json();
                if (proofData?.success) {
                  setProofSubmitted(true);
                } else {
                  setProofSubmitted(false);
                }
              } else {
                setProofSubmitted(false);
              }
            } catch (err) {
              console.error("Error checking proof:", err);
              setProofSubmitted(false);
            }

            // ✅ Check proof approval (status)
            try {
              const statusRes = await fetch(
                `/api/proofsend/status?email=${encodeURIComponent(parsedUser.email)}`,
                { cache: 'no-store' }
              );
              if (statusRes.ok) {
                const statusData = await statusRes.json();
                if (statusData?.status === "approved") {
                  setApproved(true);
                } else {
                  setApproved(false);
                }
              } else {
                setApproved(false);
              }
            } catch (err) {
              console.error("Error checking proof status:", err);
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

            {user && user?.role !== 'admin' && completed && (
              <li><Link href="/result">Result</Link></li>
            )}

            <li><Link href="/privacy-policy">Privacy Policy</Link></li>

            {user?.role === 'admin' && (
              <li><Link href="/dashboard">Dashboard</Link></li>
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

              {user && user?.role !== 'admin' && completed && (
                <li><Link href="/result" onClick={toggleMenu}>Result</Link></li>
              )}

              <li><Link href="/privacy-policy" onClick={toggleMenu}>Privacy Policy</Link></li>

              {user?.role === 'admin' && (
                <li><Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
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

      {/* ✅ Notification Bar */}
      {user && pathname !== '/result' && pathname !== '/dashboard' && pathname !== '/admin' && (
        <div className="bg-gray-100 text-green-900 text-center py-2 px-4 text-md font-medium">
          {!proofSubmitted ? (
            <p>
              Please pay your fees to continue.{" "}
              <Link href="/pricing" className="underline text-green-700 hover:text-green-900">Pay Fees</Link>
            </p>
          ) : !approved ? (
            <p>
              Your proof has been submitted. Please wait for admin approval. This usually takes a few minutes. If not approved within few hours, please contact us.
            </p>
          ) : !completed ? (
            <p>
              Your proof has been approved. You can now{" "}
              <Link href="/start_test" className="underline text-green-700 hover:text-green-900">Start Test</Link>
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
