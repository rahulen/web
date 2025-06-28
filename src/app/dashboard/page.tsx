'use client';
import * as React from 'react';
import {
  MoreHorizontal,
  FileText,
  Bot,
} from 'lucide-react';

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ServiceUpdatesDialog } from '@/components/service-updates-dialog';
import { Header } from '@/components/header';
import { mockServices } from '@/lib/data';
import type { Service } from '@/lib/types';

const statusColors: { [key: string]: string } = {
  'In Progress': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'Paid': 'bg-green-100 text-green-800',
  'Unpaid': 'bg-orange-100 text-orange-800',
  'Overdue': 'bg-red-100 text-red-800'
};


export default function DashboardPage() {
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleViewUpdates = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>My Services</CardTitle>
            <CardDescription>
              A list of all services you have requested.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="font-medium">{service.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {service.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${statusColors[service.status]} border-none`}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant="outline" className={`${statusColors[service.paymentStatus]} border-none`}>
                        {service.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${service.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {service.paymentStatus === 'Unpaid' && (
                            <DropdownMenuItem>Pay Now</DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleViewUpdates(service)}>
                            View Updates
                          </DropdownMenuItem>
                           <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        {selectedService && (
          <ServiceUpdatesDialog service={selectedService} />
        )}
      </Dialog>

    </div>
  );
}
