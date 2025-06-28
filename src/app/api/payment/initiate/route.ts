import {NextRequest, NextResponse} from 'next/server';
import {mockServices} from '@/lib/data';

// In a real application, you would use the paytm-pg-node-sdk
// and your merchant credentials from .env
// import Paytm from 'paytm-pg-node-sdk';
// const merchantId = process.env.PAYTM_MERCHANT_ID;
// const merchantKey = process.env.PAYTM_MERCHANT_KEY;

export async function POST(req: NextRequest) {
  try {
    const { serviceId } = await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }
    
    const service = mockServices.find(s => s.id === serviceId);

    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const orderId = `ORDER_${service.id}_${Date.now()}`;
    const amount = service.amount.toString();
    const callbackUrl = `${req.nextUrl.origin}/api/payment/callback`;

    // --- Real Paytm Integration would happen here ---
    // 1. Configure Paytm environment (Staging/Production)
    // Paytm.LibraryConstants.setstEnvironment(Paytm.LibraryConstants.STAGING_ENVIRONMENT);

    // 2. Create the request body for Paytm's Initiate Transaction API
    // const paytmParams = {
    //   body: {
    //     "requestType"   : "Payment",
    //     "mid"           : merchantId,
    //     "websiteName"   : "WEBSTAGING",
    //     "orderId"       : orderId,
    //     "callbackUrl"   : `${callbackUrl}?orderId=${orderId}`,
    //     "txnAmount"     : {
    //         "value"     : amount,
    //         "currency"  : "INR",
    //     },
    //     "userInfo"      : {
    //         "custId"    : service.client.email,
    //     },
    //   },
    // };

    // 3. Generate the checksum
    // const checksum = await Paytm.Checksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey);
    // paytmParams.head = { "signature": checksum };

    // 4. Make the API call to get a transaction token
    // const response = await fetch(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${merchantId}&orderId=${orderId}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(paytmParams)
    // });
    // const responseJson = await response.json();
    // const txnToken = responseJson.body.txnToken;

    // 5. Construct the redirect URL for Paytm's checkout page
    // const redirectUrl = `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${merchantId}&orderId=${orderId}&txnToken=${txnToken}`;
    // ----------------------------------------------------


    // --- Mocking the Paytm flow ---
    // Instead of redirecting to Paytm, we'll redirect directly to our own callback,
    // simulating a successful payment.
    console.log(`[Mock Payment] Initiating transaction for Order ID: ${orderId}`);
    console.log('[Mock Payment] Checksum generated (simulated).');
    console.log('[Mock Payment] Redirecting to mock callback.');

    const mockCallbackUrl = `${callbackUrl}?status=success&serviceId=${serviceId}&orderId=${orderId}&amount=${amount}`;
    
    return NextResponse.json({ redirectUrl: mockCallbackUrl });

  } catch (error) {
    console.error('Payment initiation failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to initiate payment: ${errorMessage}` }, { status: 500 });
  }
}
