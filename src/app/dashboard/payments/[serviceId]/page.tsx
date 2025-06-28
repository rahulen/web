'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import { useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentGatewayPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const serviceId = params.serviceId as string;
  
  const [service, setService] = useState<Service | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (serviceId) {
      const foundService = mockServices.find(s => s.id === serviceId);
      setService(foundService);
    }
  }, [serviceId]);

  const handlePayment = async () => {
    if (!service) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: service.id }),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        throw new Error(responseBody.error || 'Failed to initiate payment.');
      }
      
      const { redirectUrl } = responseBody;
      
      // In a real scenario with Paytm's SDK, you might open their checkout page.
      // Here, we're redirecting to our mock callback flow.
      router.push(redirectUrl);

    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: `Could not start the payment process: ${errorMessage}`,
      });
      setIsLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Header title="Payment" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Loading Service...</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Please wait while we fetch the service details.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title={`Payment for ${service.name}`} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center bg-muted/40">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center p-6">
            <CheckCircle className="mx-auto h-12 w-12 text-primary"/>
            <CardTitle className="mt-4">Complete Your Payment</CardTitle>
            <CardDescription>Review your service details and proceed to payment.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service ID</span>
                <span className="font-mono text-sm">{service.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold text-xl">
                <span>Total Amount</span>
                <span>${service.amount.toFixed(2)}</span>
              </div>
              <Separator />
               <Button onClick={handlePayment} disabled={isLoading} className="w-full" size="lg">
                 {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                 {isLoading ? 'Processing...' : 'Pay with Paytm'}
              </Button>
               <Button variant="outline" asChild className="w-full">
                <Link href="/dashboard/payments">
                  Cancel
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
