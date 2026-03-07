import type { ReactNode } from 'react';

interface IframeCardProps {
  children: ReactNode;
}

export function IframeCard({ children }: IframeCardProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-secondary/50">
      <div className="min-h-0 w-full flex-1">{children}</div>
    </div>
  );
}
