'use client';

import * as React from 'react';
import type { Service } from '@/lib/types';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Bot, FileText, UserCircle } from 'lucide-react';
import { getSummaryAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Skeleton } from './ui/skeleton';

export function ServiceUpdatesDialog({ service }: { service: Service }) {
  const [summary, setSummary] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    const updatesText = service.updates.map(u => `${u.date} (${u.author}): ${u.message}`).join('\n');
    const result = await getSummaryAction(updatesText);
    if (result.summary) {
      setSummary(result.summary);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Updates for {service.name}</DialogTitle>
        <DialogDescription>
          Service ID: {service.id}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Update History</h3>
                 <Button onClick={handleSummarize} disabled={isLoading} variant="outline" size="sm">
                    <Bot className="mr-2 h-4 w-4" />
                    {isLoading ? 'Summarizing...' : 'Summarize with AI'}
                </Button>
            </div>
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-6">
              {service.updates.slice().reverse().map((update, index) => (
                <div key={update.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">{update.author}</p>
                        <p className="text-xs text-muted-foreground">{new Date(update.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col gap-4">
            <h3 className="font-semibold">AI Summary</h3>
            <div className="h-96 rounded-lg border bg-secondary/50 p-4 space-y-4">
                {isLoading && (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {summary && (
                    <Alert>
                        <Bot className="h-4 w-4" />
                        <AlertTitle>Summary</AlertTitle>
                        <AlertDescription className="whitespace-pre-wrap">{summary}</AlertDescription>
                    </Alert>
                )}
                {!isLoading && !error && !summary && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <Bot className="h-12 w-12 mb-4" />
                        <p className="text-sm">Click the &quot;Summarize with AI&quot; button to generate a summary of the updates.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </DialogContent>
  );
}
