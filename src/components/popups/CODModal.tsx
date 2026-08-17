'use client';
// src/components/popups/CODModal.tsx
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const ORIGINAL_PRICE  = 1899;
const COD_PRICE       = 1599;

export function CODModal({ onClose }: { onClose: () => void }) {
  const { userProfile } = useAuth();
  const [name, setName]       = useState(userProfile?.name || '');
  const [phone, setPhone]     = useState(userProfile?.phone || '');
  const [address, setAddress] = useState(userProfile?.address || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (phone.length < 10) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        customerName: name,
        phone,
        address,
        amount: COD_PRICE,
        paymentMethod: 'COD',
        paymentStatus: 'pending',
        orderStatus: 'placed',
        leadType: 'cod',
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, 'leads'), {
        name,
        phone,
        address,
        leadType: 'cod_request',
        contacted: false,
        createdAt: serverTimestamp(),
      });

      toast.success('COD order placed! Our team will call you to confirm.');
      onClose();
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div
        className="rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        style={{ background: '#1A0F00', border: '1px solid rgba(212,160,23,0.4)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg" style={{ color: '#FFD700', fontFamily: 'Cinzel, serif' }}>
            Cash on Delivery
          </h3>
          <button onClick={onClose} className="text-[#F5E6C8]/60 hover:text-[#F5E6C8]">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Full Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="input-field" />
          </div>

          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Mobile Number *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              type="tel"
              inputMode="numeric"
              className="input-field"
            />
          </div>

          <div>
            <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Delivery Address *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address with pincode"
              className="input-field"
              rows={3}
            />
          </div>

          {/* Order summary */}
          <div className="rounded-xl p-3" style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <div className="text-xs text-[#F5E6C8]/60 font-medium mb-1">Order Summary</div>
            <div className="text-sm text-[#F5E6C8]">African King Herbal Power Powder — 300g</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="line-through text-gray-400 text-xs">MRP ₹{ORIGINAL_PRICE}</span>
              <span className="text-[#FFD700] font-black text-lg">₹{COD_PRICE}</span>
              <span className="text-green-400 text-xs bg-green-900/40 px-1.5 py-0.5 rounded-full font-semibold">
                Save ₹{ORIGINAL_PRICE - COD_PRICE}
              </span>
            </div>
            <div className="text-xs text-[#F5E6C8]/50 mt-1">Free delivery | Pan India</div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-gold w-full py-3"
          >
            {loading ? 'Placing Order...' : `✓ Confirm COD Order — ₹${COD_PRICE}`}
          </button>

          <p className="text-xs text-[#F5E6C8]/50 text-center">
            Our team will call you within 24 hours to confirm delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
