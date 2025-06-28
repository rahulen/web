'use client';
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Header } from '@/components/header';
import { mockServices } from '@/lib/data';
import Link from 'next/link';
import { useRole } from '@/contexts/role-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const statusColors: { [key: string]: string } = {
  'Paid': 'bg-green-100 text-green-800',
  'Unpaid': 'bg-orange-100 text-orange-800',
  'Overdue': 'bg-red-100 text-red-800'
};

function PaymentsPageContent() {
  const { role } = useRole();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  React.useEffect(() => {
    const status = searchParams.get('status');
    const serviceId = searchParams.get('serviceId');
    if (status) {
      // Clear the query params from the URL
      window.history.replaceState(null, '', '/dashboard/payments');
    }

    if (status === 'success' && serviceId) {
      toast({
        title: "Payment Successful",
        description: `Your payment for service ${serviceId} was completed.`,
      });
    } else if (status === 'failed' || status === 'error') {
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: `Your payment for service ${serviceId} could not be processed. Please try again.`,
      });
    }
  }, [searchParams, toast]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="Payments" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>{role === 'team-member' ? 'All Payments' : 'My Payments'}</CardTitle>
            <CardDescription>
              {role === 'team-member'
                ? 'A list of all client payments and their statuses.'
                : 'A list of all your payments and their statuses.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {role === 'team-member' && <TableHead className="w-1/4">Client</TableHead>}
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id}>
                    {role === 'team-member' && (
                       <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={service.client.avatar} alt={service.client.name} data-ai-hint="logo" />
                            <AvatarFallback>{service.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{service.client.name}</p>
                            <p className="text-sm text-muted-foreground">{service.client.email}</p>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[service.paymentStatus]} border-none`}>
                        {service.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${service.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      {(service.paymentStatus === 'Unpaid' || service.paymentStatus === 'Overdue') && (
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/payments/${service.id}`}>Pay Now</Link>
                        </Button>
                      )}
                       {role === 'team-member' && service.paymentStatus === 'Paid' && (
                        <span className="text-sm text-muted-foreground">Paid</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}


export default function PaymentsPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PaymentsPageContent />
    </React.Suspense>
  )
}
