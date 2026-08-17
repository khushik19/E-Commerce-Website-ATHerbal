// src/app/api/create-order/route.ts
import Razorpay from 'razorpay';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount || amount < 1) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Lazily initialize Razorpay inside the handler — env vars are available at runtime
    const razorpay = new Razorpay({
      key_id:     process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt:  `ak_order_${Date.now()}`,
    });

    return Response.json({ orderId: order.id, amount });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return Response.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}
