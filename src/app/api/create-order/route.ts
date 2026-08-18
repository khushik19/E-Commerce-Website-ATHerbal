// src/app/api/create-order/route.ts
import Razorpay from 'razorpay';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    // Convert to paise if passed in Rupees (e.g., 1199 -> 119900)
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : Math.round(amount);

    // Minimum amount requirement: 100 paise (₹1)
    if (isNaN(amountInPaise) || amountInPaise < 100) {
      return Response.json(
        { error: 'Invalid amount. Minimum amount is 100 paise (₹1).' },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return Response.json(
        { error: 'Razorpay API credentials missing on server.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receipt = `ak_order_${Date.now()}`;
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
    });

    return Response.json({
      orderId: order.id,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: unknown) {
    console.error('Razorpay order creation error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create payment order';
    return Response.json({ error: message }, { status: 500 });
  }
}
