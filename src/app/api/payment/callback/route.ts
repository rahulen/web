import { NextRequest, NextResponse } from 'next/server';

// In a real application, you would use the paytm-pg-node-sdk
// to validate the checksum.
// import Paytm from 'paytm-pg-node-sdk';
// const merchantKey = process.env.PAYTM_MERCHANT_KEY;

export async function GET(req: NextRequest) {
  // NOTE: A real Paytm callback uses POST with form data.
  // For this simulation, we are using a GET request with query params for simplicity.
  const searchParams = req.nextUrl.searchParams;
  const serviceId = searchParams.get('serviceId');
  const orderId = searchParams.get('orderId');
  const paymentStatus = searchParams.get('status');

  try {
    // --- Real Paytm checksum validation would happen here ---
    // const paytmResponse = { ... }; // This would come from the POST body
    // const isSignatureValid = Paytm.Checksum.verifySignature(
    //   JSON.stringify(paytmResponse),
    //   merchantKey,
    //   paytmResponse.signature
    // );
    // if (!isSignatureValid) {
    //   throw new Error("Checksum mismatch");
    // }
    // -------------------------------------------------------

    console.log(`[Mock Callback] Received for Order ID: ${orderId}`);
    
    if (paymentStatus === 'success') {
      console.log(`[Mock Callback] Checksum validation successful (simulated).`);
      console.log(`[Mock Callback] Updating payment status to 'Paid' for Service ID: ${serviceId} in the database.`);
      
      // Here, you would update your database to mark the service as 'Paid'.
      // Since we are using mock data, we cannot persist this change.
      // We will redirect to the payments page with a success message.

      const redirectUrl = new URL('/dashboard/payments', req.nextUrl.origin);
      redirectUrl.searchParams.set('status', 'success');
      redirectUrl.searchParams.set('serviceId', serviceId || '');
      return NextResponse.redirect(redirectUrl);

    } else {
      console.log(`[Mock Callback] Payment failed for Order ID: ${orderId}`);
      const redirectUrl = new URL('/dashboard/payments', req.nextUrl.origin);
      redirectUrl.searchParams.set('status', 'failed');
      redirectUrl.searchParams.set('serviceId', serviceId || '');
      return NextResponse.redirect(redirectUrl);
    }

  } catch (error) {
    console.error('Payment callback processing failed:', error);
    const redirectUrl = new URL('/dashboard/payments', req.nextUrl.origin);
    redirectUrl.searchParams.set('status', 'error');
    redirectUrl.search_params.set('serviceId', serviceId || '');
    return NextResponse.redirect(redirectUrl);
  }
}
