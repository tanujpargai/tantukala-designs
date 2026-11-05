import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If real credentials are provided, call Razorpay Orders API
    if (keyId && keySecret && !keyId.includes('YourTestKeyId') && !keySecret.includes('demo_secret')) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // in paise
          currency,
          receipt: receipt || `rcpt_${Date.now()}`,
          payment_capture: 1,
        }),
      });

      const orderData = await response.json();
      return NextResponse.json(orderData);
    }

    // Otherwise return structured test mode order response
    return NextResponse.json({
      id: `order_test_${Date.now()}`,
      entity: 'order',
      amount: Math.round(amount * 100),
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency,
      receipt: receipt || `rcpt_test_${Date.now()}`,
      status: 'created',
      mode: 'test_demo',
      message: 'Razorpay order prepared in sandbox test mode.',
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error creating payment order' },
      { status: 500 }
    );
  }
}
