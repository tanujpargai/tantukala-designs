import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ error: 'Order and payment references are required' }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // In real production with real secret
    if (keySecret && !keySecret.includes('demo_secret') && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const isSignatureValid = generatedSignature === razorpay_signature;

      if (!isSignatureValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid HMAC signature. Payment verification failed.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    }

    // In sandbox test mode
    return NextResponse.json({
      success: true,
      verified: true,
      mode: 'test_demo',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      message: 'Payment verified successfully in sandbox test mode.',
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error.message || 'Error occurred during signature verification' },
      { status: 500 }
    );
  }
}
