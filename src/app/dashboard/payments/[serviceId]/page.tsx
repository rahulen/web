'use client';

import { useParams } from 'next/navigation';
import { mockServices } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/header';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function PaymentGatewayPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const [service, setService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    if (serviceId) {
      const foundService = mockServices.find(s => s.id === serviceId);
      setService(foundService);
    }
  }, [serviceId]);

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
               <Button asChild className="w-full" size="lg">
                <Link href="https://paytm.com" target="_blank" rel="noopener noreferrer">
                  Pay with Paytm
                </Link>
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
