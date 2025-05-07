'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="py-4 px-4 md:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="text-lg font-bold hover:opacity-90">
            <span className="text-black">Entrepreneurship</span>
            <span className="text-[#bd6650]"> Without</span>
            <span className="text-[#4db3cc]"> An</span>
            <span className="text-[#f6abb3]"> Address</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="font-medium hover:opacity-80">
            Entrepreneurship Without An Address
          </Link>
          <Link href="/about-us" className="font-medium hover:opacity-80">
            About Us
          </Link>
          <Link href="/policy-proposal" className="font-medium hover:opacity-80">
            Policy Proposal
          </Link>
          {status === 'authenticated' ? (
            <>
              {(session.user.userType === 'entrepreneur' || session.user.userType === 'investor') && (
                <Link href="/pitches" className="font-medium hover:opacity-80">
                  Pitches
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="font-medium hover:opacity-80 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-medium hover:opacity-80">
                Login
              </Link>
              <Link href="/register" className="font-medium hover:opacity-80">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white absolute top-16 left-0 right-0 z-50 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="font-medium hover:opacity-80">
              Entrepreneurship Without An Address
            </Link>
            <Link href="/about-us" className="font-medium hover:opacity-80">
              About Us
            </Link>
            <Link href="/policy-proposal" className="font-medium hover:opacity-80">
              Policy Proposal
            </Link>
            {status === 'authenticated' ? (
              <>
                {(session.user.userType === 'entrepreneur' || session.user.userType === 'investor') && (
                  <Link href="/pitches" className="font-medium hover:opacity-80">
                    Pitches
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMenuOpen(false);
                  }}
                  className="font-medium hover:opacity-80 text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="font-medium hover:opacity-80">
                  Login
                </Link>
                <Link href="/register" className="font-medium hover:opacity-80">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
