// src/app/admin/orders/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getAllOrders } from '../../../lib/firestore';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  couponCode?: string;
  createdAt?: { seconds: number };
};

export default function AdminOrdersPage() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders().then((data) => {
      setOrders(data as Order[]);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'orders', id), { orderStatus: status });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, orderStatus: status } : o));
    toast.success('Status updated');
  };

  const updateTracking = async (id: string, trackingId: string) => {
    await updateDoc(doc(db, 'orders', id), { trackingId, orderStatus: 'shipped' });
    toast.success('Tracking ID saved');
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-8" style={{ background: '#0D0800' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/admin" className="text-[#D4A017] text-sm">← Back</Link>
          <h1 className="text-[#F5E6C8] text-xl font-bold" style={{ fontFamily: 'Cinzel, serif' }}>
            Orders ({orders.length})
          </h1>
        </div>

        {loading ? (
          <div className="text-[#F5E6C8] text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={updateStatus}
                onUpdateTracking={updateTracking}
              />
            ))}
            {orders.length === 0 && (
              <div className="text-[#F5E6C8]/50 text-center py-8">No orders yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({
  order, onUpdateStatus, onUpdateTracking,
}: {
  order: Order;
  onUpdateStatus: (id: string, s: string) => void;
  onUpdateTracking: (id: string, t: string) => void;
}) {
  const [tracking, setTracking] = useState('');

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: 'rgba(45,26,0,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}
    >
      <div className="flex justify-between mb-2">
        <div>
          <div className="text-[#F5E6C8] font-bold">{order.customerName}</div>
          <a href={`tel:${order.phone}`} className="text-[#D4A017] text-sm font-mono">{order.phone}</a>
        </div>
        <div className="text-right">
          <div className="text-[#FFD700] font-bold">₹{order.amount}</div>
          <div className="text-xs text-[#F5E6C8]/40">{order.paymentMethod}</div>
        </div>
      </div>
      <div className="text-[#F5E6C8]/40 text-xs mb-3">{order.address}</div>
      {order.couponCode && (
        <div className="text-[#D4A017] text-xs mb-2">Coupon: {order.couponCode}</div>
      )}

      <select
        value={order.orderStatus}
        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
        className="w-full text-white text-xs border rounded-lg px-2 py-1.5 mb-2"
        style={{ background: '#1A0F00', borderColor: 'rgba(212,160,23,0.4)' }}
      >
        <option value="placed">Placed</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>

      <div className="flex gap-2">
        <input
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          placeholder="Add tracking ID"
          className="input-field flex-1 text-xs"
        />
        <button
          onClick={() => onUpdateTracking(order.id, tracking)}
          className="text-[#1A0F00] text-xs px-3 rounded-lg font-bold"
          style={{ background: 'linear-gradient(135deg, #8B6914, #D4A017)' }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
