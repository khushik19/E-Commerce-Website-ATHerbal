'use client';
// src/app/orders/page.tsx
import { useAuth } from '../../hooks/useAuth';
import { getUserOrders } from '../../lib/firestore';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Order = {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt?: { seconds: number };
  couponCode?: string;
};

const statusColors: Record<string, string> = {
  placed:    '#D4A017',
  confirmed: '#22c55e',
  shipped:   '#3b82f6',
  delivered: '#10b981',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getUserOrders(user.uid).then((data) => {
      setOrders(data as Order[]);
      setLoading(false);
    });
  }, [user]);

  if (!user) {
    return (
      <div className="king-bg min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[#F5E6C8] mb-4">Please login to view your orders</p>
          <Link href="/" className="btn-gold py-3 px-8">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="king-bg min-h-screen px-4 pt-4 pb-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-[#F5E6C8] text-2xl font-bold mb-6 text-center" style={{ fontFamily: 'Cinzel, serif' }}>My Orders</h1>

        {loading ? (
          <div className="text-center text-[#F5E6C8] py-8">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#F5E6C8]/40 text-4xl mb-3">📦</div>
            <p className="text-[#F5E6C8] font-bold mb-2">No orders yet</p>
            <p className="text-[#F5E6C8]/50 text-sm mb-5">Your orders will appear here after purchase</p>
            <Link href="/cart">
              <button className="btn-gold py-3 px-8">Order Now</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl p-4"
                style={{ background: 'rgba(45,26,0,0.65)', border: '1px solid rgba(212,160,23,0.3)' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[#D4A017] font-bold text-xs font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </div>
                    {order.createdAt && (
                      <div className="text-[#F5E6C8]/40 text-xs mt-0.5">
                        {new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-IN')}
                      </div>
                    )}
                  </div>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold capitalize"
                    style={{
                      color: statusColors[order.orderStatus] || '#D4A017',
                      background: `${statusColors[order.orderStatus] || '#D4A017'}22`,
                      border: `1px solid ${statusColors[order.orderStatus] || '#D4A017'}44`,
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="text-[#F5E6C8]/70 text-sm">African King Herbal Power Powder — 300g</div>

                <div className="flex justify-between mt-2">
                  <div className="text-[#FFD700] font-bold">₹{order.amount}</div>
                  <div className="text-[#F5E6C8]/50 text-xs">{order.paymentMethod}</div>
                </div>

                {order.couponCode && (
                  <div className="text-[#D4A017] text-xs mt-1">Coupon: {order.couponCode}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
