// src/app/admin/coupons/page.tsx
'use client';
import { useEffect, useState } from 'react';
import {
  getAllAffiliateRequests,
  generateCouponCode,
  rejectAffiliateRequest,
  getAllCoupons,
} from '../../../lib/firestore';
import { AffiliateRequest, Coupon } from '../../../types';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminCouponsPage() {
  const [requests, setRequests]   = useState<(AffiliateRequest & { id: string })[]>([]);
  const [coupons, setCoupons]     = useState<Coupon[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [tab, setTab]             = useState<'requests' | 'codes'>('requests');
  const [loading, setLoading]     = useState(true);

  const loadData = async () => {
    const [reqs, codes] = await Promise.all([getAllAffiliateRequests(), getAllCoupons()]);
    setRequests(reqs as (AffiliateRequest & { id: string })[]);
    setCoupons(codes);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (req: AffiliateRequest & { id: string }) => {
    const discount = discounts[req.id] || 10;
    const code = await generateCouponCode(req.id, req.fullName, discount);
    toast.success(`Approved! Coupon code: ${code}`);
    loadData();
  };

  const handleReject = async (id: string) => {
    await rejectAffiliateRequest(id);
    toast.success('Request rejected');
    loadData();
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-8" style={{ background: '#0D0800' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/admin" className="text-[#D4A017] text-sm">← Back</Link>
          <h1 className="text-[#F5E6C8] text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            Affiliates &amp; Coupons
          </h1>
        </div>

        <div className="flex gap-2 mb-4">
          {(['requests', 'codes'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-full text-xs font-bold transition"
              style={{
                background: tab === t ? '#D4A017' : 'rgba(212,160,23,0.1)',
                color:      tab === t ? '#1A0F00' : '#D4A017',
                border:     `1px solid ${tab === t ? '#D4A017' : 'rgba(212,160,23,0.3)'}`,
              }}
            >
              {t === 'requests'
                ? `Pending (${requests.filter(r => r.status === 'pending').length})`
                : `Active Codes (${coupons.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-[#F5E6C8] text-center py-8">Loading...</div>
        ) : (
          tab === 'requests' ? (
            <div className="space-y-3">
              {requests.filter(r => r.status === 'pending').map((req) => (
                <div
                  key={req.id}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
                >
                  <div className="text-[#F5E6C8] font-bold">{req.fullName}</div>
                  <div className="text-[#D4A017] text-sm">📱 {req.phone}</div>
                  <div className="text-[#F5E6C8]/40 text-xs mt-1">
                    Instagram:{' '}
                    <a href={`https://instagram.com/${req.instagramHandle}`}
                      target="_blank" rel="noopener noreferrer" className="text-pink-400">
                      @{req.instagramHandle}
                    </a>
                    {req.instagramFollowers && ` (${req.instagramFollowers.toLocaleString()} followers)`}
                  </div>
                  {req.message && (
                    <p className="text-[#F5E6C8]/40 text-xs mt-2 italic">&quot;{req.message}&quot;</p>
                  )}

                  <div className="mt-3 flex gap-2 items-center">
                    <div className="flex items-center gap-1">
                      <span className="text-[#F5E6C8]/60 text-xs">Discount %:</span>
                      <input
                        type="number"
                        value={discounts[req.id] || 10}
                        onChange={(e) => setDiscounts(prev => ({ ...prev, [req.id]: Number(e.target.value) }))}
                        className="w-14 input-field text-xs py-1"
                        min={1} max={50}
                      />
                    </div>
                    <button
                      onClick={() => handleApprove(req)}
                      className="flex-1 text-[#1A0F00] text-xs py-1.5 rounded-lg font-bold"
                      style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
                    >
                      ✓ Approve &amp; Generate Code
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 bg-red-800 text-white text-xs py-1.5 rounded-lg font-bold"
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))}
              {requests.filter(r => r.status === 'pending').length === 0 && (
                <div className="text-[#F5E6C8]/50 text-center py-8">No pending requests.</div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[#FFD700] font-black text-lg" style={{ fontFamily: 'Cinzel, serif' }}>
                        {coupon.code}
                      </span>
                      <div className="text-[#F5E6C8] text-sm">{coupon.affiliateName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#D4A017] font-bold">{coupon.discountPercent}% OFF</div>
                      <div className="text-[#F5E6C8]/40 text-xs">{coupon.usageCount} uses</div>
                      <div className="text-[#FFD700] text-xs">₹{coupon.totalRevenue} revenue</div>
                    </div>
                  </div>
                </div>
              ))}
              {coupons.length === 0 && (
                <div className="text-[#F5E6C8]/50 text-center py-8">No active coupons yet.</div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
