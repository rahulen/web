'use client';
import * as React from 'react';
import {
  MoreHorizontal,
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ServiceUpdatesDialog } from '@/components/service-updates-dialog';
import { Header } from '@/components/header';
import { mockServices } from '@/lib/data';
import type { Service } from '@/lib/types';
import Link from 'next/link';
import { useRole } from '@/contexts/role-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const statusColors: { [key: string]: string } = {
  'In Progress': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'Paid': 'bg-green-100 text-green-800',
  'Unpaid': 'bg-orange-100 text-orange-800',
  'Overdue': 'bg-red-100 text-red-800'
};


export default function ServicesPage() {
  const { role } = useRole();
  const [services, setServices] = React.useState<Service[]>(mockServices);
  const [selectedService, setSelectedService] = React.useState<Service | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleViewUpdates = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };
  
  const handleStatusChange = (serviceId: string, newStatus: Service['status']) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId ? { ...service, status: newStatus } : service
      )
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="Services" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>{role === 'team-member' ? 'All Services' : 'My Services'}</CardTitle>
            <CardDescription>
              {role === 'team-member'
                ? 'Manage all ongoing and past services for clients.'
                : 'A list of all services you have requested.'
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
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
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
                    <TableCell className="font-medium">
                      <div className="font-medium">{service.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {service.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      {role === 'team-member' ? (
                        <Select value={service.status} onValueChange={(value) => handleStatusChange(service.id, value as Service['status'])}>
                          <SelectTrigger className="w-auto border-none p-0 focus:ring-0 focus:ring-offset-0 [&>span]:pl-2.5">
                             <SelectValue asChild>
                              <Badge variant="outline" className={`${statusColors[service.status]} border-none`}>
                                {service.status}
                              </Badge>
                             </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge variant="outline" className={`${statusColors[service.status]} border-none`}>
                          {service.status}
                        </Badge>
                      )}
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
                          {(service.paymentStatus === 'Unpaid' || service.paymentStatus === 'Overdue') && (
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/payments/${service.id}`}>Pay Now</Link>
                            </DropdownMenuItem>
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
