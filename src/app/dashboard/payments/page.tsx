'use client';
import * as React from 'react';
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

const statusColors: { [key: string]: string } = {
  'Paid': 'bg-green-100 text-green-800',
  'Unpaid': 'bg-orange-100 text-orange-800',
  'Overdue': 'bg-red-100 text-red-800'
};

export default function PaymentsPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="Payments" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>My Payments</CardTitle>
            <CardDescription>
              A list of all your payments and their statuses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id}>
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
