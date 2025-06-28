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
  SidebarSeparator,
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
import { RoleProvider, useRole } from '@/contexts/role-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, setRole } = useRole();

  const handleRoleChange = (checked: boolean) => {
    setRole(checked ? 'team-member' : 'user');
  };

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
                <div className="flex flex-col gap-4 p-2 border-t">
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="role-switch" checked={role === 'team-member'} onCheckedChange={handleRoleChange} />
                      <Label htmlFor="role-switch" className="text-sm">Team Member</Label>
                    </div>
                  <SidebarSeparator />
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40x40.png" alt="@user" data-ai-hint="avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">User</span>
                      <span className="text-xs text-muted-foreground">
                        user@example.com
                      </span>
                    </div>
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


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </RoleProvider>
  );
}
