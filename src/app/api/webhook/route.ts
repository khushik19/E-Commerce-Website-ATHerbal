// src/app/api/webhook/route.ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Razorpay webhook event received:', body.event);

    return Response.json({ status: 'ok', received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return Response.json({ status: 'ok', received: true });
  }
}
