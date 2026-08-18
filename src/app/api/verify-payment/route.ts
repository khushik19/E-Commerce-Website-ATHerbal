// src/app/api/verify-payment/route.ts
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return Response.json(
        { success: false, error: 'Missing required payment verification parameters.' },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return Response.json(
        { success: false, error: 'Razorpay Key Secret missing on server.' },
        { status: 500 }
      );
    }

    // Generate HMAC SHA256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return Response.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: 'Payment verified successfully.',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error: unknown) {
    console.error('Razorpay verification error:', error);
    const message = error instanceof Error ? error.message : 'Payment verification error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
