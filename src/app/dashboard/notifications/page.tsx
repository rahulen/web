'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';
import { mockNotifications } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header title="Notifications" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              Here are all your past notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {mockNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                    <div
                      className={cn(
                        'flex items-start gap-4 p-4',
                      )}
                    >
                      <span className={cn("flex h-2.5 w-2.5 translate-y-2 rounded-full", !notification.read ? 'bg-primary' : 'bg-transparent')} />
                      <div className="grid gap-1 flex-1">
                        <p className={cn("font-semibold", !notification.read && "text-card-foreground")}>{notification.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.date}
                        </p>
                      </div>
                    </div>
                  {index < mockNotifications.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
