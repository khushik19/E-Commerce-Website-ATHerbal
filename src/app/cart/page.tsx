'use client';
// src/app/cart/page.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { saveOrder, validateCoupon, incrementCouponUsage } from '../../lib/firestore';
import { MortarLoader } from '../../components/ui/MortarLoader';
import { CODModal } from '../../components/popups/CODModal';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void; on: (event: string, handler: (resp: unknown) => void) => void };
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  config?: Record<string, unknown>;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: { name: string; contact: string; email: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
}

const ORIGINAL_PRICE  = 1899;
const PREPAID_PRICE   = 1199;

export default function CartPage() {
  const { user, userProfile } = useAuth();
  const [name, setName]                 = useState('');
  const [phone, setPhone]               = useState('');
  const [address, setAddress]           = useState('');
  const [couponCode, setCouponCode]     = useState('');
  const [discount, setDiscount]         = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [payLoading, setPayLoading]     = useState(false);
  const [showCOD, setShowCOD]           = useState(false);
  const [quantity, setQuantity]         = useState(1);

  // Pre-fill user details if logged in or saved
  useEffect(() => {
    if (userProfile) {
      if (userProfile.name) setName(userProfile.name);
      if (userProfile.phone) setPhone(userProfile.phone);
      if (userProfile.address) setAddress(userProfile.address);
    }
  }, [userProfile]);

  const totalOriginal   = ORIGINAL_PRICE  * quantity;
  const totalPrepaid    = PREPAID_PRICE   * quantity;
  const finalPrice      = Math.round(totalPrepaid * (1 - discount / 100));

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    const coupon = await validateCoupon(couponCode.trim().toUpperCase());
    setCouponLoading(false);
    if (!coupon) {
      toast.error('Invalid or expired coupon code');
      return;
    }
    setDiscount(coupon.discountPercent);
    setCouponApplied(true);
    toast.success(`Coupon applied! ${coupon.discountPercent}% off`);
  };

  const loadRazorpay = (): Promise<boolean> =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload  = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPayment = async () => {
    if (!name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (phone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!address.trim()) {
      toast.error('Please enter your delivery address');
      return;
    }

    setPayLoading(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error('Payment gateway failed to load. Check your internet connection.');
        setPayLoading(false);
        return;
      }

      let realOrderId = '';
      try {
        const res = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: finalPrice }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.orderId || data.order_id) {
            const returnedId = data.orderId || data.order_id;
            if (typeof returnedId === 'string' && returnedId.startsWith('order_')) {
              realOrderId = returnedId;
            }
          }
        }
      } catch (e) {
        console.warn('API create-order note:', e);
      }

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TRKCjguU6OTZrK',
        amount: finalPrice * 100,
        currency: 'INR',
        name: 'African King Herbal',
        description: 'African King Herbal Power Powder — 300g',
        ...(realOrderId ? { order_id: realOrderId } : {}),
        config: {
          display: {
            blocks: {
              cards: {
                name: 'Pay with Card or UPI',
                instruments: [
                  { method: 'card' },
                  { method: 'upi' },
                  { method: 'netbanking' },
                ],
              },
            },
            sequence: ['block.cards'],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        handler: async (response: RazorpayResponse) => {
          // Verify payment signature on backend if real order_id was created
          if (response.razorpay_signature && response.razorpay_order_id) {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
              if (verifyRes.ok) {
                const verifyData = await verifyRes.json();
                if (!verifyData.success) {
                  toast.error('Payment signature verification failed.');
                  setPayLoading(false);
                  return;
                }
              }
            } catch (e) {
              console.warn('Backend signature verification note:', e);
            }
          }

          // Save completed order to Firestore
          await saveOrder({
            userId: user?.uid || `guest_${Date.now()}`,
            customerName: name,
            phone,
            address,
            amount: finalPrice,
            paymentMethod: 'razorpay',
            paymentStatus: 'paid',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || `pay_${Date.now()}`,
            couponCode: couponApplied ? couponCode.toUpperCase() : undefined,
            discountApplied: discount,
            orderStatus: 'placed',
          });

          if (couponApplied && couponCode) {
            await incrementCouponUsage(couponCode.toUpperCase(), finalPrice);
          }

          toast.success('Payment successful! Order placed. 👑');
          setPayLoading(false);
        },
        prefill: {
          name,
          contact: phone,
          email: '',
        },
        theme: { color: '#D4A017' },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            setPayLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: unknown) {
        console.error('Razorpay payment failed:', resp);
        toast.error('Payment failed. Please try again.');
        setPayLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay init error:', err);
      toast.error('Payment failed. Please try again.');
      setPayLoading(false);
    }
  };

  return (
    <>
      <div className="king-bg min-h-screen px-4 pt-4 pb-8">
        <div className="max-w-lg mx-auto">
          <h1
            className="text-[#F5E6C8] text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Your Order
          </h1>

          {/* Product card */}
          <div
            className="rounded-2xl p-4 flex gap-4 mb-4"
            style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <Image
              src="/images/home_hero.png"
              alt="African King Herbal Power Powder"
              width={90}
              height={90}
              className="rounded-xl object-contain flex-shrink-0"
            />
            <div className="flex-1">
              <div className="text-[#F5E6C8] font-bold text-sm leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
                African King Herbal Power Powder
              </div>
              <div className="text-[#D4A017] text-xs mt-1">300g | 15+ Ayurvedic Herbs</div>
              <div className="text-[#F5E6C8]/60 text-xs">Stamina | Energy | Strength</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="line-through text-gray-500 text-xs">₹{totalOriginal}</span>
                <span className="text-[#FFD700] font-black text-lg">₹{totalPrepaid}</span>
              </div>
              <div className="text-[#D4A017] text-xs">Free shipping | Pan India</div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[#F5E6C8]/60 text-xs font-semibold">Qty:</span>
                <div
                  className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: '1px solid rgba(212,160,23,0.4)' }}
                >
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 text-[#F5E6C8] text-lg font-bold transition-colors"
                    style={{ background: 'rgba(212,160,23,0.15)' }}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="px-4 py-1 text-[#F5E6C8] font-bold text-sm"
                    style={{ background: 'rgba(45,26,0,0.6)' }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 text-[#F5E6C8] text-lg font-bold transition-colors"
                    style={{ background: 'rgba(212,160,23,0.15)' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details Form */}
          <div
            className="rounded-2xl p-4 mb-4 space-y-3"
            style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
          >
            <div className="text-[#FFD700] font-bold text-sm" style={{ fontFamily: 'Cinzel, serif' }}>
              Shipping Details
            </div>
            <div>
              <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Full Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Mobile Number *</label>
              <div className="flex">
                <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700 text-sm font-semibold select-none">
                  +91
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="input-field rounded-l-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[#F5E6C8]/70 text-xs font-medium block mb-1">Delivery Address &amp; City *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No., Landmark, City & Pincode"
                className="input-field"
                rows={2}
              />
            </div>
          </div>

          {/* Coupon code */}
          {!couponApplied ? (
            <div className="flex gap-2 mb-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Have a coupon code?"
                className="input-field flex-1"
              />
              <button
                onClick={applyCoupon}
                disabled={couponLoading}
                className="text-[#1A0F00] font-bold text-sm px-4 py-2 rounded-xl flex-shrink-0 transition disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
              >
                {couponLoading ? '...' : 'Apply'}
              </button>
            </div>
          ) : (
            <div
              className="rounded-xl p-3 mb-4 flex items-center justify-between"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}
            >
              <span className="text-[#D4A017] text-sm">
                <strong>{couponCode}</strong> — {discount}% off applied!
              </span>
              <button
                onClick={() => { setCouponApplied(false); setDiscount(0); setCouponCode(''); }}
                className="text-[#D4A017] text-xs underline"
              >
                Remove
              </button>
            </div>
          )}

          {/* Price summary */}
          <div
            className="rounded-xl p-4 mb-6 space-y-2"
            style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.25)' }}
          >
            <div className="flex justify-between text-[#F5E6C8] text-sm">
              <span>Original Price {quantity > 1 ? `× ${quantity}` : ''}</span>
              <span className="line-through text-gray-400">₹{totalOriginal}</span>
            </div>
            <div className="flex justify-between text-green-400 text-sm">
              <span>Prepaid Discount</span>
              <span>− ₹{totalOriginal - totalPrepaid}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400 text-sm">
                <span>Coupon ({couponCode})</span>
                <span>− ₹{totalPrepaid - finalPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-[#D4A017] text-sm">
              <span>Shipping</span>
              <span className="text-green-400">FREE</span>
            </div>
            <div
              className="pt-2 flex justify-between text-[#FFD700] font-bold text-xl"
              style={{ borderTop: '1px solid rgba(212,160,23,0.25)' }}
            >
              <span>Total</span>
              <span>₹{finalPrice}</span>
            </div>
          </div>

          {/* Payment buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRazorpayPayment}
              disabled={payLoading}
              className="btn-gold w-full py-4 text-base flex items-center justify-center gap-2"
            >
              {payLoading ? <MortarLoader /> : 'Pay Online (UPI / Card / NetBanking)'}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.2)' }} />
              <span className="text-[#D4A017] text-xs">OR</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(212,160,23,0.2)' }} />
            </div>

            <button
              onClick={() => setShowCOD(true)}
              className="btn-brown py-4 text-base"
            >
              Cash on Delivery (COD) — ₹1,599
            </button>
          </div>

          <p className="text-center text-[#F5E6C8]/50 text-xs mt-4">
            100% Secure | Genuine product guaranteed | Pan India delivery
          </p>
        </div>
      </div>

      {showCOD && <CODModal onClose={() => setShowCOD(false)} />}
    </>
  );
}
