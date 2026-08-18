'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, User, Info, Phone, FileText, Package, LogOut, ShieldCheck, ScrollText } from 'lucide-react';
import { PhoneOTPForm } from '../popups/PhoneOTPForm';

const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/#benefits',    label: 'Benefits' },
  { href: '/#ingredients', label: 'Ingredients' },
  { href: '/#how-to-use',  label: 'How to Use' },
  { href: '/#reviews',     label: 'Reviews' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout }              = useAuth();
  const profileRef                    = useRef<HTMLDivElement>(null);

  const close = () => { setMenuOpen(false); setProfileOpen(false); };

  useEffect(() => {
    if (!profileOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [profileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-[#D4A017]/20">

      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-1.5 max-w-7xl mx-auto">

        {/* Left: hamburger (mobile only) + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}
            className="md:hidden text-[#F5E6C8] p-1.5 hover:bg-[#D4A017]/10 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link href="/" onClick={close} className="shrink-0">
            <Image
              src="/images/home_hero.png"
              alt="African King Herbal logo"
              width={52}
              height={52}
              style={{ width: 'auto', height: 52 }}
              className="object-contain rounded-md"
            />
          </Link>
        </div>

        {/* Centre: nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 lg:gap-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[#F5E6C8]/90 hover:text-[#FFD700] text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-[#D4A017]/10 transition-all font-lato"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right: Account dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setMenuOpen(false); }}
            className="text-[#F5E6C8] flex flex-col items-center p-1.5 hover:text-[#FFD700] transition-colors"
            aria-label="Account"
          >
            <User size={22} />
            <span className="text-[10px] font-semibold mt-0.5 leading-tight">
              {user ? 'Account' : 'Login'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[54px] bg-white rounded-xl shadow-2xl w-56 py-2 z-50 border border-gray-100">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 font-medium"
                    onClick={close}
                  >
                    <User size={15} /> My Profile
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 font-medium"
                    onClick={close}
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => { logout(); close(); }}
                    className="flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left font-medium"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </>
              ) : (
                <div className="px-4 py-4">
                  <p className="text-xs text-gray-500 mb-3 text-center">Submit details for special offer</p>
                  <PhoneOTPForm onSuccess={close} />
                </div>
              )}
              <hr className="my-1 border-gray-100" />
              <Link href="/about"         className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={close}><Info size={15} /> About Us</Link>
              <Link href="/contact"       className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={close}><Phone size={15} /> Contact Us</Link>
              <Link href="/refund-policy" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={close}><FileText size={15} /> Refund Policy</Link>
              <hr className="my-1 border-gray-100" />
              <Link href="/privacy-policy" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-500 hover:bg-gray-50 font-medium" onClick={close}><ShieldCheck size={15} /> Privacy Policy</Link>
              <Link href="/terms-of-use"   className="flex items-center gap-3 px-5 py-3 text-sm text-gray-500 hover:bg-gray-50 font-medium" onClick={close}><ScrollText size={15} /> Terms of Use</Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile slide-down dropdown menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A0F00]/95 backdrop-blur-md border-t border-[#D4A017]/20 px-4 py-3 shadow-2xl">
          <div className="flex flex-col gap-1 max-w-7xl mx-auto">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#F5E6C8] text-sm font-medium py-2.5 border-b border-[#D4A017]/20 hover:text-[#FFD700] hover:pl-2 transition-all"
                onClick={close}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
