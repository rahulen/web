'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Gem,
  LayoutDashboard,
  Briefcase,
  CreditCard,
  Bell,
  LogOut,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent className="flex flex-col justify-between">
            <div>
              <SidebarHeader className="border-b">
                <div className="flex items-center gap-2">
                  <Gem className="w-6 h-6 text-primary" />
                  <h1 className="text-lg font-semibold">Parihar Hub</h1>
                </div>
              </SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard" passHref>
                    <SidebarMenuButton isActive={pathname === '/dashboard'}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/services" passHref>
                    <SidebarMenuButton isActive={pathname.startsWith('/dashboard/services')}>
                      <Briefcase />
                      <span>Services</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/payments" passHref>
                    <SidebarMenuButton isActive={pathname.startsWith('/dashboard/payments')}>
                      <CreditCard />
                      <span>Payments</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/notifications" passHref>
                    <SidebarMenuButton isActive={pathname.startsWith('/dashboard/notifications')}>
                      <Bell />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
            <div>
              <SidebarMenu>
                <SidebarMenuItem>
                   <Link href="#" passHref>
                    <SidebarMenuButton>
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <Link href="/" passHref>
                    <SidebarMenuButton>
                      <LogOut />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarFooter>
                <div className="flex items-center gap-3 p-2">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40" alt="@user" data-ai-hint="avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">User</span>
                    <span className="text-xs text-muted-foreground">
                      user@example.com
                    </span>
                  </div>
                </div>
              </SidebarFooter>
            </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background">{children}</SidebarInset>
      </div>
    </SidebarProvider>
  );
}
