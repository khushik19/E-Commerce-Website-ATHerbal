'use client';
// src/app/admin/page.tsx
import { useState } from 'react';
import Link from 'next/link';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'afrikanking_admin_2024';

export default function AdminPage() {
  const [input, setInput]     = useState('');
  const [authed, setAuthed]   = useState(false);
  const [error, setError]     = useState(false);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: '#0D0800' }}>
        <div className="w-full max-w-xs rounded-2xl p-8 space-y-4"
          style={{ background: '#1A0F00', border: '1px solid rgba(212,160,23,0.4)' }}>
          <div className="text-center">
            <div className="text-[#FFD700] text-3xl mb-2">👑</div>
            <h1 className="text-[#FFD700] font-bold text-xl" style={{ fontFamily: 'Cinzel, serif' }}>
              African King
            </h1>
            <p className="text-[#F5E6C8]/50 text-xs mt-1">Admin Dashboard</p>
          </div>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (input === ADMIN_PASSWORD) setAuthed(true);
                else setError(true);
              }
            }}
            placeholder="Admin password"
            className="input-field"
          />
          {error && (
            <p className="text-red-400 text-xs text-center">Incorrect password</p>
          )}
          <button
            onClick={() => {
              if (input === ADMIN_PASSWORD) setAuthed(true);
              else setError(true);
            }}
            className="btn-gold w-full py-2.5"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-4 pb-8"
      style={{ background: '#0D0800' }}>
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[#FFD700] text-2xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-[#F5E6C8]/50 text-sm mt-1">African King Herbal</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { href: '/admin/leads',    label: 'Leads',     icon: '📞', desc: 'Manage all leads' },
            { href: '/admin/orders',   label: 'Orders',    icon: '📦', desc: 'View & update orders' },
            { href: '/admin/reviews',  label: 'Reviews',   icon: '⭐', desc: 'Approve reviews' },
            { href: '/admin/coupons',  label: 'Coupons',   icon: '🏷️', desc: 'Affiliates & codes' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className="rounded-2xl p-5 flex flex-col items-center text-center gap-2 cursor-pointer transition-transform hover:scale-105"
                style={{ background: '#1A0F00', border: '1px solid rgba(212,160,23,0.35)' }}
              >
                <div className="text-3xl">{item.icon}</div>
                <div className="text-[#FFD700] font-bold text-base" style={{ fontFamily: 'Cinzel, serif' }}>{item.label}</div>
                <div className="text-[#F5E6C8]/50 text-xs">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
